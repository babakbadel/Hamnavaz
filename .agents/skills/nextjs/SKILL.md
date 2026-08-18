---
name: nextjs
description: Production Next.js guidance for Hamnavaz. Use when building or refactoring App Router pages, layouts, routing, Server/Client Components, data fetching, caching, metadata, loading/error states, and frontend-backend integration.
---

# Next.js — Hamnavaz Frontend Skill

## Primary source

Prefer the documentation bundled with the installed Next.js version and current official Next.js guidance over model memory. Next.js provides version-matched docs for AI coding agents through `node_modules/next/dist/docs/` and project `AGENTS.md` rules.

## Rules

- Determine the installed Next.js version before using version-sensitive APIs.
- Prefer the App Router patterns already established by Hamnavaz; do not migrate architecture without a reason.
- Keep Server Components as the default; add `"use client"` only when browser state, effects, event handlers, or client-only APIs require it.
- Keep client components small and avoid pushing entire page trees into the client unnecessarily.
- Fetch data as close as practical to where it is consumed and avoid sequential waterfalls when independent requests can run in parallel.
- Treat caching and revalidation as explicit architectural decisions; do not assume old Next.js caching behavior applies to the installed version.
- Use `loading.tsx`, `error.tsx`, and route-level boundaries where they improve resilience and UX.
- Keep secrets and server-only credentials out of client components and browser bundles.
- Keep the FastAPI base URL/configuration in environment configuration, never hardcode production endpoints.
- Prefer typed API contracts derived from the FastAPI/OpenAPI boundary.
- Preserve RTL Persian UX and responsive behavior for Hamnavaz.

## Hamnavaz integration

Frontend stack: Next.js + React + TypeScript + Tailwind.
Backend: FastAPI + SQLAlchemy + Pydantic.

The frontend must consume the backend through stable API boundaries rather than duplicating business rules in React.

## Verification

Before declaring a Next.js change complete:
1. Run the relevant lint/type/build checks.
2. Verify affected routes and navigation.
3. Check browser/client boundaries for accidental server-only imports or secrets.
4. Verify API requests against the current FastAPI endpoints/OpenAPI schema.
5. Check mobile and RTL behavior for UI changes.
