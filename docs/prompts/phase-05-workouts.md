# Phase 5 — Workout Library & Details

**Status:** Completed  
**Purpose:** Build workout discovery, filtering, details, and the session entry point.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–4 are complete.

The project already contains:
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- dark/light theme system
- dark theme as default
- mobile-first AppShell
- Header
- mobile bottom navigation
- shared UI/design system
- mock/backend-ready service architecture
- TanStack Query hooks
- Home page
- onboarding flow
- personalized 7-day workout plan
- persisted onboarding state

We are starting Phase 5:

WORKOUT LIBRARY
→ SEARCH
→ FILTERS
→ WORKOUT DETAILS
→ WORKOUT ENTRY POINT

IMPORTANT:
The project remains MOBILE-FIRST.

Primary target widths:
- 360px
- 390px
- 430px

Then enhance for tablet and desktop.

Both dark and light themes must be fully supported.

Do not redesign working functionality from Phases 1–4.

Do not implement the actual workout session/timer yet.
That belongs to Phase 6.

---

# 1. Product Goal

Build a polished workout discovery experience.

Users should be able to:

1. Open /workouts
2. Browse available workouts
3. Search workouts
4. Filter by category
5. Filter by difficulty
6. Optionally filter by duration if useful
7. Open a workout
8. Understand what the workout contains
9. Press Start Workout

The workout library should feel like part of a real mobile fitness product, not a static list of cards.

---

# 2. Inspect Existing Architecture First

Before modifying anything inspect:

- /workouts placeholder/current page
- /workout/:id implementation
- workout domain types
- workout mock data
- workout service
- TanStack Query hooks
- query keys
- personalized plan workout links
- shared Button/Card/Badge components
- AppShell
- Header
- mobile navigation
- theme tokens
- Motion utilities
- current image handling

Reuse existing architecture.

Do not duplicate:
- Workout types
- query hooks
- service functions
- design primitives

Before editing, briefly report:

- what already exists
- files you plan to change/create
- search/filter architecture
- workout detail architecture
- mobile-first approach

Then implement.

---

# 3. Workout Data Source

Workout data must continue to flow through:

Workout UI
→ useWorkouts() / useWorkout()
→ TanStack Query
→ Service Layer
→ Mock Data currently
→ Real API later

Do NOT import workout mocks directly into pages or components.

Do NOT duplicate the workout catalog in Zustand.

TanStack Query owns server-like workout data.

---

# 4. Workout Library Page

Implement the real:

/workouts

The page should include:

- page heading
- short supporting copy
- search
- category filters
- difficulty filters
- workout result count where useful
- responsive workout grid/list
- loading state
- error state
- empty search/filter state

Suggested copy:

Heading:
"Find Your Workout"

Supporting text:
"Choose a session that fits your goal, time and energy."

Keep copy concise.

---

# 5. Search

Add workout search.

Search should match useful text fields such as:

- title
- description
- category

Keep search client-side because the current dataset is local/mock.

Architecture should remain easy to replace with backend search later.

Requirements:

- controlled input
- case-insensitive
- trimmed query
- clear button when text exists
- search icon using Lucide
- accessible label
- mobile-friendly input height
- no unnecessary submit button

Do NOT add debounce unless there is an actual reason with the current local filtering.

Do not over-engineer search.

---

# 6. Category Filters

Support categories already defined by the domain model.

Expected categories may include:

- Full Body
- Strength
- Cardio
- Core
- Mobility

Do not duplicate category strings if a typed domain representation already exists.

Provide:

All
+ available categories

Use compact touch-friendly filter chips/buttons.

Requirements:

- obvious selected state
- keyboard accessible
- works without hover
- horizontal scrolling on very small screens is acceptable if implemented intentionally
- no page-level horizontal overflow

If using horizontally scrollable chips on mobile:
- keep the page itself from overflowing
- hide scrollbar only if accessibility/usability remains acceptable

---

# 7. Difficulty Filters

Support:

- All
- Beginner
- Intermediate
- Advanced

Use the existing WorkoutDifficulty type.

Do not duplicate domain constants unnecessarily.

The category and difficulty filters should work together.

Example:

Category = Strength
Difficulty = Beginner

should show workouts matching BOTH active filters.

---

# 8. Duration Filter

Add a duration filter only if it improves the UX with the existing dataset.

Possible groups:

- All
- ≤ 10 min
- 11–20 min
- 20+ min

Do not add it just to increase feature count.

If the current workout catalog does not make duration filtering useful,
skip it and explain why in the final summary.

---

# 9. Filter State

Search/filter state is page UI state.

Prefer local React state unless there is a strong reason to persist/share it.

Do NOT put basic temporary workout filters into Zustand.

Do not persist filters to localStorage unless there is a clear product reason.

Optional:
URL search parameters may be used if they improve shareability/back navigation,
but do not introduce unnecessary complexity.

Choose the simplest robust approach.

---

# 10. Derived Filtering

Keep filtering logic outside deeply nested JSX.

Create a small pure helper if appropriate.

Conceptually:

filterWorkouts(workouts, {
  search,
  category,
  difficulty,
  duration,
})

The filtering logic should be:

- deterministic
- easy to understand
- easy to test
- non-mutating

Do not modify the source array.

---

# 11. Workout Results Count

Show a subtle count when useful.

Examples:

"6 workouts"

or

"3 workouts found"

Do not make this a major visual element.

Update it as filters change.

---

# 12. Workout Card

Create or refine a reusable WorkoutCard component.

Each card should communicate:

- workout image
- title
- category
- duration
- difficulty
- equipment requirement where useful

Optional:
- exercise count

Primary interaction:
open workout details.

Use semantic navigation.

Do not make a div with onClick when a Link is appropriate.

The whole card may be navigable if implemented accessibly.

---

# 13. Workout Card Mobile UX

At 360–430px:

- cards should generally use one column
- image should have a consistent aspect ratio
- title should remain readable
- metadata must not become cramped
- CTA/touch area must be comfortable

Tablet/desktop may use:

2 columns
→ 3 columns

depending on available width.

Do not force tiny 2-column cards on narrow mobile screens.

---

# 14. Workout Card Visual Design

Reuse the existing FitLife design system.

Dark theme:
- clear surface separation
- subtle border
- readable muted metadata

Light theme:
- clean white/light surface
- subtle border/shadow

Avoid:
- giant shadows
- excessive gradients
- excessive rounded corners
- too many badges
- visual clutter

Cards should feel consistent with Home workout previews.

If Home already has a workout card implementation,
reuse/refactor it rather than creating a second incompatible card.

---

# 15. Images

Workout images should come from the workout data/domain layer.

Do NOT hardcode random image URLs inside JSX.

Requirements:

- responsive
- object-cover where appropriate
- consistent aspect ratio
- meaningful alt text
- lazy loading for library cards

Handle missing/broken image data gracefully if practical.

---

# 16. Loading State

Use TanStack Query's loading state.

Create a polished workout library skeleton.

The skeleton should roughly match the card layout.

Do not use a giant centered spinner unless there is no better option.

Support both themes.

Avoid excessive animation in skeletons for reduced-motion users.

---

# 17. Error State

If workout loading fails:

Show a useful error state.

Example:

"We couldn't load workouts."

Supporting copy:
"Please try again."

CTA:
"Try Again"

Use TanStack Query refetch.

Do not expose stack traces or raw API errors.

---

# 18. Empty Filter State

If filters/search return zero results:

Show an intentional empty state.

Example:

"No workouts found"

"Try changing your search or filters."

Actions:

Clear Filters

and/or

Reset Search

This is different from a data-loading error.

Do not show a blank grid.

---

# 19. Clear Filters

Provide a clear/reset action when filters are active.

Reset:

- search
- category
- difficulty
- duration if implemented

Return to the full workout catalog.

Do not show Clear Filters unnecessarily when nothing is active.

---

# 20. Workout Details Route

Implement/refine:

/workout/:id

Use the existing route identifier strategy from previous phases.

If the project already uses IDs, keep IDs.

If it already uses slugs consistently, keep slugs.

Do not change identifiers unnecessarily.

Data must come through:

useWorkout(identifier)
→ TanStack Query
→ service

Do not manually search mock data inside the page.

---

# 21. Workout Details Hero

The workout detail screen should immediately communicate:

- image
- title
- short description
- category
- difficulty
- duration
- equipment
- exercise count

Primary CTA:

Start Workout

Mobile-first:
important information should appear quickly without requiring excessive scrolling.

Desktop may use a split visual/content layout.

---

# 22. Workout Metadata

Use concise metadata.

Example:

20 min
Beginner
No equipment
5 exercises

Use Lucide icons where they genuinely improve scanning.

Do not add an icon to every line merely for decoration.

Ensure icon labels remain understandable.

---

# 23. Exercise List

Display all exercises in the workout.

Each exercise row/card should show relevant information such as:

- sequence number
- name
- duration OR repetitions
- rest information where appropriate
- short instructions if available

Example:

01
Bodyweight Squats
40 sec

02
Push Ups
10 reps

03
Plank
40 sec

Keep the list easy to scan on mobile.

Do not build the active workout timer/session yet.

---

# 24. Exercise Data Robustness

Exercise UI should gracefully support:

- timed exercises
- repetition-based exercises
- optional rest duration
- optional instructions

Do not assume every exercise has identical fields.

Use the existing Exercise type and refine it only if necessary.

Avoid fake placeholder values.

---

# 25. Start Workout CTA

The workout details page needs a real Start Workout action.

However:

DO NOT implement Phase 6 workout session yet.

Prepare a clean route/entry point for Phase 6.

Preferred future route:

/workout/:id/session

or another route consistent with existing routing.

For Phase 5:

- create the route contract if useful
- Start Workout should not be a dead button

It may navigate to a minimal session placeholder page that clearly indicates the workout session feature will be implemented next.

Do NOT build:
- timer
- pause/resume
- exercise progression
- workout completion

yet.

---

# 26. Plan Integration

Workout links generated in Phase 4 must continue working.

Flow:

/plan
→ workout day
→ /workout/:id

Ensure workout IDs referenced by generated plans correctly resolve to workout details.

Do not break persisted plans.

If plan references can become invalid,
handle the missing workout gracefully.

---

# 27. Invalid Workout

If the user opens:

/workout/invalid-id

do not crash.

Show an intentional not-found state.

Example:

"Workout not found"

"The workout may no longer be available."

CTA:

Browse Workouts

→ /workouts

Do not redirect silently unless there is a strong UX reason.

---

# 28. Navigation

Workout detail should have sensible navigation.

Mobile may include:

- Back
- or rely on existing app navigation where appropriate

If adding Back:
- use semantic button
- use router navigation
- handle direct URL entry sensibly

Do not create a back button that leads nowhere when the page was opened directly.

A fallback to /workouts is acceptable.

---

# 29. Motion

Use the existing Framer Motion foundation.

Good use cases:

Workout Library:
- page entrance
- subtle filter/result transitions
- card reveal

Workout Details:
- hero entrance
- metadata reveal
- exercise list stagger

Keep motion subtle.

Do not animate the entire grid dramatically every time one filter changes.

Avoid layout-jumping animations.

Respect prefers-reduced-motion.

---

# 30. Filter Animation

When filters change:

Prefer a subtle result transition.

Do not:
- fade the entire page to zero
- animate every card for a long time
- delay interaction

Filtering should feel immediate.

Performance and usability are more important than animation.

---

# 31. Theme Support

Verify all new UI in:

DARK
LIGHT

Default remains DARK.

Check:

- search field
- filter chips
- selected filters
- cards
- metadata
- skeletons
- empty state
- error state
- workout detail hero
- exercise list
- CTA
- session placeholder

Use existing semantic tokens.

Do not introduce theme-specific duplicated components.

---

# 32. Mobile-First Validation

Test at:

360px
390px
430px

Workout Library:
- search fits
- filters usable
- chips do not break layout
- cards use appropriate width
- metadata readable
- no horizontal page overflow
- bottom navigation does not cover content

Workout Details:
- hero fits
- image aspect ratio works
- metadata wraps cleanly
- exercise rows fit
- Start Workout remains easy to reach

Then enhance for:

768px
1024px
1440px

Do NOT design desktop first.

---

# 33. WebView Readiness

The workout experience must work well inside mobile WebView.

Avoid:

- hover-only functionality
- new tabs
- browser-dependent interactions
- tiny controls
- horizontal page overflow

Keep navigation predictable.

Use touch-friendly controls.

Account for bottom safe area where necessary.

---

# 34. Accessibility

Requirements:

- semantic page headings
- accessible search input
- proper filter buttons
- selected filter state communicated
- keyboard navigation
- visible focus states
- meaningful image alt text
- semantic workout links
- Start Workout as a real button/link
- sufficient contrast

Do not use clickable divs.

If filter buttons behave like toggles,
communicate selected state appropriately, e.g. aria-pressed where suitable.

---

# 35. Performance

The workout catalog is currently small, so do not prematurely optimize.

Do NOT add:
- virtualization
- complex memoization
- infinite scrolling

unless clearly necessary.

Use:
- lazy image loading
- stable keys
- non-mutating filtering

Keep the implementation simple.

---

# 36. Tests

If testing infrastructure exists, add useful tests for filtering logic.

Good cases:

1. search matches title case-insensitively
2. category filter works
3. difficulty filter works
4. combined category + difficulty works
5. search + filters work together
6. empty query returns expected results
7. filtering does not mutate source data

If duration filtering is implemented, test it too.

Do not add meaningless snapshot tests.

---

# 37. Analytics Readiness

Do not implement the full analytics phase yet.

However, keep clean interaction points for future events:

workout_open
workout_started

If the generic analytics layer already exists, use it consistently.

Otherwise do not introduce provider-specific analytics.

Phase 9 will implement the complete acquisition/event system.

---

# 38. Suggested Structure

Follow existing conventions.

A reasonable structure may be:

pages/
  Workouts/
    WorkoutsPage.tsx
    components/
      WorkoutFilters.tsx
      WorkoutSearch.tsx
      WorkoutGrid.tsx

  Workout/
    WorkoutPage.tsx
    components/
      WorkoutHero.tsx
      WorkoutMeta.tsx
      ExerciseList.tsx
      ExerciseItem.tsx

components/
  WorkoutCard/

lib/
  workouts/
    filterWorkouts.ts

Do not follow this blindly.

Reuse existing components where appropriate.

Avoid over-componentization.

---

# 39. Do Not Implement Yet

DO NOT implement:

- active workout timer
- countdown
- pause/resume
- next exercise logic
- workout completion
- progress mutations
- workout history
- real backend
- authentication
- favorites
- ratings
- comments
- social sharing
- advanced analytics
- PWA

These belong to later phases or are outside MVP scope.

---

# 40. Definition of Done

Phase 5 is complete when:

/workouts
→ loads through TanStack Query

Search
→ works

Category filters
→ work

Difficulty filters
→ work

Combined filtering
→ works

Clear filters
→ works

Loading state
→ works

Error state
→ works

Empty results
→ handled

Workout card
→ opens details

/workout/:id
→ loads through TanStack Query

Workout details
→ show correct data

Exercise list
→ renders correctly

Invalid workout
→ handled

Start Workout
→ has a valid Phase 6 entry point

/plan workout links
→ still work

Dark theme
→ works

Light theme
→ works

360px
→ works

Desktop
→ works

Reduced motion
→ works

Build
→ passes

Lint
→ passes

Relevant tests
→ pass

---

# 41. Validation Flow

After implementation manually validate:

DISCOVERY:

/
→ Workouts
→ /workouts
→ search
→ filter category
→ filter difficulty
→ clear filters
→ open workout

PLAN:

/plan
→ select planned workout
→ /workout/:id
→ correct workout opens

DETAIL:

/workout/:id
→ metadata
→ exercise list
→ Start Workout
→ session placeholder/entry route

INVALID:

/workout/invalid-id
→ workout not found
→ Browse Workouts

EMPTY SEARCH:

search impossible term
→ No workouts found
→ clear/reset
→ workouts return

ERROR:

query failure where testable
→ error state
→ retry

---

# 42. Run Quality Checks

Run:

npm run build
npm run lint

Run typecheck and tests if scripts exist.

Fix issues introduced by Phase 5.

Do not suppress legitimate errors.

---

# 43. Final Response

Report:

- Workout Library architecture
- search implementation
- filter implementation
- TanStack Query usage
- WorkoutCard reuse/refactoring
- Workout Details implementation
- exercise list handling
- Plan integration
- Phase 6 Start Workout entry point
- mobile-first decisions
- dark/light theme validation
- Motion usage
- accessibility decisions
- tests added
- files changed
- build/lint/typecheck/test results
- anything intentionally postponed

Do not start Phase 6.

Phase 6 will focus on:

ACTIVE WORKOUT SESSION
→ Exercise Progression
→ Countdown Timer
→ Repetition Exercises
→ Pause / Resume
→ Previous / Next / Skip
→ Rest Periods
→ Workout Progress
→ Completion
→ Persisted Results
~~~~

