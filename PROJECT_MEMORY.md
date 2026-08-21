# Hamnavaz — Project Memory

> این فایل حافظهٔ پایدار پروژه است. هدف آن جلوگیری از از دست رفتن تصمیم‌ها، وضعیت پروژه و قواعد توسعه بین چت‌های مختلف است.
>
> **قاعده:** قبل از تغییرات مهم، این فایل باید بررسی شود و بعد از تغییرات معماری/محصولی/فنی مهم به‌روزرسانی شود.

## 1. Identity

- Project: **Hamnavaz (همنواز)**
- Repository: `babakbadel/Hamnavaz`
- Default Git branch: `main`
- Product type: Persian RTL music collaboration platform
- Primary goal: اتصال نوازندگان، خوانندگان، مدرس‌ها، گروه‌ها و فرصت‌های همکاری موسیقی.

## 2. Product Scope

Core product areas currently represented in the codebase:

- musician discovery
- musician profiles
- instruments
- collaboration opportunities / requests
- messaging
- matching
- ratings
- favorites
- notifications
- authentication
- future marketplace / lessons / events capabilities

## 3. Technology Baseline

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT authentication
- Google OAuth scaffolding
- pytest

Canonical application entry point:

`app.main:app`

Local server:

`uvicorn app.main:app --reload`

Health endpoint:

`GET /health`

API docs:

`/docs`

### Frontend

The repository currently contains multiple frontend generations/approaches including React/Vite, Next.js and legacy HTML. The project direction is toward a consolidated production-ready frontend while preserving working functionality during migration.

## 4. UI / Design System Direction

Current product direction:

- Premium music-platform aesthetic
- Dark / luxury visual language
- Persian RTL
- Mobile-first responsive behavior
- Dark navy / black foundation
- Gold/yellow premium accents where appropriate
- Rounded cards
- App-like musician and instrument cards
- Modern navigation / hamburger / snack-menu patterns
- Hero sections and musician imagery
- Avoid generic template-looking UI

Recent UI work has focused on:

- musician profile redesign
- animated neon borders
- animated neon accents
- Home neon styling
- Home instrument continuation card

Do not casually replace the established visual language when making incremental UI changes.

## 5. Architecture Rules

- Keep the backend as FastAPI + SQLAlchemy.
- Prefer a modular monolith at the current stage; do not introduce microservices without an explicit product/scale reason.
- Preserve existing API and migration history unless a breaking change is intentionally approved.
- Prefer incremental changes over unnecessary rewrites.
- Keep frontend/backend boundaries clear.
- Database migrations belong to Alembic.
- Do not silently change authentication semantics.

## 6. Domain / API Knowledge

The backend has included domain areas/endpoints such as:

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

These should be verified against the actual current code before assuming an endpoint still exists or behaves identically.

## 7. Data / Business Rules Known So Far

- There are two rating concepts: general user ratings and collaboration-based ratings.
- Comments/reviews are intended for multiple relevant entities such as profiles, concerts, instruments, performances, collaborations and lessons.
- Music/video hosting may initially use an external Iranian video host such as Aparat to reduce infrastructure cost.
- Admin-controlled feature gates may exist in the product roadmap, including participation-based permissions and rating-based unlocks.

These are product requirements/decisions and must not be removed merely because they are not yet fully implemented.

## 8. Current Repository Snapshot — 2026-08-21

Latest observed commits on `main` include:

1. `8082fc1` — `ui: load Home neon styling`
2. `c71b46a` — `ui: add animated neon accents for Home`
3. `663bc8b` — `ui: add animated neon borders to musician profile`
4. `c9f34d4` — `ui: build premium responsive musician profile`
5. `8b5ebdd` — `ui: add all instruments continuation card on home`

The repository README describes the project as a Persian RTL music collaboration platform and confirms FastAPI, SQLAlchemy/Alembic, JWT/Google OAuth scaffolding, multiple frontend generations, pytest, and Docker/docker-compose.

## 9. Development Safety Rules

Before making a substantial change:

1. Inspect the current GitHub state.
2. Identify the current branch and latest commit.
3. Inspect the relevant files rather than relying on memory.
4. Preserve existing working behavior unless the requested change explicitly replaces it.
5. Make the smallest coherent change.
6. Test or verify the affected flow.
7. Record important architectural/product decisions in `DECISIONS.md`.
8. Record meaningful changes in `CHANGELOG.md`.
9. Update this memory file when the project baseline changes.

## 10. Chat Continuity Rule

A new ChatGPT conversation must be treated as a continuation of the same project, not as a blank project.

At the beginning of a new work session, use this file plus the current repository state as the source of truth. If ChatGPT memory conflicts with the repository, the current repository/code wins for implementation facts; explicit product decisions recorded in `DECISIONS.md` win for intentional design direction.

## 11. Never Assume

Never assume from an old conversation that:

- a file still exists
- an endpoint still exists
- a deployment is current
- a UI screenshot reflects the current code
- a branch is still the active branch
- a dependency/version is unchanged
- a previously reported bug is still present

Always verify current state when it matters.

## 12. Next Work Principle

When the user says "ادامه بده", first determine the current repository state and the most recent completed work, then continue from there without introducing unrelated changes.
