from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import create_tables
from app.api.router import register_routers


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


# Canonical API application. Vercel's /api/index.py exposes this function at
# /api/*, so the public API is mounted under /api to match that platform route.
api_app = FastAPI(
    title="Hamnavaz API",
    version="1.0.0",
    lifespan=lifespan,
)

register_routers(api_app)


@api_app.get("/")
def api_root():
    return {
        "name": "Hamnavaz API",
        "version": "1.0.0",
        "status": "ok",
    }


@api_app.get("/health")
def health():
    return {"status": "ok"}


# Public ASGI entrypoint used by Vercel. Mounting keeps the existing domain
# routes (/health, /auth, /search, ...) intact inside the API service while
# exposing them publicly as /api/health, /api/auth, /api/search, ... .
app = FastAPI(
    title="Hamnavaz",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api", api_app)


@app.get("/")
def root():
    return {
        "name": "Hamnavaz",
        "version": "1.0.0",
        "status": "ok",
        "api": "/api",
    }
