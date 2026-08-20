# Hamnavaz Design System Skill

## Goal
Design Hamnavaz as a distinctive, premium Persian RTL music community product using current 2026 UI/UX practice rather than generic SaaS templates.

## Design references
Use the installed/available UI/UX and frontend-design guidance as principles: information hierarchy, task-first UX, responsive mobile-first layouts, accessibility, interaction states, visual rhythm, intentional typography, and distinctive art direction.

## Product priorities
1. Discovery must be the first-class experience: find a fellow musician by city, instrument, skill, genre, collaboration type, availability, and other useful filters.
2. Global navigation: Home, Profile, Instrument, Hamnavaz, Messages, Collaborations, Finance, Login/Logout.
3. Mobile navigation: hamburger menu + snack/quick-action menu + bottom navigation.
4. Home sections: musician search, online musicians, teachers, instruments, charity performances, Hamnavaz story, music created through Hamnavaz, collaborations that became concerts, concerts and ticket sales.

## Visual direction
- Persian RTL.
- Dark premium music-platform aesthetic.
- Deep navy/near-black base with restrained gold accents.
- High contrast and accessible text.
- Large editorial typography and generous spacing.
- Rounded cards, but avoid repetitive dashboard-card grids.
- Use visual variety: editorial sections, musician portraits, album/art cards, event posters, avatars, subtle gradients, layered surfaces, and meaningful empty states.
- Avoid excessive glassmorphism, neon overload, generic purple AI gradients, and template-looking UI.

## Typography
Prefer beautiful Persian-capable fonts with strong readability. Candidate families include Vazirmatn, Estedad, Peyda, and modern Persian display/body combinations. Choose deliberately by role rather than loading many fonts. Keep Latin numerals and English labels harmonious with the Persian family.

## UX rules
- Every interactive control needs hover/focus/pressed/disabled/loading/error states.
- Mobile first; touch targets should be comfortable.
- Search filters should remain understandable when many filters are selected.
- Use progressive disclosure for advanced filters.
- Preserve user context after navigation and filtering.
- Do not invent functionality that the backend cannot support; distinguish mocked content from live API data.
- Accessibility: semantic HTML, keyboard focus, contrast, labels, reduced-motion consideration.

## 2026 quality bar
Evaluate every major screen against contemporary award-level digital product standards: clear narrative, strong art direction, distinctive typography, purposeful motion, responsive composition, accessibility, performance, and memorable brand identity. Do not claim a design is an award winner or copy a specific award-winning work; use current award-level qualities as inspiration.

## Implementation
- Next.js + React + TypeScript + Tailwind.
- Keep components reusable and data-driven.
- Keep API/domain logic separate from presentation.
- Prefer CSS/Tailwind over unnecessary client-side JavaScript for visual effects.
- Use optimized responsive images and avoid layout shift.
- Do not replace existing product functionality just to change appearance.
