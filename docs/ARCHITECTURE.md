# Hamnavaz Architecture Contract

## Runtime boundaries

- `app/main.py` is the canonical FastAPI application.
- The backend service uses `app.main:app` directly from the repository root.
- `frontend/` is the Next.js application.
- Legacy Vercel function adapters are removed; see `docs/DEPLOYMENT.md` for required project settings.

## Request flow

```text
Browser
  -> Vercel
      -> /api/* -> backend service -> app.main:app
      -> /*    -> frontend service -> Next.js
```

## Rules

1. Do not create a second FastAPI application.
2. Keep domain routers registered through `app/api/router.py`.
3. Frontend production API calls use relative `/api` paths.
4. Do not add a new database provider unless the product explicitly requires it.
5. Every production routing change requires `/api/health`, `/api/docs`, and one domain endpoint smoke tests.
