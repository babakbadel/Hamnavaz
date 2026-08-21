# Hamnavaz — Project Log

## 2026-08-21 — Continuation baseline

### Current architecture
- Backend: FastAPI + SQLAlchemy + Alembic.
- Frontend: Next.js + React + TypeScript.
- Canonical backend entrypoint: `app.main:app`.
- Vercel Python entrypoint: `frontend/api/index.py`.
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
Production Vercel routing for `/api/*` has previously returned 404 even when a Python Function deployment was built successfully. This must be resolved and verified before moving to broader production work.

Required smoke tests:
- `GET /api/health` → 200
- `GET /api/docs` → 200
- `GET /api/search/musicians` → valid API response

### UI direction
Premium Dark RTL music platform. Neon purple animated/glowing borders are required around relevant cards, especially Online musicians and Instruments. Glow should be visibly strong and animated/blinking rather than static.

### Graphy / Headroom
Treat Graphy-style graph thinking and Headroom-style development/logging discipline as project-wide process requirements. Keep decisions, blockers, fixes, commits and verification results traceable. This repository log is the canonical lightweight record.

### 2026-08-21 — Engineering hardening pass
- Pinned frontend dependencies to stable versions instead of `latest` to make builds reproducible.
- Current pinned frontend versions: Next.js 16.3.1 and React 19.2.1.
- Added GitHub Actions frontend CI for TypeScript checking and production build verification.
- CI uses Node 22 and runs on frontend changes and pull requests.
- Added production smoke checks for `/api/health` and `/api/docs`.
- Added scheduled/manual Production Smoke workflow so the API regression remains observable instead of relying on chat memory.
- The smoke test is intentionally strict: a 404 is a deployment/routing failure, not a success.

### Next sequence
1. Fix and verify Vercel API routing.
2. Verify musician search against the real backend.
3. Complete musician profile flow.
4. Complete collaboration request flow.
5. Complete messaging/notifications.
6. Complete ratings/favorites/matching.
7. Production E2E verification.

### Explicitly deferred
- Neon/PostgreSQL migration.
- New external database provider.
