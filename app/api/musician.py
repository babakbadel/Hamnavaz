from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.domains.users.model import User
from app.domains.profiles.model import Profile
from app.domains.music.instruments.model import UserInstrument
from app.auth.dependencies import get_current_user


router = APIRouter(
    prefix="/musician",
    tags=["Musician"],
)


@router.post("/profile")
def create_profile(
    display_name: str,
    city: str | None = None,
    bio: str | None = None,
    birth_year: int | None = None,
    gender: str | None = None,
    avatar_url: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists",
        )

    profile = Profile(
        user_id=current_user.id,
        display_name=display_name,
        city=city,
        bio=bio,
        birth_year=birth_year,
        gender=gender,
        avatar_url=avatar_url,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


@router.get("/me")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    instruments = (
        db.query(UserInstrument)
        .filter(UserInstrument.user_id == current_user.id)
        .all()
    )

    return {
        "profile": profile,
        "instruments": instruments,
    }


@router.get("/")
def get_all_musicians(
    db: Session = Depends(get_db),
):
    profiles = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(User.is_active == True)
        .all()
    )

    return profiles


@router.get("/{user_id}")
def get_musician(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.id == user_id,
            User.is_active == True,
        )
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    instruments = (
        db.query(UserInstrument)
        .filter(UserInstrument.user_id == user_id)
        .all()
    )

    return {
        "user": user,
        "profile": profile,
        "instruments": instruments,
    }
