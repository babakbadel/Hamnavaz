from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import subprocess
from threading import Thread


def run_smoke(health_body, extra_env=None):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_HEAD(self):
            self.send_response(200)
            for name, value in {"X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "strict-origin-when-cross-origin"}.items():
                self.send_header(name, value)
            self.end_headers()

        def do_GET(self):
            bodies = {
                "/api/health": health_body,
                "/api/openapi.json": b'{"paths":{"/search/musicians":{}}}',
                "/api/search/musicians": b'{"total":0,"page":1,"limit":10,"pages":0,"results":[]}',
                "/api/system/version": b'{"commit_sha":"test-sha"}',
            }
            self.send_response(401 if self.path in {"/api/match/me", "/api/messages/", "/api/notifications/"} else 200)
            self.end_headers()
            self.wfile.write(bodies.get(self.path, b"page"))

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        origin = f"http://127.0.0.1:{server.server_port}"
        environment = {**os.environ, "HAMNAVAZ_BASE_URL": origin, "HAMNAVAZ_API_URL": f"{origin}/api", "HAMNAVAZ_EXPECTED_SHA": "test-sha"}
        environment.update(extra_env or {})
        return subprocess.run(["bash", str(Path(__file__).resolve().parents[1] / "scripts/production-smoke.sh")], env=environment, capture_output=True, text=True)
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


def test_smoke_rejects_html_200_masquerading_as_api():
    result = run_smoke(b"<html>Next.js fallback</html>")
    assert result.returncode != 0


def test_smoke_checks_json_contract_and_expected_commit():
    result = run_smoke(b'{"status":"ok"}')
    assert result.returncode == 0, result.stdout + result.stderr


def test_authenticated_smoke_uses_vercel_deployment_and_curl_separator(tmp_path):
    cli = tmp_path / "vercel"
    cli.write_text('''#!/usr/bin/env bash
set -euo pipefail
[[ "$1" == curl ]]
path="$2"
[[ "$3" == --deployment ]]
origin="$4"
[[ "$5" == -- ]]
shift 5
exec curl "${origin}${path}" "$@"
''')
    cli.chmod(0o700)
    result = run_smoke(b'{"status":"ok"}', {
        "HAMNAVAZ_USE_VERCEL_AUTH": "1", "PATH": f"{tmp_path}:{os.environ['PATH']}"})
    assert result.returncode == 0, result.stdout + result.stderr
