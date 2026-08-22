# Hamnavaz — Changelog

## 2026-08-22

### Architecture / Reliability

- Added explicit strict TypeScript configuration for the Next.js App Router.
- Added production security response headers and disabled the Next.js powered-by header.
- Consolidated the frontend API URL configuration and introduced typed API errors.
- Added server-derived musician presence using `users.last_seen_at` with a five-minute online window.
- Added an Alembic migration and regression coverage for the presence contract.
- Removed duplicate frontend CI execution and updated GitHub Actions runtimes to current major versions.
- Hardened CI permissions to read-only repository access.
- Expanded scheduled production smoke checks to cover frontend routes, security headers and protected API boundaries.
- Extended architecture decisions with the production boundary and presence semantics.
- Added a dedicated frontend CI gate for Node 22, `npm ci`, TypeScript typechecking and the production Next.js build.

### Verification baseline

- Vercel Production deployment for the current main line is `READY` and the GitHub commit status reports Vercel success.
- Full local execution could not be run from the current assistant runtime because outbound GitHub DNS/network access is unavailable; CI/Vercel remains the authoritative remote execution path.

### Agent coordination

- Shared production integration audit is maintained in `AUDIT_2026-08-22.md`.
- Grok and ChatGPT must use `main` plus the audit/project-memory files as the shared source of truth.

## 2026-08-21

### Added

- Added `PROJECT_MEMORY.md` as persistent project context.
- Added `DECISIONS.md` for durable architecture/product decisions.
- Established a repository-backed continuity workflow for future ChatGPT development sessions.

### Repository state before memory setup

Recent UI commits included:

- Home neon styling
- Animated neon accents on Home
- Animated neon borders on musician profile
- Premium responsive musician profile
- Home all-instruments continuation card

## Rule for future entries

Record meaningful feature, architecture, deployment, bug-fix and product changes here. Do not record every trivial formatting change.
