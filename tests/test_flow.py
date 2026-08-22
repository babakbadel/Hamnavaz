import pytest
from fastapi.testclient import TestClient

from app.main import api_app


@pytest.fixture
def client():
    with TestClient(api_app) as test_client:
        yield test_client


def test_full_flow(client):
    # health
    r = client.get("/health")
    assert r.status_code == 200

    # instruments
    r = client.get("/instrument/")
    assert r.status_code == 200
