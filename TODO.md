# Hamnavaz — Continuation TODO

## Current execution status — 2026-08-22

Production is reachable and rendering successfully. The next phase is product integration completion, not a frontend rewrite.

### P0 — Must complete

- [ ] Replace Home's hard-coded online musicians with `/search/musicians?online=true`.
- [ ] Align Home discovery filters with the canonical `/search/musicians` API contract.
- [ ] Verify the `/api/*` Vercel → FastAPI routing end-to-end.
- [ ] Verify authentication → dashboard/profile flow in production.

### P1 — Complete product flows

- [ ] Wire all `/musicians` filters to real API parameters and preserve URL state.
- [ ] Verify musician profile data and instruments end-to-end.
- [ ] Verify Match → collaboration request → messaging.
- [ ] Verify notifications, favorites and ratings.
- [ ] Audit backend routes against the current domain model.
- [ ] Audit SQLAlchemy models and Alembic migrations for consistency.
- [ ] Expand automated regression tests for the core flows.

### P2 — Product completion / polish

- [ ] Replace or explicitly classify static teacher/concert/music/ticket showcase data.
- [ ] Consolidate remaining legacy frontend generations after verifying no required behavior is lost.
- [ ] Verify responsive behavior on mobile/tablet/desktop.
- [ ] Add final production smoke/E2E coverage.
- [ ] Define and document production deployment architecture.
- [ ] Keep `PROJECT_MEMORY.md`, `DECISIONS.md`, `CHANGELOG.md` and `GROK_HANDOFF.md` synchronized.

## Coordination

See `AUDIT_2026-08-22.md`. Grok and ChatGPT should use that audit as the shared work queue and update it when a listed gap is completed.
