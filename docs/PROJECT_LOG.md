# Hamnavaz — Project Log

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
