# Canonical Hamnavaz deployment

The source of truth is the repository-root `vercel.json`. The Vercel Services model is currently Beta. This remains one modular monolith with a separately built Next.js frontend and FastAPI runtime; it is not a move to microservices.

## Required project settings

- Team: `babakbadels-projects` (`team_IW3caBgRA2MrLB7I7YTnAtXv`).
- Project: `hamnavaz` (`prj_H9Kzj7LUijasXKubklJgYeudAKR8`).
- Root Directory: repository root (clear `frontend` if currently configured).
- Use Services framework detection/preset for the root configuration, not a frontend-only Next.js build.
- Node 22; Python 3.12. Clear project-wide build/install/output overrides; `frontend` owns `npm ci` and its Next.js build.
- Public frontend: `frontend/`; backend: repository root, entrypoint `app.main:app`.
- `/api/*` routes to the backend, all remaining routes to the frontend. The backend public app mounts its domain API at `/api`.
- Do not deploy from `frontend/`, `frontend-next/`, `api/`, or legacy `backend/`. Legacy Vercel Python function adapters have been removed.

## Required runtime configuration

Configure values directly in Vercel; never commit or paste credentials into issues.

- `ENVIRONMENT=production` for production.
- `JWT_SECRET_KEY`: a securely generated secret with at least 32 characters; placeholders fail startup.
- `CORS_ORIGINS=https://hamnavaz.vercel.app` (explicit origins; no development origins in production).
- `NEXT_PUBLIC_API_URL=/api` (or unset both public API URL variables to use `/api`). Remove obsolete localhost/standalone backend overrides.
- `DATABASE_URL`: an approved persistent database. A local SQLite file in a Vercel function is not a durable production database. Selecting/provisioning a new provider remains outside this patch; the prior project decision deferred a provider migration.
- Google OAuth remains scaffolding. If enabled, configure its HTTPS callback and complete a separate OAuth verification.

## Release sequence

1. Require backend, frontend, and E2E checks on the exact candidate commit.
2. Confirm the persistent database, take a backup, and run `alembic upgrade head` from the candidate checkout against the intended database. Run `alembic check`. The application no longer creates tables during startup.
3. Build a preview/staged deployment from the repository root. Verify that the build contains both services, not only Next.js.
4. Check frontend pages and `/api/health`, `/api/openapi.json`, search, authenticated flows, and headers. Use the platform's supported authenticated access for protected preview URLs.
5. Promote only the tested production candidate. The after-deployment smoke workflow checks backend `commit_sha` against the deployment SHA on the public domain. Scheduled smoke independently monitors availability every six hours.
6. Record commit, CI run, deployment, migration result and smoke result in `docs/RELEASE_READINESS.md` before closing Epic #5.

A Vercel `READY` or successful GitHub deployment status alone is not release acceptance.

## Recovery

Keep the previous known-good deployment ID and database backup. Roll back the application to that deployment if needed; do not automatically downgrade a database. The new messages migration adopts an existing compatible messages table without losing rows. Its downgrade deletes that table and its messages, so a database downgrade requires a separate data-recovery plan.

## Reproduce checks locally

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/alembic upgrade head
.venv/bin/alembic check
.venv/bin/python -m pytest -q
python scripts/check-frontend-api.py
cd frontend
npm ci
npm run typecheck
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

Browser tests start a production Next.js build, a real FastAPI server backed by a temporary migrated database, and a local HTTP gateway that mirrors the public `/api/*` service split. This verifies the application boundary; it does not replace a Vercel preview check. They never use the developer/production database and do not record tokens in traces, videos or screenshots.

## Safe database preflight and protected smoke

From the reviewed candidate checkout, with private PostgreSQL variables already supplied securely:

```bash
.venv/bin/python scripts/database-preflight.py
.venv/bin/python scripts/database-preflight.py --connect
.venv/bin/alembic current
.venv/bin/alembic heads
```

Only after checking the target and backup, run `alembic upgrade head` then `alembic check`. Do not run `upgrade head --sql` for the inspecting messages revision. Production migration and promotion must wait for the disposable PostgreSQL CI job and real staging verification.

For protected previews use the authenticated Vercel CLI; protection stays enabled:

```bash
HAMNAVAZ_USE_VERCEL_AUTH=1 \
HAMNAVAZ_BASE_URL="https://<exact-deployment-hostname>" \
HAMNAVAZ_EXPECTED_SHA="<full-candidate-sha>" \
bash scripts/production-smoke.sh
```

Use separate Preview database credentials. Do not paste connection strings into chat, shell arguments, commits or logs. If Neon is not connected, connect the Neon integration or enter private URLs directly in Vercel before live checks. Passing local SQLite or disposable PostgreSQL checks does not prove Neon connectivity.
