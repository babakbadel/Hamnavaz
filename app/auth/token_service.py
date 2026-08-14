from datetime import datetime, timedelta, timezone

from jose import jwt

from app.core.security_config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS,
)


def create_token(payload: dict, expires_minutes: int):
    data = payload.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes
    )

    data.update({
        "exp": expire
    })

    return jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def create_access_token(user_id: int):
    return create_token(
        {
            "sub": str(user_id),
            "type": "access"
        },
        ACCESS_TOKEN_EXPIRE_MINUTES
    )


def create_refresh_token(user_id: int):
    return create_token(
        {
            "sub": str(user_id),
            "type": "refresh"
        },
        60 * 24 * REFRESH_TOKEN_EXPIRE_DAYS
    )


def decode_token(token: str):
    return jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )
