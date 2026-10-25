import secrets
import pytest
from pydantic import ValidationError
from fastapi.testclient import TestClient
from app.core.config import Settings
from app.main import app


def test_production_rejects_default_jwt(monkeypatch):
    monkeypatch.delenv("VERCEL_ENV", raising=False)
    with pytest.raises(ValidationError, match="JWT_SECRET_KEY"):
        Settings(_env_file=None, ENVIRONMENT="production")


def test_production_rejects_localhost_cors(monkeypatch):
    monkeypatch.delenv("VERCEL_ENV", raising=False)
    with pytest.raises(ValidationError, match="CORS_ORIGINS"):
        Settings(_env_file=None, ENVIRONMENT="production", JWT_SECRET_KEY=secrets.token_urlsafe(48))


def test_valid_production_settings(monkeypatch):
    monkeypatch.delenv("VERCEL_ENV", raising=False)
    settings = Settings(_env_file=None, ENVIRONMENT="production", JWT_SECRET_KEY=secrets.token_urlsafe(48), CORS_ORIGINS="https://hamnavaz.vercel.app")
    assert settings.cors_origin_list == ["https://hamnavaz.vercel.app"]


def test_cors_rejects_unknown_origin():
    with TestClient(app) as client:
        response = client.options("/api/health", headers={"Origin": "https://untrusted.example", "Access-Control-Request-Method": "GET"})
        assert response.status_code == 400
        assert "access-control-allow-origin" not in response.headers
