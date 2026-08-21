from fastapi import APIRouter, Depends
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.domains.locations.model import City

from app.domains.music.instruments.model import (
    Instrument,
    UserInstrument,
)

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/musicians")
def search_musicians(
    q: str | None = None,
    city_id: int | None = None,
    instrument_id: str | None = None,
    level: str | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    """Search active musician profiles with text, city, instrument, level and pagination."""
    page = max(page, 1)
    limit = min(max(limit, 1), 100)

    query = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(User.is_active.is_(True))
    )

    # Text search is intentionally backend-side so the production UI and API
    # use the same source of truth. It covers profile text, city and instrument.
    if q and q.strip():
        term = f"%{q.strip()}%"
        query = (
            query
            .outerjoin(UserInstrument, UserInstrument.user_id == Profile.user_id)
            .outerjoin(Instrument, Instrument.id == UserInstrument.instrument_id)
            .filter(
                or_(
                    Profile.display_name.ilike(term),
                    Profile.bio.ilike(term),
                    Profile.city.ilike(term),
                    Instrument.name.ilike(term),
                    Instrument.family.ilike(term),
                )
            )
        )

    if city_id is not None:
        query = query.filter(Profile.city_id == city_id)

    if instrument_id is not None or level is not None:
        query = query.join(
            UserInstrument,
            UserInstrument.user_id == Profile.user_id,
        )

    if instrument_id is not None:
        query = query.filter(UserInstrument.instrument_id == instrument_id)

    if level is not None:
        query = query.filter(UserInstrument.level == level)

    query = query.distinct()
    total = query.count()
    results = query.offset((page - 1) * limit).limit(limit).all()

    output = []
    for profile in results:
        city = None
        if profile.city_id is not None:
            city = db.query(City).filter(City.id == profile.city_id).first()

        output.append(
            {
                "user_id": profile.user_id,
                "display_name": profile.display_name,
                "birth_year": profile.birth_year,
                "city": city.api_value if city else profile.city,
                "city_id": profile.city_id,
                "city_name": city.name if city else profile.city,
                "city_slug": city.slug if city else None,
                "is_verified": profile.is_verified,
                "updated_at": profile.updated_at,
                "bio": profile.bio,
                "id": str(profile.id),
                "gender": profile.gender,
                "avatar_url": profile.avatar_url,
                "created_at": profile.created_at,
            }
        )

    return {"total": total, "page": page, "limit": limit, "results": output}


@router.get("/instruments")
def search_instruments(
    q: str | None = None,
    family: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Instrument)
    if q:
        query = query.filter(Instrument.name.ilike(f"%{q}%"))
    if family:
        query = query.filter(Instrument.family == family)
    return query.order_by(Instrument.name).all()
