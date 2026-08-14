from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_full_flow():
    # health
    r = client.get("/health")
    assert r.status_code == 200

    # instruments
    r = client.get("/instrument/")
    assert r.status_code == 200
