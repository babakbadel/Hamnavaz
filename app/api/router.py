from fastapi import FastAPI

from app.auth.controller import router as auth_router
from app.auth.google_callback import router as google_router

from app.api.guitar import router as guitar_router
from app.api.musician import router as musician_router
from app.api.instrument import router as instrument_router
from app.api.band import router as band_router
from app.api.musician_instrument import router as musician_instrument_router
from app.api.producer import router as producer_router
from app.api.search import router as search_router
from app.api.match import router as match_router
from app.api.collaboration_request import router as collaboration_request_router

from app.controllers.messages import router as message_router

from app.api.system.health import router as system_router
from app.controllers.favorites import router as favorites_router
from app.controllers.ratings import router as ratings_router
from app.controllers.notifications import router as notifications_router


def register_routers(app: FastAPI) -> None:
    """
    Register all application API routers.
    """

    # Authentication
    app.include_router(auth_router)
    app.include_router(google_router)

    # Music
    app.include_router(guitar_router)
    app.include_router(musician_router)
    app.include_router(instrument_router)
    app.include_router(band_router)
    app.include_router(musician_instrument_router)
    app.include_router(producer_router)

    # Discovery / matching
    app.include_router(search_router)
    app.include_router(match_router)

    # Collaboration
    app.include_router(collaboration_request_router)

    # Messaging
    app.include_router(message_router)

    # Social features
    app.include_router(favorites_router)
    app.include_router(ratings_router)
    app.include_router(notifications_router)

    # System
    app.include_router(system_router)
