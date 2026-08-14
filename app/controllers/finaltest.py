from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.finaltest import (
    list_finaltest,
    find_finaltest,
    create_finaltest,
    update_finaltest,
    delete_finaltest
)

router = APIRouter(
    prefix="/finaltests",
    tags=["FinalTest"]
)


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return list_finaltest(db)


@router.get("/{item_id}")
def get_one(
    item_id: int,
    db: Session = Depends(get_db)
):
    return find_finaltest(db, item_id)


@router.post("/")
def create(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_finaltest(db, data)


@router.put("/{item_id}")
def update(
    item_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_finaltest(db, item_id, data)


@router.delete("/{item_id}")
def delete(
    item_id: int,
    db: Session = Depends(get_db)
):
    return delete_finaltest(db, item_id)
