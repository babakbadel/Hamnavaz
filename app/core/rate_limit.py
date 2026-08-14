from collections import defaultdict
from datetime import datetime, timedelta

_requests = defaultdict(list)

def allow_request(key: str, limit: int = 30, window: int = 60):
    now = datetime.utcnow()

    _requests[key] = [
        t for t in _requests[key]
        if now - t < timedelta(seconds=window)
    ]

    if len(_requests[key]) >= limit:
        return False

    _requests[key].append(now)
    return True
