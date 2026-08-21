from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.domains.music.instruments.model import UserInstrument
from app.domains.profiles.model import Profile
from app.domains.users.model import User

router = APIRouter(prefix="/match", tags=["Match"])


def calculate_score(source_profile, source_instruments, target_profile, target_instruments):
    score = 0
    reasons: list[str] = []

    if source_profile.city and target_profile.city and source_profile.city == target_profile.city:
        score += 30
        reasons.append("same city")

    source_ids = {item.instrument_id for item in source_instruments}
    target_ids = {item.instrument_id for item in target_instruments}
    if source_ids & target_ids:
        score += 30
        reasons.append("same instrument")

    source_levels = {item.level for item in source_instruments if item.level}
    target_levels = {item.level for item in target_instruments if item.level}
    if source_levels & target_levels:
        score += 10
        reasons.append("similar skill level")

    if any(item.is_primary for item in target_instruments):
        score += 10
        reasons.append("has primary instrument")

    if target_profile.is_verified:
        score += 20
        reasons.append("verified profile")

    return min(score, 100), reasons


def _profile_instruments(db: Session, user_ids: list[int]) -> dict[int, list[UserInstrument]]:
    if not user_ids:
        return {}
    rows = (
        db.query(UserInstrument)
        .filter(UserInstrument.user_id.in_(user_ids))
        .all()
    )
    grouped: dict[int, list[UserInstrument]] = {}
    for row in rows:
        grouped.setdefault(row.user_id, []).append(row)
    return grouped


def _result(profile, score, reasons):
    return {
        "user_id": profile.user_id,
        "profile_id": str(profile.id),
        "display_name": profile.display_name,
        "city": profile.city,
        "match_score": score,
        "reasons": reasons,
    }


@router.get("/me")
def get_my_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    limit: int = Query(default=20, ge=1, le=100),
    min_score: int = Query(default=0, ge=0, le=100),
):
    source_profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if source_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    profiles = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(Profile.user_id != current_user.id, User.is_active.is_(True))
        .all()
    )
    instruments = _profile_instruments(db, [current_user.id, *[p.user_id for p in profiles]])
    source_instruments = instruments.get(current_user.id, [])

    results = []
    for target in profiles:
        score, reasons = calculate_score(source_profile, source_instruments, target, instruments.get(target.user_id, []))
        if score >= min_score:
            results.append(_result(target, score, reasons))

    results.sort(key=lambda item: (-item["match_score"], item["display_name"] or ""))
    return results[:limit]


@router.get("/{user_id}")
def get_match_for_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot calculate a match with yourself")

    source_profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    target_profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if source_profile is None:
        raise HTTPException(status_code=404, detail="Your profile not found")
    if target_profile is None:
        raise HTTPException(status_code=404, detail="Target profile not found")

    instruments = _profile_instruments(db, [current_user.id, user_id])
    score, reasons = calculate_score(
        source_profile,
        instruments.get(current_user.id, []),
        target_profile,
        instruments.get(user_id, []),
    )
    return _result(target_profile, score, reasons)
