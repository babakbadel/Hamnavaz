---
name: github-actions-debugging
description: Systematically diagnoses and fixes failing GitHub Actions workflows using run status, job logs, local reproduction, minimal fixes, and verification. Use when CI is failing, a workflow is not running, a build/test job is red, or GitHub Actions logs need investigation.
---

# GitHub Actions Debugging

## Goal
Find the root cause from evidence, reproduce it when possible, make the smallest safe fix, and prove the fix.

## Workflow

1. **Check whether a run exists**
   - Inspect recent workflow runs for the target branch/commit.
   - If there is no run, diagnose triggers, workflow location, branch filters, Actions state, and permissions before treating the problem as a build failure.

2. **Identify the failing job**
   - Record job name, conclusion, failing step, commit SHA, and environment.
   - Do not guess from the workflow YAML alone.

3. **Read the logs**
   - Start with the failing step.
   - Capture the first meaningful error and the surrounding command/output.
   - Ignore secondary cascade errors until the root cause is fixed.

4. **Reproduce locally**
   - Run the same package-manager, test, lint, migration, or build command locally when practical.
   - Match the CI runtime versions as closely as possible.
   - Check lockfiles, environment variables, working directories, generated files, and dependency versions.

5. **Fix minimally**
   - Change the smallest relevant file(s).
   - Never fabricate lockfiles, secrets, successful test results, or workflow runs.
   - Preserve existing product behavior unless the failure itself requires a behavior change.

6. **Verify**
   - Run the relevant local command again.
   - Inspect the resulting Git diff.
   - Commit the fix with a focused message.
   - Inspect the new GitHub Actions run and logs when the connector exposes them.

## Common checks

### Workflow does not run
- Confirm the workflow is under `.github/workflows/`.
- Check `on.push` / `on.pull_request` branch filters.
- Check whether the changed commit actually matches the trigger.
- Check repository Actions availability and permissions.

### Node / Next.js
- Verify `package.json` and lockfile are consistent.
- `npm ci` requires a committed compatible lockfile.
- If no lockfile exists, do not claim `npm ci` works; generate a real lockfile in a reproducible Node environment or deliberately use `npm install` according to project policy.
- Verify the CI working directory points to the active frontend.

### Python
- Verify the requirements file path relative to the workflow working directory.
- Match the configured Python version.
- Run migrations before tests when the test suite requires the database schema.

### Secrets and environment
- Never print secret values into logs.
- Verify required secret names and non-secret configuration.
- Distinguish missing configuration from application-code failures.

## Evidence rules

- A missing workflow run is not a failed workflow.
- A failed step is not necessarily the root cause; use the earliest meaningful error.
- Never say CI is green without an actual successful run.
- Never say a fix was verified remotely unless the resulting workflow run was observed.
- If remote logs are unavailable, clearly separate local verification from remote verification.

## Exit criteria

A debugging task is complete only when:

- the root cause is identified with evidence;
- the fix is committed;
- the relevant local check passes, when executable;
- and the GitHub Actions result is checked when available.
