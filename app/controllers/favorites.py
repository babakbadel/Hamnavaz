from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import SessionLocal
from app.domains.collaboration.favorite import Favorite
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.favorite import FavoriteCreate, FavoriteResponse

router = APIRouter(prefix="/favorites", tags=["Favorites"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=FavoriteResponse)
def create_favorite(
    data: FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(Profile).filter(Profile.id == data.profile_id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    if profile.user_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot favorite your own profile")

    existing = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id, Favorite.profile_id == profile.id)
        .first()
    )
    if existing is not None:
        return existing

    favorite = Favorite(user_id=current_user.id, profile_id=profile.id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite


@router.get("/", response_model=list[FavoriteResponse])
def my_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id)
        .order_by(Favorite.id.desc())
        .all()
    )


@router.delete("/{profile_id}")
def delete_favorite(
    profile_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorite = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id, Favorite.profile_id == profile_id)
        .first()
    )
    if favorite is None:
        raise HTTPException(status_code=404, detail="Favorite not found")

    db.delete(favorite)
    db.commit()
    return {"status": "ok", "profile_id": profile_id}
