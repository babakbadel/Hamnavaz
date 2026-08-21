# Hamnavaz Architecture Contract

## Runtime boundaries

- `app/main.py` is the canonical FastAPI application.
- `backend/main.py` is the Vercel backend service adapter and exports `app` from `app.main`.
- `frontend/` is the Next.js application.
- `frontend/api/index.py` is retained only as a legacy compatibility entrypoint; new Vercel routing must use `backend/main.py`.

## Request flow

```text
Browser
  -> Vercel
      -> /api/* -> backend service -> backend/main.py -> app.main:app
      -> /*    -> frontend service -> Next.js
```

## Rules

1. Do not create a second FastAPI application.
2. Keep domain routers registered through `app/api/router.py`.
3. Frontend production API calls use relative `/api` paths.
4. Do not add a new database provider unless the product explicitly requires it.
5. Every production routing change requires `/api/health`, `/api/docs`, and one domain endpoint smoke tests.
