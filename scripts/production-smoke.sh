#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${HAMNAVAZ_BASE_URL:-https://hamnavaz.vercel.app}"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

check() {
  local path="$1"
  local expected="${2:-200}"
  local code
  code="$(curl -L -sS -o "$TMP" -w '%{http_code}' --max-time 20 "${BASE_URL}${path}")"
  echo "${path} -> ${code}"
  if [[ "$code" != "$expected" ]]; then
    echo "Unexpected HTTP status for ${path}. Response:"
    head -c 2000 "$TMP" || true
    exit 1
  fi
}

check_header() {
  local path="$1"
  local header="$2"
  local expected="$3"
  local value
  value="$(curl -L -sSI --max-time 20 "${BASE_URL}${path}" | awk -F': ' -v h="${header}" 'tolower($1)==tolower(h){print $2}' | tr -d '\r' | tail -1)"
  echo "${path} ${header} -> ${value:-<missing>}"
  if [[ "$value" != "$expected" ]]; then
    echo "Unexpected ${header} for ${path}: expected '${expected}'"
    exit 1
  fi
}

check "/" 200
check "/musicians" 200
check "/activity" 200
check "/api/health" 200
check "/api/docs" 200
check_header "/" "x-content-type-options" "nosniff"
check_header "/" "x-frame-options" "DENY"
check_header "/" "referrer-policy" "strict-origin-when-cross-origin"

# Protected API boundaries must reject unauthenticated access.
check "/api/match/me" 401
check "/api/messages/" 401
check "/api/notifications/" 401

echo "Hamnavaz production smoke checks passed: ${BASE_URL}"
