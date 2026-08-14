from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.instrument import (
    InstrumentCreate,
    InstrumentResponse,
)
from app.services.instrument import (
    list_instrument,
    create_instrument,
)


router = APIRouter(
    prefix="/instrument",
    tags=["Instrument"],
)


@router.get(
    "/",
    response_model=list[InstrumentResponse],
)
def get_all(
    db: Session = Depends(get_db),
):
    return list_instrument(db)


@router.post(
    "/",
    response_model=InstrumentResponse,
)
def create(
    data: InstrumentCreate,
    db: Session = Depends(get_db),
):
    return create_instrument(db, data)
