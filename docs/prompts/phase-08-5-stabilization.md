# Phase 8.5 — Audit & Stabilization

**Status:** Completed  
**Purpose:** Audit the feature-complete codebase, then resolve verified correctness, persistence, responsive, and accessibility risks before analytics work.

## Exact pre-Phase-9 audit prompt

~~~~text
Read AGENTS.md completely before doing anything.

Phases 1–8 are complete.

Before starting Phase 9, perform a FULL CODEBASE AUDIT.

IMPORTANT:
This is an AUDIT FIRST.

Do NOT immediately refactor or rewrite the application.
Do NOT change product behavior.
Do NOT redesign UI.
Do NOT start Phase 9.

First inspect the entire codebase and produce a technical report.

The project currently includes:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- Vitest
- dark/light themes
- responsive mobile-first UI
- onboarding
- personalized workout plan
- workout library
- workout details
- workout session
- timer / pause / rest
- workout audio
- workout persistence
- progress dashboard
- custom animated SVG chart
- nutrition library
- recipe details

--------------------------------------------------
1. RUN ALL EXISTING QUALITY CHECKS
--------------------------------------------------

Inspect package.json first and determine available scripts.

Run the appropriate existing commands for:

- build
- lint
- TypeScript/typecheck
- Vitest/unit tests

Do not invent scripts that do not exist.

Report:

- passed
- failed
- warnings
- relevant errors

Do not suppress errors.

--------------------------------------------------
2. TYPESCRIPT AUDIT
--------------------------------------------------

Inspect the entire src directory.

Look for:

- any
- unknown used unnecessarily
- unsafe type assertions
- `as` casts hiding real problems
- non-null assertions (!)
- duplicated interfaces/types
- overly broad types
- missing return types where useful
- inconsistent nullable fields
- unsafe optional access
- incorrect domain modeling

Pay special attention to:

- Workout
- Exercise
- WorkoutSession
- CompletedWorkout
- Progress
- ActivityPoint
- Recipe
- Ingredient
- plan types

Classify findings:

CRITICAL
HIGH
MEDIUM
LOW

Do not recommend changes merely for stylistic preference.

--------------------------------------------------
3. REACT AUDIT
--------------------------------------------------

Inspect React architecture for:

- unnecessary rerenders
- incorrect useEffect usage
- derived state stored unnecessarily
- state synchronization effects
- missing cleanup
- unstable keys
- incorrect dependency arrays
- excessive prop drilling
- giant components
- duplicated UI logic
- hooks violating responsibilities
- conditional hook risks
- stale closures

Pay special attention to:

Workout Session
Timer
Audio
Progress ActivityChart
Nutrition filters
Onboarding

--------------------------------------------------
4. ZUSTAND AUDIT
--------------------------------------------------

Inspect all Zustand stores.

Check:

- what belongs in global state
- what should remain local state
- duplicated server state
- persisted state correctness
- unnecessary persistence
- non-serializable persisted values
- store size
- selector usage
- potential unnecessary rerenders
- stale persisted state
- migration/version concerns where relevant

Verify that TanStack Query data is not unnecessarily duplicated in Zustand.

--------------------------------------------------
5. TANSTACK QUERY AUDIT
--------------------------------------------------

Inspect:

- QueryClient configuration
- query keys
- query hooks
- services
- mock services
- loading/error handling
- retry behavior
- staleTime where appropriate
- duplicated fetching
- direct mock imports from UI

Architecture should remain:

UI
→ Query Hook
→ Service
→ Mock/API implementation

Find violations.

--------------------------------------------------
6. TIMER AUDIT
--------------------------------------------------

Thoroughly inspect the Phase 6 workout timer.

Look for:

- duplicate intervals
- interval leaks
- incorrect cleanup
- timer drift
- race conditions
- pause/resume bugs
- double phase transitions
- zero-second edge cases
- stale closures
- session restore problems
- multiple session initialization

This is HIGH PRIORITY.

Explain any timing bug precisely.

--------------------------------------------------
7. AUDIO AUDIT
--------------------------------------------------

Inspect workout audio.

Check:

- duplicate playback
- Audio object recreation
- overlapping tick sounds
- pause behavior
- cleanup
- navigation cleanup
- autoplay rejection handling
- persisted sound preference
- final completion sound triggering more than once

Audio failure must never break workout functionality.

--------------------------------------------------
8. PERSISTENCE AUDIT
--------------------------------------------------

Inspect all localStorage/Zustand persistence.

Check:

- onboarding
- plan
- workout session
- completed workouts
- theme
- sound preference

Look for:

- conflicting keys
- duplicate data
- stale data
- unsafe JSON parsing
- non-versioned structures where versioning is actually necessary
- hydration problems
- SSR assumptions even though current app uses Vite SPA

Verify refresh behavior.

--------------------------------------------------
9. PROGRESS DATA AUDIT
--------------------------------------------------

Verify calculations for:

- total workouts
- total minutes
- current streak
- multiple workouts on same day
- weekly activity
- weekly goal
- 7-day activity
- 30-day activity
- previous-period comparison
- plan completion
- recent activity sorting

Look specifically for:

NaN
Infinity
timezone bugs
date boundary bugs
double counting

--------------------------------------------------
10. SVG ACTIVITY CHART AUDIT
--------------------------------------------------

Inspect the custom ActivityChart.

Check:

- SVG coordinate calculations
- responsive behavior
- viewBox usage
- NaN/Infinity protection
- zero datasets
- 7D dataset
- 30D dataset
- curve overshoot
- tooltip positioning
- pointer handling
- touch handling
- event listener cleanup
- excessive rerenders
- animation performance
- reduced motion

Verify that the chart cannot cause page-level horizontal overflow.

--------------------------------------------------
11. NUTRITION AUDIT
--------------------------------------------------

Inspect:

- recipe filtering
- search
- meal filters
- nutrition characteristic filters
- macro calculations
- ingredient rendering
- recipe details

Verify:

- no source array mutation
- no NaN macro percentages
- missing values handled safely
- no duplicated recipe data in UI

--------------------------------------------------
12. ROUTING AUDIT
--------------------------------------------------

Inspect all routes.

Check:

- invalid IDs
- direct URL entry
- navigation fallbacks
- 404 handling
- plan → workout navigation
- workout → session navigation
- progress → workout navigation
- nutrition → recipe navigation

Look for dead routes and dead buttons.

--------------------------------------------------
13. RESPONSIVE AUDIT
--------------------------------------------------

Inspect CSS/Tailwind for likely overflow issues.

Remember that a mobile overflow bug was previously found in workout filters.

Look for:

- fixed widths
- min-width
- nowrap
- flex children without min-w-0
- oversized SVG
- absolute positioning
- fixed controls
- horizontal filter rows
- long text
- images

Primary widths:

320px
360px
390px
430px

Then:

768px
1024px
1440px

Find potential page-level horizontal overflow.

Do not solve problems by blindly adding overflow-x-hidden.

--------------------------------------------------
14. TAILWIND / CSS AUDIT
--------------------------------------------------

Look for:

- duplicated class combinations
- inconsistent spacing
- hardcoded colors bypassing theme tokens
- unnecessary arbitrary values
- conflicting classes
- duplicated dark/light implementations
- excessive z-index values
- broken responsive assumptions

Do not suggest abstractions for every repeated class.

Only identify meaningful maintainability problems.

--------------------------------------------------
15. DARK / LIGHT THEME AUDIT
--------------------------------------------------

Check new and old components for:

- hardcoded dark-only colors
- insufficient contrast
- invisible borders
- incorrect muted text
- chart colors
- skeleton colors
- selected filter states
- modal/dialog surfaces
- workout session
- nutrition
- progress

Default remains DARK.

--------------------------------------------------
16. FRAMER MOTION AUDIT
--------------------------------------------------

Check:

- unnecessary animations
- expensive layout animations
- animation on every rerender
- AnimatePresence misuse
- missing stable keys
- reduced-motion support
- timers being affected by animation lifecycle

Animation should not control business logic.

--------------------------------------------------
17. ACCESSIBILITY AUDIT
--------------------------------------------------

Inspect:

- headings
- buttons
- links
- icon-only controls
- aria-label
- aria-pressed
- dialogs
- keyboard navigation
- focus states
- image alt text
- chart accessibility
- timer accessibility
- search fields
- filter controls

Look specifically for clickable divs.

--------------------------------------------------
18. PERFORMANCE AUDIT
--------------------------------------------------

Look for meaningful performance problems:

- unnecessary dependencies
- huge imports
- duplicated libraries
- expensive calculations during render
- unnecessary effects
- repeated sorting/filtering
- large images
- non-lazy images below fold
- unnecessary global rerenders
- chart recalculation

Do not recommend premature optimization.

Only report issues with reasonable impact.

--------------------------------------------------
19. DEAD CODE AUDIT
--------------------------------------------------

Find:

- unused components
- unused hooks
- unused services
- unused types
- obsolete mocks
- old placeholder pages
- commented-out code
- duplicate implementations
- temporary Phase 1–8 artifacts

Do NOT delete them yet.

Report them.

--------------------------------------------------
20. DEPENDENCY AUDIT
--------------------------------------------------

Inspect package.json.

Identify:

- unused dependencies
- duplicate-purpose dependencies
- packages imported nowhere
- dependencies that should be devDependencies
- unnecessary packages

Do not upgrade everything automatically.

Do not introduce new packages.

--------------------------------------------------
21. SECURITY / ROBUSTNESS
--------------------------------------------------

This is not a security penetration test.

Check basic frontend robustness:

- unsafe HTML rendering
- dangerouslySetInnerHTML
- unsanitized user-controlled HTML
- unsafe localStorage assumptions
- exposed secrets
- environment variables incorrectly used
- sensitive values committed to source
- external URLs opened unsafely

Do not invent vulnerabilities.

--------------------------------------------------
22. TEST COVERAGE QUALITY
--------------------------------------------------

Inspect existing Vitest tests.

Determine whether important business logic is covered.

Especially:

- workout state transitions
- timer behavior
- progress calculations
- streak
- date aggregation
- chart geometry
- recipe filtering
- macro calculation

Identify high-value missing tests.

Do not demand tests for trivial presentational markup.

--------------------------------------------------
23. CODE QUALITY
--------------------------------------------------

Look for:

- functions doing too much
- files becoming too large
- unclear naming
- deeply nested conditions
- duplicated business logic
- magic numbers
- magic strings
- unnecessary abstractions
- over-engineering

We want pragmatic production-quality code.

Do not recommend abstraction just for abstraction's sake.

--------------------------------------------------
24. IMPORTANT — DO NOT FIX YET
--------------------------------------------------

During this first audit:

DO NOT perform broad refactoring.

Only make a code change if required to run the audit itself,
and clearly report it.

The goal is to understand the current state before changing architecture.

--------------------------------------------------
25. FINAL AUDIT REPORT
--------------------------------------------------

Produce a structured report:

A. Overall assessment

B. Quality checks
- build
- lint
- typecheck
- tests

C. Critical issues

D. High-priority issues

E. Medium-priority issues

F. Low-priority improvements

G. Architecture observations

H. Test coverage gaps

I. Dead/duplicate code

J. Dependency observations

K. Responsive/mobile risks

L. Accessibility risks

M. Performance risks

N. Recommended refactoring plan

For every issue include:

- severity
- file(s)
- exact problem
- why it matters
- recommended fix

At the end provide:

TOP 10 FIXES BEFORE PHASE 9

ordered by priority.

Do NOT start implementing those fixes until explicitly instructed.
~~~~

## Exact stabilization prompt

~~~~text
Read AGENTS.md completely before making changes.

The full pre-Phase-9 audit is complete.

We are now doing:

PHASE 8.5 — STABILIZATION & TARGETED REFACTORING

IMPORTANT:

Use the findings from the audit you just produced.

This is NOT a redesign.
This is NOT Phase 9.
Do NOT implement analytics/UAC yet.
Do NOT add new product features.
Do NOT install new dependencies unless absolutely necessary.

The goal is to fix verified architectural, correctness,
responsive and accessibility problems before Phase 9.

Preserve existing UI and product behavior unless the audit identified
that behavior as incorrect.

--------------------------------------------------
PRIORITY 1 — UNIFY PROGRESS SOURCE OF TRUTH
--------------------------------------------------

Fix the duplicated progress architecture.

Current problem:

/progress derives completed-workout metrics from locally persisted
CompletedWorkout state, while Home ProgressPreview uses static
UserProgress through TanStack Query.

This causes incorrect values such as:

19 of 5 workouts

and means Home does not reliably update after completing a workout.

For the current MVP:

CompletedWorkout persisted client history must be the source of truth
for metrics derived from completed workouts.

Use the same source for:

- Home progress preview
- /progress
- weekly completed count
- total workouts
- total minutes
- streak
- recent activity where applicable

Do NOT duplicate derived totals into another store.

Do NOT mutate mock query data to simulate synchronization.

Preserve backend readiness.

The future architecture should still allow:

Backend activity API
→ TanStack Query
→ derived progress

But while CompletedWorkout is local persisted client state,
do not maintain two conflicting sources.

Refactor the smallest amount necessary.

--------------------------------------------------
PRIORITY 2 — FIX HOME WEEKLY PROGRESS
--------------------------------------------------

Home must calculate:

completed workouts THIS WEEK

not:

all completed workouts.

Use the existing tested progress calculation utilities where possible.

Weekly goal example:

4 / 5 workouts

If completed workouts exceed goal:

6 / 5 workouts

Progress bar may visually cap at 100%.

Do not lose the real count.

Add/adjust tests.

--------------------------------------------------
PRIORITY 3 — TIMER ACCURACY
--------------------------------------------------

Refactor the workout timer so it does NOT depend purely on receiving
exactly one setInterval callback per elapsed second.

Current implementation decrements remainingSeconds once per callback.

This can drift when:

- browser tab is throttled
- main thread is blocked
- mobile WebView lifecycle throttles timers

Use a timestamp/deadline based approach.

Conceptually:

target/deadline timestamp
        ↓
Date.now()
        ↓
calculate actual remaining seconds

The interval may still be used to trigger UI updates,
but elapsed time must be calculated from timestamps.

Requirements:

- accurate countdown
- pause works
- resume works
- no duplicate intervals
- zero transition fires once
- no negative remainingSeconds
- cleanup on unmount
- StrictMode safe
- rest timer works
- exercise timer works

Do not rewrite the entire session architecture.

--------------------------------------------------
PRIORITY 4 — EXIT DIALOG MUST PAUSE SESSION
--------------------------------------------------

When an active workout opens the Exit Workout dialog:

automatically pause the timer.

Expected behavior:

Active workout
→ user requests exit
→ session pauses
→ Exit dialog opens

If user chooses:

Continue Workout

→ close dialog
→ resume ONLY if the workout was active before opening the dialog

If the session was already manually paused before opening the dialog:

Continue Workout must leave it paused.

If user chooses:

End Workout

→ perform existing exit/reset behavior.

Do not allow countdown to continue behind the modal.

Add tests for this behavior where practical.

--------------------------------------------------
PRIORITY 5 — PLAN PREFERENCE CONSISTENCY
--------------------------------------------------

Fix Adjust Preferences behavior.

Current problem:

user can begin adjusting preferences while old generatedPlan and
onboardingCompleted remain active.

This can produce:

new preferences
+
old plan

Choose a predictable architecture.

Preferred behavior:

When entering Adjust Preferences:

keep existing plan available until the user actually confirms new
preferences if that provides safer UX.

Use draft onboarding/preferences state if the existing architecture
supports this cleanly.

When the new onboarding/preferences flow is successfully completed:

generate and activate the new plan atomically.

If implementing draft state would require disproportionate changes,
invalidating the old generated plan when adjustment begins is acceptable.

Choose the safest minimal implementation and document the decision.

The user must never end up with preferences and an active plan that
silently contradict each other.

--------------------------------------------------
PRIORITY 6 — UNIQUE PLAN INSTANCE
--------------------------------------------------

Fix generated plan identity.

Current plan ID is too deterministic.

Generating the same configuration again can produce the same plan ID,
allowing historical:

CompletedWorkout.planId/day

records to mark a newly generated plan as already completed.

Introduce a unique plan-instance identity for every successful
plan generation.

Requirements:

same preferences
→ generate plan
→ unique plan instance

generate again
→ different plan instance

Historical completion must remain associated with the old instance.

Do NOT use array index as identity.

Use a lightweight browser-safe ID strategy.

Do not add a UUID dependency just for this.

--------------------------------------------------
PRIORITY 7 — SESSION/TIMER TEST COVERAGE
--------------------------------------------------

Add meaningful Vitest coverage for the session state machine.

Prioritize:

- timed exercise initialization
- timer progression
- pause
- resume
- timed exercise → rest
- timed exercise → next exercise
- repetition completion
- skip exercise
- skip rest
- previous boundary
- final completion
- zero-duration edge case
- duplicate completion prevention

Use fake timers / controlled timestamps.

Tests must NOT wait real seconds.

Also test timer cleanup where practical.

--------------------------------------------------
PRIORITY 8 — LIGHT THEME CONTRAST
--------------------------------------------------

Fix verified light-theme accent contrast.

Do not simply make every green darker globally.

Inspect semantic usage.

Prefer separating tokens where necessary:

- accent
- accent foreground
- accent text
- interactive background

Ensure:

white text on accent buttons
and
accent text on light backgrounds

meet appropriate readable contrast.

Preserve the existing FitLife visual identity.

Dark theme must remain unchanged unless necessary.

--------------------------------------------------
PRIORITY 9 — FOCUS STATES
--------------------------------------------------

Fix meaningful accessibility issues identified by the audit.

ActivityChart:

- do not use outline-none without replacement
- add visible focus-visible treatment

NutritionSearch:

- provide clear keyboard focus state beyond subtle border color

ExitWorkoutDialog:

improve dialog accessibility without introducing a dependency.

At minimum ensure:

- initial focus
- Escape handling
- focus restoration
- keyboard focus remains reasonably contained in the modal

If implementing a lightweight focus trap is safe, do it.

Do not create a large generic modal framework.

--------------------------------------------------
PRIORITY 10 — NESTED MAIN LANDMARKS
--------------------------------------------------

AppLayout already provides <main>.

Remove nested <main> landmarks from pages such as:

- WorkoutsPage
- WorkoutPage

Use appropriate semantic containers instead.

Ensure there is only one primary main landmark per normal page.

Do not break Workout Session focused layout if it intentionally uses a
different layout.

--------------------------------------------------
PRIORITY 11 — PERSISTED DATA VALIDATION
--------------------------------------------------

Strengthen CompletedWorkout validation.

Reject or safely ignore:

- NaN
- Infinity
- negative duration
- negative exercise count
- invalid completion dates
- structurally invalid records

Use:

Number.isFinite()

and appropriate range checks.

Do not allow malformed records to produce NaN/Infinity analytics.

Add tests.

--------------------------------------------------
PRIORITY 12 — PERSISTENCE VERSIONING
--------------------------------------------------

Inspect persisted domains:

- onboarding
- generated plan
- workout session
- completed workout history

Introduce lightweight schema versions where they provide real value.

Do not build a complicated migration framework.

For incompatible old state:

safe reset is acceptable for this test MVP.

If Zustand persist supports version/migrate cleanly,
use that where appropriate.

Document behavior.

--------------------------------------------------
PRIORITY 13 — FUTURE-DATED PROGRESS
--------------------------------------------------

Fix current-period calculations so records occurring after `now`
do not count toward:

- current week
- current 7D/30D analytics
- streak where inappropriate

Add tests using controlled dates.

--------------------------------------------------
PRIORITY 14 — MOBILE 7-DAY GRIDS
--------------------------------------------------

Fix potential overflow at 320px in:

- PlanProgress
- WeeklyOverview

Do not use seven fixed-size cells if they exceed available width.

Prefer:

grid-template-columns: repeat(7, minmax(0, 1fr))

or an equivalent mobile-safe solution.

Ensure:

320px
360px
390px
430px

all work.

Labels and indicators must remain readable.

--------------------------------------------------
PRIORITY 15 — REMOVE OVERFLOW MASKING
--------------------------------------------------

The audit found:

body { overflow-x: hidden }

This can hide actual responsive bugs.

First fix actual overflow sources.

Then determine whether global overflow-x hidden is still necessary.

Prefer removing it if the application remains stable.

Do NOT remove it before verifying relevant pages.

Validate:

/
 /onboarding
 /plan
 /workouts
 /workout/:id
 /workout/:id/session
 /progress
 /nutrition
 /nutrition/:id

at:

320px
360px
390px
430px

There must be no page-level horizontal overflow.

Local horizontal filter scrolling remains acceptable.

--------------------------------------------------
PRIORITY 16 — ACTUAL WORKOUT DURATION
--------------------------------------------------

Audit the CompletedWorkout duration behavior.

Currently catalog duration may be stored even if the user skipped much
of the workout.

For progress analytics, prefer recording actual active workout elapsed
time if session state already provides a reliable value.

Do NOT count paused time.

If implementing accurate active elapsed time would require unsafe
architectural changes, preserve current behavior for now and explicitly
report it.

Do not silently invent duration semantics.

--------------------------------------------------
PRIORITY 17 — ROUTE LEAVE SESSION POLICY
--------------------------------------------------

Inspect browser Back / SPA navigation during active workout.

Define predictable behavior.

At minimum:

an active timer must not continue invisibly after navigating away.

A safe MVP behavior is:

route leave
→ pause persisted session

return
→ Resume Workout

Do not implement complex navigation blocking unless necessary.

Keep the behavior WebView-safe.

--------------------------------------------------
PRIORITY 18 — LOCALSTORAGE TIMER WRITES
--------------------------------------------------

Current session persistence writes to localStorage every timer tick.

Reduce unnecessary synchronous writes.

Possible strategies:

- persist important transitions
- throttle timer persistence
- persist on pause
- persist on visibility change
- persist on route leave

Choose the smallest robust approach.

Do not compromise session recovery.

--------------------------------------------------
DO NOT CHANGE
--------------------------------------------------

Do NOT:

- redesign pages
- change the overall FitLife visual language
- rewrite Zustand/TanStack Query architecture from scratch
- add Phase 9 analytics
- add UAC
- add backend
- add authentication
- install a new state library
- install a chart library
- replace Vitest
- perform speculative micro-optimizations

--------------------------------------------------
VALIDATION
--------------------------------------------------

After implementation run:

npm run build
npm run lint
npm run test

Build already includes TypeScript compilation.

All must pass.

Report total test count after adding the new tests.

--------------------------------------------------
MANUAL VALIDATION
--------------------------------------------------

Verify:

HOME:

complete workout
→ Home weekly progress updates
→ /progress agrees with Home

TIMER:

start timed exercise
→ countdown accurate

pause
→ time stops

resume
→ correct remaining time

simulate delayed timer callback
→ countdown catches up based on actual elapsed time

EXIT:

active timer
→ open Exit dialog
→ timer stops

Continue
→ resumes if previously active

manual pause
→ Exit dialog
→ Continue
→ remains paused

PLAN:

generate plan
→ complete plan workout
→ completion associated with that plan

adjust preferences
→ generate new same-config plan
→ new plan has unique instance ID
→ old completion does NOT mark new plan completed

LIGHT THEME:

accent buttons/text readable
→ keyboard focus visible

PROGRESS:

malformed/future records
→ analytics remain valid
→ no NaN/Infinity

320PX:

Home
Plan
Workouts
Progress
Nutrition

→ no page-level horizontal overflow

--------------------------------------------------
FINAL RESPONSE
--------------------------------------------------

Report:

1. progress source-of-truth changes
2. Home weekly progress fix
3. timer accuracy implementation
4. Exit dialog pause/resume behavior
5. Adjust Preferences behavior
6. plan-instance identity strategy
7. session/timer tests added
8. contrast changes
9. accessibility fixes
10. persistence validation/versioning
11. future-date handling
12. responsive grid fixes
13. overflow-x result
14. actual duration decision
15. route-leave policy
16. persistence write optimization
17. files changed
18. build result
19. lint result
20. test result and total number of tests

Do NOT start Phase 9.
~~~~

