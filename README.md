# Hamnavaz

Hamnavaz is a Persian RTL music collaboration platform built around finding musicians, instruments, collaboration opportunities, messaging, ratings, favorites, and matching.

## Current stack

- Backend: FastAPI
- Database: SQLAlchemy + Alembic
- Authentication: JWT / Google OAuth scaffolding
- Frontends: React/Vite, Next.js, and legacy HTML frontend
- Tests: pytest
- Deployment: Docker / docker-compose

## Development

The canonical application entry point is `app.main:app`.

Run locally:

```bash
uvicorn app.main:app --reload
```

Health check: `GET /health`

API documentation is available at `/docs` when the application is running.

## Repository status

The `master` branch contains the current integrated Hamnavaz codebase. The project is being consolidated toward a single production-ready architecture while preserving the existing API and migration history.
