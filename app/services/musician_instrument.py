from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.domains.music.instruments.model import (
    Instrument,
    UserInstrument,
)


def get_all(db: Session, user_id: int):
    """
    Get all instruments belonging to a user.
    """
    return (
        db.query(UserInstrument)
        .filter(UserInstrument.user_id == user_id)
        .all()
    )


def get_one(
    db: Session,
    user_id: int,
    instrument_id: UUID,
):
    """
    Get one instrument assignment for a user.
    """
    return (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == user_id,
            UserInstrument.instrument_id == instrument_id,
        )
        .first()
    )


def add_instrument(
    db: Session,
    user_id: int,
    instrument_id: UUID,
    level: str = "beginner",
    years_experience: int | None = None,
    is_primary: bool = False,
):
    """
    Add an instrument to a user's musician profile.
    """

    # Make sure the instrument exists.
    instrument = (
        db.query(Instrument)
        .filter(Instrument.id == instrument_id)
        .first()
    )

    if instrument is None:
        raise HTTPException(
            status_code=404,
            detail="Instrument not found",
        )

    # Prevent duplicates.
    existing = (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == user_id,
            UserInstrument.instrument_id == instrument_id,
        )
        .first()
    )

    if existing is not None:
        raise HTTPException(
            status_code=400,
            detail="Instrument already added",
        )

    # Only one primary instrument.
    if is_primary:
        (
            db.query(UserInstrument)
            .filter(
                UserInstrument.user_id == user_id,
                UserInstrument.is_primary.is_(True),
            )
            .update(
                {"is_primary": False},
                synchronize_session=False,
            )
        )

    item = UserInstrument(
        user_id=user_id,
        instrument_id=instrument_id,
        level=level,
        years_experience=years_experience,
        is_primary=is_primary,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


def remove_instrument(
    db: Session,
    user_id: int,
    instrument_id: UUID,
):
    """
    Remove an instrument from a user's profile.
    """

    item = (
        db.query(UserInstrument)
        .filter(
            UserInstrument.user_id == user_id,
            UserInstrument.instrument_id == instrument_id,
        )
        .first()
    )

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Instrument not found in user profile",
        )

    db.delete(item)
    db.commit()

    return {
        "message": "Instrument removed",
        "instrument_id": str(instrument_id),
    }
