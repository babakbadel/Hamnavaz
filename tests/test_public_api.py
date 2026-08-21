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
