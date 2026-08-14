from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.testband import (
    list_testband,
    find_testband,
    create_testband,
    update_testband,
    delete_testband
)

router = APIRouter(
    prefix="/testbands",
    tags=["TestBand"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_testband(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_testband(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_testband(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_testband(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_testband(db, item_id)
