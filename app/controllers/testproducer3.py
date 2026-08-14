from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.testproducer3 import (
    list_testproducer3,
    find_testproducer3,
    create_testproducer3,
    update_testproducer3,
    delete_testproducer3
)

router = APIRouter(
    prefix="/testproducer3s",
    tags=["TestProducer3"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_testproducer3(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_testproducer3(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_testproducer3(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_testproducer3(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_testproducer3(db, item_id)
