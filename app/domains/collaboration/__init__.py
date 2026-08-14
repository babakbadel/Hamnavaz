"""
Collaboration domain models.
"""

from app.domains.collaboration.band import Band
from app.domains.collaboration.model import CollaborationRequest
from app.domains.collaboration.rating import Rating
from app.domains.collaboration.favorite import Favorite

__all__ = [
    "Band",
    "CollaborationRequest",
    "Rating",
    "Favorite",
]
