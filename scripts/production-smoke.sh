#!/usr/bin/env bash
set -euo pipefail

# Frontend and API are intentionally treated as separate production surfaces.
# Override HAMNAVAZ_API_URL when the FastAPI backend is deployed on another host.
BASE_URL="${HAMNAVAZ_BASE_URL:-https://hamnavaz.vercel.app}"
API_URL="${HAMNAVAZ_API_URL:-${BASE_URL}/api}"
BASE_URL="${BASE_URL%/}"
API_URL="${API_URL%/}"

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

check() {
  local url="$1"
  local label="${2:-$url}"
  local expected="${3:-200}"
  local code

  code="$(curl -L -sS -o "$TMP" -w '%{http_code}' --max-time 20 "$url")"
  echo "${label} -> ${code}"

  if [[ "$code" != "$expected" ]]; then
    echo "Unexpected HTTP status for ${label}. URL: ${url}"
    echo "Response:"
    head -c 2000 "$TMP" || true
    exit 1
  fi
}

assert_json() {
  local kind="$1"
  python3 - "$TMP" "$kind" "${HAMNAVAZ_EXPECTED_SHA:-}" <<'JSON_CHECK'
import json, sys
with open(sys.argv[1]) as response:
    data = json.load(response)
kind, expected_sha = sys.argv[2:]
if kind == "health":
    assert data.get("status") == "ok", "API health is not healthy JSON"
elif kind == "openapi":
    assert "/search/musicians" in data.get("paths", {}), "Wrong OpenAPI application"
elif kind == "search":
    assert {"total", "page", "limit", "pages", "results"}.issubset(data), "Wrong search envelope"
    assert isinstance(data["results"], list), "Wrong search results"
elif kind == "version":
    assert expected_sha and data.get("commit_sha") == expected_sha, "Production backend is not the expected commit"
JSON_CHECK
}

check_header() {
  local url="$1"
  local label="$2"
  local header="$3"
  local expected="$4"
  local value

  value="$(curl -L -sSI --max-time 20 "$url" | awk -F': ' -v h="$header" 'tolower($1)==tolower(h){print $2}' | tr -d '\r' | tail -1)"
  echo "${label} ${header} -> ${value:-<missing>}"

  if [[ "$value" != "$expected" ]]; then
    echo "Unexpected ${header} for ${label}: expected '${expected}'"
    exit 1
  fi
}

# -----------------------------------------------------------------------------
# Frontend production surface
# -----------------------------------------------------------------------------
check "${BASE_URL}/" "/" 200
check "${BASE_URL}/musicians" "/musicians" 200
check "${BASE_URL}/activity" "/activity" 200

check_header "${BASE_URL}/" "/" "x-content-type-options" "nosniff"
check_header "${BASE_URL}/" "/" "x-frame-options" "DENY"
check_header "${BASE_URL}/" "/" "referrer-policy" "strict-origin-when-cross-origin"

# -----------------------------------------------------------------------------
# FastAPI production surface
# -----------------------------------------------------------------------------
# These checks deliberately hit the API origin directly rather than treating
# a frontend 404 page as an API response. If API and frontend share a domain,
# API_URL defaults to https://<frontend>/api.
check "${API_URL}/health" "API /health" 200
assert_json health
if [[ -n "${HAMNAVAZ_EXPECTED_SHA:-}" ]]; then
  check "${API_URL}/system/version" "API /system/version" 200
  assert_json version
fi
check "${API_URL}/docs" "API /docs" 200
check "${API_URL}/openapi.json" "API /openapi.json" 200
assert_json openapi

# Verify a real public domain endpoint, not only framework documentation.
check "${API_URL}/search/musicians" "API /search/musicians" 200
assert_json search

# Protected API boundaries must reject unauthenticated access.
check "${API_URL}/match/me" "API /match/me" 401
check "${API_URL}/messages/" "API /messages/" 401
check "${API_URL}/notifications/" "API /notifications/" 401

echo "Hamnavaz production smoke checks passed"
echo "Frontend: ${BASE_URL}"
echo "API:      ${API_URL}"
