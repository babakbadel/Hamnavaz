# Agent Coordination

- Source of truth: `main`.
- Before changing a file, read its current `main` version.
- Do not overwrite concurrent work from another agent.
- Record material architecture/integration changes in `CHANGELOG.md` or the relevant decision/audit document.
- Grok and ChatGPT use the same repository and must treat the latest `main` commit as authoritative.
- Production completion requires CI, Vercel deployment, and production smoke verification; a code commit alone is not a release.
