import pytest
from app.core.database_config import database_url, migration_url


@pytest.mark.parametrize("scheme", ["postgres", "postgresql", "postgresql+psycopg"])
def test_neon_url_uses_sync_psycopg_and_preserves_encoded_password(scheme):
    url = database_url(f"{scheme}://owner:p%40ss%25word@ep-demo-pooler.example/db?sslmode=require&channel_binding=require")
    assert url.drivername == "postgresql+psycopg"
    assert url.password == "p@ss%word"
    assert url.query["sslmode"] == "require"
    assert url.query["channel_binding"] == "require"


def test_migration_selects_direct_url():
    url = migration_url("postgresql://owner:example@ep-demo-pooler.example/db", "postgresql://owner:example@ep-demo.example/db")
    assert url.host == "ep-demo.example"
    assert url.drivername == "postgresql+psycopg"


def test_migration_rejects_pooler_without_direct_url():
    with pytest.raises(ValueError, match="DATABASE_URL_UNPOOLED"):
        migration_url("postgresql://owner:example@ep-demo-pooler.example/db", None)


def test_invalid_url_error_does_not_echo_input():
    value = "private-credential-invalid-url"
    with pytest.raises(ValueError) as error:
        database_url(value)
    assert value not in str(error.value)


def test_sqlite_test_database_is_not_replaced_by_postgres_unpooled_env():
    assert migration_url("sqlite:///test.db", "postgresql://owner:example@ep-demo.example/db").get_backend_name() == "sqlite"
