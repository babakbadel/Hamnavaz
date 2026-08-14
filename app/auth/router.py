

from app.auth.google_oauth import google_login_url


@router.get("/google/login")
def google_login():
    return {
        "url": google_login_url()
    }

