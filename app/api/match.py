from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.domains.music.instruments.model import (
    UserInstrument,
)
from app.auth.dependencies import get_current_user


router = APIRouter(
    prefix="/match",
    tags=["Match"],
)


def calculate_score(
    source_profile: Profile,
    source_instruments,
    target_profile: Profile,
    target_instruments,
):
    score = 0
    reasons = []

    if (
        source_profile.city
        and target_profile.city
        and source_profile.city == target_profile.city
    ):
        score += 30
        reasons.append("same city")

    source_ids = {
        item.instrument_id
        for item in source_instruments
    }

    target_ids = {
        item.instrument_id
        for item in target_instruments
    }

    if source_ids.intersection(target_ids):
        score += 30
        reasons.append("same instrument")

    source_levels = {
        item.level
        for item in source_instruments
    }

    target_levels = {
        item.level
        for item in target_instruments
    }

    if source_levels.intersection(target_levels):
        score += 10
        reasons.append("similar skill level")

    if any(
        item.is_primary
        for item in target_instruments
    ):
        score += 10
        reasons.append("has primary instrument")

    if target_profile.is_verified:
        score += 20
        reasons.append("verified profile")

    return score, reasons


@router.get("/me")
def get_my_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    source_profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if source_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    source_instruments = (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == current_user.id
        )
        .all()
    )

    profiles = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(
            Profile.user_id != current_user.id,
            User.is_active == True,
        )
        .all()
    )

    results = []

    for target_profile in profiles:
        target_instruments = (
            db.query(UserInstrument)
            .filter(
                UserInstrument.user_id
                == target_profile.user_id
            )
            .all()
        )

        score, reasons = calculate_score(
            source_profile,
            source_instruments,
            target_profile,
            target_instruments,
        )

        results.append(
            {
                "user_id": target_profile.user_id,
                "profile_id": str(target_profile.id),
                "display_name": target_profile.display_name,
                "city": target_profile.city,
                "match_score": score,
                "reasons": reasons,
            }
        )

    results.sort(
        key=lambda item: item["match_score"],
        reverse=True,
    )

    return results


@router.get("/{user_id}")
def get_match_for_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    source_profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    target_profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if source_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Your profile not found",
        )

    if target_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Target profile not found",
        )

    source_instruments = (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == current_user.id
        )
        .all()
    )

    target_instruments = (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == user_id
        )
        .all()
    )

    score, reasons = calculate_score(
        source_profile,
        source_instruments,
        target_profile,
        target_instruments,
    )

    return {
        "user_id": target_profile.user_id,
        "profile_id": str(target_profile.id),
        "display_name": target_profile.display_name,
        "city": target_profile.city,
        "match_score": score,
        "reasons": reasons,
    }
