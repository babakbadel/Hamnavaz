from sqlalchemy.engine import URL, make_url
from sqlalchemy.exc import ArgumentError

from app.core.config import settings


def database_url(value: str) -> URL:
    """Use Psycopg 3 with Neon's standard URLs; never include credentials in errors."""
    try:
        url = make_url(value)
    except ArgumentError:
        raise ValueError("Invalid database URL; configure DATABASE_URL in the environment") from None
    if url.drivername in {"postgres", "postgresql"}:
        url = url.set(drivername="postgresql+psycopg")
    return url


def migration_url(application_url: str, unpooled_url: str | None) -> URL:
    url = database_url(application_url)
    if url.get_backend_name() == "postgresql":
        if unpooled_url:
            url = database_url(unpooled_url)
            if url.get_backend_name() != "postgresql":
                raise ValueError("DATABASE_URL_UNPOOLED must use PostgreSQL")
        if "-pooler" in (url.host or ""):
            raise ValueError("Migrations require DATABASE_URL_UNPOOLED with a direct Neon hostname")
    return url


DATABASE_URL = database_url(settings.DATABASE_URL)


def is_sqlite():
    return DATABASE_URL.get_backend_name() == "sqlite"


def is_postgres():
    return DATABASE_URL.get_backend_name() == "postgresql"
