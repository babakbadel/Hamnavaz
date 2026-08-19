# Hamnavaz Vercel Deployment Skill

## Purpose
Use this skill when developing, deploying, debugging, or configuring the Hamnavaz project on Vercel.

## Project architecture
- Repository: `babakbadel/Hamnavaz`
- Production frontend: `frontend/`
- Frontend stack: Next.js + React + TypeScript + Tailwind CSS
- Backend: FastAPI
- Vercel should deploy the Next.js frontend, not the FastAPI backend.

## Vercel project settings
- Framework Preset: Next.js
- Root Directory: `frontend`
- Production Branch: `main`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave default/empty for Next.js

## Deployment workflow
1. Inspect GitHub `main` before changing deployment settings.
2. Verify `frontend/package.json` contains `next` and the expected build script.
3. Verify the intended UI exists under `frontend/app/`.
4. Deploy from `main` with Root Directory `frontend`.
5. Inspect build logs if deployment fails.
6. Verify the resulting deployment URL and compare the deployed UI with the current GitHub frontend.
7. Never claim a deployment was changed or verified unless the Vercel tool confirms it.

## Common Next.js issue
If `output: "export"` is enabled, dynamic routes such as `/collaboration/[id]` require `generateStaticParams()`. Prefer normal Next.js server deployment unless static export is an explicit requirement.

## Product UI baseline
The Hamnavaz mobile-first UI should include:
- RTL Persian layout
- dark modern music-platform aesthetic
- responsive navigation
- mobile hamburger menu
- Home/search experience
- login/profile navigation
- musician discovery and collaboration flows

## Safety
Do not overwrite or delete existing frontend code merely to fix a Vercel configuration issue. First identify the actual deployed commit, branch, root directory, and build configuration.