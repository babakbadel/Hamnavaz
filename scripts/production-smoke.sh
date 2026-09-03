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
check "${API_URL}/docs" "API /docs" 200
check "${API_URL}/openapi.json" "API /openapi.json" 200

# Verify a real public domain endpoint, not only framework documentation.
check "${API_URL}/search/musicians" "API /search/musicians" 200

# Protected API boundaries must reject unauthenticated access.
check "${API_URL}/match/me" "API /match/me" 401
check "${API_URL}/messages/" "API /messages/" 401
check "${API_URL}/notifications/" "API /notifications/" 401

echo "Hamnavaz production smoke checks passed"
echo "Frontend: ${BASE_URL}"
echo "API:      ${API_URL}"
