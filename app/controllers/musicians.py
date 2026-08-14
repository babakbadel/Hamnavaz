from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.musician import MusicianCreate, MusicianResponse
from app.auth.middleware.auth import get_current_user

router = APIRouter(
    prefix="/musicians",
    tags=["Musicians"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=MusicianResponse)
def create_profile(
    data: MusicianCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    exists = (
        db.query(Musician)
        .filter(Musician.user_id == current_user.id)
        .first()
    )

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists",
        )

    profile = Musician(
        user_id=current_user.id,
        instrument=data.instrument,
        genre=data.genre,
        city=data.city,
        experience=data.experience,
        bio=data.bio,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


@router.get("/me", response_model=MusicianResponse)
def my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(Musician)
        .filter(Musician.user_id == current_user.id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Musician profile not found",
        )

    return profile


@router.get("/", response_model=list[MusicianResponse])
def search(
    city: str | None = None,
    instrument: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Musician)

    if city:
        query = query.filter(Musician.city == city)

    if instrument:
        query = query.filter(
            Musician.instrument == instrument
        )

    return query.all()
