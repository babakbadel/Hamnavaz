---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering.
license: MIT
source: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---
# Hamnavaz React / Next.js Best Practices

Apply these rules when writing, reviewing or refactoring the Hamnavaz frontend.

## Priority order
1. Eliminate request waterfalls.
2. Optimize bundle size.
3. Optimize server-side performance.
4. Use disciplined client-side data fetching.
5. Minimize unnecessary re-renders.
6. Optimize rendering.
7. Optimize JavaScript hot paths.
8. Use advanced patterns only when justified.

## Required checks
- Parallelize independent async work with Promise.all where appropriate.
- Avoid unnecessary client components and large client bundles.
- Prefer direct imports over broad barrel imports when bundle impact matters.
- Keep server/client boundaries intentional and minimize serialized data.
- Deduplicate client requests and use a cache/data-fetching library when appropriate.
- Memoize expensive work only when measurement or clear cost justifies it.
- Keep effects focused; derive state during render where possible.
- Respect loading, error and empty states.
- Preserve accessibility and reduced-motion behavior.
- Verify production builds and key routes after changes.

## Production rule
Do not declare a feature complete from a successful build alone. Verify the browser route, API response, console errors and key interactive elements.
