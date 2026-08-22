# Hamnavaz — Decisions Log

This file records intentional product and engineering decisions so they survive across chats.

## D-001 — Backend architecture

**Decision:** Keep FastAPI + SQLAlchemy as the backend and use a modular-monolith approach at the current stage.

**Reason:** The project is still consolidating domains and product behavior; microservices would add unnecessary operational complexity.

## D-002 — Frontend direction

**Decision:** Frontend direction is modern React/Next.js with TypeScript and Tailwind, while legacy/older frontend implementations may remain temporarily during consolidation.

**Reason:** Responsive RTL UI, SEO where relevant, maintainability and a clear production path.

## D-003 — Visual language

**Decision:** Hamnavaz uses a premium dark RTL music-platform visual language: dark navy/black foundation, premium gold/yellow accents, rounded cards, app-like layouts and musician-focused imagery.

**Reason:** Establish a recognizable product identity instead of a generic dashboard/template.

## D-004 — Incremental UI development

**Decision:** Continue from the current UI instead of repeatedly rebuilding the frontend from scratch.

**Reason:** Recent work has already established Home/profile patterns and visual treatments such as neon accents and borders.

## D-005 — Persistent project memory

**Decision:** `PROJECT_MEMORY.md`, `DECISIONS.md`, `CHANGELOG.md` and `TODO.md` are part of the project continuity system.

**Reason:** ChatGPT conversation memory is not sufficient as the sole source of truth for a long-running software project.

## D-006 — Source of truth

**Decision:** Current repository/code is authoritative for implementation facts. Explicit decisions documented here are authoritative for intentional product/architecture direction unless superseded by a newer decision.

**Reason:** Prevent stale chat context from causing incorrect implementation changes.

## D-007 — Production boundary

**Decision:** Next.js is the canonical production UI and FastAPI remains the canonical API/data boundary. Vercel routes `/api/*` to the Python API and all other routes to the Next.js frontend.

**Reason:** Keep browser/API integration explicit while retaining the existing modular-monolith backend and Vercel deployment model.

## D-008 — Presence semantics

**Decision:** “Online” is a server-derived presence state: a user is online when an authenticated request has updated `last_seen_at` within the previous five minutes. The client cannot directly spoof the timestamp.

**Reason:** Avoid hard-coded/demo online users and make the Home/search experience reflect actual authenticated activity.

## D-009 — Graphy/Headroom/Logging operating model

**Decision:** Architecture changes must preserve a connected view of UI → API → domain → database → deployment, while significant changes, tests and deployment outcomes are recorded in repository history/documentation.

**Reason:** Keep the project auditable and prevent isolated fixes from creating hidden integration drift.
