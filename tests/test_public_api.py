from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_public_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["name"] == "Hamnavaz"


def test_public_api_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_public_api_docs():
    response = client.get("/api/docs")
    assert response.status_code == 200
    assert "Swagger UI" in response.text


def test_public_api_openapi():
    response = client.get("/api/openapi.json")
    assert response.status_code == 200
    payload = response.json()
    assert payload["info"]["title"] == "Hamnavaz API"


def test_cors_allows_production_frontend():
    response = client.options(
        "/api/health",
        headers={
            "Origin": "https://hamnavaz.vercel.app",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "https://hamnavaz.vercel.app"


def test_protected_endpoints_require_authentication():
    assert client.get("/api/match/me").status_code in {401, 403}
    assert client.get("/api/messages/").status_code in {401, 403}
    assert client.get("/api/notifications/").status_code in {401, 403}


def test_musician_search_supports_presence_filter():
    response = client.get("/api/search/musicians?online=true")
    assert response.status_code == 200
    payload = response.json()
    assert {"total", "page", "limit", "pages", "results"}.issubset(payload)
    assert all("is_online" in item for item in payload["results"])
