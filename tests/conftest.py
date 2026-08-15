import pytest

from app.database.session import create_tables


@pytest.fixture(scope="session", autouse=True)
def initialize_test_database():
    """Ensure the SQLite schema exists before API tests run in CI."""
    create_tables()
    yield
