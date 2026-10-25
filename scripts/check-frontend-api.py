"""Prevent production pages from bypassing the canonical API client."""
from pathlib import Path
import re

frontend = Path(__file__).resolve().parents[1] / "frontend"
violations = []
for directory in (frontend / "app", frontend / "lib"):
    for file in directory.rglob("*"):
        if file.suffix not in {".ts", ".tsx"}:
            continue
        text = file.read_text()
        if "localhost" in text or "127.0.0.1" in text:
            violations.append(f"{file.relative_to(frontend)}: hardcoded local API")
        if file != frontend / "lib/api.ts" and re.search(r"\bfetch\s*\(", text):
            violations.append(f"{file.relative_to(frontend)}: bypasses lib/api.ts")
if violations:
    raise SystemExit("\n".join(violations))
print("Frontend API boundary PASS")
