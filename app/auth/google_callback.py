from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.domains.users.model import User

from app.auth.google_service import (
    exchange_code,
    get_google_user,
)

from app.auth.token_service import (
    create_access_token,
    create_refresh_token,
)


router = APIRouter(
    prefix="/auth/google",
    tags=["Google Auth"],
)


GOOGLE_REDIRECT_URI = (
    "http://localhost:8000/auth/google/callback"
)


@router.get("/callback")
def google_callback(
    code: str,
    db: Session = Depends(get_db),
):
    token_data = exchange_code(
        code,
        GOOGLE_REDIRECT_URI,
    )

    access_token = token_data.get("access_token")

    if not access_token:
        raise HTTPException(
            status_code=400,
            detail="Google authentication failed",
        )

    google_user = get_google_user(access_token)

    email = google_user.get("email")
    google_id = google_user.get("sub")
    name = google_user.get(
        "name",
        "Google User",
    )
    avatar = google_user.get("picture")

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Google account email not available",
        )

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        user = User(
            username=name,
            email=email,
            google_id=google_id,
            avatar_url=avatar,
            provider="google",
            password_hash=None,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    else:
        changed = False

        if google_id and not user.google_id:
            user.google_id = google_id
            changed = True

        if avatar and not user.avatar_url:
            user.avatar_url = avatar
            changed = True

        if user.provider != "google":
            user.provider = "google"
            changed = True

        if changed:
            db.commit()
            db.refresh(user)

    jwt_access = create_access_token(user.id)
    jwt_refresh = create_refresh_token(user.id)

    return {
        "user_id": user.id,
        "email": user.email,
        "provider": user.provider,
        "access_token": jwt_access,
        "refresh_token": jwt_refresh,
    }
