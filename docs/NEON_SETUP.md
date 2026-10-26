# Neon PostgreSQL wiring

Target supplied by the owner:
- Organization: `org-wandering-dream-75306046`
- Project: `wild-waterfall-21366850` (`Hamnaz`)
- Branch: `production` / `br-blue-darkness-b49hz8o7`
- Region: AWS US East 2 (Ohio); owner reports Free plan, PostgreSQL 18, one database/compute.

The frontend stays Next.js. The backend stays FastAPI + SQLAlchemy; no Neon Auth, Functions, AI Gateway, object storage or realtime is enabled by this setup. `neon.ts` retains the CLI-generated declaration with Auth disabled.

## Connection variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string, copied as URL only; application traffic |
| `DATABASE_URL_UNPOOLED` | Direct connection string with pooling disabled; Alembic migrations |

Set these as private server-side variables. Never use a `NEXT_PUBLIC_` prefix. Do not paste the `psql` command or surrounding shell quotes as the variable value. Preserve `sslmode`/`channel_binding` query settings. Standard `postgres://` and `postgresql://` schemes are normalized to SQLAlchemy's synchronous `postgresql+psycopg` driver. Psycopg 3 binary dependencies are pinned. NullPool avoids adding independent long-lived pools to every Vercel instance when Neon already provides PgBouncer.

Python loads `.env` then `.env.local`; process environment variables take priority. These env files and `.neon` are gitignored. Alembic uses URL objects directly so percent-encoded credentials do not pass through ConfigParser interpolation. Migrations reject a pooled Neon URL when no direct URL is provided.

## Auth and verification status

- `npm i -g neon@latest` failed with EACCES in the tool installation path.
- The requested `npx neon@latest init -y ... --services postgres` ran with CLI 8.11.4. It installed the Neon agent plugin and dependencies, wrote `neon.ts`, and linked the supplied target offline. The CLI explicitly reported that the link was unverified.
- `npx neon@latest deploy` reached browser authentication. No authenticated deploy/env pull completed in the agent environment.
- The owner subsequently confirmed the database exists in the Neon console. This is not proof of a connection from the app.
- Local URL/driver selection and migration-isolation tests are included. Real Neon network connectivity, PostgreSQL migration/schema parity and real database-backed application flows remain blocked on securely provisioning credentials into the execution/deployment environment.
- The messages-adoption migration inspects the existing database. Full `alembic upgrade head --sql` is not supported by that revision; use an online migration after checking the target and backup. An offline SQL generation attempt reached that revision and failed on MockConnection inspection. This is not a successful PostgreSQL migration test.

After credentials are available: use the direct URL to inspect the target and run the Alembic migration, verify schema parity, start the app with the pooled URL, and exercise register/profile/search/collaboration/messages/notifications against that database. A local build or SQLite test alone does not certify Neon integration.

## Local preparation verification

- `python -m pytest -q`: **38 passed**, 3 dependency deprecation warnings; tests use isolated SQLite, plus Neon URL/driver and direct-migration selection checks. This does not prove live Neon connectivity.
- Root `npm run build`, executed with Node 22: **PASS** after a clean cache and an explicit frontend Turbopack root. Output included `Compiled successfully in 2.6s`, `Finished TypeScript in 2.5s`, and all 12 static pages generated. The first attempt failed while reading an old Turbopack persistence cache after adding the root lockfile; the generated cache was moved aside and the root set explicitly.
- Python compilation, frontend API-boundary guard and diff whitespace checks passed.
- Pending: authenticated Neon deploy/env pull, real PostgreSQL migration, runtime reads/writes and deployed smoke. No database schema or user data was changed remotely.
