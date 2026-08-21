# Hamnavaz — Project Log

## 2026-08-21 — Continuation baseline

### Current architecture
- Backend: FastAPI + SQLAlchemy + Alembic.
- Frontend: Next.js + React + TypeScript.
- Canonical FastAPI application: `app.main:api_app` mounted publicly as `app.main:app` under `/api`.
- Vercel backend function adapter: `api/index.py`.
- Vercel frontend service root: `frontend/`.
- Production database migration to Neon/PostgreSQL is explicitly deferred.

### Product graph
User → Auth → Profile → Instruments/Skills → Discovery → Search/Match → Collaboration → Messages → Notifications.
Supporting relations: Ratings and Favorites.

### Verified routing root cause
Vercel's Python `api/index.py` function receives the public `/api/*` request path. The existing FastAPI routes were declared without the `/api` prefix (`/health`, `/auth`, `/search`, etc.), so production correctly reached the Python runtime but FastAPI returned 404 because no route matched `/api/health`.

### Routing fix
- `app.main` now keeps the existing domain routers in a child FastAPI app (`api_app`).
- The public ASGI app mounts that child at `/api`, preserving existing internal routes while making production URLs `/api/health`, `/api/auth/...`, `/api/search/...`, etc.
- Vercel uses the backend service with `api.index:app` and routes `/api/:path*` to that backend service.
- Added public API tests for `/`, `/api/health`, `/api/docs`, and `/api/openapi.json`.

### Required production smoke tests
- `GET /api/health` → 200
- `GET /api/docs` → 200
- `GET /api/search/musicians` → valid API response

### UI direction
Premium Dark RTL music platform. Neon purple animated/glowing borders are required around relevant cards, especially Online musicians and Instruments. Glow should be visibly strong and animated/blinking rather than static.

### Graphy / Headroom
Treat Graphy-style graph thinking and Headroom-style development/logging discipline as project-wide process requirements. Keep decisions, blockers, fixes, commits and verification results traceable. This repository log is the canonical lightweight record.

### Engineering hardening pass
- Pinned frontend dependencies instead of `latest` to make builds reproducible.
- Current frontend runtime versions: Next.js 16.3.1, React 19.2.8 and React DOM 19.2.8.
- Added GitHub Actions frontend CI for TypeScript checking and production build verification.
- CI uses Node 22 and runs on frontend changes and pull requests.
- Added production smoke checks for `/api/health` and `/api/docs`.
- Added scheduled/manual Production Smoke workflow.
- Added Vercel Services configuration to separate frontend and FastAPI backend within the same Vercel project.
- Aligned React/React DOM peer versions to 19.2.8.

### Next sequence
1. Verify the new `/api` mount in Production.
2. Verify musician search against the real backend.
3. Complete musician profile flow.
4. Complete collaboration request flow.
5. Complete messaging/notifications.
6. Complete ratings/favorites/matching.
7. Production E2E verification.
8. UI performance/accessibility hardening and strong animated neon treatment.

### Explicitly deferred
- Neon/PostgreSQL migration.
- New external database provider.
