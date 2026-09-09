# Phase 6 — Guided Workout Session

**Status:** Completed  
**Purpose:** Implement the workout state machine, accurate timer, progression, and completion.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–5 are complete.

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
- shared design system
- mock/backend-ready architecture
- workout library
- search and filters
- workout details
- personalized 7-day plan
- workout session entry route/placeholder

We are starting Phase 6:

ACTIVE WORKOUT SESSION
→ Timer
→ Exercise Progression
→ Rest Periods
→ Pause / Resume
→ Previous / Next / Skip
→ Workout Progress
→ Completion
→ Persisted Workout Result

IMPORTANT:
This application is MOBILE-FIRST.

Primary target widths:
- 360px
- 390px
- 430px

Then enhance for:
- tablet
- desktop

Both DARK and LIGHT themes must remain fully supported.

Do not redesign working Phases 1–5 functionality.

---

# 1. Product Goal

Build a real guided workout experience.

A user should be able to:

1. Open a workout
2. Press Start Workout
3. Enter the workout session
4. See the current exercise
5. Complete timed or repetition-based exercises
6. Move through rest periods where appropriate
7. Pause and resume
8. Skip or move between exercises where allowed
9. Understand workout progress
10. Complete the workout
11. Persist the result
12. Continue to Progress or Plan

The experience should feel like a mobile fitness application,
not a timer demo.

---

# 2. Inspect Existing Implementation First

Before changing anything inspect:

- /workout/:id
- current Start Workout action
- /workout/:id/session placeholder
- workout types
- Exercise type
- workout mock data
- TanStack Query workout hooks
- Zustand stores
- localStorage/persistence utilities
- progress-related types
- current user progress service
- personalized plan state
- theme system
- Motion utilities
- AppShell and mobile navigation

Before editing, briefly report:

- current workout-session entry architecture
- what existing types/state can be reused
- any domain model changes required
- proposed session state model
- persistence approach
- component structure

Then implement.

---

# 3. Route

Use:

/workout/:id/session

The session page should load the requested workout through the existing:

useWorkout()
→ TanStack Query
→ Service Layer

Do NOT import workout mocks directly.

If the workout does not exist,
show a clear invalid workout state.

Do not start a session with undefined workout data.

---

# 4. Focused Session Layout

The workout session should use a focused mobile layout.

Avoid unnecessary navigation distractions while the user is exercising.

If appropriate:

- hide or simplify standard Header
- hide mobile bottom navigation during active workout
- keep a safe Exit/Close action

Do not duplicate the entire AppShell.

Create a focused session layout variant if needed.

The active workout should visually prioritize:

- exercise name
- timer / repetitions
- progress
- controls

---

# 5. Session State Architecture

Use Zustand for active workout-session client state.

Do NOT use TanStack Query for timer/session state.

TanStack Query:
- workout definition/data

Zustand:
- active session state

Suggested state:

- workoutId
- status
- currentExerciseIndex
- phase
- remainingSeconds
- isPaused
- completedExerciseIds
- startedAt
- elapsedSeconds

Possible session status:

'idle'
'active'
'paused'
'completed'

Possible phase:

'exercise'
'rest'

Use typed unions.

Do not store unnecessary derived values.

---

# 6. Session Store Actions

Implement clear actions such as:

startSession()
pauseSession()
resumeSession()
tick()
nextExercise()
previousExercise()
skipExercise()
startRest()
completeSession()
resetSession()

Names may follow existing conventions.

Keep transition logic centralized.

Do not spread workout-state transitions across many UI components.

---

# 7. Timer Logic

Timed exercises must have a countdown.

Requirements:

- countdown every second
- never create multiple competing intervals
- clean up intervals correctly
- pause stops countdown
- resume continues correctly
- changing exercise resets relevant timer
- reaching zero transitions correctly
- unmounting does not leak timers

Avoid placing complex timer logic directly inside a giant page component.

A dedicated hook such as:

useWorkoutTimer()

may be appropriate.

---

# 8. Timer Accuracy

Do not rely blindly on decrementing state forever if browser timer drift becomes an issue.

Use a simple robust approach suitable for this MVP.

If using interval-based countdown:
- keep implementation predictable
- avoid duplicate intervals
- ensure pause/resume works correctly

Do not over-engineer with a full timing engine unless needed.

---

# 9. Timed Exercises

For exercises with duration:

Example:

Bodyweight Squats

00:32

The UI should show:

- exercise name
- remaining time
- progress ring/bar if appropriate
- current position in workout

Example:

Exercise 2 of 6

Do not make the countdown visually tiny.

---

# 10. Repetition-Based Exercises

Some exercises may use repetitions instead of duration.

Example:

Push Ups
10 reps

For repetition exercises:

Do NOT run a countdown unless there is a defined timed duration.

Provide a clear primary action:

Done

or

Next Exercise

The user manually confirms completion.

Keep behavior consistent.

---

# 11. Exercise Instructions

Show useful current-exercise information.

Potential content:

- exercise title
- short instructions
- repetitions or time
- optional image/visual if existing data supports it

Do not overcrowd the session screen.

Detailed instructions may be expandable if necessary,
but keep the main workout controls visible.

---

# 12. Rest Periods

Support rest periods between exercises when the exercise/workout data defines them.

Rest UI example:

REST

00:20

Next:
Push Ups

Allow:

Skip Rest

Rest should automatically proceed when timer reaches zero.

Do not create a rest period after the final exercise unless the data/product logic clearly requires it.

---

# 13. Exercise Progression

Normal sequence:

Exercise
→ Rest
→ Exercise
→ Rest
→ ...
→ Final Exercise
→ Complete

Handle both:

- timed exercise finishing automatically
- repetition exercise manually completed

Keep state transitions deterministic.

---

# 14. Previous Exercise

Provide Previous only when it makes sense.

Requirements:

- disabled/hidden on first exercise
- does not create invalid index
- correctly restores exercise state

Choose reasonable behavior for timer reset when going backwards.

Document that decision briefly.

Do not attempt to restore the exact historical second unless necessary.

For MVP:
resetting the selected exercise to its full duration is acceptable.

---

# 15. Skip / Next

Allow users to move forward where appropriate.

For active exercise:

Skip
or
Next

For rest:

Skip Rest

Do not use ambiguous controls.

Make sure skipping the final exercise completes the workout correctly.

---

# 16. Pause / Resume

Timed workout states should support:

Pause
Resume

While paused:

- timer must stop
- accidental progression must not happen
- clear paused state should be visible

A subtle overlay/state treatment is acceptable.

Do not obscure all workout information unnecessarily.

---

# 17. Workout Progress

Show clear workout progress.

Examples:

Exercise 3 of 6

and/or:

████████░░░

Calculate based on exercise progression.

Do not confuse exercise timer progress with whole-workout progress.

If both are displayed,
visually distinguish them.

---

# 18. Timer Progress

For timed exercises,
a circular progress indicator or linear timer progress is acceptable.

Prefer a simple performant implementation.

Do not introduce a charting library.

CSS/SVG is enough.

If using SVG:
- keep it accessible
- do not rely solely on color

---

# 19. Session Header

Create a compact session header.

Possible elements:

- Exit/back action
- workout title
- exercise progress

Avoid full marketing navigation.

The user should be able to exit intentionally.

---

# 20. Exit Workout

If the user tries to leave an active workout,
avoid accidental data loss.

Implement a lightweight confirmation UI if appropriate.

Example:

"End workout?"

"Your current session progress will be lost."

Actions:

Continue Workout
End Workout

Use a real accessible dialog/modal if implemented.

Do not use window.confirm if the existing design system can support a clean modal without excessive work.

However, simplicity is acceptable.

---

# 21. Persistence During Session

Persist enough session state to survive accidental refresh where reasonable.

Potential persisted fields:

- workoutId
- currentExerciseIndex
- phase
- remainingSeconds
- status
- completedExerciseIds
- startedAt

Do not persist interval IDs or non-serializable state.

Use Zustand persist or existing storage abstraction.

---

# 22. Session Resume

If the page reloads during an active session:

Restore the session if persisted state is valid and matches the current workout.

Do not silently resume a countdown while the page was closed for a long time unless explicitly designed.

For this MVP, acceptable behavior:

- restore paused session
- show "Resume Workout"

This avoids surprising timer jumps.

Keep implementation simple and predictable.

---

# 23. Invalid Persisted Session

If persisted session data is invalid,
stale,
or references another unavailable workout:

Reset safely.

Do not crash.

Do not build complex migration logic.

---

# 24. Workout Completion

After the final exercise:

mark the workout session completed.

Show a dedicated completion screen/state.

Suggested content:

Workout Complete

Great work!

20 min completed
6 exercises

Optional:
streak/progress preview

Primary CTA:

View Progress

Secondary CTA:

Back to My Plan

or:

Browse Workouts

Choose actions based on existing routes/state.

---

# 25. Completion Animation

Use Framer Motion for a polished completion moment.

Possible effects:

- check icon scale/fade
- small success content stagger
- progress reveal

Avoid:
- confetti libraries
- massive particle effects
- long blocking animation

Respect reduced motion.

---

# 26. Persist Completed Workout

When completing a workout,
save a CompletedWorkout record.

Use the existing domain model or refine it cleanly.

Example fields:

- id
- workoutId
- completedAt
- durationMinutes
- exerciseCount

Optional:
- planDayId if relevant

Do not persist duplicated full workout objects unless necessary.

---

# 27. Update Client Progress

After completion,
update the relevant persisted client progress state.

The user should later be able to see:

- completed workout
- updated workout count
- total minutes
- recent activity

This will feed Phase 7.

Do not fully redesign the Progress page yet.

Create the correct underlying state/data flow now.

---

# 28. Server-State vs Client-State Boundary

Important architecture rule:

Workout definition/catalog:
TanStack Query

Active workout session:
Zustand

Completed local workout history for the MVP:
client persistence / Zustand or appropriate local repository

Do not put active timer state into TanStack Query.

Do not mutate mock server data directly.

Keep future backend synchronization possible.

---

# 29. Progress Repository / Service Readiness

If current progress architecture is purely mocked,
introduce the smallest clean abstraction needed so completed workouts can later be synced to a backend.

For example:

recordCompletedWorkout()

may currently persist locally.

Future:

recordCompletedWorkout()
→ API mutation

Do not implement a fake backend.

Do not add unnecessary complexity.

---

# 30. Personalized Plan Integration

If the workout was started from a generated plan:

Completion should be reflected in the user's plan where practical.

A completed plan workout should later be displayable as completed.

Do not tightly couple the session page to plan UI.

Use IDs/state relationships.

---

# 31. Start Workout Behavior

Update the Phase 5 Start Workout action.

It should:

- initialize the session for that workout
- navigate to /workout/:id/session

Avoid starting duplicate sessions accidentally.

If a stale session exists for another workout,
handle it predictably.

Possible behavior:
starting a new workout resets the previous incomplete session after confirmation if necessary.

Keep MVP logic simple.

---

# 32. Current Exercise UI

The mobile screen should prioritize:

Workout title / progress

Current Exercise

Large timer or repetitions

Instructions

Primary control

Secondary controls

Next exercise preview

Do not fill the screen with unnecessary stats.

---

# 33. Next Exercise Preview

Where useful show:

Next

Push Ups
10 reps

During rest this is especially useful.

Do not render a next preview after the final exercise.

---

# 34. Mobile Controls

At 360px:

Controls must remain comfortable.

Primary action should be easy to tap.

Example:

[ Pause ]

[ Previous ]   [ Skip ]

or another clean arrangement.

Avoid fitting 4–5 tiny buttons into one row.

Stack or split controls when needed.

Minimum comfortable touch size should remain around 44–48px.

---

# 35. Bottom Navigation

During active workout session,
hide standard mobile bottom navigation if it distracts or overlaps controls.

The workout session is a focused mode.

When completion occurs,
normal app navigation may return.

Do not let fixed navigation overlap workout controls.

---

# 36. Safe Areas

Account for:

env(safe-area-inset-top)
env(safe-area-inset-bottom)

where fixed workout controls/header require it.

This is important for WebView/mobile usage.

Do not add excessive padding on devices without safe areas.

---

# 37. Dark / Light Theme

Everything must work in:

DARK
LIGHT

Default remains DARK.

Check:

- session background
- timer
- progress indicators
- buttons
- paused state
- rest state
- exit dialog
- completion state
- muted text
- borders

Do not introduce hardcoded colors that only work in dark mode.

---

# 38. Motion

Use existing Motion foundations.

Good motion use:

- exercise transition
- rest transition
- pause state
- completion
- subtle progress changes

Use AnimatePresence where appropriate.

Keep exercise transitions short.

Suggested:

150–300ms

Do not animate the timer number heavily every second.

A subtle change is enough.

---

# 39. Reduced Motion

Respect reduced-motion preferences.

With reduced motion:

- no sliding exercise screens
- no large scale animations
- immediate transitions are acceptable

Workout functionality must remain identical.

---

# 40. Accessibility

Requirements:

- timer is readable
- controls use real buttons
- accessible labels for icon-only actions
- keyboard controls remain usable on desktop
- focus states visible
- progress has appropriate accessible text
- dialog is keyboard accessible
- color is not the only completion/status signal

Consider aria-live carefully for timer updates.

Do NOT announce every second if it creates excessive screen reader noise.

Use accessible static context rather than noisy live regions.

---

# 41. Error State

If the workout query fails during session load:

show:

"We couldn't load this workout."

Actions:

Try Again
Back to Workouts

Do not initialize session until valid workout data exists.

---

# 42. Invalid Workout

/workout/invalid-id/session

must not crash.

Show workout-not-found state and navigate back to workout library.

---

# 43. Loading State

During workout data loading:

use an intentional session loading state.

Do not briefly initialize empty timer state.

Avoid UI flicker.

---

# 44. Tests — Important

This phase contains real business logic.

Add meaningful tests if testing infrastructure exists.

Prioritize pure logic tests for:

- session initialization
- next exercise transition
- previous exercise boundary
- final exercise completion
- timed exercise → rest
- timed exercise → next exercise when no rest
- repetition exercise completion
- skipping rest
- skipping final exercise
- pause/resume behavior where testable
- persisted state validation

Separate timer/state transition logic enough to make it testable.

Do not write fragile tests based on exact visual implementation.

---

# 45. Timer Tests

Use fake timers where appropriate.

Verify:

- timer decrements
- pause prevents decrement
- resume restores countdown
- zero transitions once
- duplicate intervals are not created

Do not create tests that wait real seconds.

---

# 46. Do Not Implement Yet

Do NOT implement:

- full Progress dashboard redesign
- advanced analytics
- backend synchronization
- authentication
- social sharing
- achievements system
- audio coaching
- notifications
- health integrations
- wearable integrations
- PWA/offline workout engine

Those are outside Phase 6.

---

# 47. Definition of Done

Phase 6 is complete when:

Workout Details
→ Start Workout

Session
→ loads correct workout

Timed exercise
→ counts down

Pause
→ stops timer

Resume
→ continues timer

Timed exercise finishes
→ correct rest/next transition

Repetition exercise
→ can be manually completed

Rest
→ counts down

Skip Rest
→ works

Previous
→ works safely

Skip/Next
→ works

Whole workout progress
→ correct

Final exercise
→ completes session

Completion screen
→ displays

CompletedWorkout
→ persisted

Refresh during session
→ handled safely

Plan relationship
→ preserved where applicable

Invalid workout
→ handled

Loading/error
→ handled

Dark theme
→ works

Light theme
→ works

360px mobile
→ works

Desktop
→ works

Reduced motion
→ works

No interval leaks
→ verified

Build
→ passes

Lint
→ passes

Tests
→ pass

---

# 48. Validation Flow

Validate:

TIMED WORKOUT:

/workout/:id
→ Start Workout
→ timed exercise
→ pause
→ resume
→ timer reaches 0
→ rest
→ next exercise

REPETITION EXERCISE:

repetition exercise
→ Done
→ rest/next

SKIP FLOW:

exercise
→ Skip
→ next/rest

REST FLOW:

rest
→ Skip Rest
→ next exercise

BACK FLOW:

exercise 2+
→ Previous
→ valid previous exercise

REFRESH:

active session
→ refresh
→ safe resumable/paused state

COMPLETE:

final exercise
→ Workout Complete
→ result persisted
→ View Progress / Plan action works

INVALID:

/workout/invalid/session
→ safe not-found state

ERROR:

query error
→ useful error
→ retry

---

# 49. Run Quality Checks

Run:

npm run build
npm run lint

Run typecheck and tests.

Fix issues introduced by Phase 6.

Do not suppress legitimate errors.

---

# 50. Final Response

Report:

- session architecture
- Zustand session state
- timer implementation
- exercise/rest state transitions
- pause/resume behavior
- persistence strategy
- refresh/resume behavior
- completion persistence
- plan integration
- mobile-first decisions
- safe-area handling
- dark/light validation
- Motion usage
- accessibility decisions
- tests added
- files changed
- build/lint/typecheck/test results
- anything intentionally postponed

Do not start Phase 7.

Phase 7 will focus on:

PROGRESS DASHBOARD
→ Completed Workout History
→ Streak
→ Weekly Goal
→ Total Minutes
→ Recent Activity
→ Plan Completion
→ Progress Visualization
~~~~

