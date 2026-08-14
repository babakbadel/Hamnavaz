import time
from collections import defaultdict

from fastapi import Request
from starlette.responses import JSONResponse


requests_store = defaultdict(list)

MAX_REQUESTS = 60
WINDOW_SECONDS = 60


async def rate_limit_middleware(request: Request, call_next):

    client_ip = request.client.host
    now = time.time()

    requests_store[client_ip] = [
        timestamp
        for timestamp in requests_store[client_ip]
        if now - timestamp < WINDOW_SECONDS
    ]

    if len(requests_store[client_ip]) >= MAX_REQUESTS:
        return JSONResponse(
            status_code=429,
            content={
                "detail": "Too many requests"
            }
        )

    requests_store[client_ip].append(now)

    response = await call_next(request)

    return response
