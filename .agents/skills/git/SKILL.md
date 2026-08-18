---
name: git
description: Professional Git workflow for Hamnavaz. Use when creating branches, reviewing diffs, committing changes, resolving conflicts, rebasing, reverting, tagging, or preparing safe changes for GitHub.
---

# Git — Hamnavaz Workflow

## Rules

- Inspect repository state before changing Git history: `git status --short --branch`.
- Review the diff before every commit: `git diff` and `git diff --cached`.
- Keep commits small, coherent, and reversible; do not mix unrelated refactors with features.
- Prefer descriptive imperative commit messages.
- Never commit secrets, `.env`, tokens, credentials, local databases, virtual environments, build output, or large generated logs.
- Never use force-push on shared branches unless explicitly requested.
- Before rebasing or resetting, verify the target branch and preserve uncommitted work.
- For conflicts, understand both sides before resolving; never blindly choose ours/theirs.
- Run relevant tests and checks before pushing.
- For GitHub work, inspect repository/branch/PR context before writing or publishing changes.

## Hamnavaz default workflow

1. Check status and current branch.
2. Inspect relevant files and existing conventions.
3. Make the smallest coherent change.
4. Run tests/lint/type checks relevant to the change.
5. Review the complete diff.
6. Commit with a focused message.
7. Push only when requested or when the workflow explicitly requires publishing.

## Safety

Do not run destructive commands such as `git reset --hard`, `git clean -fd`, history rewrites, or force pushes without explicit confirmation when existing work could be lost.

## Verification

After Git operations, verify:
- branch is correct
- working tree state is understood
- commit contains only intended files
- remote tracking is correct when pushing
