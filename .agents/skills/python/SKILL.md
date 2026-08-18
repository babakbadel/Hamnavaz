---
name: python
description: Professional Python engineering for Hamnavaz. Use when writing, refactoring, testing, typing, packaging, or reviewing Python code, especially FastAPI backend code.
---

# Python — Hamnavaz Skill

## Core rules

- Follow modern Python typing and the conventions already used by the project.
- Prefer clear, small functions with explicit inputs and outputs.
- Use type hints for public functions, services, schemas, and important internal boundaries.
- Prefer standard-library solutions when they are sufficient; avoid unnecessary dependencies.
- Keep business logic deterministic and testable where practical.
- Do not hide exceptions or silently swallow failures.
- Validate external input at boundaries and keep domain logic separate from transport concerns.
- Avoid global mutable state and hidden side effects.
- Use context managers for resources that require cleanup.
- Keep secrets/configuration in environment-backed settings, never source code.

## Hamnavaz backend

Use Python with FastAPI, SQLAlchemy, Pydantic, and Alembic according to the project's existing architecture.

Prefer:
- typed Pydantic schemas at API boundaries
- SQLAlchemy models isolated from API schemas
- services for business rules
- data-access/repository boundaries for database operations where the existing module supports them
- FastAPI dependencies for request-scoped concerns such as authentication and database sessions
- migrations for schema changes

Do not introduce a new architecture, framework, or dependency merely for style. Minimize changes to the existing modular-monolith design.

## Quality

Before declaring Python work complete:
1. Run relevant tests.
2. Run type/lint checks available in the project.
3. Verify imports and application startup.
4. Inspect changed code for blocking operations inside async paths.
5. Check error handling and edge cases.

Ruff may be used for linting and formatting when configured by the project; keep the repository's existing formatter/linter configuration authoritative.
