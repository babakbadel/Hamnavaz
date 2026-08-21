from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import SessionLocal
from app.domains.collaboration.rating import Rating
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.rating import RatingCreate, RatingResponse

router = APIRouter(prefix="/ratings", tags=["Ratings"])


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
    profile = db.query(Profile).filter(Profile.id == data.profile_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    if profile.user_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot rate your own profile")

    existing = (
        db.query(Rating)
        .filter(Rating.user_id == current_user.id, Rating.profile_id == profile.id)
        .first()
    )
    if existing is not None:
        raise HTTPException(status_code=409, detail="You have already rated this profile")

    rating = Rating(profile_id=profile.id, user_id=current_user.id, score=data.score)
    db.add(rating)
    db.commit()
    db.refresh(rating)
    return rating


@router.get("/profile/{profile_id}", response_model=list[RatingResponse])
def profile_ratings(
    profile_id: str,
    db: Session = Depends(get_db),
):
    return (
        db.query(Rating)
        .filter(Rating.profile_id == profile_id)
        .order_by(Rating.id.desc())
        .all()
    )
