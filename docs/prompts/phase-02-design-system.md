# Phase 2 — Design System

**Status:** Completed  
**Purpose:** Create the mobile-first visual system and reusable application shell.

## Prompt

~~~~text
Read AGENTS.md completely before making changes.

Phase 1 is complete.

TanStack Query has already been integrated into the project.

We are starting Phase 2:

Design System
→ App Layout
→ Header
→ Mobile Navigation
→ Motion Foundations

IMPORTANT:
This project is MOBILE-FIRST.

The mobile experience is the primary target.
Desktop should enhance the same design, not replace it.

Do not start implementing the full Home page yet.

First inspect the current Phase 1 implementation and reuse existing architecture.

## Goals

Create a consistent visual foundation that all future FitLife screens can use.

The UI should feel:
- modern
- clean
- lightweight
- trustworthy
- fitness-oriented
- polished
- mobile-app-like

Avoid a generic AI-generated landing page aesthetic.

## 1. Mobile-first rules

Design and implement from small screens first.

Primary target widths:
- 360px
- 390px
- 430px

Then enhance for:
- tablet
- desktop

Critical requirements:
- no horizontal overflow
- no desktop-only interactions
- no dependency on hover for important actions
- touch-friendly controls
- comfortable spacing
- mobile-safe fixed elements
- readable typography on small screens

Do not begin with desktop layouts and then shrink them down.

## 2. Design tokens

Create a simple reusable design token foundation using Tailwind CSS.

Establish consistent tokens for:
- background
- surface
- primary text
- secondary text
- accent
- borders
- spacing
- border radius
- shadows
- container width

Use the current FitLife visual direction from AGENTS.md.

Do not scatter arbitrary colors throughout components.

Keep the system small and practical.

## 3. Global styles

Refine the global Tailwind foundation.

Include:
- body background
- text color
- font smoothing
- selection behavior if useful
- root min-height
- safe default line-height
- sensible focus styles

Do not add excessive global CSS.

## 4. Typography system

Create a clear responsive typography hierarchy.

Include reusable patterns for:
- hero heading
- page heading
- section heading
- card title
- body text
- metadata / helper text

Use mobile-friendly sizes first.

Avoid excessive typography variants.

## 5. Shared layout primitives

Create reusable primitives where they provide clear value.

Examples:
- AppContainer
- Section
- PageShell

The exact names may differ if there is a better fit with the existing architecture.

Requirements:
- consistent horizontal padding
- consistent max width
- mobile-first
- no random widths in future pages

Do not over-abstract layout.

## 6. Reusable Button component

Create a reusable Button component.

Recommended variants:
- primary
- secondary
- ghost

Recommended sizes:
- default
- large

Requirements:
- minimum comfortable mobile touch height
- focus-visible styles
- disabled state
- consistent icon spacing
- support optional Lucide icon
- semantic button behavior
- no excessive variants

Avoid giant rounded pills unless the design clearly needs them.

## 7. Reusable surface/card foundation

Create a reusable card/surface primitive only if it improves consistency.

It should support future:
- workout cards
- recipe cards
- progress cards

Do not make every card look identical if product needs differ later.

Keep it lightweight.

## 8. Header

Create a responsive Header.

Mobile-first behavior:
- compact
- FitLife brand/logo text
- primary action if useful
- no crowded desktop navigation on small screens

Desktop may show navigation links.

Do not implement overly complex menus.

Planned primary routes:
- Home
- Workouts
- Nutrition
- Progress

Use React Router links/nav links.

Active state should be clear.

## 9. Mobile bottom navigation

Create a mobile bottom navigation suitable for WebView usage.

Recommended items:
- Home
- Workouts
- Progress

Optional Nutrition can stay in Header/menu if 4 bottom tabs feels too crowded.

Use Lucide React icons.

Requirements:
- active state
- clear text labels
- large enough touch areas
- safe-area support
- fixed/sticky behavior only if it works cleanly
- page content must not be hidden behind it

Use:
env(safe-area-inset-bottom)
where appropriate.

The bottom navigation should be visible on mobile and hidden/replaced appropriately on desktop.

## 10. Application shell

Integrate Header, main content area and mobile navigation into a reusable application layout.

Requirements:
- route content renders cleanly
- correct spacing below Header
- correct bottom padding when mobile navigation is fixed
- no overlap
- works on 360px width
- works on desktop

Do not redesign placeholder pages yet.

## 11. Motion foundations

Set up reusable Framer Motion patterns.

Create a small reusable motion foundation for:
- fade-up reveal
- page entrance
- small stagger
- onboarding step direction later
- subtle scale feedback where useful

Keep durations mostly between:
150ms and 400ms.

Avoid:
- large movements
- bounce-heavy motion
- looping decorative motion
- animations on every element

Respect prefers-reduced-motion.

Use Motion only where it provides real UX value.
Use CSS transitions for simple hover/focus interactions.

## 12. Reduced motion

Ensure Motion patterns respect reduced-motion preferences.

The app must remain fully usable with animations reduced or disabled.

Do not make animation required to understand state.

## 13. Placeholder pages

Keep the current placeholder pages minimal.

You may wrap them in the new app layout to verify consistency.

Do not build:
- Home sections
- onboarding
- workout cards
- nutrition content
- workout timer
- progress dashboards

Those belong to later phases.

## 14. Navigation UX

Ensure:
- browser back works
- React Router navigation works
- active route states work
- direct URL navigation works
- 404 still works
- mobile navigation does not interfere with WebView-style usage

## 15. Accessibility

Check:
- semantic navigation landmarks
- accessible buttons
- visible focus
- correct aria labels where needed
- touch targets
- icon + text readability
- keyboard navigation

Do not use clickable divs.

## 16. Code quality

Follow AGENTS.md.

Requirements:
- no any
- no unused imports
- no unnecessary abstractions
- no giant components
- no duplicate layout logic
- no hardcoded random spacing values if reusable tokens already exist

## 17. Before editing

First briefly report:
- what currently exists from Phase 1
- which files you plan to create/change
- how you will keep the implementation mobile-first

Then implement.

## 18. Validation

After implementation test the layout mentally and technically at:

- 360px
- 390px
- 430px
- tablet
- desktop

Specifically check:
- horizontal overflow
- bottom navigation overlap
- safe-area spacing
- header wrapping
- button sizes
- typography scaling

## 19. Run checks

Run:
- npm run build
- npm run lint

Run typecheck/tests too if scripts exist.

Fix issues introduced by this phase.

## 20. Final response

Summarize:
- design token setup
- typography system
- layout primitives
- Button component
- Header
- mobile bottom navigation
- motion foundation
- reduced-motion support
- files changed
- build/lint/typecheck results
- what is intentionally postponed to Phase 3

Do not start Phase 3.

Phase 3 will be:
Home page
→ Hero
→ Benefits
→ Popular Workouts
→ Nutrition Preview
→ Final CTA
~~~~

