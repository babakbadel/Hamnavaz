# Hamnavaz — Headroom Development Discipline

Use this checklist for every meaningful change:

1. Establish the smallest change that solves the current blocker.
2. Inspect existing architecture before adding dependencies or services.
3. Verify locally or through available CI/deployment evidence.
4. Verify the production surface after deployment.
5. Record blocker → root cause → fix → commit → verification in `docs/PROJECT_LOG.md`.
6. Do not introduce infrastructure (for example a new database provider) unless the current product requirement actually needs it.
7. Prefer incremental, reversible changes over broad rewrites.
