from app.main import api_app


EXPECTED_OPERATIONS = {
    ("/auth/register", "post"), ("/auth/login", "post"),
    ("/musician/profile", "post"), ("/musician/profile", "patch"),
    ("/musician/me", "get"), ("/search/musicians", "get"),
    ("/match/me", "get"), ("/collaboration-request/", "post"),
    ("/collaboration-request/inbox", "get"),
    ("/collaboration-request/{request_id}/accept", "put"),
    ("/collaboration-request/{request_id}/reject", "put"),
    ("/messages/", "get"), ("/messages/", "post"),
    ("/notifications/", "get"), ("/notifications/{notification_id}/read", "put"),
    ("/favorites/", "get"), ("/favorites/", "post"),
    ("/ratings/", "post"), ("/ratings/profile/{profile_id}", "get"),
}


def test_release_api_contract():
    paths = api_app.openapi()["paths"]
    operations = {(path, method) for path, methods in paths.items() for method in methods}
    assert not (EXPECTED_OPERATIONS - operations)


def test_no_duplicate_operations():
    seen = set()
    for route in api_app.routes:
        for method in getattr(route, "methods", set()):
            operation = (route.path, method)
            assert operation not in seen, f"Duplicate API operation: {operation}"
            seen.add(operation)
