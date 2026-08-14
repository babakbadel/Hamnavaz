from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.testapi import (
    list_testapi,
    find_testapi,
    create_testapi,
    update_testapi,
    delete_testapi
)

router = APIRouter(
    prefix="/testapis",
    tags=["TestAPI"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_testapi(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_testapi(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_testapi(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_testapi(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_testapi(db, item_id)
