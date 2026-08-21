"""Vercel entrypoint for the Hamnavaz FastAPI application.

Vercel sends /api/* requests to this function. The existing application
keeps its clean internal routes (/health, /search/musicians, ...), so the
entrypoint mounts it under /api instead of duplicating every route.
"""
from pathlib import Path
import sys

from fastapi import FastAPI

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.main import app as hamnavaz_app  # noqa: E402

app = FastAPI(title="Hamnavaz API Gateway")
app.mount("/api", hamnavaz_app)

@app.get("/api")
def api_root():
    return {"name": "Hamnavaz API", "status": "ok"}
