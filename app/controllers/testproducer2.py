from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.testproducer2 import (
    list_testproducer2,
    find_testproducer2,
    create_testproducer2,
    update_testproducer2,
    delete_testproducer2
)

router = APIRouter(
    prefix="/testproducer2s",
    tags=["TestProducer2"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_testproducer2(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_testproducer2(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_testproducer2(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_testproducer2(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_testproducer2(db, item_id)
