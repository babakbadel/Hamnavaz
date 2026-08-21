"""Production FastAPI entrypoint for Vercel.

Vercel exposes this file as /api. The framework strips the /api function
prefix before handing the request to FastAPI, so the application keeps its
normal internal routes such as /health, /auth/login, and /search/musicians.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.main import app  # noqa: E402,F401
