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
