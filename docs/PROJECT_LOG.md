## 2026-10-26 — Deployment blocker follow-up

- Authenticated probe of preview `dpl_FMpU3GKeE1rUkASkD6gghAy6gNKW` returned 500. Fresh backend logs confirmed `ValueError: Invalid database URL; configure DATABASE_URL in the environment` during import. No credential was decrypted or printed.
- Latest prior CI `40249925151` passed backend/frontend but failed the mobile receiver-message assertion. Repeated baseline browser flows reproduced the same failure (1/10). The test now waits for the message POST and checks an article rather than any matching page text before navigating the receiver. After repair: 10/10 local desktop/mobile scenarios passed. Browser contexts now close on failure as well.
- Added a disposable PostgreSQL 18 CI job: repeated upgrade, schema parity and existing real-user flow checks. This is separate from Neon and never uses deployment credentials. Its remote result must be recorded after push.
- Added `scripts/database-preflight.py`: validates Psycopg 3, TLS and matching pooled/direct targets; `--connect` makes read-only SELECT 1 probes. It never migrates or prints credentials/driver exceptions. Three preflight regression tests pass; full local suite before the authenticated-transport regression: 41 passed.
- Added a mock authenticated-transport regression validating the documented Vercel CLI path / --deployment / -- curl-options contract.
- Smoke can use the authenticated Vercel CLI with `HAMNAVAZ_USE_VERCEL_AUTH=1`; it no longer dumps arbitrary response bodies. Authenticated CLI execution still requires the caller's Vercel login. Public curl smoke remains covered by local tests.
- PostgreSQL CI run 40316205912 exposed a redundant `cities_slug_key` constraint after successful upgrades. Added forward-only-in-use revision `pg_city_slug_20261026`: it checks that the replacement unique index exists, then removes only the redundant PostgreSQL constraint; no rows are deleted. Follow-up CI 40316479654 passed PostgreSQL repeated upgrade, schema parity and all three real PostgreSQL flow scenarios.
- Explicit CORS_ORIGINS configured in Vercel for Production and the candidate Preview branch; existing deployments are unchanged.
- No remote database migration, production promotion or merge. Neon account access / valid private connection configuration remains required. The existing Neon project is recorded in NEON_SETUP.md; a suggestion to connect Neon is not proof of authentication.
- Graph verification remains User → Profile → Discovery → Collaboration → Message → Notification. Live capacity/load behavior is not certified.

## 2026-10-26 — Neon PostgreSQL preparation

Owner confirmed project `wild-waterfall-21366850`, branch `production` (`br-blue-darkness-b49hz8o7`), Free/PostgreSQL 18, Ohio. CLI init linked offline; deploy is blocked on browser authentication. Code keeps FastAPI/SQLAlchemy with Psycopg 3, pooled app traffic and direct migrations. See `NEON_SETUP.md` for credential placement, tested scope and the existing migration's offline SQL limitation. No live schema/data changes or production promotion were performed.

# Hamnavaz — Project Log

## 2026-10-25 — Remote handoff

PR #17 code commit `c40cdda` passed GitHub frontend/backend/E2E (run 40217187133). Project settings were corrected to repository-root Services with Node 22; published production was not promoted. Canonical preview now invokes Python but fails app import due to an invalid configured DATABASE_URL. No database credential was read, no new provider was provisioned, and no production data was migrated. Resume from this environment blocker; do not redo the completed code repair or treat READY as an API health result.

## 2026-10-25 — Release gate repair

Canonical deployment: root `vercel.json` → Next.js `frontend/` + FastAPI `app.main:app`. Earlier entries below are historical and do not override `docs/DEPLOYMENT.md`.

Baseline reproduced: pytest 15 PASS / 2 FAIL; the online search failed on timezone-naive SQLite timestamps and the profile smoke expected the wrong response envelope. Migration history omitted messages; metadata creation in tests hid this gap. Production smoke run 40210653655 passed frontend pages and three headers, then failed `/api/health` with a Next.js HTML 404.

Repairs: isolated migration-backed tests; messages/city-index migration; authenticated profile update; shared browser API client; profile UUID links; real search controls; typed UUID boundaries; production secret/CORS validation; lockfile and consolidated CI/E2E; JSON/SHA-aware after-deployment smoke. Graph: User → Profile → Discovery/Presence → Match → Collaboration → Message → Notification is the verification path. Capacity: bounded API query limits are retained; load and capacity benchmarking are not claimed by this patch.

See `docs/RELEASE_READINESS.md` for final verification and remaining release blockers.


## 2026-08-21 — Continuation baseline

### Current architecture
- Backend: FastAPI + SQLAlchemy + Alembic.
- Frontend: Next.js + React + TypeScript.
- Canonical FastAPI application: `app.main:api_app` mounted publicly as `app.main:app` under `/api`.
- Canonical Vercel Python function adapter: `api/index.py`.
- Vercel frontend service root: `frontend/`.
- Production database migration to Neon/PostgreSQL is explicitly deferred.

### Product graph
User → Auth → Profile → Instruments/Skills → Discovery → Search/Match → Collaboration → Messages → Notifications.
Supporting relations: Ratings and Favorites.

### Verified routing investigation
- Production `/api/health` was returning the Next.js 404 surface (`x-matched-path: /404`) rather than a FastAPI response.
- Runtime logs for the affected deployment showed no serverless invocation for the 4xx request, confirming the request was being resolved before the Python function.
- A production deployment from commit `57f28b8262f9e6dec2d6c9a188bb1aa813d19922` reached READY with both Node and Python runtimes.
- The latest routing configuration now uses the canonical root `api/index.py` function for `/api/(.*)` and the Next.js service for all remaining paths.
- This configuration follows the current Vercel monorepo/FastAPI pattern rather than relying on a second FastAPI service entrypoint.

### Routing implementation
- `app.main` keeps existing domain routers in a child FastAPI app (`api_app`).
- The public ASGI app mounts the child at `/api`, preserving internal routes while exposing `/api/health`, `/api/auth/...`, `/api/search/...`, etc.
- `api/index.py` exports the canonical FastAPI app directly.
- `vercel.json` routes `/api/(.*)` to `/api/index.py` and the remaining traffic to the Next.js frontend service.
- Added public API tests for `/`, `/api/health`, `/api/docs`, and `/api/openapi.json`.

### Required production smoke tests
- `GET /api/health` → 200
- `GET /api/docs` → 200
- `GET /api/search/musicians` → valid API response

### UI direction
Premium Dark RTL music platform. Neon purple animated/glowing borders are required around relevant cards, especially Online musicians and Instruments. Glow should be strong and animated/blinking rather than static.

### Graphy / Headroom
Treat Graphy-style graph thinking and Headroom-style development/logging discipline as project-wide process requirements. Keep decisions, blockers, fixes, commits and verification results traceable. This repository log is the canonical lightweight record.

### Engineering hardening pass
- Pinned frontend dependencies instead of `latest` to make builds reproducible.
- Current frontend runtime versions: Next.js 16.3.1, React 19.2.8 and React DOM 19.2.8.
- Added GitHub Actions frontend CI for TypeScript checking and production build verification.
- CI uses Node 22 and runs on frontend changes and pull requests.
- Added production smoke checks for `/api/health` and `/api/docs`.
- Added scheduled/manual Production Smoke workflow.
- Aligned React/React DOM peer versions to 19.2.8.
- Added `frontend/.nvmrc` with Node 22.

### Next sequence
1. Verify the latest canonical `/api/index.py` deployment in Production.
2. If `/api/*` still resolves to the Next.js 404 surface, use a separate Vercel backend project as the standards-based fallback; keep the free `*.vercel.app` domain and connect the frontend through its API base URL.
3. Verify musician search against the real backend.
4. Complete musician profile flow.
5. Complete collaboration request flow.
6. Complete messaging/notifications.
7. Complete ratings/favorites/matching.
8. Production E2E verification.
9. UI performance/accessibility hardening and strong animated neon treatment.

### Explicitly deferred
- Neon/PostgreSQL migration.
- New external database provider.
