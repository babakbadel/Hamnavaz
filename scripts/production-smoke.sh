#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${HAMNAVAZ_BASE_URL:-https://hamnavaz.vercel.app}"

check() {
  local path="$1"
  local expected="${2:-200}"
  local code
  code="$(curl -L -sS -o /tmp/hamnavaz-smoke-response -w '%{http_code}' --max-time 20 "${BASE_URL}${path}")"
  echo "${path} -> ${code}"
  if [[ "${code}" != "${expected}" ]]; then
    echo "Unexpected HTTP status for ${path}. Response:"
    head -c 2000 /tmp/hamnavaz-smoke-response || true
    exit 1
  fi
}

check "/api/health" 200
check "/api/docs" 200

echo "Hamnavaz production smoke checks passed: ${BASE_URL}"
