import pytest
from fastapi.testclient import TestClient

from app.main import api_app


@pytest.fixture
def client():
    with TestClient(api_app) as test_client:
        yield test_client


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["name"] == "Hamnavaz API"


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200


def test_instruments(client):
    response = client.get("/instrument/")
    assert response.status_code == 200
