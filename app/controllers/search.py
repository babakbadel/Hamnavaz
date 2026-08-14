from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.domains.profiles.model import Profile

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/musicians")
def search_musicians(
    instrument: str | None = None,
    city: str | None = None,
    style: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Musician)

    if instrument:
        query = query.filter(Musician.instrument.ilike(f"%{instrument}%"))

    if city:
        query = query.filter(Musician.city.ilike(f"%{city}%"))

    if style:
        query = query.filter(Musician.style.ilike(f"%{style}%"))

    return query.all()
