---
name: fullstack-dev
description: Full-stack architecture and frontend/backend integration for Hamnavaz. Use when changing API contracts, service boundaries, authentication flows, frontend-backend integration, real-time features, uploads, configuration, or production hardening.
---

# Full-Stack Development Practices — Hamnavaz

This skill complements the FastAPI skills. It is responsible for architectural decisions and the contract between the Next.js/React frontend and FastAPI backend.

## Architecture rules

- Keep Hamnavaz as a modular monolith unless a real scaling or ownership requirement justifies a different architecture.
- Organize backend work by domain/feature rather than creating unrelated global layers.
- Keep HTTP/router concerns separate from business logic.
- Keep business logic separate from database access.
- Prefer explicit dependency injection and small, testable services.
- Do not add abstractions merely because a pattern exists elsewhere.

## Backend contract

- Treat OpenAPI as the contract between FastAPI and the frontend.
- Every endpoint should have clear request and response schemas.
- Keep error responses consistent and machine-readable.
- Validate all client input at the boundary.
- Do not expose internal database models or sensitive fields directly.

## Configuration and secrets

- Centralize configuration.
- Validate required environment variables at startup.
- Never commit real secrets, passwords, JWT keys, OAuth secrets, or production credentials.
- Keep `.env.example` safe and illustrative.
- Never hardcode environment-specific URLs when configuration can provide them.

## Authentication

- Keep authentication flow centralized.
- Keep authorization decisions in reusable backend dependencies/services.
- Coordinate frontend token handling with backend authentication semantics.
- Handle 401/403 consistently and do not silently swallow authentication failures.

## Frontend/backend integration

When an API changes:

1. Define or update the backend request/response schema.
2. Update the OpenAPI contract/documentation.
3. Update the frontend API client/types.
4. Update affected UI states for loading, success, empty, validation errors, 401/403, and server errors.
5. Test the complete flow rather than only one side.

Prefer generated or typed API clients when the project's tooling supports them. Do not duplicate API contracts by hand without a reason.

## Database and asynchronous work

- Use migrations for schema changes.
- Use transactions for multi-step state changes that require atomicity.
- Prevent N+1 query patterns.
- Add caching/background jobs only when there is a measured or clear requirement.
- For chat/collaboration real-time features, choose SSE or WebSocket based on whether communication is one-way or bidirectional.

## Production hardening

Before calling a feature production-ready, check:

- Validation at the boundary.
- Authentication and authorization.
- Consistent errors.
- Logging/observability without secrets.
- Health/readiness behavior where appropriate.
- Explicit CORS configuration.
- Graceful failure of external dependencies.
- Database migration safety.
- Tests for the main success and failure paths.

## Hamnavaz priorities

The product's core domains include users, musicians, instruments, profiles, skills, collaboration requests, messages, favorites, ratings, notifications, and related marketplace/social features. New work should respect existing domain boundaries and business rules instead of introducing unrelated generic abstractions.

The chosen stack is Next.js + React + TypeScript on the frontend and FastAPI + SQLAlchemy on the backend. Preserve this decision unless the user explicitly changes it.

## Source

Adapted from: https://github.com/MiniMax-AI/skills/blob/main/skills/fullstack-dev/SKILL.md

The upstream skill provides broader full-stack patterns and references; this project copy is intentionally adapted to Hamnavaz and its existing architecture.
