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
