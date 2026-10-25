"""Run a disposable, migrated API for browser tests; never use an external DB."""
import os
from pathlib import Path
import sys
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
os.chdir(ROOT)

with TemporaryDirectory(prefix="hamnavaz-e2e-") as directory:
    os.environ["DATABASE_URL"] = f"sqlite:///{Path(directory) / 'e2e.db'}"
    os.environ["ENVIRONMENT"] = "development"
    from alembic import command
    from alembic.config import Config
    import uvicorn
    command.upgrade(Config("alembic.ini"), "head")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8100, log_level="warning")
