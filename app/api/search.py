from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.domains.locations.model import City
from app.domains.music.instruments.model import Instrument, UserInstrument
from app.domains.profiles.model import Profile
from app.domains.users.model import User

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/musicians")
def search_musicians(
    q: str | None = Query(default=None, max_length=100),
    city_id: int | None = Query(default=None, ge=1),
    instrument_id: str | None = Query(default=None, max_length=100),
    level: str | None = Query(default=None, max_length=50),
    online: bool = Query(default=False),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Search active musician profiles with text, city, instrument, level, presence and pagination."""
    query = (
        db.query(Profile)
        .join(User, User.id == Profile.user_id)
        .filter(User.is_active.is_(True))
    )

    if q and q.strip():
        term = f"%{q.strip()}%"
        query = (
            query.outerjoin(UserInstrument, UserInstrument.user_id == Profile.user_id)
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
        query = query.join(UserInstrument, UserInstrument.user_id == Profile.user_id)

    if instrument_id is not None:
        query = query.filter(UserInstrument.instrument_id == instrument_id)

    if level is not None:
        query = query.filter(UserInstrument.level == level)

    online_cutoff = datetime.now(timezone.utc) - timedelta(minutes=5)
    if online:
        query = query.filter(User.last_seen_at >= online_cutoff)

    query = query.distinct()
    total = query.count()
    results = query.offset((page - 1) * limit).limit(limit).all()

    city_ids = {p.city_id for p in results if p.city_id is not None}
    cities = {}
    if city_ids:
        cities = {city.id: city for city in db.query(City).filter(City.id.in_(city_ids)).all()}

    output = []
    for profile in results:
        city = cities.get(profile.city_id)
        is_online = bool(profile.user.last_seen_at and profile.user.last_seen_at >= online_cutoff)
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
                "is_online": is_online,
                "last_seen_at": profile.user.last_seen_at,
                "updated_at": profile.updated_at,
                "bio": profile.bio,
                "id": str(profile.id),
                "gender": profile.gender,
                "avatar_url": profile.avatar_url,
                "created_at": profile.created_at,
            }
        )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit if total else 0,
        "results": output,
    }


@router.get("/instruments")
def search_instruments(
    q: str | None = Query(default=None, max_length=100),
    family: str | None = Query(default=None, max_length=100),
    db: Session = Depends(get_db),
):
    query = db.query(Instrument)
    if q and q.strip():
        query = query.filter(Instrument.name.ilike(f"%{q.strip()}%"))
    if family and family.strip():
        query = query.filter(Instrument.family == family.strip())
    return query.order_by(Instrument.name).all()
