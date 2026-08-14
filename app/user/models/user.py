from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: int = 0
    full_name: str = ""
    username: str = ""
    email: str = ""
    phone: str = ""
    city: str = ""
    password_hash: str = ""
    created_at: datetime | None = None
    updated_at: datetime | None = None