from sqlalchemy.orm import Session

from app.domains.users.model import User
from app.core.security import hash_password, verify_password
from app.auth.token_service import create_access_token


def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
):
    old = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if old:
        return None

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        provider="local",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(
    db: Session,
    email: str,
    password: str,
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        return None

    if not user.password_hash:
        return None

    if not verify_password(password, user.password_hash):
        return None

    token = create_access_token(user.id)

    return {
        "access_token": token,
        "token_type": "bearer",
    }
