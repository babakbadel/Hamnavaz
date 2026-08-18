---
name: react
description: Production React guidance for Hamnavaz. Use when creating or refactoring components, hooks, state, composition, rendering, client interactions, data fetching, or React performance.
---

# React — Hamnavaz Skill

## Core principles

- Prefer small, composable components with clear responsibilities.
- Keep rendering pure; do not perform side effects during render.
- Use state only for values that truly change over time and affect rendering.
- Do not use `useEffect` for derived values or computations that can happen during render.
- Keep event-driven logic in event handlers rather than effects.
- Preserve stable keys for lists; never use array indexes when item identity can change.
- Avoid unnecessary prop drilling by improving component boundaries or using appropriate context/state mechanisms.
- Prefer composition over boolean-prop explosions and overly generic components.
- Keep browser-only behavior in client components.

## Performance

Apply Vercel React best practices when relevant:
- eliminate request waterfalls and parallelize independent async work
- minimize client JavaScript and bundle size
- avoid unnecessary re-renders
- avoid expensive work during render
- use dynamic imports for genuinely heavy, non-critical client features
- keep server-rendered data on the server where possible

Do not optimize prematurely; measure or identify a concrete bottleneck first.

## Hamnavaz UI

- React components must support RTL Persian content.
- Preserve the project's design system instead of introducing one-off styling patterns.
- Keep accessibility in component behavior: semantic elements, keyboard interaction, labels, focus states, and appropriate ARIA only when needed.
- Frontend components must not reproduce backend business rules; call the FastAPI API for authoritative state.

## Verification

After React changes:
1. Run TypeScript/lint checks.
2. Test affected interaction states.
3. Check loading, empty, error, and success states.
4. Check mobile/responsive behavior.
5. Check unnecessary client boundaries and re-render risks.
