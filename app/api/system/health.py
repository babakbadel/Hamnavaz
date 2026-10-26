from fastapi import APIRouter
from datetime import datetime
import os
from app.core.config import settings

router = APIRouter(
    prefix="/system",
    tags=["System"]
)


@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Hamnavaz API",
        "version": "1.0.0",
        "time": datetime.utcnow().isoformat()
    }


@router.get("/version")
def version():
    return {
        "name": "Hamnavaz",
        "api_version": "1.0.0",
        "stage": settings.ENVIRONMENT,
        "commit_sha": os.getenv("VERCEL_GIT_COMMIT_SHA") or os.getenv("GITHUB_SHA"),
        "ready_for_migration": True
    }
