from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.domains.locations.model import City

from app.domains.music.instruments.model import (
    Instrument,
    UserInstrument,
)


router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


# ============================================================
# SEARCH MUSICIANS
# ============================================================

@router.get("/musicians")
def search_musicians(
    city_id: int | None = None,
    instrument_id: str | None = None,
    level: str | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    """
    Search musicians.

    Filters:
    - city_id
    - instrument_id
    - level
    - pagination

    Example:

        /search/musicians?city_id=2

    2 = Isfahan
    """

    # ---------------------------------------------------------
    # Pagination validation
    # ---------------------------------------------------------

    if page < 1:
        page = 1

    if limit < 1:
        limit = 10

    if limit > 100:
        limit = 100

    # ---------------------------------------------------------
    # Base query
    # ---------------------------------------------------------

    query = (
        db.query(Profile)
        .join(
            User,
            User.id == Profile.user_id,
        )
        .filter(
            User.is_active.is_(True)
        )
    )

    # ---------------------------------------------------------
    # City filter
    #
    # New system:
    # Profile.city_id -> City.id
    # ---------------------------------------------------------

    if city_id is not None:
        query = query.filter(
            Profile.city_id == city_id
        )

    # ---------------------------------------------------------
    # Instrument / level filters
    #
    # Only join UserInstrument when required.
    # ---------------------------------------------------------

    if instrument_id is not None or level is not None:
        query = query.join(
            UserInstrument,
            UserInstrument.user_id == Profile.user_id,
        )

    # ---------------------------------------------------------
    # Instrument filter
    # ---------------------------------------------------------

    if instrument_id is not None:
        query = query.filter(
            UserInstrument.instrument_id == instrument_id
        )

    # ---------------------------------------------------------
    # Level filter
    # ---------------------------------------------------------

    if level is not None:
        query = query.filter(
            UserInstrument.level == level
        )

    # ---------------------------------------------------------
    # Remove duplicates
    #
    # A musician may have multiple instruments.
    # ---------------------------------------------------------

    query = query.distinct()

    # ---------------------------------------------------------
    # Total
    # ---------------------------------------------------------

    total = query.count()

    # ---------------------------------------------------------
    # Pagination
    # ---------------------------------------------------------

    results = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    # ---------------------------------------------------------
    # Response
    #
    # Instead of returning SQLAlchemy objects directly,
    # build a clean JSON-compatible response.
    # ---------------------------------------------------------

    output = []

    for profile in results:

        city = None

        if profile.city_id is not None:
            city = (
                db.query(City)
                .filter(
                    City.id == profile.city_id
                )
                .first()
            )

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

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "results": output,
    }


# ============================================================
# SEARCH INSTRUMENTS
# ============================================================

@router.get("/instruments")
def search_instruments(
    q: str | None = None,
    family: str | None = None,
    db: Session = Depends(get_db),
):
    """
    Search instruments by name and family.

    Examples:

        /search/instruments
        /search/instruments?q=guitar
        /search/instruments?family=string
    """

    query = db.query(Instrument)

    # ---------------------------------------------------------
    # Name search
    # ---------------------------------------------------------

    if q:
        query = query.filter(
            Instrument.name.ilike(f"%{q}%")
        )

    # ---------------------------------------------------------
    # Family filter
    # ---------------------------------------------------------

    if family:
        query = query.filter(
            Instrument.family == family
        )

    # ---------------------------------------------------------
    # Result
    # ---------------------------------------------------------

    return (
        query
        .order_by(Instrument.name)
        .all()
    )
