"""
Hamnavaz domain models.

Importing this package registers all SQLAlchemy domain models
before the ORM mapper configuration takes place.
"""

from app.domains.users.model import User
from app.domains.profiles.model import Profile
from app.domains.locations.model import City

from app.domains.music.roles.model import UserRole
from app.domains.music.skills.model import UserSkill
from app.domains.music.instruments.model import UserInstrument


__all__ = [
    "User",
    "Profile",
    "City",
    "UserRole",
    "UserSkill",
    "UserInstrument",
]
