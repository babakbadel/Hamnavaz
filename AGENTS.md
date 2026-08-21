# Hamnavaz Engineering Rules

## Scope
These rules apply to all AI/Codex-assisted work in Hamnavaz.

## Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, RTL/Persian UI.
- Backend: FastAPI, SQLAlchemy, Pydantic.
- Deployment: Vercel where applicable.
- Source of truth: GitHub repository and its committed project records.

## Workflow
ANALYZE -> PLAN -> IMPLEMENT -> TEST -> VERIFY -> LOG -> REVIEW -> DEPLOY.
Before changing code, inspect the relevant files and current architecture. Keep changes minimal and reversible.

## Frontend
Prefer production-ready, accessible, responsive components. Preserve RTL behavior. Consider SEO, Core Web Vitals, bundle size and mobile UX. Reuse the existing design system before introducing new patterns.

## Backend
Preserve existing domain boundaries and API contracts unless a change is intentional and documented. Validate database migrations and API behavior before declaring completion.

## GitHub / Vercel
Never expose secrets. Inspect branch, relevant commits, CI and deployment state when the task depends on them. Do not claim a deployment or test passed unless it was actually verified.

## Graphy
Treat Graphy as the project dependency/relationship graph. For meaningful changes, identify affected nodes, dependencies, critical paths, bottlenecks and change impact.

## Headroom
Track complexity, performance, bundle, API, database, deployment and maintenance headroom. Flag changes that materially consume capacity or increase technical debt.

## Logging
Important work must be recorded under `docs/logs/`. Record timestamp, task, reason, files/areas changed, tests, result, errors, decisions and next step. Never log credentials or secrets.

## Decisions
Architecture/product decisions belong under `docs/decisions/` and should explain context, decision, alternatives and consequences.

## Done Criteria
A task is not Done until relevant tests/build/lint/browser verification have been run, failures are resolved or explicitly documented, and the project log is updated.
