# Hamnavaz — ChatGPT → Grok Handoff

**Generated:** 2026-08-22
**Repository:** `babakbadel/Hamnavaz`
**Canonical branch:** `main`
**Purpose:** Give Grok a compact, authoritative handoff of the work and decisions accumulated in the ChatGPT sessions, without requiring the full chat history.

> **Source-of-truth rule:** For implementation facts, trust the current repository and current commit over this document or old chat messages. For intentional architecture/product direction, trust the newest entry in `DECISIONS.md`. This file is a handoff, not a replacement for `PROJECT_MEMORY.md`, `DECISIONS.md`, `CHANGELOG.md`, or `TODO.md`.

## 1. Project identity

Hamnavaz (همنواز) is a Persian RTL music collaboration platform intended to connect musicians, singers, teachers, bands and collaboration opportunities.

Core domains already represented include authentication, musician profiles, instruments, musician-instrument relationships, discovery/search, matching, collaboration requests, messaging, favorites, ratings and notifications.

## 2. Canonical architecture

- Backend: FastAPI + SQLAlchemy + Alembic + Pydantic + JWT; Google OAuth scaffolding exists.
- Architecture: modular monolith. Do not introduce microservices without an explicit product/scale reason.
- Frontend direction: React / Next.js + TypeScript + Tailwind.
- Production UI boundary: Next.js is canonical for the frontend; FastAPI is canonical for API/data.
- Vercel is the production deployment target.
- Preserve existing API contracts and migration history unless a breaking change is explicitly approved.
- Prefer incremental changes over rewrites.

See `DECISIONS.md` for authoritative decisions D-001 through D-009.

## 3. Visual/product direction

The established UI direction is:

- premium dark music-platform aesthetic
- Persian RTL
- mobile-first responsive design
- dark navy / black foundation
- gold/yellow premium accents
- rounded cards
- app-like musician/instrument cards
- modern navigation and hero sections
- musician-focused imagery
- neon borders/accent animations where they are already part of the current design

Do not replace the existing visual language with a generic dashboard/template.

Recent UI work includes:

- premium responsive musician profile
- animated neon borders on musician profile
- Home neon styling
- animated Home neon accents
- Home all-instruments continuation card

## 4. Important recent engineering work

The current `CHANGELOG.md` records the following work on 2026-08-22:

- strict TypeScript configuration for Next.js App Router
- production security response headers and disabled Next.js powered-by header
- consolidated frontend API URL configuration and typed API errors
- server-derived musician presence using `users.last_seen_at`
- five-minute online window for presence
- Alembic migration and regression coverage for presence
- duplicate frontend CI execution removed
- GitHub Actions runtimes updated
- CI permissions hardened to read-only repository access
- scheduled production smoke checks expanded to frontend routes, security headers and protected API boundaries
- architecture decisions updated for production boundary and presence semantics

### Deployment status recorded by the repository

`CHANGELOG.md` states that the current main-line Vercel Production deployment is **READY** and GitHub reports Vercel success. Therefore, do not assume an old deployment failure is still current. Always verify the current Vercel deployment before changing deployment configuration.

## 5. Vercel / frontend deployment context

The repository has a root `vercel.json` and a `frontend/` Next.js application.

Current root build configuration has historically been:

- framework: Next.js
- install command: `npm install`
- build command: `npm run build`
- output directory: `.next`

The root `package.json` delegates its build to `frontend`.

Important: an earlier ChatGPT investigation suspected that Vercel's root/output configuration might be misaligned with the nested `frontend` app. That suspicion is **not confirmed as the cause of the current deployment state** because the repository changelog now records a READY production deployment. Verify before changing anything.

The frontend `next.config.mjs` contains conditional GitHub Pages behavior (`GITHUB_ACTIONS`, `output: 'export'`, `/Hamnavaz` basePath), while Vercel is the production target. Treat this as something to audit, not automatically remove.

## 6. Backend/API facts

Canonical backend entry point:

`app.main:app`

Local server:

`uvicorn app.main:app --reload`

Health endpoint:

`GET /health`

API docs:

`/docs`

Known domain endpoints from the project history include:

- `/auth/register`
- `/auth/login`
- `/auth/google/callback`
- `/guitar/`
- `/musician/profile`
- `/musician/me`
- `/instrument/`
- `/musician-instrument/`
- `/search/musicians`
- `/match/me`
- `/collaboration-request/`
- `/messages/`
- `/favorites/`
- `/ratings/`
- `/notifications/`

These are historical knowledge and must be verified against the current code before implementation.

## 7. Presence contract

The intentional decision is that “online” is server-derived:

- authenticated requests update `users.last_seen_at`
- a user is considered online when `last_seen_at` is within the previous five minutes
- the client must not directly spoof the timestamp

See `DECISIONS.md` D-008 and the current Alembic/test changes.

## 8. Continuity documents

Read these before substantial work:

1. `PROJECT_MEMORY.md` — persistent project context and continuity rules.
2. `DECISIONS.md` — authoritative intentional architecture/product decisions.
3. `CHANGELOG.md` — meaningful recent changes and verification state.
4. `TODO.md` — current continuation backlog.
5. `GROK_HANDOFF.md` — this ChatGPT→Grok handoff.

If these conflict with an old chat, use the repository/current code and newest decisions as described above.

## 9. Current TODO / next work

Immediate workflow from `TODO.md`:

- verify current production/Vercel deployment against `main` before the next UI change
- continue frontend work from the latest Home/profile implementation
- verify mobile and desktop responsive behavior after significant UI changes
- preserve API/backend behavior during frontend consolidation

Broader backlog:

- consolidate frontend generations into the intended production frontend
- audit API routes against the domain model
- audit database models and Alembic migrations
- expand automated coverage for authentication, profiles, instruments, matching, collaboration, messaging, favorites and ratings
- document production deployment architecture
- keep continuity files synchronized

## 10. Collaboration protocol between ChatGPT and Grok

Treat GitHub as the shared workspace.

Before editing:

1. fetch current `main`
2. inspect latest commit and relevant files
3. read the continuity documents
4. check whether another agent has already changed the same area
5. avoid overwriting recent work without understanding it

After editing:

1. run the strongest available verification
2. commit meaningful changes with a clear message
3. update `CHANGELOG.md` for meaningful feature/architecture/deployment changes
4. update `DECISIONS.md` for intentional architectural/product decisions
5. update `PROJECT_MEMORY.md` when the project baseline materially changes
6. update this handoff only when the cross-agent state materially changes

Never treat a chat-only statement as proof that code changed. The repository/commit is the authoritative implementation record.

## 11. Graph / Headroom / logging operating model

The project has an explicit decision (D-009) to preserve a connected view of:

`UI → API → domain → database → deployment`

Significant changes, tests and deployment outcomes should be recorded in repository history/documentation.

Grok also has a separate `Grok-hamnavaz` repository containing a `skills/graphify/SKILL.md`. Its rule is to build a Graphify-style knowledge graph, distinguish `EXTRACTED` from `INFERRED` relationships, preserve source references/timestamps, never present inference as fact, and version graph snapshots.

When doing cross-agent analysis, apply those principles to Hamnavaz as well.

## 12. Critical instruction for Grok

Do **not** restart Hamnavaz from scratch.

Do **not** replace the current frontend wholesale merely because multiple frontend generations exist.

Do **not** assume an old Vercel error is still present.

Do **not** silently alter authentication, API contracts, database migrations, or presence semantics.

Start from the current `main`, inspect the current code, then make the smallest coherent next change.

## 13. Current handoff summary

At handoff time, Hamnavaz has a repository-backed continuity system, an established premium RTL music UI, a Next.js/React frontend direction, a FastAPI modular-monolith backend, server-derived presence, CI/security/production smoke hardening, and a Vercel Production deployment recorded as READY.

The next agent should first verify the live/current deployment and repository state, then continue the frontend/product work from the latest Home/profile implementation while preserving the backend and established design system.
