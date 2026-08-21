from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import register_routers
from app.core.config import settings
from app.database.session import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


api_app = FastAPI(
    title="Hamnavaz API",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

register_routers(api_app)


@api_app.get("/")
def api_root():
    return {"name": "Hamnavaz API", "version": settings.APP_VERSION, "status": "ok"}


@api_app.get("/health")
def health():
    return {"status": "ok"}


app = FastAPI(
    title="Hamnavaz",
    version=settings.APP_VERSION,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

app.mount("/api", api_app)


@app.get("/")
def root():
    return {"name": "Hamnavaz", "version": settings.APP_VERSION, "status": "ok", "api": "/api"}
