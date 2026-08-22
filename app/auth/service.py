from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.domains.users.model import User
from app.core.security import hash_password, verify_password
from app.auth.token_service import create_access_token


def register_user(db: Session, username: str, email: str, password: str):
    old = db.query(User).filter(or_(User.email == email, User.username == username)).first()
    if old:
        return None

    user = User(
        username=username.strip(),
        email=email.strip().lower(),
        password_hash=hash_password(password),
        provider="local",
    )

    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        return None
    db.refresh(user)
    return user


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email.strip().lower()).first()
    if user is None or not user.is_active or user.deleted_at is not None:
        return None
    if not user.password_hash or not verify_password(password, user.password_hash):
        return None
    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer",
    }
