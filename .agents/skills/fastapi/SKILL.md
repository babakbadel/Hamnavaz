---
name: fastapi
description: FastAPI best practices for Hamnavaz. Use when creating or refactoring FastAPI routes, dependencies, Pydantic models, authentication, streaming, OpenAPI, or async/sync code.
---

# FastAPI — Hamnavaz Backend Skill

Use current FastAPI conventions and prefer the official FastAPI guidance as the primary framework reference.

## Core rules

- Prefer `Annotated[..., Depends(...)]` for dependency declarations.
- Prefer `Annotated` for `Path`, `Query`, `Header`, and other parameter metadata.
- Prefer typed return values / response models so Pydantic validates, filters, documents, and serializes responses.
- Keep SQLAlchemy models separate from API/Pydantic schemas.
- Put router prefix, tags, and shared dependencies on `APIRouter` where practical.
- Never put business rules or database queries directly in route handlers.
- Keep one HTTP operation per path-operation function.
- Do not use deprecated `ORJSONResponse`/`UJSONResponse` patterns when a typed response is sufficient.
- Do not use Pydantic `RootModel` or `...` merely to mark required fields; use normal annotations and `Annotated`/`Field`.
- Do not run blocking I/O inside `async def`; use `def` for blocking path operations or an appropriate async bridge.
- Use FastAPI's current CLI (`fastapi dev`, `fastapi run`) when applicable.
- For SSE/streaming, use current FastAPI streaming APIs and verify behavior against the installed FastAPI version.

## Hamnavaz architecture

Hamnavaz uses FastAPI + SQLAlchemy + Pydantic in a modular-monolith architecture.

Route -> service/business logic -> data access -> database.
Authentication/authorization should be implemented through FastAPI dependencies rather than duplicated in routes.

## Verification

Before declaring a backend change complete:

1. Run the relevant tests.
2. Verify the application imports and starts.
3. Check the affected OpenAPI paths and schemas.
4. Smoke-test changed endpoints when practical.
5. Do not claim success without validation.

## Source

Official upstream skill: https://github.com/fastapi/fastapi/tree/master/fastapi/.agents/skills/fastapi

This project copy is intentionally concise and adapted for Hamnavaz; consult the upstream skill for the latest framework-specific details.
