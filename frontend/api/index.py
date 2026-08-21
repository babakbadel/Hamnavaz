"""Vercel Python entrypoint for Hamnavaz.

The Vercel URL prefix is /api. The application itself keeps its internal
routes without that prefix, so the app is mounted under /api here.
"""
from pathlib import Path
import sys

from fastapi import FastAPI

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.main import app as hamnavaz_app  # noqa: E402

app = FastAPI(title="Hamnavaz API Gateway")
app.mount("/api", hamnavaz_app)

@app.get("/api")
def api_root():
    return {"name": "Hamnavaz API", "status": "ok"}
