from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.realmusician import (
    RealMusicianCreate
)

from app.services.realmusician import (
    list_realmusician,
    find_realmusician,
    create_realmusician,
    update_realmusician,
    delete_realmusician
)


router = APIRouter(
    prefix="/realmusicians",
    tags=["RealMusician"]
)


@router.get("/")
def get_all(
    db: Session = Depends(get_db)
):
    return list_realmusician(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_realmusician(db, item_id)


@router.post("/")
def create(
    data: RealMusicianCreate,
    db: Session = Depends(get_db)
):
    return create_realmusician(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: RealMusicianCreate,
    db: Session = Depends(get_db)
):
    return update_realmusician(
        db,
        item_id,
        data
    )


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_realmusician(
        db,
        item_id
    )
