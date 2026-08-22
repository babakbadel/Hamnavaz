from fastapi.testclient import TestClient

from app.main import api_app


def test_root():
    response = TestClient(api_app).get("/")
    assert response.status_code == 200
    assert response.json()["name"] == "Hamnavaz API"


def test_health():
    response = TestClient(api_app).get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
