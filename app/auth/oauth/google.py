
import os
from urllib.parse import urlencode


class GoogleOAuthConfig:
    CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
    CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
    REDIRECT_URI = os.getenv(
        "GOOGLE_REDIRECT_URI",
        "http://localhost:8000/auth/google/callback"
    )


def get_google_login_url():
    params = {
        "client_id": GoogleOAuthConfig.CLIENT_ID,
        "redirect_uri": GoogleOAuthConfig.REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }

    return (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        + urlencode(params)
    )


def google_user_from_token(data: dict):
    return {
        "email": data.get("email"),
        "name": data.get("name"),
        "provider": "google",
        "provider_id": data.get("sub"),
    }


def create_google_auth_payload(user: dict):
    return {
        "email": user.get("email"),
        "name": user.get("name"),
        "provider": "google",
        "provider_id": user.get("provider_id"),
    }
