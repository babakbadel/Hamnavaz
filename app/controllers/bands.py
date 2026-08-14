from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.middleware.auth import get_current_user
from app.database.session import SessionLocal
from app.domains.collaboration.band import Band
from app.domains.users.model import User
from app.schemas.band import BandCreate, BandResponse

router = APIRouter(
    prefix="/bands",
    tags=["Bands"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=BandResponse)
def create_band(
    data: BandCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    band = Band(
        owner_id=current_user.id,
        name=data.name,
        city=data.city,
        description=data.description,
    )

    db.add(band)
    db.commit()
    db.refresh(band)

    return band


@router.get("/", response_model=list[BandResponse])
def list_bands(
    db: Session = Depends(get_db),
):
    return (
        db.query(Band)
        .order_by(Band.id.desc())
        .all()
    )
