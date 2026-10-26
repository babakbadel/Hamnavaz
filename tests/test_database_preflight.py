import os
from pathlib import Path
import subprocess
import sys


def preflight(runtime, direct):
    env = {**os.environ, "DATABASE_URL": runtime, "DATABASE_URL_UNPOOLED": direct,
           "ENVIRONMENT": "development", "VERCEL_ENV": "preview"}
    return subprocess.run([sys.executable, str(Path(__file__).resolve().parents[1] / "scripts/database-preflight.py")],
                          env=env, capture_output=True, text=True)


def test_preflight_validates_without_connecting():
    result = preflight("postgresql://test:example@ep-test-pooler.example/db?sslmode=require",
                       "postgresql://test:example@ep-test.example/db?sslmode=require")
    assert result.returncode == 0, result.stderr


def test_preflight_rejects_wrong_migration_target_without_leaking_url():
    runtime = "postgresql://test:private-value@ep-test-pooler.example/db?sslmode=require"
    result = preflight(runtime, "postgresql://test:private-value@ep-other.example/db?sslmode=require")
    assert result.returncode != 0
    assert "private-value" not in result.stdout + result.stderr
    assert "ep-test" not in result.stdout + result.stderr


def test_preflight_rejects_malformed_url_without_leaking_input():
    result = preflight("private-invalid-url", "")
    assert result.returncode != 0
    assert "private-invalid-url" not in result.stdout + result.stderr
