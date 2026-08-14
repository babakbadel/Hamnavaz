from fastapi import Request, HTTPException

from app.auth.token_service import decode_token


def verify_token(token: str):
    try:
        payload = decode_token(token)
        return payload

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


async def auth_middleware(
    request: Request,
    call_next
):
    authorization = request.headers.get("Authorization")

    if authorization and authorization.startswith("Bearer "):
        token = authorization.replace("Bearer ", "")

        verify_token(token)

    response = await call_next(request)

    return response
