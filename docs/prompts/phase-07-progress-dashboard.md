# Phase 7 — Progress Dashboard

**Status:** Completed  
**Purpose:** Derive progress analytics and render a custom responsive activity visualization.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–6 are complete.

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
- mobile-first responsive AppShell
- Header
- mobile bottom navigation
- shared design system
- Home page
- onboarding
- personalized 7-day workout plan
- workout library
- workout search and filters
- workout details
- active workout session
- timer / pause / resume
- rest periods
- workout completion
- persisted CompletedWorkout records
- workout audio feedback

We are starting Phase 7:

PROGRESS DASHBOARD
→ Real Derived Progress Data
→ Animated Activity Chart
→ 7D / 30D Analytics
→ Weekly Goal
→ Streak
→ Weekly Activity
→ Plan Completion
→ Recent Activity

IMPORTANT:

This application is MOBILE-FIRST.

Primary widths:
- 360px
- 390px
- 430px

Then enhance for:
- 768px
- 1024px
- 1440px

Both DARK and LIGHT themes must be fully supported.

Do not redesign working functionality from previous phases.

Do NOT install Recharts, Chart.js, D3, or another charting library.

The main activity chart should be implemented using:

- SVG
- React
- TypeScript
- Framer Motion

This is intentional.

---

# 1. Product Goal

Turn /progress into a real fitness progress dashboard.

The page should answer:

1. How active have I been?
2. How many workouts have I completed?
3. How much time have I trained?
4. Am I maintaining a streak?
5. Am I reaching my weekly goal?
6. How is my activity changing?
7. Which workouts did I complete recently?
8. How much of my personalized plan have I completed?

The page must use real derived application data where available.

Do not create fake dashboard numbers disconnected from completed workouts.

---

# 2. Inspect Existing Architecture First

Before editing inspect:

- current /progress page
- CompletedWorkout type
- completed workout persistence
- Phase 6 completion flow
- progress service/repository
- Zustand stores
- personalized plan store
- UserProgress types
- TanStack Query progress architecture
- workout catalog/query hooks
- date utilities if any
- theme system
- design tokens
- shared cards/components
- Motion utilities
- AppShell/mobile navigation

Determine where completed workout history currently lives.

Do not create a second competing source of truth.

Before editing briefly report:

- existing progress architecture
- source of completed workout data
- what progress values can be derived
- proposed chart architecture
- proposed component structure
- any domain changes required

Then implement.

---

# 3. Data Architecture

Use CompletedWorkout records as the primary source for locally recorded activity.

Conceptually:

CompletedWorkout[]
        ↓
Progress calculation utilities
        ↓
ProgressViewModel / derived metrics
        ↓
Progress UI

Do not store values such as:

- totalMinutes
- totalWorkouts
- weeklyCount
- chart points

as separate persistent state if they can be reliably derived from CompletedWorkout[].

Prefer deriving them.

This prevents data becoming inconsistent.

If existing backend-like UserProgress mock data exists, preserve the architecture,
but clearly separate:

- historical/mock server state
- locally completed workouts

Do not double-count data.

Choose one coherent approach based on the current implementation.

---

# 4. Progress Calculation Utilities

Create pure reusable functions for progress calculations.

Suggested location:

src/lib/progress/

Possible utilities:

calculateTotalWorkouts()
calculateTotalMinutes()
calculateCurrentStreak()
calculateWeeklyProgress()
calculatePlanCompletion()
aggregateActivityByDay()
getRecentActivity()

Names may differ based on project conventions.

Requirements:

- pure functions
- TypeScript
- deterministic
- no React dependency
- no DOM access
- no localStorage access
- no mutation of source arrays

These functions should be easy to test.

---

# 5. Date Handling

Progress calculations depend heavily on dates.

Be careful with:

- local dates
- start/end of day
- start of week
- timezone boundaries
- sorting
- today/yesterday labels

Do not compare dates using fragile string slicing unless the stored format guarantees it.

Do not install a large date library unless the project already uses one.

Native Date utilities are sufficient for this MVP.

Keep date helpers centralized.

---

# 6. Progress Page

Implement/refine:

/progress

Recommended structure:

1. Page header
2. Summary stats
3. Animated Activity Chart
4. Weekly Goal
5. Weekly Activity
6. Personalized Plan Progress
7. Recent Activity
8. Empty state where appropriate

The Activity Chart should be the primary visual element.

Do not overload the page with too many unrelated statistics.

---

# 7. Page Header

Suggested content:

Heading:
"Your Progress"

Supporting copy:
"See how your consistency adds up over time."

If useful, show a compact contextual message such as:

"Keep the momentum going."

Do not generate fake motivational statistics.

---

# 8. Summary Stats

Create polished summary cards for:

- Current Streak
- Completed Workouts
- Total Training Time

Optional fourth metric only if genuinely useful.

Example:

4 days
Current Streak

12
Workouts

245 min
Training Time

Use real derived values.

Do not hardcode these numbers.

Use Lucide icons sparingly.

Do not use emoji as primary UI icons.

---

# 9. Current Streak

Calculate streak from completed workout dates.

Definition:

A streak represents consecutive calendar days with at least one completed workout.

Multiple workouts on the same day count as one active day.

Handle today/yesterday correctly.

A streak should not become larger because two workouts were completed on the same day.

Document the chosen streak behavior.

If no workouts exist:

0 days

Do not fake a streak.

---

# 10. Training Time

Calculate total completed workout minutes.

Use actual CompletedWorkout duration data.

If stored durations are in seconds internally,
convert correctly.

Keep units consistent.

Display:

245 min

or optionally:

4h 5m

when totals become large.

Choose a consistent readable format.

---

# 11. Main Feature — Animated Activity Chart

Create a custom reusable:

ActivityChart

DO NOT use:

- Recharts
- Chart.js
- D3
- ApexCharts
- another chart package

Implement using:

- SVG
- React
- TypeScript
- Framer Motion

This should be one of the most polished components in the project.

---

# 12. Chart Purpose

The chart visualizes workout activity over time.

Primary metric:

training minutes

The chart should support:

7D
30D

7D:
show daily activity for the last 7 calendar days.

30D:
show activity for the last 30 calendar days.

For 30D, choose a readable representation.

It is acceptable to keep daily points but reduce visible X-axis labels.

Do NOT discard actual daily data merely to make implementation easier.

---

# 13. Activity Data Model

Create a typed chart model.

Example:

type ActivityPoint = {
  date: string;
  label: string;
  minutes: number;
  workouts: number;
};

The exact structure may differ.

Generate it from CompletedWorkout[].

For days with no workouts:

minutes = 0
workouts = 0

The 7D dataset must always contain exactly 7 chronological day points.

The 30D dataset must represent the full requested period.

Do not only include days containing workouts.

---

# 14. Chart Header

The chart card should contain:

Activity

Primary period value, for example:

187 min

Comparison text if enough data exists:

+18% vs previous 7 days

Period selector:

[ 7D ] [ 30D ]

Do not calculate misleading percentages.

If the previous period is zero,
avoid displaying mathematically misleading "+∞%".

Use a neutral message instead, such as:

"New activity this period"

or omit comparison.

---

# 15. 7D / 30D Selector

Create a compact segmented control.

Options:

7D
30D

This is local UI state.

Do NOT put the selected chart range into global Zustand unless there is a real reason.

Requirements:

- touch-friendly
- keyboard accessible
- obvious selected state
- dark/light support
- no hover dependency

Switching period should update:

- chart
- total minutes
- comparison
- axis labels

without page reload.

---

# 16. SVG Architecture

The ActivityChart must be responsive.

Use an SVG viewBox.

Do not hardcode the SVG width to a desktop pixel width.

Example conceptual approach:

<svg
  viewBox="0 0 700 280"
  preserveAspectRatio="none"
>

However, preserve visual quality and avoid distorted circles/text.

Choose a responsive SVG strategy that works well at 360px.

Keep chart geometry separate from React markup where practical.

---

# 17. Chart Geometry

Create pure helpers for:

- chart dimensions
- padding
- x coordinates
- y coordinates
- y scale
- line path
- area path

Do not manually hardcode each point.

Input:

ActivityPoint[]

Output:

calculated SVG coordinates/path.

Handle:

- all-zero datasets
- single non-zero point
- identical values
- large values
- 7 points
- 30 points

Never generate NaN/Infinity SVG coordinates.

---

# 18. Smooth Curve

The line should be visually smooth.

Use a reasonable curve algorithm such as:

- cubic Bézier interpolation
- Catmull-Rom → Bézier conversion
- another small custom smooth path approach

Do NOT add D3 only to generate the curve.

Keep the algorithm understandable.

Avoid excessive overshoot that could visually imply negative training minutes.

The curve should not dip below the chart baseline.

If safe smoothing becomes too complex,
prefer a clean monotonic/simple curve over mathematically incorrect visuals.

---

# 19. Area Fill

Add an area below the activity line.

Use an SVG linearGradient.

The area should fade toward the bottom.

Requirements:

- works in dark theme
- works in light theme
- uses semantic FitLife accent styling
- subtle, not neon
- does not reduce readability

Do not create separate duplicated chart components for each theme.

---

# 20. Grid

Add subtle horizontal grid lines.

Keep them visually restrained.

Do not make the chart look like enterprise analytics software.

3–5 horizontal reference lines are enough.

Use theme tokens where possible.

---

# 21. Y Axis

Show useful reference values.

For example:

45
30
15
0

Scale based on current data.

Use sensible rounded maximum values.

Do not use awkward values such as:

37.384

Keep labels compact.

Handle an all-zero dataset gracefully.

---

# 22. X Axis

7D:

show short day labels:

Mon
Tue
Wed
...

or date labels when more useful.

30D:

Do not show 30 overlapping labels.

Show a subset of labels while retaining all 30 data points.

Example:
Sep 1
Sep 8
Sep 15
Sep 22
Sep 30

Ensure labels do not overflow on 360px.

---

# 23. Animated Line Draw

When the chart first appears,
animate the activity line drawing from left to right.

Use Framer Motion path animation.

Conceptually:

initial:
pathLength: 0
opacity: 0

animate:
pathLength: 1
opacity: 1

Suggested duration:

700–1100ms

Use a smooth ease.

Do not make users wait before interacting with the page.

---

# 24. Animated Area

Animate the area fill subtly.

Possible approach:

opacity 0 → target opacity

after or during line drawing.

Keep it restrained.

Do not animate large expensive filters.

---

# 25. Point Animation

For 7D mode:

show visible data points.

Points may animate in after the line.

Use a subtle scale/opacity entrance.

For 30D:

do not necessarily show all 30 large circles.

Use smaller points or only interactive focus points to avoid visual clutter.

---

# 26. Chart Interaction — Desktop

On pointer hover over the chart:

identify the nearest data point.

Show:

- vertical guide line
- highlighted point
- tooltip

Example:

Sep 8

32 min
2 workouts

Do not require the pointer to hit a tiny SVG circle exactly.

Use nearest-point interaction based on pointer position if practical.

---

# 27. Chart Interaction — Mobile

IMPORTANT:

This project is mobile-first.

Hover is not sufficient.

On touch/tap:

- select the nearest point
- display tooltip
- highlight selected point

The interaction should work comfortably at:

360px
390px
430px

Do not require precision tapping on a 6px circle.

A transparent SVG interaction overlay is acceptable.

---

# 28. Tooltip

Create a polished chart tooltip.

Display:

- date
- training minutes
- workout count

Example:

Sep 8

32 min
2 workouts

Requirements:

- stays inside chart/card bounds
- does not overflow viewport
- works on mobile
- dark/light theme
- readable
- pointer interaction should not cause flicker

Do not use browser title tooltips.

---

# 29. Selected Point

When a point is active:

- emphasize the point
- optionally show vertical guide
- show tooltip

Do not rely solely on color.

The point may increase in size slightly.

Keep animation subtle.

---

# 30. Period Transition

When switching:

7D ↔ 30D

animate the dataset change.

Use Framer Motion / AnimatePresence appropriately.

Possible behavior:

- old path fades slightly
- new path draws/morphs in
- summary number transitions

Do not attempt an extremely complex SVG morph if it creates fragile code.

A polished crossfade + redraw is acceptable.

Correctness is more important than fancy morphing.

---

# 31. Reduced Motion

Respect prefers-reduced-motion.

When reduced motion is enabled:

- line should appear immediately
- points should appear immediately
- period changes should be immediate/minimal
- tooltip remains functional

Do not disable chart functionality.

---

# 32. Chart Accessibility

The chart must not be the only representation of important information.

Provide an accessible summary.

Example:

aria-label:

"Activity over the last 7 days. 187 training minutes across 4 workouts."

Do not make screen readers navigate 30 meaningless SVG nodes.

Decorative SVG internals may be aria-hidden when an equivalent accessible summary exists.

Period selector must remain keyboard accessible.

---

# 33. Chart Empty State

If there are no workouts in the selected period:

Do not show a broken flat chart with meaningless analytics.

Show a graceful chart empty state while keeping the card structure.

Example:

"No activity yet"

"Complete a workout to start building your activity chart."

CTA if appropriate:

Browse Workouts

The chart may still show a subtle zero baseline.

Do not invent sample activity.

---

# 34. Weekly Goal

Add a Weekly Goal section.

Default product goal may be:

5 workouts / week

If a user-specific goal already exists, use it.

Example:

Weekly Goal

4 / 5 workouts

[████████████████░░░]

80%

Use actual current-week completed workout count.

Do not count the same completed record twice.

If more than goal:

6 / 5

visual progress may cap at 100% while text shows actual count.

---

# 35. Weekly Activity

Create a compact Monday–Sunday activity visualization.

Example:

M  T  W  T  F  S  S
●  ●  ○  ●  ●  ○  ○

or a polished equivalent.

States:

- completed/activity day
- no activity
- today

Multiple workouts on one day still represent one active day.

Make today visually distinguishable.

Do not use color as the only state indicator.

---

# 36. Personalized Plan Progress

If a generated 7-day plan exists,
show its progress.

Example:

Your Plan

4 of 6 workouts completed

67%

Show plan days compactly.

Rest days should not count as required workouts.

Completion should be matched using workout/plan relationships established in previous phases.

Do not mark every repeated workout ID complete if only one scheduled occurrence was completed unless the data model explicitly supports that.

Inspect existing plan completion architecture carefully.

---

# 37. Plan CTA

Provide:

View My Plan

→ /plan

If no personalized plan exists,
do not show a broken progress section.

Either omit it or show:

Create Your Plan

→ /onboarding

Choose whichever fits the current product UX better.

---

# 38. Recent Activity

Create a Recent Activity section using actual CompletedWorkout[] data.

Sort newest first.

Show a reasonable number such as:

5 recent workouts

Each item may contain:

- workout title
- completion date
- duration
- category
- completion indicator

Use workout catalog/query data to resolve workout metadata when needed.

Do not persist duplicated workout titles into progress state solely for display unless already part of the domain model.

---

# 39. Recent Activity Date Labels

Use human-friendly labels:

Today
Yesterday
Sep 6

Include time only if it adds useful value.

Do not show raw ISO timestamps.

Keep date formatting centralized.

---

# 40. Recent Activity Navigation

If the referenced workout still exists:

allow navigation to:

/workout/:id

If the workout no longer exists:

render the historical activity safely without a broken link.

Do not crash because catalog data changed.

---

# 41. Empty Progress State

A brand-new user with zero completed workouts should get an intentional experience.

Do not show:

0
0
0

everywhere with a dead-looking dashboard.

Show an encouraging empty state.

Example:

"Your progress starts with your first workout."

"Complete a session and your activity, streak and training time will appear here."

CTA:

Find a Workout

→ /workouts

You may still show useful zero-state components where appropriate.

---

# 42. Responsive Layout

MOBILE FIRST.

At 360px:

Recommended order:

Header
Summary
Activity Chart
Weekly Goal
Weekly Activity
Plan Progress
Recent Activity

Summary cards may use:
- compact grid
or
- one featured stat + two smaller stats

Do not force three unreadably narrow cards into one row.

Chart must fit without horizontal page scrolling.

---

# 43. Activity Chart Mobile Dimensions

At 360px:

- chart must remain readable
- tooltip must remain within viewport
- Y labels should not consume excessive width
- X labels must not overlap
- touch interaction must work
- period selector must fit

Do not solve chart width by making the entire page horizontally scrollable.

---

# 44. Desktop Layout

At larger widths:

Use the additional space intentionally.

Possible layout:

Summary stats
        ↓
Large Activity Chart
        ↓
Weekly Goal | Plan Progress
        ↓
Recent Activity

or a tasteful two-column lower dashboard.

Do not turn desktop into a completely different product.

---

# 45. Dark Theme

The chart should look especially polished in default dark mode.

Use:

- deep surface
- subtle grid
- clear accent line
- restrained gradient area
- readable tooltip
- high-contrast selected point

Avoid neon/glowing casino-style effects.

FitLife is a fitness/wellness product.

---

# 46. Light Theme

Verify:

- chart line
- area gradient
- grid
- axis labels
- tooltip
- cards
- weekly indicators
- recent activity

Light theme should not look washed out.

Use semantic design tokens.

---

# 47. Motion Outside Chart

Use Motion selectively for:

- summary stat entrance
- progress bar fill
- weekly indicators
- plan progress
- recent activity reveal

Do not animate every number aggressively.

ActivityChart should remain the visual animation focus.

---

# 48. Animated Numbers

For important summary values,
a subtle count-up animation may be used.

Examples:

0 → 245 min
0 → 12 workouts

Only implement this if it remains lightweight and accessible.

Do not add a dependency for count-up animation.

Respect reduced motion.

If it adds unnecessary complexity, skip it.

---

# 49. Performance

The custom chart must remain lightweight.

Do not:
- recalculate expensive geometry every animation frame
- attach listeners to every point unnecessarily
- create excessive SVG nodes
- introduce large dependencies

30 points is small.

Keep the implementation simple and performant.

Use memoization only where it has a clear benefit.

---

# 50. Data Correctness

This phase is analytics-like UI.

Correct numbers matter more than visual flair.

Verify:

- no duplicate workout counting
- correct local day grouping
- correct current week
- correct 7-day window
- correct 30-day window
- correct previous-period comparison
- correct streak
- correct total minutes
- correct recent ordering

Do not display metrics you cannot calculate correctly.

---

# 51. Testing — Progress Utilities

Add meaningful unit tests.

Test:

1. total workout count
2. total minutes
3. multiple workouts same day
4. current streak
5. broken streak
6. weekly count
7. 7-day aggregation
8. 30-day aggregation
9. zero-activity days included
10. recent activity sorting
11. source arrays not mutated

Use fixed dates in tests.

Do not make tests depend on the actual current date without controlling it.

---

# 52. Testing — Comparison

Test period comparison.

Examples:

Current:
120 min

Previous:
100 min

→ +20%

Current:
80 min

Previous:
100 min

→ -20%

Previous:
0

→ must NOT produce Infinity/NaN.

---

# 53. Testing — Chart Geometry

Where practical test pure chart geometry helpers.

Verify:

- valid coordinates
- no NaN
- no Infinity
- all-zero dataset
- one high point
- 7 points
- 30 points
- path generation returns valid output

Do not test SVG pixel rendering.

---

# 54. Server / Client Boundary

Do not move derived dashboard UI state into TanStack Query unnecessarily.

TanStack Query remains responsible for backend/server-like resources.

Locally persisted CompletedWorkout history remains client-side for the current MVP unless existing architecture already abstracts it differently.

Derived metrics belong in pure calculation utilities.

Chart period selection belongs in local UI state.

Keep these boundaries clean.

---

# 55. Backend Readiness

The dashboard should be easy to migrate later from:

local CompletedWorkout[]

to:

backend activity API

Avoid coupling Progress components directly to localStorage.

Components should consume data through the existing state/repository abstraction.

Do not call localStorage directly inside ActivityChart.

ActivityChart should receive typed data via props.

---

# 56. Suggested Component Structure

Follow existing conventions.

A reasonable direction:

pages/
  Progress/
    ProgressPage.tsx
    components/
      ProgressSummary.tsx
      ActivityChart.tsx
      ActivityTooltip.tsx
      PeriodSelector.tsx
      WeeklyGoal.tsx
      WeeklyActivity.tsx
      PlanProgress.tsx
      RecentActivity.tsx
      ProgressEmptyState.tsx

lib/
  progress/
    calculateProgress.ts
    aggregateActivity.ts
    dateUtils.ts

lib/
  chart/
    activityChartGeometry.ts

Do not follow this structure blindly.

Do not create tiny components without meaningful responsibility.

---

# 57. Do Not Implement Yet

Do NOT implement:

- nutrition redesign
- backend analytics API
- Google Analytics
- UAC attribution
- authentication
- social comparison
- leaderboards
- achievements/badges system
- wearable integration
- Apple Health
- Google Fit
- calorie burn estimates
- medical metrics
- body weight tracking
- complex chart library

Those are outside Phase 7.

---

# 58. Definition of Done

Phase 7 is complete when:

/progress
→ real dashboard implemented

CompletedWorkout[]
→ drives progress calculations

Total workouts
→ correct

Total minutes
→ correct

Current streak
→ correct

ActivityChart
→ implemented using custom SVG

7D
→ works

30D
→ works

Chart line
→ animated

Area
→ animated/subtle

Tooltip
→ works with pointer

Tooltip
→ works with touch

Selected point
→ works

Period switching
→ works

Previous-period comparison
→ correct

Zero previous period
→ handled safely

Weekly Goal
→ correct

Weekly Activity
→ correct

Plan Progress
→ works when plan exists

Recent Activity
→ correct and sorted

Empty state
→ works

Dark theme
→ works

Light theme
→ works

360px
→ no overflow

390px
→ works

430px
→ works

Desktop
→ works

Reduced motion
→ works

Build
→ passes

Lint
→ passes

Tests
→ pass

---

# 59. Manual Validation

Validate these scenarios:

NEW USER:

no completed workouts
→ /progress
→ useful empty state
→ Find a Workout

ONE WORKOUT:

complete workout
→ /progress
→ total = 1
→ minutes correct
→ current day appears on chart
→ weekly activity updated
→ recent activity contains workout

MULTIPLE SAME DAY:

complete 2 workouts same day
→ workouts = 2
→ minutes = combined
→ streak day counts once
→ chart minutes = combined
→ chart workouts tooltip = 2

MULTIPLE DAYS:

complete workouts across consecutive dates
→ streak correct
→ chart correct

7D:

switch to 7D
→ exactly 7 daily data points represented
→ total correct

30D:

switch to 30D
→ full 30-day period represented
→ labels readable
→ mobile remains usable

PLAN:

generated plan exists
→ complete planned workout
→ /progress
→ plan progress reflects completion

THEME:

dark
→ chart readable

light
→ chart readable

TOUCH:

mobile
→ tap chart
→ nearest point selected
→ tooltip visible

REDUCED MOTION:

enabled
→ chart immediately usable
→ no unnecessary draw animation

---

# 60. Quality Checks

Run:

npm run build
npm run lint

Run:
- typecheck
- tests

if scripts exist.

Fix issues introduced by Phase 7.

Do not suppress legitimate TypeScript/lint/test errors.

---

# 61. Final Response

Report:

- progress data architecture
- derived metrics implemented
- streak algorithm
- weekly calculations
- ActivityChart architecture
- SVG curve generation approach
- area gradient implementation
- 7D/30D behavior
- pointer/touch interaction
- tooltip positioning
- chart animations
- reduced-motion handling
- Plan Progress integration
- Recent Activity implementation
- mobile-first decisions
- dark/light validation
- tests added
- files changed
- build/lint/typecheck/test results
- anything intentionally postponed

Do not start Phase 8.

Phase 8 will focus on:

NUTRITION
→ Nutrition Library
→ Search / Filters
→ Recipe Details
→ Nutrition Cards
→ Mobile UX
→ Query-backed Data
~~~~

