from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database_config import (
    DATABASE_URL,
    is_postgres,
    is_sqlite,
)


connect_args: dict = {}

engine_args: dict = {
    "pool_pre_ping": True,
}


if is_sqlite():
    connect_args = {
        "check_same_thread": False,
    }


if is_postgres():
    engine_args.update(
        {
            "pool_size": 5,
            "max_overflow": 10,
        }
    )


engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    **engine_args,
)


SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)


def get_db():
    """
    FastAPI database dependency.
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def create_tables():
    """
    Compatibility helper.

    Schema creation should normally be handled by Alembic.
    This function only imports the model registry so metadata is
    completely registered.
    """
    from app.database import models  # noqa: F401
    from app.database.base import Base

    Base.metadata.create_all(bind=engine)
