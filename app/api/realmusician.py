from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.controllers.realmusician import router as controller_router

router = controller_router
