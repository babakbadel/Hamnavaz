import os
from pathlib import Path
import subprocess
import sys

from sqlalchemy import create_engine, inspect


def alembic(database, *args):
    environment = {**os.environ, "DATABASE_URL": f"sqlite:///{database}"}
    return subprocess.run([sys.executable, "-m", "alembic", *args], env=environment, check=True, capture_output=True, text=True)


def test_clean_database_upgrade_and_schema_parity(tmp_path):
    database = tmp_path / "migration.db"
    alembic(database, "upgrade", "head")
    alembic(database, "upgrade", "head")
    alembic(database, "check")
    engine = create_engine(f"sqlite:///{database}")
    try:
        schema = inspect(engine)
        assert "messages" in schema.get_table_names()
        assert "last_seen_at" in {column["name"] for column in schema.get_columns("users")}
        assert {key["referred_table"] for key in schema.get_foreign_keys("messages")} == {"profiles"}
    finally:
        engine.dispose()


def test_upgrade_adopts_legacy_auto_created_messages(tmp_path):
    database = tmp_path / "legacy.db"
    alembic(database, "upgrade", "add_user_last_seen_20260822")
    from app.database.base import Base
    import app.database.models  # noqa: F401
    engine = create_engine(f"sqlite:///{database}")
    try:
        Base.metadata.tables["messages"].create(engine)
        with engine.begin() as connection:
            connection.exec_driver_sql("INSERT INTO users (id,username,email,provider) VALUES (1,'legacy-a','a@example.com','local'),(2,'legacy-b','b@example.com','local')")
            connection.exec_driver_sql("INSERT INTO profiles (id,user_id,display_name) VALUES ('22222222222222222222222222222222',1,'A'),('33333333333333333333333333333333',2,'B')")
            connection.exec_driver_sql("INSERT INTO messages (id,sender_profile_id,receiver_profile_id,text) VALUES ('11111111111111111111111111111111','22222222222222222222222222222222','33333333333333333333333333333333','preserve me')")
        alembic(database, "upgrade", "head")
        alembic(database, "check")
        with engine.connect() as connection:
            assert connection.exec_driver_sql("SELECT text FROM messages").scalar() == "preserve me"
    finally:
        engine.dispose()
