from app.core.config import settings


DATABASE_URL = settings.DATABASE_URL


def is_sqlite():
    return DATABASE_URL.startswith("sqlite")


def is_postgres():
    return DATABASE_URL.startswith("postgres")
