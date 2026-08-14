from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.artist import (
    list_artist,
    find_artist,
    create_artist,
    update_artist,
    delete_artist
)

router = APIRouter(
    prefix="/artists",
    tags=["Artist"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_artist(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_artist(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_artist(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_artist(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_artist(db, item_id)
