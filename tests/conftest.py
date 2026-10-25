import os
from pathlib import Path
from tempfile import TemporaryDirectory

import pytest
from alembic import command
from alembic.config import Config

# Never run tests against a developer/production database, even if DATABASE_URL is set.
_test_database = TemporaryDirectory(prefix="hamnavaz-tests-")
os.environ["DATABASE_URL"] = f"sqlite:///{Path(_test_database.name) / 'test.db'}"


@pytest.fixture(scope="session", autouse=True)
def initialize_test_database():
    command.upgrade(Config("alembic.ini"), "head")
    yield
    from app.database.session import engine
    engine.dispose()
    _test_database.cleanup()
