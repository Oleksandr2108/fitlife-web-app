# Phase 10 — Production Polish

**Status:** Completed  
**Purpose:** Complete performance, accessibility, responsive, SEO, deployment, and documentation readiness.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–9 are complete.

The application already includes:

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- Vitest
- dark/light themes
- mobile-first responsive AppShell
- onboarding
- personalized workout plan
- workout library/details
- active workout session
- accurate timer + pause/resume/rest
- workout audio
- persisted workout history
- Progress Dashboard
- custom animated SVG Activity Chart
- Nutrition library
- Recipe Details
- UTM attribution
- firstTouch/currentTouch attribution
- anonymous visitor ID
- session ID
- typed analytics events
- analytics provider abstraction
- SPA page views
- analytics debug panel
- Phase 8.5 stabilization/refactoring

We are starting the final phase:

PHASE 10 — FINAL PRODUCTION POLISH

Goals:

- production readiness
- performance improvements
- route-level code splitting
- responsive QA
- accessibility QA
- SEO / metadata
- WebView readiness
- error handling
- cleanup
- deployment readiness
- final documentation
- final regression testing

IMPORTANT:

Do NOT add major new product features.
Do NOT redesign the application.
Do NOT add backend/auth/PWA.
Do NOT replace existing architecture.

This phase is about improving quality, reliability,
performance and presentation of the existing product.

--------------------------------------------------
1. INSPECT THE ENTIRE PROJECT FIRST
--------------------------------------------------

Before editing inspect:

- package.json
- router configuration
- all page routes
- AppShell/AppLayout
- global CSS
- Tailwind theme tokens
- loading states
- error states
- query hooks
- Zustand stores
- analytics implementation
- Vercel configuration
- index.html
- public assets
- README
- test setup
- existing lazy imports if any
- image loading behavior
- accessibility patterns

Also inspect the previous audit findings and ensure resolved issues
remain resolved.

Before implementing briefly report:

- current bundle/code splitting status
- current routing architecture
- current metadata/SEO state
- current README state
- any remaining production risks
- files you plan to change

Then implement.

--------------------------------------------------
2. RUN BASELINE CHECKS FIRST
--------------------------------------------------

Before modifying code run:

npm run build
npm run lint
npm run test

Report current status.

Do not suppress warnings.

Record current production chunk sizes from the Vite build output
so improvements can be compared later.

--------------------------------------------------
3. ROUTE-LEVEL LAZY LOADING
--------------------------------------------------

Implement route-level code splitting where appropriate.

The app currently has multiple feature pages:

- Home
- Onboarding
- Plan
- Workouts
- Workout Details
- Workout Session
- Progress
- Nutrition
- Recipe Details
- Not Found

Use:

React.lazy()
Suspense

or the clean equivalent for the current router architecture.

Do NOT lazy-load tiny shared primitives.

Good candidates are route-level page modules.

Goal:

reduce initial JS needed to render the first route.

--------------------------------------------------
4. ROUTE LOADING FALLBACK
--------------------------------------------------

Create/reuse a polished route-level loading fallback.

Requirements:

- uses existing design system
- dark/light support
- mobile-first
- no layout-breaking giant spinner
- accessible
- subtle

Prefer skeleton/compact branded loading state.

Do not duplicate separate loaders for every lazy page unless necessary.

--------------------------------------------------
5. ANALYTICS DEBUG PANEL CODE SPLITTING
--------------------------------------------------

The Analytics Debug Panel is only needed when:

?debugAnalytics=true

Ensure it does not unnecessarily inflate the normal initial bundle.

If architecture allows cleanly:

lazy-load the debug panel only when enabled.

Do not complicate analytics runtime just for tiny savings.

Measure before/after where possible.

--------------------------------------------------
6. BUNDLE REVIEW
--------------------------------------------------

After lazy loading inspect Vite build output.

Identify:

- initial entry chunk
- route chunks
- unusually large chunks
- duplicate heavy dependencies

Do not implement manual chunking unless there is a verified reason.

Do NOT blindly configure rollup manualChunks.

Only optimize meaningful issues.

--------------------------------------------------
7. DEPENDENCY CLEANUP
--------------------------------------------------

Inspect package.json and source imports.

Identify packages that are:

- unused
- obsolete
- duplicate-purpose
- incorrectly classified as runtime/dev dependency

Remove only dependencies that are confidently unused.

Do not upgrade all packages.

Do not change versions unless needed to fix a real problem.

--------------------------------------------------
8. DEAD CODE CLEANUP
--------------------------------------------------

Remove clearly obsolete code such as:

- abandoned placeholder pages
- old demo components
- unused temporary utilities
- commented-out blocks
- debug console.log statements
- obsolete mock implementations

Do NOT delete backend-ready abstractions merely because the backend
is not implemented yet.

Examples that may intentionally remain:

- api client
- service abstractions
- attribution types
- analytics provider interfaces

Use judgment.

--------------------------------------------------
9. CONSOLE / DEBUG CLEANUP
--------------------------------------------------

Search for:

console.log
console.warn
console.error

Production application should not contain accidental debugging logs.

Keep only intentional logging such as:

- development-only analytics provider
- meaningful error diagnostics where appropriate

Ensure analytics debug output does not spam normal production usage.

--------------------------------------------------
10. RESPONSIVE QA — ALL ROUTES
--------------------------------------------------

Audit every major route:

/
 /onboarding
 /plan
 /workouts
 /workout/:id
 /workout/:id/session
 /progress
 /nutrition
 /nutrition/:id
 invalid route / 404

Validate:

320px
360px
390px
430px
768px
1024px
1440px

Look for:

- horizontal overflow
- clipped controls
- fixed widths
- min-width issues
- nowrap issues
- card overflow
- long text
- SVG overflow
- charts
- filter chips
- 7-day grids
- dialogs
- recipe macros
- analytics debug panel
- bottom navigation
- fixed workout controls
- hero sections

Do not hide problems using body overflow-x hidden.

Fix root causes.

--------------------------------------------------
11. MOBILE VIEWPORT
--------------------------------------------------

Audit viewport handling.

Ensure index.html has an appropriate mobile viewport meta tag.

Avoid layouts depending incorrectly on legacy 100vh behavior.

Where full-height mobile views are used,
prefer modern viewport units where safe:

dvh
svh

or appropriate fallbacks.

Especially inspect:

Workout Session
dialogs
drawers
debug panel

Do not change dimensions unnecessarily.

--------------------------------------------------
12. SAFE AREA SUPPORT
--------------------------------------------------

Ensure mobile fixed elements respect:

env(safe-area-inset-top)
env(safe-area-inset-bottom)

where needed.

Inspect:

- bottom navigation
- workout session controls
- debug drawer
- sticky/fixed CTA sections

Do not add large artificial padding on desktop browsers.

--------------------------------------------------
13. TOUCH TARGETS
--------------------------------------------------

Audit mobile interaction targets.

Important buttons/controls should generally be comfortably tappable.

Inspect:

- Header theme toggle
- bottom navigation
- filters
- session controls
- chart period controls
- dialogs
- debug panel close button
- recipe/workout cards

Avoid tiny icon-only controls.

--------------------------------------------------
14. HOVER-ONLY BEHAVIOR
--------------------------------------------------

Ensure no essential functionality relies on hover.

Hover enhancements are acceptable on desktop,
but touch users must get full functionality.

Inspect:

- cards
- tooltips
- chart
- filters
- menus
- debug panel

--------------------------------------------------
15. KEYBOARD ACCESSIBILITY
--------------------------------------------------

Perform a keyboard-navigation audit.

Using Tab/Shift+Tab/Enter/Space/Escape,
the user must be able to navigate primary functionality.

Check:

- Header
- Home CTAs
- Onboarding
- filters
- cards/links
- workout controls
- dialogs
- Activity Chart controls
- Nutrition search
- Debug Panel

Ensure visible focus styles exist.

Do not use outline-none without an equivalent focus-visible style.

--------------------------------------------------
16. LANDMARKS / SEMANTICS
--------------------------------------------------

Audit:

- main
- header
- nav
- footer
- section
- article
- ordered lists
- forms

Ensure normal pages have one primary <main> landmark.

Avoid unnecessary nested main elements.

Ensure headings follow logical structure.

Typical:

h1 → h2 → h3

Do not choose heading tags only based on visual size.

--------------------------------------------------
17. BUTTON / LINK SEMANTICS
--------------------------------------------------

Use:

button
for actions

Link / anchor
for navigation

Do not use clickable divs/spans.

Ensure disabled controls use real disabled semantics where applicable.

--------------------------------------------------
18. ICON BUTTON ACCESSIBILITY
--------------------------------------------------

Audit all icon-only buttons.

Each must have a meaningful accessible name.

Examples:

- theme toggle
- sound toggle
- close dialog
- close debug panel
- timer controls if icon only
- clear search

Use:

aria-label

or visible text where appropriate.

--------------------------------------------------
19. DIALOG ACCESSIBILITY
--------------------------------------------------

Review existing dialogs/drawers.

Especially:

- Exit Workout dialog
- Analytics Debug Panel if modal/drawer

Ensure:

- role/dialog semantics
- aria-modal where appropriate
- meaningful label/title
- initial focus
- Escape closes
- focus restoration
- keyboard focus doesn't easily escape modal content

Do not install a new dialog library unless current implementation
cannot be made robust reasonably.

--------------------------------------------------
20. COLOR CONTRAST
--------------------------------------------------

Recheck both themes.

Inspect:

- text
- muted text
- accent
- buttons
- selected filters
- badges
- links
- form controls
- chart labels
- skeletons
- debug UI

Previously fixed light-theme accent contrast must remain correct.

Do not regress it.

--------------------------------------------------
21. REDUCED MOTION
--------------------------------------------------

Review Framer Motion and CSS transitions.

Ensure:

prefers-reduced-motion

is respected.

Especially:

- page entrances
- onboarding transitions
- workout session
- progress chart
- macro bars
- debug panel

Content should remain immediately understandable with animations disabled.

--------------------------------------------------
22. IMAGE PERFORMANCE
--------------------------------------------------

Audit all images.

Ensure:

- below-fold images use loading="lazy" where appropriate
- important above-fold hero images are not unnecessarily lazy
- width/height or aspect-ratio prevents layout shift where possible
- object-fit is correct
- images are not loaded at absurd dimensions where avoidable

Do not add an image CDN or complex optimization library.

--------------------------------------------------
23. LAYOUT SHIFT
--------------------------------------------------

Inspect loading states and images for CLS-like behavior.

Skeletons should approximately match loaded content dimensions.

Avoid large height jumps between:

loading
→ loaded

especially on:

Home
Workouts
Progress
Nutrition
Recipe Details

--------------------------------------------------
24. TANSTACK QUERY FINAL REVIEW
--------------------------------------------------

Ensure:

- query keys remain centralized
- no direct mock imports from UI
- loading/error/refetch states are handled
- no duplicate server-like state was reintroduced into Zustand
- staleTime/retry configuration is sensible

Do not tune caching aggressively without need.

--------------------------------------------------
25. ZUSTAND FINAL REVIEW
--------------------------------------------------

Ensure:

- persisted state remains serializable
- stores are not bloated
- selectors remain narrow
- server-like catalog data is not duplicated
- version/migration behavior remains safe
- stale sessions/plans fail safely

Do not redesign stores unless a real bug is found.

--------------------------------------------------
26. ERROR BOUNDARY
--------------------------------------------------

Add a lightweight application-level Error Boundary if one does not exist.

Purpose:

prevent unexpected React render errors from producing a blank screen.

Fallback example:

"Something went wrong"

"We couldn't display this screen."

Actions:

- Try Again / Reload
- Go Home where appropriate

Keep implementation simple.

Do not expose stack traces to users.

In development, normal developer diagnostics may remain available.

--------------------------------------------------
27. QUERY ERROR STATES
--------------------------------------------------

Review pages that use TanStack Query.

Ensure failures do not produce broken blank screens.

Important routes:

- Home previews
- Workouts
- Workout Details
- Progress catalog metadata
- Nutrition
- Recipe Details

Use existing Retry patterns consistently.

Do not introduce an entirely new error design.

--------------------------------------------------
28. NOT FOUND / INVALID ENTITY UX
--------------------------------------------------

Verify:

unknown route
→ intentional 404 page

invalid workout ID
→ Workout not found

invalid recipe ID
→ Recipe not found

Direct URL access should not crash.

Each should have a sensible CTA.

--------------------------------------------------
29. SEO — DOCUMENT TITLE
--------------------------------------------------

Set a professional default page title.

Example direction:

FitLife — Workouts, Progress & Simple Nutrition

Use wording appropriate to the actual product.

Avoid exaggerated health claims.

--------------------------------------------------
30. SEO — META DESCRIPTION
--------------------------------------------------

Add a concise default meta description.

Example direction:

"Build a simple fitness routine with personalized workouts,
progress tracking and easy meal ideas."

Do not claim medical outcomes.

--------------------------------------------------
31. SEO — OPEN GRAPH BASICS
--------------------------------------------------

Add reasonable static Open Graph metadata where appropriate:

og:title
og:description
og:type

If a proper social preview image does not exist,
do NOT invent a broken og:image URL.

Do not add unnecessary Twitter metadata unless useful.

--------------------------------------------------
32. SEO — THEME COLOR
--------------------------------------------------

Inspect:

theme-color

for mobile browsers/WebView.

Use an appropriate app color.

If dynamic theme-color is easy and robust,
support dark/light.

Otherwise use a safe default matching the default dark theme.

Do not over-engineer.

--------------------------------------------------
33. FAVICON / APP IDENTITY
--------------------------------------------------

Inspect current favicon/assets.

Remove default Vite branding.

Ensure the deployed app no longer looks like an untouched Vite starter.

If a FitLife favicon already exists, use it.

If none exists, use an existing simple project asset if appropriate.

Do NOT generate unnecessary complex branding inside this phase.

--------------------------------------------------
34. HTML CLEANUP
--------------------------------------------------

Review index.html.

Remove:

- default Vite title
- default demo assets
- obsolete comments

Ensure:

- lang attribute
- viewport
- title
- description
- theme-color

are appropriate.

--------------------------------------------------
35. WEBVIEW READINESS
--------------------------------------------------

Perform a dedicated WebView audit.

The product should avoid assumptions about desktop browsers.

Verify:

- touch-first controls
- safe area
- mobile viewport
- storage failure safety
- initial UTM capture
- SPA navigation
- active workout behavior
- fixed elements
- keyboard/input behavior
- direct navigation
- no popup dependency
- no hover-only critical UX

Do not add native bridge code.

The goal is WebView-friendly web architecture,
not a native integration.

--------------------------------------------------
36. ACTIVE WORKOUT + NAVIGATION
--------------------------------------------------

Regression-test Phase 8.5 behavior.

Active workout:

navigate away
→ must not keep invisibly ticking

return
→ persisted Resume behavior remains correct

Exit dialog:
→ timer pauses

Do not regress timer/session fixes while adding lazy routes.

--------------------------------------------------
37. UAC / ANALYTICS REGRESSION
--------------------------------------------------

Verify Phase 9 still works after code splitting.

Test:

?utm_source=google
&utm_medium=cpc
&utm_campaign=fitness_test
&utm_content=creative_01
&debugAnalytics=true

Verify:

- attribution captured before page_view
- firstTouch
- currentTouch
- anonymousId
- sessionId
- typed events
- debug panel

Route lazy loading must not create duplicate page_view events.

--------------------------------------------------
38. ANALYTICS PRODUCTION SAFETY
--------------------------------------------------

Normal production URL without:

debugAnalytics=true

must NOT show debug tooling.

Production debug panel with explicit query param
may remain available for this test-assignment demonstration.

Ensure it exposes:

- no secrets
- no environment values
- no sensitive personal information

--------------------------------------------------
39. VERCEL SPA ROUTING
--------------------------------------------------

Inspect current deployment behavior/configuration.

Directly opening:

/progress
/workouts
/nutrition
/workout/<valid-id>

and refreshing must work on Vercel.

If already working correctly:
do not add unnecessary configuration.

If not:
add the smallest correct SPA rewrite configuration.

Do not break static assets.

--------------------------------------------------
40. ENVIRONMENT CONFIGURATION
--------------------------------------------------

Review:

.env.example

Ensure it documents only actual supported public environment variables.

Do not include secrets.

Remember:

Vite `VITE_*` values are exposed to the frontend bundle.

Document this clearly if relevant.

Remove obsolete variables.

--------------------------------------------------
41. README — PROFESSIONAL REWRITE
--------------------------------------------------

Create/refine README.md for the finished test assignment.

README should be concise but professional.

Recommended sections:

# FitLife

## Overview

What FitLife is and what problem it demonstrates.

## Live Demo

Use a placeholder if repository does not know the final URL.

Do not invent a deployment URL.

## Core User Flow

Home
→ Onboarding
→ Plan
→ Workout
→ Completion
→ Progress

## Features

- Personalized 7-day workout plan
- Workout library
- Guided workout session
- Progress analytics
- Nutrition recipes
- Dark/light theme
- UAC attribution
- Analytics event tracking

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Vitest

## Architecture

Explain:

UI
→ Query hooks
→ Services
→ Mock/API-ready data layer

and:

Zustand
→ local client/session state

## UAC & Analytics

Explain:

- UTM capture
- firstTouch
- currentTouch
- anonymousId
- sessionId
- typed events
- provider abstraction
- debug panel

## Analytics Demo

Document a demo URL pattern:

?utm_source=google&utm_medium=cpc&utm_campaign=fitness_test&utm_content=creative_01&debugAnalytics=true

Explain what the reviewer can see.

## Testing

npm run test

## Running Locally

npm install
npm run dev

## Production Build

npm run build

## WebView Readiness

Briefly describe mobile-first/safe-area/touch/UTM support.

## Future Improvements

Keep this short.

Possible future improvements:

- real backend/API
- production analytics provider
- authentication
- user cloud sync

Do not turn README into a 1000-line architecture essay.

--------------------------------------------------
42. README — NO FAKE CLAIMS
--------------------------------------------------

Do not claim:

- real AI-generated plans if logic is deterministic
- medical personalization
- production backend
- Google Analytics integration
- native mobile app
- real Google Play release

Describe only what exists.

--------------------------------------------------
43. CODE COMMENTS
--------------------------------------------------

Review comments.

Remove comments that only narrate obvious code.

Keep comments explaining:

- attribution semantics
- timer decisions
- non-obvious persistence behavior
- chart math
- tricky browser/WebView decisions

Do not over-comment.

--------------------------------------------------
44. TEST COVERAGE FINAL REVIEW
--------------------------------------------------

Inspect all existing Vitest coverage.

High-value logic should remain tested:

- plan generation
- session state machine
- timer
- progress calculations
- streak
- date aggregation
- chart geometry
- recipe filtering
- macro calculation
- attribution parsing
- first/current touch
- analytics context/events

Add missing regression tests only where they protect meaningful behavior.

Do not create hundreds of shallow UI snapshots.

--------------------------------------------------
45. ROUTING + LAZY TESTS
--------------------------------------------------

Ensure lazy route imports do not break:

- direct navigation
- Not Found
- query loading
- restored session
- analytics page views

Add tests only where current test architecture supports them cleanly.

--------------------------------------------------
46. FINAL MANUAL FLOW
--------------------------------------------------

Validate from a clean browser state:

1. Open Home
2. Start onboarding
3. Choose goal
4. Choose duration
5. Generate plan
6. Open plan
7. Open workout
8. Start workout
9. Pause/resume
10. Complete workout
11. Open Progress
12. Verify completion
13. Open Nutrition
14. Open recipe
15. Switch theme
16. Reload
17. Verify persisted state remains safe

No console/runtime errors.

--------------------------------------------------
47. FINAL UAC FLOW
--------------------------------------------------

From a clean attribution state open:

/?utm_source=google
&utm_medium=cpc
&utm_campaign=fitness_test
&utm_content=video_01
&debugAnalytics=true

Verify:

page_view
click_start
goal_selected
duration_selected
plan_created
workout_open
workout_started
workout_completed

FirstTouch must remain Google.

Then open a second attributed URL:

?utm_source=instagram
&utm_medium=paid_social
&utm_campaign=retargeting_test
&debugAnalytics=true

Verify:

firstTouch:
Google

currentTouch:
Instagram

--------------------------------------------------
48. LIGHT THEME FLOW
--------------------------------------------------

Repeat representative pages in light theme:

Home
Onboarding
Workouts
Workout Details
Progress
Nutrition
Recipe Details
Debug Panel

Check contrast/focus/surfaces.

--------------------------------------------------
49. MOBILE QA MATRIX
--------------------------------------------------

At minimum validate:

320px
360px
390px
430px

For:

Home
Onboarding
Plan
Workouts
Workout Session
Progress
Nutrition
Recipe Details
Analytics Debug Panel

No page-level horizontal scrolling.

--------------------------------------------------
50. DESKTOP QA MATRIX
--------------------------------------------------

Validate representative layouts at:

768px
1024px
1440px

Ensure content does not remain unnecessarily phone-narrow
where the current design is intended to expand.

Do not stretch text lines excessively.

--------------------------------------------------
51. PERFORMANCE QA
--------------------------------------------------

After implementation:

run production build again.

Compare chunk sizes to baseline.

Report:

- before
- after
- initial chunk
- largest route chunks
- whether the previous >500k warning remains

If warning remains but initial load is improved through route splitting,
report it accurately.

Do not fake performance improvements.

--------------------------------------------------
52. FINAL QUALITY COMMANDS
--------------------------------------------------

Run:

npm run build
npm run lint
npm run test

If another valid typecheck command exists,
run it too.

Fix all issues introduced by this phase.

Do not disable lint rules or tests simply to make checks green.

--------------------------------------------------
53. GIT / FILE HYGIENE
--------------------------------------------------

Inspect repository for files that should not be committed:

- build output if ignored
- local env files
- editor temp files
- OS files
- test artifacts
- accidental logs

Ensure .gitignore remains appropriate.

Do not delete legitimate project assets.

--------------------------------------------------
54. NO NEW SCOPE
--------------------------------------------------

DO NOT implement:

- authentication
- backend
- database
- user accounts
- PWA
- push notifications
- native mobile bridge
- AI workout generation
- AI recipe generation
- calorie diary
- social features
- payments
- real ad platform SDK
- real analytics SDK

The project is feature-complete for this test assignment.

--------------------------------------------------
55. DEFINITION OF DONE
--------------------------------------------------

Phase 10 is complete when:

Route-level lazy loading
→ implemented where useful

Initial bundle
→ reviewed/improved

All routes
→ still work

Direct Vercel routes
→ work

Mobile 320/360/390/430
→ no layout overflow

Tablet/desktop
→ polished

Dark theme
→ polished

Light theme
→ polished

Keyboard navigation
→ usable

Focus states
→ visible

Dialogs
→ accessible

Reduced motion
→ respected

Images
→ reasonable loading behavior

Error Boundary
→ implemented if missing

404
→ intentional

Invalid workout
→ safe

Invalid recipe
→ safe

SEO metadata
→ cleaned up

Vite starter branding
→ removed

WebView readiness
→ verified

UAC attribution
→ still works

Analytics events
→ still work

Debug panel
→ only appears when explicitly enabled

README
→ complete and accurate

.env.example
→ accurate

build
→ passes

lint
→ passes

tests
→ pass

--------------------------------------------------
56. FINAL REPORT
--------------------------------------------------

At the end report:

1. baseline quality-check results
2. route-level lazy loading changes
3. before/after bundle sizes
4. dependencies removed/retained
5. dead code removed
6. responsive fixes
7. accessibility fixes
8. semantic/landmark fixes
9. reduced-motion fixes
10. image/loading improvements
11. Error Boundary implementation
12. SEO/metadata changes
13. favicon/Vite branding cleanup
14. WebView readiness changes
15. Vercel routing status
16. analytics/UAC regression results
17. README changes
18. .env/.gitignore changes
19. tests added/changed
20. final build result
21. final lint result
22. final test result and total test count
23. known non-blocking limitations
24. exact files changed

Do not add Phase 11.

This is the final implementation phase.
~~~~

