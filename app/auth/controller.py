from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.schemas import (
    RegisterSchema,
    LoginSchema,
)
from app.auth.service import (
    register_user,
    login_user,
)


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/register")
def register(
    data: RegisterSchema,
    db: Session = Depends(get_db),
):
    user = register_user(
        db=db,
        username=data.username,
        email=data.email,
        password=data.password,
    )

    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }


@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db),
):
    token = login_user(
        db=db,
        email=data.email,
        password=data.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return token
