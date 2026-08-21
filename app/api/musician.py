from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.domains.music.instruments.model import UserInstrument
from app.domains.profiles.model import Profile
from app.domains.users.model import User

router = APIRouter(prefix="/musician", tags=["Musician"])


def _instrument_payload(row: UserInstrument) -> dict:
    return {
        "id": str(row.id),
        "instrument_id": row.instrument_id,
        "level": row.level,
        "years_experience": row.years_experience,
        "is_primary": row.is_primary,
    }


def _profile_payload(profile: Profile, instruments: list[UserInstrument]) -> dict:
    return {
        "id": str(profile.id),
        "user_id": profile.user_id,
        "display_name": profile.display_name,
        "city": profile.city,
        "bio": profile.bio,
        "birth_year": profile.birth_year,
        "gender": profile.gender,
        "avatar_url": profile.avatar_url,
        "is_verified": profile.is_verified,
        "instruments": [_instrument_payload(row) for row in instruments],
    }


@router.post("/profile")
def create_profile(
    display_name: str = Query(min_length=1, max_length=120),
    city: str | None = Query(default=None, max_length=120),
    bio: str | None = Query(default=None, max_length=2000),
    birth_year: int | None = Query(default=None, ge=1900, le=2026),
    gender: str | None = Query(default=None, max_length=30),
    avatar_url: str | None = Query(default=None, max_length=2048),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Profile already exists")

    profile = Profile(
        user_id=current_user.id,
        display_name=display_name.strip(),
        city=city.strip() if city else None,
        bio=bio.strip() if bio else None,
        birth_year=birth_year,
        gender=gender.strip() if gender else None,
        avatar_url=avatar_url.strip() if avatar_url else None,
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return _profile_payload(profile, [])


@router.get("/me")
def get_my_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    instruments = db.query(UserInstrument).filter(UserInstrument.user_id == current_user.id).all()
    return _profile_payload(profile, instruments)


@router.get("/")
def get_all_musicians(
    db: Session = Depends(get_db),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    profiles = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(User.is_active.is_(True))
        .order_by(Profile.display_name.asc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    user_ids = [profile.user_id for profile in profiles]
    instruments = db.query(UserInstrument).filter(UserInstrument.user_id.in_(user_ids)).all() if user_ids else []
    grouped: dict[int, list[UserInstrument]] = {}
    for row in instruments:
        grouped.setdefault(row.user_id, []).append(row)
    return [_profile_payload(profile, grouped.get(profile.user_id, [])) for profile in profiles]


@router.get("/{user_id}")
def get_musician(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id, User.is_active.is_(True)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    instruments = db.query(UserInstrument).filter(UserInstrument.user_id == user_id).all()
    return {
        "user": {"id": user.id, "is_active": user.is_active},
        "profile": _profile_payload(profile, instruments),
    }
