"""Validate PostgreSQL configuration; optionally make read-only connection probes.

Run with the candidate's private environment, never with credentials as arguments.
This script does not create tables, migrate, print URLs, or print driver exceptions.
"""
import argparse
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--connect", action="store_true", help="Probe both URLs with SELECT 1")
    args = parser.parse_args()
    stage = "configuration"
    try:
        from app.core.config import settings
        from app.core.database_config import database_url, migration_url
        from sqlalchemy import create_engine, text
        from sqlalchemy.pool import NullPool

        runtime = database_url(settings.DATABASE_URL)
        direct = migration_url(settings.DATABASE_URL, settings.DATABASE_URL_UNPOOLED)
        for url in (runtime, direct):
            if url.drivername != "postgresql+psycopg":
                raise ValueError("Expected synchronous Psycopg 3")
            if not all((url.host, url.database, url.username, url.password)):
                raise ValueError("Incomplete PostgreSQL URL")
            if url.query.get("sslmode") not in {"require", "verify-ca", "verify-full"}:
                raise ValueError("SSL is required")
        if (runtime.host.replace("-pooler", ""), runtime.database) != (direct.host, direct.database):
            raise ValueError("Runtime and migration URLs must target the same endpoint and database")
        print("PASS: PostgreSQL URL structure, Psycopg 3, TLS and matching migration target")
        if args.connect:
            for label, url in (("runtime", runtime), ("migration", direct)):
                stage = f"{label} connection"
                engine = create_engine(url, poolclass=NullPool, connect_args={"connect_timeout": 10})
                try:
                    with engine.connect() as connection:
                        if connection.execute(text("SELECT 1")).scalar_one() != 1:
                            raise RuntimeError("Connection probe failed")
                finally:
                    engine.dispose()
                print(f"PASS: {label} read-only connection probe")
        return 0
    except Exception:
        print(f"FAIL: {stage}; check private settings and provider access. Details suppressed to protect credentials.", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
