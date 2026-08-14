from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.domains.users.model import User
from app.services.musician_instrument import (
    add_instrument,
    get_all,
    remove_instrument,
)


router = APIRouter(
    prefix="/musician-instrument",
    tags=["Musician Instrument"],
)


@router.post("/")
def add_user_instrument(
    instrument_id: UUID,
    level: str = "beginner",
    years_experience: int | None = None,
    is_primary: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return add_instrument(
        db=db,
        user_id=current_user.id,
        instrument_id=instrument_id,
        level=level,
        years_experience=years_experience,
        is_primary=is_primary,
    )


@router.get("/me")
def get_my_instruments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all(
        db=db,
        user_id=current_user.id,
    )


@router.get("/{user_id}")
def get_user_instruments(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_all(
        db=db,
        user_id=user_id,
    )


@router.delete("/{instrument_id}")
def delete_user_instrument(
    instrument_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return remove_instrument(
        db=db,
        user_id=current_user.id,
        instrument_id=instrument_id,
    )
