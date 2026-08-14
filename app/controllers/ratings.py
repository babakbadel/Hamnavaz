from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import SessionLocal
from app.domains.collaboration.rating import Rating
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.rating import RatingCreate, RatingResponse


router = APIRouter(
    prefix="/ratings",
    tags=["Ratings"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=RatingResponse)
def create_rating(
    data: RatingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # --------------------------------------------------------
    # 1. Target profile must exist
    # --------------------------------------------------------
    profile = (
        db.query(Profile)
        .filter(Profile.id == data.profile_id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    # --------------------------------------------------------
    # 2. User cannot rate their own profile
    # --------------------------------------------------------
    if profile.user_id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot rate your own profile",
        )

    # --------------------------------------------------------
    # 3. A user can rate a profile only once
    # --------------------------------------------------------
    existing = (
        db.query(Rating)
        .filter(
            Rating.user_id == current_user.id,
            Rating.profile_id == profile.id,
        )
        .first()
    )

    if existing is not None:
        raise HTTPException(
            status_code=400,
            detail="You have already rated this profile",
        )

    # --------------------------------------------------------
    # 4. Create rating
    # --------------------------------------------------------
    rating = Rating(
        profile_id=profile.id,
        user_id=current_user.id,
        score=data.score,
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return rating
