from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


def _register_and_login(client: TestClient) -> dict:
    email = f"ci-{uuid4().hex}@example.com"
    username = f"ci_{uuid4().hex[:12]}"
    password = "Hamnavaz-CI-Password-123!"

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

    return token


def test_register_and_login_smoke():
    with TestClient(app) as client:
        _register_and_login(client)


def test_authenticated_profile_flow():
    with TestClient(app) as client:
        token = _register_and_login(client)
        headers = {"Authorization": f"Bearer {token['access_token']}"}

        create_profile = client.post(
            "/musician/profile",
            params={
                "display_name": "CI Musician",
                "city": "Tehran",
                "bio": "Authentication smoke test",
            },
            headers=headers,
        )

        assert create_profile.status_code == 200
        profile = create_profile.json()
        assert profile["display_name"] == "CI Musician"

        current = client.get("/musician/me", headers=headers)
        assert current.status_code == 200
        assert current.json()["profile"]["display_name"] == "CI Musician"


def test_protected_profile_requires_authentication():
    with TestClient(app) as client:
        response = client.get("/musician/me")

    assert response.status_code == 401


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
