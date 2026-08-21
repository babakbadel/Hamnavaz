---
name: vercel-react-best-practices
description: Performance and quality guidance for React and Next.js code in Hamnavaz.
---

# Vercel React Best Practices Skill

Based on Vercel's public React/Next.js best-practices guidance. Source: https://github.com/vercel/vercel-plugin/tree/main/skills/react-best-practices

## Rules for Hamnavaz
- Prefer Server Components by default; use Client Components only for interactivity.
- Eliminate request waterfalls and keep data fetching close to the server boundary when appropriate.
- Avoid unnecessary client JavaScript and large dependencies.
- Keep list rendering stable with proper keys and pagination.
- Avoid unnecessary re-renders; memoization is used only when it provides measurable value.
- Handle loading, error and empty states explicitly.
- Preserve accessibility and keyboard/focus behavior.
- Keep API contracts typed and centralized.
- Verify production builds and runtime behavior after changes.
