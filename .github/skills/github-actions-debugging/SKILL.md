---
name: github-actions-debugging
description: Systematically diagnoses and fixes failing GitHub Actions workflows using run status, job logs, local reproduction, minimal fixes, and verification. Use when CI is failing, a workflow is not running, a build/test job is red, or GitHub Actions logs need investigation.
---

# GitHub Actions Debugging

## Goal
Find the root cause from evidence, reproduce it when possible, make the smallest safe fix, and prove the fix.

## Workflow

1. Check whether a run exists. Inspect recent workflow runs for the target branch/commit. If there is no run, diagnose triggers, workflow location, branch filters, Actions state, and permissions before treating the problem as a build failure.
2. Identify the failing job. Record job name, conclusion, failing step, commit SHA, and environment. Do not guess from workflow YAML alone.
3. Read the logs. Start with the failing step, capture the first meaningful error and surrounding command/output, and ignore cascade errors until the root cause is fixed.
4. Reproduce locally when practical using the same package manager, test, lint, migration, or build command and closely matching CI runtime versions.
5. Fix minimally. Never fabricate lockfiles, secrets, successful test results, or workflow runs. Preserve product behavior unless the failure requires a change.
6. Verify the relevant local command, inspect the diff, commit the focused fix, and inspect the resulting GitHub Actions run when available.

## Common checks

### Workflow does not run
- Confirm the workflow is under `.github/workflows/`.
- Check `on.push` and `on.pull_request` branch filters.
- Check that the changed commit matches the trigger.
- Check repository Actions availability and permissions.

### Node / Next.js
- Verify `package.json` and lockfile consistency.
- `npm ci` requires a committed compatible lockfile.
- If no lockfile exists, do not claim `npm ci` works; generate a real lockfile in a reproducible environment or deliberately use `npm install` according to project policy.
- Verify CI points to the active frontend.

### Python
- Verify requirements path relative to the workflow working directory.
- Match the configured Python version.
- Run migrations before tests when the suite requires the database schema.

### Evidence rules
- A missing workflow run is not a failed workflow.
- A failed step is not necessarily the root cause; use the earliest meaningful error.
- Never say CI is green without an actual successful run.
- Never claim remote verification unless the resulting workflow run was observed.
- If remote logs are unavailable, separate local verification from remote verification.

## Exit criteria
- Root cause identified with evidence.
- Fix committed.
- Relevant local check passes when executable.
- GitHub Actions result checked when available.
