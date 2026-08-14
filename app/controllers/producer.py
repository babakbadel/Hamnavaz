from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.producer import (
    list_producer,
    find_producer,
    create_producer,
    update_producer,
    delete_producer
)

router = APIRouter(
    prefix="/producers",
    tags=["Producer"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_producer(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_producer(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_producer(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_producer(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_producer(db, item_id)
