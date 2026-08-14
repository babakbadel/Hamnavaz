from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

FAILED = 0

def ok(x):
    print("PASS:", x)

def fail(x):
    global FAILED
    FAILED += 1
    print("FAIL:", x)

EXPECTED_ROUTES = {
    "/": {"GET"},
    "/health": {"GET"},
    "/auth/google/callback": {"GET"},
    "/auth/login": {"POST"},
    "/auth/register": {"POST"},
    "/band/": {"GET"},
    "/band/{item_id}": {"GET"},
    "/collaboration-request/": {"POST"},
    "/collaboration-request/inbox": {"GET"},
    "/collaboration-request/{request_id}/accept": {"PUT"},
    "/collaboration-request/{request_id}/reject": {"PUT"},
    "/favorites/": {"GET", "POST"},
    "/guitar/": {"GET"},
    "/guitar/{item_id}": {"GET"},
    "/instrument/": {"GET", "POST"},
    "/match/me": {"GET"},
    "/match/{user_id}": {"GET"},
    "/messages/": {"GET", "POST"},
}

EXPECTED_ROUTES.update({
    "/musician-instrument/": {"POST"},
    "/musician-instrument/me": {"GET"},
    "/musician-instrument/{instrument_id}": {"DELETE"},
    "/musician-instrument/{user_id}": {"GET"},
    "/musician/": {"GET"},
    "/musician/me": {"GET"},
    "/musician/profile": {"POST"},
    "/musician/{user_id}": {"GET"},
    "/notifications/": {"GET", "POST"},
    "/notifications/{notification_id}/read": {"PUT"},
    "/producer/": {"GET"},
    "/producer/{item_id}": {"GET"},
    "/ratings/": {"POST"},
    "/search/instruments": {"GET"},
    "/search/musicians": {"GET"},
    "/system/health": {"GET"},
    "/system/version": {"GET"},
})

try:
    import app.main as main
    import app.api.router as router
    ok("app imports")
except Exception as e:
    fail(str(e))
    raise SystemExit(1)

schema = main.app.openapi()
paths = schema.get("paths", {})

print("OPENAPI PATHS:", len(paths))

missing = set(EXPECTED_ROUTES) - set(paths)

if missing:
    fail(f"missing routes: {sorted(missing)}")
else:
    ok("all expected routes exist")

print("=" * 70)
print("HTTP METHOD CHECK")
print("=" * 70)

for path, methods in EXPECTED_ROUTES.items():
    actual = {m.upper() for m in paths.get(path, {})}
    if actual != methods:
        fail(f"{path}: expected {methods}, got {actual}")

if FAILED == 0:
    ok("all HTTP methods are correct")

print("=" * 70)
print("UNEXPECTED ROUTES CHECK")
print("=" * 70)

extra = set(paths) - set(EXPECTED_ROUTES)

if extra:
    fail(f"unexpected routes: {sorted(extra)}")
else:
    ok("no unexpected routes")

print("=" * 70)
print("ROUTER REGISTRY CHECK")
print("=" * 70)

router_names = [
    "auth_router",
    "google_router",
    "guitar_router",
    "musician_router",
    "instrument_router",
    "band_router",
    "musician_instrument_router",
    "producer_router",
    "search_router",
    "match_router",
    "collaboration_request_router",
    "message_router",
    "favorites_router",
    "ratings_router",
    "notifications_router",
    "system_router",
]

for name in router_names:
    if not hasattr(router, name):
        fail(f"missing router: {name}")
    else:
        ok(f"{name} exists")

print("=" * 70)
print("ROUTER + OPENAPI + DUPLICATE CHECK")
print("=" * 70)

for name in router_names:
    obj = getattr(router, name, None)
    if obj is None:
        fail(f"missing router: {name}")

active = set()

for name in router_names:
    obj = getattr(router, name, None)
    if obj is None:
        continue

print("=" * 70)
print("ROUTER REGISTRY CHECK")
print("=" * 70)

for name in router_names:
    obj = getattr(router, name, None)
    if obj is None:
        fail(f"missing router: {name}")
    else:
        ok(f"{name} exists")

print("=" * 70)
print("ROUTER DUPLICATE CHECK")
print("=" * 70)

seen = set()
duplicate = False

for name in router_names:
    obj = getattr(router, name, None)
    if obj is None:
        continue

    for r in getattr(obj, "routes", []):
        path = getattr(r, "path", None)
        for method in getattr(r, "methods", set()):
            key = (path, method.upper())

            if key in seen:
                fail(f"duplicate: {method.upper()} {path}")
                duplicate = True

            seen.add(key)

if not duplicate:
    ok("no duplicate API operations")

print("=" * 70)
print("FINAL")
print("=" * 70)

if FAILED:
    print("FAILED TESTS:", FAILED)
else:
    print("STATUS: PASS")

print("=" * 70)
print("LEGACY CLEANUP CHECK")
print("=" * 70)

from pathlib import Path

legacy_files = [
    "app/services/match.py",
    "app/services/match_service.py",
]

for f in legacy_files:
    if Path(f).exists():
        fail(f"legacy match service exists: {f}")
    else:
        ok(f"legacy service absent: {f}")

legacy_models = [
    "app/models/musician.py",
    "app/models/instrument.py",
    "app/models/musician_instrument.py",
]

for f in legacy_models:
    if Path(f).exists():
        fail(f"legacy model exists: {f}")
    else:
        ok(f"legacy model absent: {f}")

print("=" * 70)
print("LEGACY IMPORT CHECK")
print("=" * 70)

bad = []

for p in Path("app").rglob("*.py"):
    text = p.read_text(errors="ignore")

    if "app/models/" in str(p):
        continue

    if "from app.models.musician" in text:
        bad.append(str(p))

    if "from app.models.instrument" in text:
        bad.append(str(p))

    if "from app.models.musician_instrument" in text:
        bad.append(str(p))

if bad:
    for item in sorted(set(bad)):
        fail(f"legacy import: {item}")
else:
    ok("no active legacy imports")

print("=" * 70)
print("LEGACY CHECK DONE")
print("=" * 70)
