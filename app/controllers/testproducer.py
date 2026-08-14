from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.testproducer import (
    list_testproducer,
    find_testproducer,
    create_testproducer,
    update_testproducer,
    delete_testproducer
)

router = APIRouter(
    prefix="/testproducers",
    tags=["TestProducer"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_testproducer(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_testproducer(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_testproducer(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_testproducer(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_testproducer(db, item_id)
