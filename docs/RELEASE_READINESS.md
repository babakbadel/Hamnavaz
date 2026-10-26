# Release readiness — 2026-10-25

Parent: Epic #5. Candidate workstream coverage: Frontend #6, Backend #7, Database #8, QA #9, DevOps/Security #10, Integration #13.

## Baseline and acceptance policy

Audited baseline: `c3b89085ca310407bf9adba32fa7d108d93e2fe3` (2026-09-03). Reproduced baseline backend result: 15 passed, 2 failed. GitHub production smoke run `40210653655` passed three frontend pages and three headers, then returned Next.js HTML 404 for `/api/health`. Vercel reported READY for that commit, demonstrating that deployment status alone was insufficient.

This repair does not close Epic #5 or any workstream. Local verification is not production acceptance. Finalization checklist boxes for latest-main CI, deployment, and production smoke remain open.

## Candidate evidence

| Gate | Local/code evidence | Remaining production evidence |
| --- | --- | --- |
| Frontend build/typecheck | PASS: production Next.js build and typecheck on Node 22; lockfile and consolidated CI added | Exact candidate CI run and deployed assets |
| FastAPI tests | 31 pytest tests pass with pinned requirements on Python 3.12 | Same suite green in GitHub CI |
| Migrations | Clean upgrade, repeat upgrade, schema parity, legacy messages adoption preserving data tested | Approved persistent DB, backup, upgrade and schema check against that DB |
| Auth | Real register/login, profile access, invalid/missing-token rejection tested | Real production login/profile flow; Google OAuth is not certified |
| Search/Profile/Match | Real two/three-user API scenario, profile editing, discovery, online expiry and matching tested | Same flow against deployed API |
| Collaboration/Messages/Notifications | Create/inbox/accept/reject, unrelated-user rejection, message isolation and notification-read tests | Two-user deployed/browser verification |
| Presence | Naive SQLite timestamps normalized to UTC; online/offline boundary tested | Live multi-instance behavior and capacity |
| Security headers/CORS | CORS allowed/denied origins tested; production refuses placeholder JWT and development CORS | Production secret/origin configuration, full permission/abuse/dependency audit; public catalog mutation policy is not certified |
| E2E | PASS: 2 browser tests, desktop and mobile, 27.2 seconds; real API and isolated migrated DB | GitHub CI run and production repeat required |
| Production smoke | Tests reject HTML masquerading as JSON; expected SHA checked after successful deployment event | Public API currently fails at baseline; candidate not promoted |
| No hardcoded localhost | API-boundary script passes for all active frontend app/lib code; Google callback uses settings | Check configured public API URL variables |
| One frontend API client | Dashboard, profile editor, instruments, public profile use `frontend/lib/api.ts` | Deployed bundles and runtime configuration |
| One deployment path | Root `vercel.json` → `frontend/` and `app.main:app`; legacy Vercel adapters removed | Vercel Root Directory/preset and dual-runtime preview verification |

## Changes and material risks

- Profile creation keeps the existing query contract; authenticated PATCH edits only the current user's profile with a validated JSON payload. Changed free-text city clears stale normalized city references.
- Public profile rendering is now browser API-backed. Collaboration/messages use profile UUIDs, while musician detail lookup uses user IDs. Invalid UUID route parameters return validation errors instead of database bind failures.
- Messages now have an Alembic migration. Startup and pytest no longer call `create_all` to conceal missing migrations. Downgrading the new revision deletes messages; use application rollback and a database backup rather than an automatic downgrade.
- Redundant API-prefix mutation was removed so slash redirects retain `/api`. Browser testing uses a local ingress that mirrors the service split, not a Next.js rewrite that alters API slashes.
- Search controls now submit actual filters. Unknown instruments return no matches; English skill levels are recognized. `style` remains a full-text search alias, not a normalized music-style taxonomy.
- Existing application limits are retained. No claim is made about load tests, the entire legacy API authorization surface, Google OAuth completion, or full mock-data/product parity.

## Release order

1. Green backend/frontend/E2E checks on the candidate commit.
2. Approve/confirm persistent database placement. Do not use ephemeral local SQLite as the Vercel production database; do not provision or migrate a provider silently.
3. Apply the canonical Vercel project settings in `DEPLOYMENT.md`, then verify a preview/staged deployment contains both services and retains `/api`.
4. Set production JWT/CORS/public API variables directly in the platform; perform controlled DB migration with backup.
5. Verify deployed two-user flow and smoke against the exact commit, then promote and record evidence.

## Verification notes

- Baseline and candidate tests used temporary/local databases only; no production data was read or migrated.
- Browser traces, screenshots and videos are disabled to avoid persisting bearer tokens.
- Direct Playwright browser download failed in this environment. An isolated Chromium 143 binary from the npm-packaged `@sparticuz/chromium` was used for local browser execution; that temporary dependency is not added to the project. CI installs the standard Playwright-managed browser.
- Vercel project settings were corrected to repository-root Services and Node 22 after the code commit. Environment variables, production data and the published production deployment were not changed.

## Final local verification

- Python 3.12, pinned requirements: **31 pytest tests passed** (3 dependency deprecation warnings).
- Migration tests cover clean upgrade, repeated upgrade, schema parity and existing-message preservation.
- Node 22.23.4: **TypeScript check passed**; **Next.js production build passed**.
- Playwright 1.64.1 / local Chromium 143: **2 browser scenarios passed in 27.2s**. Desktop uses reduced motion; Pixel 7 emulation uses normal motion. This is Chromium mobile emulation, not a physical Android device test.
- Frontend API-boundary guard, shell syntax, `git diff --check`, and Python compileall passed. Five unused legacy schema scaffolds had unresolved template tokens that prevented Python compilation; those tokens were replaced with explicit empty scaffolds, without inventing fields.
- No client page runtime errors were observed in the two browser scenarios. Full console/network error certification and load testing are not claimed.

## Remote verification and current blocker

Code commit: `c40cdda0bfde0b34c2ab75f778a679098c495677`. Draft PR: https://github.com/babakbadel/Hamnavaz/pull/17.

- GitHub CI run https://github.com/babakbadel/Hamnavaz/actions/runs/40217187133 completed **SUCCESS**: frontend, backend, E2E. The standard CI Playwright browser passed both scenarios in 21.8 seconds, removing the local fallback-browser uncertainty for the tested code.
- The initial automatic frontend-only preview returned Next.js 404 at `/api/health` despite READY.
- The project root/framework/Node settings were corrected to root / Services / 22.x. A new preview, `dpl_D9MJsQnF9KwyGGGzmLJa9ZatqaGn`, reached READY and build logs confirmed Python 3.12 and backend dependency installation.
- Requests now reach the backend Python service. Preview `/api/health`, OpenAPI, search and protected route return 500 because application import fails when SQLAlchemy parses the configured `DATABASE_URL`: `Could not parse SQLAlchemy URL from given URL string`.
- The configured database credential/value was not retrieved or printed. Do not replace an invalid production/preview database setting with ephemeral SQLite merely to make smoke green.
- Next dependency: confirm whether the user already has a persistent database, configure a valid URL directly in Vercel, verify the appropriate driver/schema/backup, and then perform a controlled migration and deployed flow verification. Creating a new provider was previously deferred and is not silently done here.
- The published production domain still points to the old baseline; no merge or promotion was performed. Epic #5 remains open.

The follow-up commit records remote evidence only; the green CI above belongs to the tested code commit named explicitly here.

## Neon setup continuation — 2026-10-26

The owner has now confirmed the Neon database exists. See `NEON_SETUP.md` for the prepared Psycopg 3 wiring, 38 passing local tests, successful root build, and remaining credential/migration/live-flow verification. The older “confirm whether a database exists” dependency is resolved; secure connection configuration is still pending.
