# Hamnavaz Finalization Checklist

## Product
- [x] Home online musicians use canonical API
- [x] Musician discovery supports canonical filters
- [x] Profile integration uses backend APIs
- [x] Collaboration request creation/inbox/accept/reject integrated
- [x] Messaging integration uses authenticated API
- [ ] Favorites/ratings/notifications production E2E verification

## Quality gates
- [x] Backend CI workflow exists
- [x] Frontend typecheck/build workflow exists
- [x] Production smoke workflow exists
- [x] Production smoke runs on every `main` push
- [ ] Latest main commit has a green CI run
- [ ] Latest main commit has a green Vercel deployment
- [ ] Production smoke passes against that deployment

## Release rule
The project is not declared production-complete until all unchecked quality gates are verified green. GitHub `main` is the source of truth for coordination between ChatGPT and Grok.

## 2026-10-25 candidate verification (not production acceptance)

- [x] Local pinned-requirements pytest: 31 passed.
- [x] Migration-backed tests from a clean database and legacy messages adoption.
- [x] Local Node 22 typecheck and production build.
- [x] Desktop/mobile browser core flow: 2 passed.
- [x] Active frontend API boundary and Python compilation checks.
- [ ] Candidate GitHub CI green.
- [ ] Persistent production database and controlled migration verified.
- [ ] Canonical Vercel root/service settings and dual-runtime preview verified.
- [ ] Exact candidate production smoke and real-user flow verified.

See `RELEASE_READINESS.md` and `DEPLOYMENT.md`. Do not close Epic #5 on local verification alone.
