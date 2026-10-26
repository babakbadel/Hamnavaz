from datetime import datetime, timedelta, timezone
from uuid import uuid4

from fastapi.testclient import TestClient
from app.main import app
from app.database.session import SessionLocal
from app.domains.users.model import User


def account(client):
    suffix = uuid4().hex[:12]
    email = f"release-{suffix}@example.com"
    password = "Release-test-password-123!"
    registration = client.post("/api/auth/register", json={"username": f"release_{suffix}", "email": email, "password": password})
    assert registration.status_code == 200, registration.text
    login = client.post("/api/auth/login", json={"email": email, "password": password})
    assert login.status_code == 200, login.text
    headers = {"Authorization": f"Bearer {login.json()['access_token']}"}
    profile = client.post("/api/musician/profile", params={"display_name": suffix, "city": "Isfahan"}, headers=headers)
    assert profile.status_code == 200, profile.text
    return registration.json()["id"], headers, profile.json()


def test_two_user_release_flow_and_ownership():
    with TestClient(app) as client:
        user_a, auth_a, profile_a = account(client)
        user_b, auth_b, profile_b = account(client)
        _, auth_c, _ = account(client)
        updated = client.patch("/api/musician/profile", json={"display_name": "Release Musician", "city": "Isfahan", "bio": "Guitar"}, headers=auth_a)
        assert updated.status_code == 200
        assert updated.json()["id"] == profile_a["id"]
        assert client.get("/api/musician/me", headers=auth_a).json()["display_name"] == "Release Musician"
        assert client.get("/api/musician/me", headers=auth_b).json()["id"] == profile_b["id"]
        assert client.post("/api/musician/profile", params={"display_name": "duplicate"}, headers=auth_a).status_code == 409
        assert client.patch("/api/musician/profile", json={"display_name": "  "}, headers=auth_a).status_code == 422
        assert client.patch("/api/musician/profile", json={"display_name": "hijack", "user_id": user_b}, headers=auth_a).status_code == 422
        results = client.get("/api/search/musicians", params={"q": "Release Musician", "online": "true"}).json()["results"]
        assert any(item["user_id"] == user_a and item["is_online"] for item in results)
        detail = client.get(f"/api/musician/{user_b}")
        assert detail.status_code == 200
        matches = client.get("/api/match/me", headers=auth_a)
        assert matches.status_code == 200
        assert any(item["user_id"] == user_b for item in matches.json())
        collaboration = client.post("/api/collaboration-request/", json={"profile_id": profile_b["id"], "message": "Let's play"}, headers=auth_a)
        assert collaboration.status_code == 200, collaboration.text
        request_id = collaboration.json()["id"]
        assert client.put(f"/api/collaboration-request/{request_id}/accept", headers=auth_c).status_code == 404
        assert any(item["id"] == request_id for item in client.get("/api/collaboration-request/inbox", headers=auth_b).json())
        assert client.put(f"/api/collaboration-request/{request_id}/accept", headers=auth_b).json()["status"] == "accepted"
        assert client.put(f"/api/collaboration-request/{request_id}/reject", headers=auth_b).status_code == 409
        message = client.post("/api/messages/", json={"receiver_profile_id": profile_b["id"], "text": "Rehearsal tomorrow"}, headers=auth_a)
        assert message.status_code == 200, message.text
        assert any(item["id"] == message.json()["id"] for item in client.get("/api/messages/", headers=auth_b).json())
        assert client.get("/api/messages/", headers=auth_c).json() == []
        notices = client.get("/api/notifications/", headers=auth_b).json()
        assert len(notices) >= 2
        assert client.put(f"/api/notifications/{notices[0]['id']}/read", headers=auth_b).status_code == 200
        assert any(item["id"] == notices[0]["id"] and item["is_read"] for item in client.get("/api/notifications/", headers=auth_b).json())
        favorite = client.post("/api/favorites/", json={"profile_id": profile_b["id"]}, headers=auth_a)
        assert favorite.status_code == 200, favorite.text
        assert client.delete(f"/api/favorites/{profile_b['id']}", headers=auth_a).status_code == 200
        assert client.post("/api/ratings/", json={"profile_id": profile_b["id"], "score": 4}, headers=auth_a).status_code == 200
        assert client.get(f"/api/ratings/profile/{profile_b['id']}").json()[0]["score"] == 4
        assert client.get("/api/messages/").status_code == 401
        assert client.get("/api/match/me", headers={"Authorization": "Bearer invalid"}).status_code == 401


def test_presence_expires_without_naive_datetime_error():
    with TestClient(app) as client:
        user_id, _, profile = account(client)
        with SessionLocal() as db:
            user = db.get(User, user_id)
            user.last_seen_at = datetime.now(timezone.utc) - timedelta(minutes=10)
            db.commit()
        results = client.get("/api/search/musicians", params={"q": profile["display_name"]}).json()["results"]
        assert len(results) == 1 and results[0]["is_online"] is False
        online = client.get("/api/search/musicians", params={"q": profile["display_name"], "online": "true"}).json()
        assert online["results"] == []


def test_unknown_instrument_does_not_return_unfiltered_people():
    with TestClient(app) as client:
        account(client)
        response = client.get("/api/search/musicians", params={"instrument": "missing-" + uuid4().hex})
        assert response.status_code == 200
        assert response.json()["results"] == []
        assert client.get("/api/search/musicians", params={"instrument_id": "invalid"}).status_code == 422
