from logging.config import fileConfig

from sqlalchemy import create_engine
from sqlalchemy import pool

from alembic import context

from app.core.config import settings
from app.core.database_config import migration_url
from app.database.base import Base

# IMPORTANT:
# Import the central model registry.
# This registers every SQLAlchemy model in Base.metadata.
import app.database.models  # noqa: F401


config = context.config


if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Keep URL objects out of ConfigParser: percent-encoded passwords must stay intact.
url = migration_url(settings.DATABASE_URL, settings.DATABASE_URL_UNPOOLED)


target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """
    Run migrations in offline mode.
    """

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named",
        },
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """
    Run migrations against the live database.
    """

    connectable = create_engine(url, poolclass=pool.NullPool)

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
