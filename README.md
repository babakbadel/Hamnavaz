# Hamnavaz

Hamnavaz is a Persian RTL music-collaboration platform for finding musicians, instruments, collaboration opportunities, messaging, ratings, favorites and matching.

## Production architecture

- **Frontend:** Next.js App Router + React + TypeScript
- **Backend:** FastAPI + SQLAlchemy
- **Database migrations:** Alembic
- **Authentication:** JWT-based local authentication with Google OAuth scaffolding
- **Hosting:** Vercel, with Next.js frontend and FastAPI backend in the same monorepo/service configuration
- **Testing:** pytest + production smoke checks
- **Architecture:** modular monolith; microservices are intentionally deferred until justified by scale

The canonical production frontend is the `frontend/` Next.js application. Older frontend implementations are retained only as migration history and are not part of the production path.

## Development

Backend entry point:

```bash
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend health check:

```text
GET /health
```

Production API health check through Vercel:

```text
GET /api/health
```

API documentation:

```text
/docs
/api/docs
```

## Release rules

- `main` is the canonical integration branch.
- GitHub Actions validates backend migrations/tests and frontend typecheck/build.
- Production smoke checks verify public routes, API health/docs, security headers and protected API boundaries.
- Vercel deployment URLs may be protected by Deployment Protection; use the production domain for public verification. Standard Vercel Deployment Protection can protect preview/direct deployment URLs while leaving the production domain public. citeturn852174search0turn852174search1

## Project continuity

`PROJECT_MEMORY.md`, `DECISIONS.md`, `CHANGELOG.md`, `TODO.md` and `docs/AI-OPS.md` are maintained as the repository-backed source of project continuity, decisions, Graphy relationships, Headroom rules and development logging.
