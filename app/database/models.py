"""
Central SQLAlchemy model registry.

Every active SQLAlchemy domain model is imported here so that:
- SQLAlchemy metadata is complete
- Alembic can see the active schema
- application startup registers all active models
"""

# ============================================================
# Core identity
# ============================================================

from app.domains.users.model import User


# ============================================================
# Profiles
# ============================================================

from app.domains.profiles.model import Profile
from app.domains.locations.model import City


# ============================================================
# Music
# ============================================================

from app.domains.music.roles.model import Role, UserRole
from app.domains.music.skills.model import Skill, UserSkill
from app.domains.music.instruments.model import (
    Instrument,
    UserInstrument,
)


# ============================================================
# Collaboration
# ============================================================

from app.domains.collaboration.band import Band
from app.domains.collaboration.model import CollaborationRequest
from app.domains.collaboration.rating import Rating
from app.domains.collaboration.favorite import Favorite


from app.domains.messaging.model import Message

# ============================================================
# Common
# ============================================================

from app.domains.common.notification import Notification


__all__ = [
    "User",
    "Profile",
    "City",

    "Role",
    "UserRole",

    "Instrument",
    "UserInstrument",

    "Skill",
    "UserSkill",

    "Band",
    "CollaborationRequest",
    "Rating",
    "Favorite",

    "Message",
    "Notification",
]
