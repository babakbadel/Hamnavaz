---
name: python-fastapi-development
description: Production-oriented Python/FastAPI backend workflow for Hamnavaz, covering async boundaries, SQLAlchemy 2.x, Pydantic v2, authentication, testing, API design, migrations, and deployment.
---

# Python/FastAPI Development — Hamnavaz

Use this skill for backend feature development, refactoring, API work, authentication, database integration, tests, and production hardening.

## Stack assumptions

- Python
- FastAPI
- SQLAlchemy 2.x
- Pydantic v2
- Alembic
- JWT/OAuth2 where required
- pytest
- PostgreSQL in production; SQLite may be used for local development/tests when appropriate

## Workflow

### 1. Understand the existing system

- Inspect the existing module/domain before adding files.
- Preserve the current modular-monolith architecture.
- Reuse existing dependencies, settings, sessions, schemas, services, and error conventions.
- Do not introduce microservices, heavy Clean Architecture, or unnecessary abstractions without a concrete requirement.

### 2. Database

- Keep SQLAlchemy models and Pydantic API schemas separate.
- Use SQLAlchemy 2.x typed mappings and modern query APIs.
- Manage schema changes through Alembic migrations.
- Define relationships deliberately and watch for N+1 queries.
- Use transactions for multi-step writes that must succeed or fail together.
- Keep session/connection lifecycle centralized.

### 3. API

- Organize endpoints by domain/feature.
- Keep route handlers thin.
- Validate all external input at the API boundary.
- Use explicit request and response schemas.
- Keep HTTP concerns in routers/controllers and business rules in services.
- Return stable, documented response shapes.
- Preserve backward compatibility unless a breaking change is intentional.

### 4. Authentication and authorization

- Never store plaintext passwords.
- Keep JWT/token handling centralized.
- Enforce authorization through reusable dependencies/policies.
- Never trust user-provided role/permission fields.
- Never log passwords, tokens, secrets, or sensitive personal data.

### 5. Async and performance

- Do not put blocking database/network/file operations inside async code unless the library is async-safe.
- Prefer async SQLAlchemy only where the existing application architecture supports it; do not mix patterns casually.
- Avoid unnecessary queries and repeated serialization.
- Measure before introducing caching or background infrastructure.

### 6. Errors and observability

- Use consistent application/domain errors.
- Convert domain errors to appropriate HTTP responses at the boundary.
- Do not leak stack traces or internal implementation details.
- Log useful diagnostic context without secrets.
- Preserve request IDs/correlation information when the infrastructure supports it.

### 7. Testing

For meaningful backend changes, add or update tests at the appropriate level:

- Unit tests for business rules.
- Integration tests for database behavior.
- API tests for authentication and endpoint contracts.
- Regression tests for discovered bugs.

Do not rely only on a successful import or server startup.

### 8. Quality gates

Before completion, verify as applicable:

- Tests pass.
- Application imports/starts.
- OpenAPI remains valid.
- Database migration is valid.
- Authentication/authorization behavior is tested.
- No secrets were introduced.
- Ruff/type checking/linting are clean when configured.

## Hamnavaz-specific rule

The existing Hamnavaz backend is a modular monolith. Favor the smallest change that fits the current architecture. Do not rewrite working modules merely to match an external template.

## Source

Adapted from: https://github.com/sickn33/agentic-awesome-skills/blob/main/skills/python-fastapi-development/SKILL.md

The upstream skill is the reference for its broader workflow; this copy is deliberately adapted to Hamnavaz and does not copy the entire upstream document.
