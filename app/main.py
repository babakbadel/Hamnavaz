from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.database.session import create_tables
from app.api.router import register_routers


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Hamnavaz",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


register_routers(app)


@app.get("/")
def root():
    return RedirectResponse(url="https://babakbadel.github.io/Hamnavaz/", status_code=307)


@app.get("/health")
def health():
    return {
        "status": "ok"
    }
