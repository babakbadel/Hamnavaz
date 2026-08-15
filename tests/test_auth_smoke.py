from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


def test_register_and_login_smoke():
    email = f"ci-{uuid4().hex}@example.com"
    username = f"ci_{uuid4().hex[:12]}"
    password = "Hamnavaz-CI-Password-123!"

    with TestClient(app) as client:
        register = client.post(
            "/auth/register",
            json={
                "username": username,
                "email": email,
                "password": password,
            },
        )

        assert register.status_code == 200
        payload = register.json()
        assert payload["username"] == username
        assert payload["email"] == email
        assert payload["id"] is not None

        login = client.post(
            "/auth/login",
            json={
                "email": email,
                "password": password,
            },
        )

        assert login.status_code == 200
        token = login.json()
        assert token["token_type"] == "bearer"
        assert token["access_token"]


def test_login_rejects_invalid_credentials():
    with TestClient(app) as client:
        response = client.post(
            "/auth/login",
            json={
                "email": "missing-user@example.com",
                "password": "wrong-password",
            },
        )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
