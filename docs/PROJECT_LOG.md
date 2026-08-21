# Hamnavaz — Project Log

## 2026-08-21 — Continuation baseline

### Current architecture
- Backend: FastAPI + SQLAlchemy + Alembic.
- Frontend: Next.js + React + TypeScript.
- Canonical backend entrypoint: `app.main:app`.
- Vercel frontend service root: `frontend/`.
- Vercel backend service entrypoint: `app.main:app`.
- Production database migration to Neon/PostgreSQL is explicitly deferred.

### Product graph
User → Auth → Profile → Instruments/Skills → Discovery → Search/Match → Collaboration → Messages → Notifications.
Supporting relations: Ratings and Favorites.

### Current verified development state
- FastAPI root and health routes exist in `app/main.py`.
- Domain routers are registered through `app/api/router.py`.
- Frontend API client is intended to use `/api` in production.
- Musician discovery/profile flow is the next product-critical path.

### Current blocker
Production Vercel routing for `/api/*` previously returned 404 even when a Python Function deployment was built successfully. The deployment proved that the Python runtime existed, but the legacy `builds`/`routes` configuration did not produce the expected public route. The routing configuration has now been moved to Vercel Services: `/api/*` → backend service and everything else → frontend service. This is the current routing architecture to verify.

Required smoke tests:
- `GET /api/health` → 200
- `GET /api/docs` → 200
- `GET /api/search/musicians` → valid API response

### UI direction
Premium Dark RTL music platform. Neon purple animated/glowing borders are required around relevant cards, especially Online musicians and Instruments. Glow should be visibly strong and animated/blinking rather than static.

### Graphy / Headroom
Treat Graphy-style graph thinking and Headroom-style development/logging discipline as project-wide process requirements. Keep decisions, blockers, fixes, commits and verification results traceable. This repository log is the canonical lightweight record.

### 2026-08-21 — Engineering hardening pass
- Pinned frontend dependencies instead of `latest` to make builds reproducible.
- Current frontend runtime versions: Next.js 16.3.1, React 19.2.8 and React DOM 19.2.8.
- Added GitHub Actions frontend CI for TypeScript checking and production build verification.
- CI uses Node 22 and runs on frontend changes and pull requests.
- Added production smoke checks for `/api/health` and `/api/docs`.
- Added scheduled/manual Production Smoke workflow so API regressions remain observable instead of relying on chat memory.
- The smoke test is intentionally strict: a 404 is a deployment/routing failure, not a success.
- Vercel Services configuration was introduced to separate the Next.js frontend and FastAPI backend within the same Vercel project without adding a second domain or external database.
- The first Services deployment exposed a React peer-dependency warning; React/React DOM were aligned to 19.2.8 to match the resolved peer requirement.

### Next sequence
1. Verify the Vercel Services deployment and API routing.
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
