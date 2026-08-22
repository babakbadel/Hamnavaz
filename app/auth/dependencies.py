from datetime import datetime, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.domains.users.model import User
from app.auth.token_service import decode_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    try:
        payload = decode_token(token)
        user_id = payload.get("sub")
        token_type = payload.get("type")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        if token_type and token_type != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user_id = int(user_id)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active or user.deleted_at is not None:
        raise HTTPException(status_code=401, detail="User is inactive")

    # Presence is derived from authenticated activity; no client-controlled
    # timestamp is accepted, preventing users from spoofing online status.
    user.last_seen_at = datetime.now(timezone.utc)
    db.commit()

    return user
