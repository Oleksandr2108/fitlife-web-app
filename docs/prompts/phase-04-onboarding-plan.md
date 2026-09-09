# Phase 4 — Onboarding & Personalized Plan

**Status:** Completed  
**Purpose:** Build onboarding and a persisted deterministic 7-day workout plan.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–3 are complete.

The project already contains:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- dark/light theme system
- dark theme as default
- responsive mobile-first application shell
- Header
- mobile bottom navigation
- shared design system
- motion foundations
- Home page
- mock/backend-ready service architecture
- query hooks for server-like data

We are starting Phase 4:

ONBOARDING & PERSONALIZED 7-DAY PLAN

IMPORTANT:

The application is MOBILE-FIRST.

Primary target widths:
- 360px
- 390px
- 430px

Then enhance for:
- tablet
- desktop

Both DARK and LIGHT themes must be fully supported.

Do not redesign or rewrite working Phase 1–3 functionality.

---

# 1. Product Goal

The purpose of this phase is to turn the Home page CTA into a real product flow.

Primary flow:

Home
→ Start Free
→ Choose Goal
→ Choose Workout Duration
→ Generate Personalized Plan
→ View 7-Day Plan
→ Open Workout

This should feel like a lightweight mobile fitness application rather than a multi-page form.

The onboarding must be:
- fast
- visually polished
- touch-friendly
- understandable
- persistent
- animated
- backend-ready where appropriate

Do not require authentication.

---

# 2. Inspect Existing Implementation First

Before making changes inspect:

- current routing
- Home CTA behavior
- Zustand setup
- TanStack Query setup
- workout domain models
- workout mock data
- workout services
- useWorkouts query hook
- theme system
- shared Button/Card/layout components
- existing Motion utilities
- Header
- mobile bottom navigation

Reuse existing patterns.

Do not duplicate functionality already implemented.

Before editing, briefly explain:
- what currently exists
- what you plan to change
- routing approach
- Zustand state approach
- plan generation approach
- component structure

Then implement.

---

# 3. Routes

Add a dedicated onboarding experience.

Preferred route:

/onboarding

Add a personalized plan route:

/plan

Expected flow:

/
→ /onboarding
→ /plan
→ /workout/:id

The existing Home page primary CTAs:

"Start Free"
"Start My Plan"

must navigate to the same onboarding entry point.

Do not create inconsistent CTA flows.

Existing routes must continue to work.

---

# 4. Onboarding Structure

Create a short multi-step onboarding flow.

Use three logical stages:

STEP 1
Fitness Goal

STEP 2
Workout Duration

STEP 3
Plan Generation / Completion

Do not create unnecessary questions.

This is intentionally a low-friction acquisition flow.

---

# 5. Onboarding Layout

The onboarding experience should feel closer to a mobile application screen than a marketing page.

On mobile:

- focused centered content
- clear heading
- short supporting text
- large touch-friendly option cards
- clear progress indicator
- primary action near the bottom
- comfortable safe-area spacing
- no horizontal overflow

Avoid showing unnecessary marketing navigation during onboarding if it distracts from the flow.

If the current AppShell/Header/BottomNavigation would harm the focused onboarding experience, create a clean focused layout variant.

Do not duplicate the entire application layout.

Desktop may place the onboarding inside a restrained centered panel/container.

Do not stretch the form across the entire screen.

---

# 6. Progress Indicator

Show clear onboarding progress.

Examples:

Step 1 of 3
Step 2 of 3
Step 3 of 3

and/or a compact visual progress bar.

Requirements:

- accessible
- works in dark/light themes
- visually subtle
- does not dominate the screen
- updates correctly between steps

Do not use a huge wizard/stepper component.

---

# 7. Step 1 — Fitness Goal

Question:

"What’s your main goal?"

Supporting copy may be:

"We’ll use this to build a routine that fits you."

Options:

- Lose Weight
- Build Strength
- Stay Active
- Improve Mobility

Use the existing FitnessGoal domain type if available.

Do not create duplicate goal types.

Each option should be a large selectable card.

Each card may include:
- Lucide icon
- title
- short description

Example descriptions:

Lose Weight
Build an active routine with balanced full-body sessions.

Build Strength
Focus on strength-focused bodyweight training.

Stay Active
Create a simple routine for consistent everyday movement.

Improve Mobility
Focus on flexibility, mobility and comfortable movement.

Do not make medical claims.

Requirements:

- obvious selected state
- keyboard accessible
- touch-friendly
- dark/light theme support
- no hover dependency

The user must select one option before continuing.

Primary action:

Continue

---

# 8. Step 2 — Workout Duration

Question:

"How much time do you usually have?"

Supporting copy:

"Choose the session length that fits your schedule."

Options:

10 min
20 min
30+ min

Use a typed representation.

Avoid storing arbitrary display strings as business logic if a numeric or structured representation is cleaner.

Example model:

10
20
30

where 30 represents 30+ minute sessions if appropriate.

Each option may contain:

10 min
Quick sessions for busy days

20 min
A balanced everyday workout

30+ min
More time for complete sessions

Requirements:

- selected state
- Continue button
- Back button
- mobile touch targets
- keyboard accessibility

Back should return to Step 1 without losing the previous selection.

---

# 9. Zustand Onboarding Store

Use Zustand for client-side onboarding state.

The store should contain only appropriate client/application state.

Expected state may include:

- currentStep
- selectedGoal
- selectedDuration
- generatedPlan
- onboardingCompleted

Expected actions may include:

- setGoal()
- setDuration()
- setCurrentStep()
- setGeneratedPlan()
- completeOnboarding()
- resetOnboarding()

Use names consistent with the existing architecture.

Do not put the workout catalog in Zustand.

Workout catalog remains server-like state managed by TanStack Query.

---

# 10. Persistence

Persist appropriate onboarding state using localStorage.

At minimum persist:

- selectedGoal
- selectedDuration
- generatedPlan
- onboardingCompleted

Consider whether currentStep should persist based on UX quality.

Do not blindly persist every store field.

Use the existing storage architecture if one exists.

Handle:
- missing values
- malformed persisted data
- old/incompatible values

safely.

Do not crash because localStorage contains invalid data.

---

# 11. TanStack Query Responsibility

Workout catalog must continue to come through:

useWorkouts()
→ TanStack Query
→ Workout Service
→ Mock data currently

Do NOT:

- import workout mocks into onboarding
- copy workout catalog into Zustand
- fetch workouts manually with useEffect

Plan generation should consume the workout data returned through the existing query architecture.

---

# 12. Personalized Plan Generation

Create a pure reusable plan generation function.

Suggested location:

src/lib/plan/generateWorkoutPlan.ts

or another location consistent with the project architecture.

Suggested API:

generateWorkoutPlan({
  goal,
  duration,
  workouts,
})

Return:

WorkoutPlan

The function must NOT depend on React.

It must NOT access:
- localStorage
- Zustand
- router
- DOM

It should be deterministic and testable.

---

# 13. Plan Generation Logic

Generate a simple 7-day plan based on:

- selected fitness goal
- selected duration
- available workout catalog

Use existing workout metadata such as:

- category
- difficulty
- duration
- exercises

The plan should feel meaningfully different depending on the selected goal.

Example direction:

LOSE WEIGHT:
- Full Body
- Cardio
- Core
- active/recovery days

BUILD STRENGTH:
- Strength
- Full Body
- Core
- recovery/mobility days

STAY ACTIVE:
- Full Body
- Cardio
- Mobility
- varied moderate sessions

IMPROVE MOBILITY:
- Mobility
- light Full Body
- Core/stability
- recovery-oriented days

Do not present the plan as medically personalized.

This is simple product personalization based on user preferences.

---

# 14. Duration Matching

Prefer workouts reasonably close to the selected duration.

Examples:

10 min:
prioritize shorter workouts

20 min:
prioritize medium-length workouts

30+ min:
prioritize longer workouts where available

Do not fail if there is no exact duration match.

Use sensible fallback selection.

The generation algorithm should work with the current mock catalog but should not depend on specific hardcoded workout IDs.

---

# 15. Rest / Recovery Days

The 7-day plan does not need seven intense workouts.

Support recovery/rest days.

A WorkoutPlanDay should be able to represent either:

- workout day
- rest/recovery day

Use the existing domain model if already capable.

If the existing type needs a small clean extension, update it.

Do not create fake workout IDs for rest days.

---

# 16. Step 3 — Generating State

After the user confirms their duration, show a short polished generating state.

Example:

"Creating your plan..."

Supporting copy:

"Matching workouts to your goal and schedule."

This should feel like product feedback, not like a fake AI system.

IMPORTANT:

Do not claim that AI is generating the plan if no AI model is actually used.

Do not use phrases such as:

"AI is analyzing your body"

or other misleading claims.

A short intentional delay may be used for UX if it is not excessive.

Keep it approximately:
500–1000ms maximum.

Do not make users wait unnecessarily.

Respect reduced motion.

---

# 17. Generated State

After generation show:

"Your plan is ready"

Summary:

Build Strength · 20 min

or the appropriate selected preferences.

Show a compact preview of the plan.

For example:

Monday
Full Body Strength
20 min

Tuesday
Mobility
10 min

Wednesday
Core & Stability
20 min

...

The preview may show all seven days if the mobile layout remains clean.

Primary CTA:

View My Plan

Secondary action:

Adjust Preferences

"Adjust Preferences" should allow the user to return to onboarding without unnecessarily losing selections.

---

# 18. Plan Page

Implement:

/plan

This is the user's personalized 7-day plan.

The page should consume the generated plan from the appropriate persisted client state.

Do not regenerate the plan on every render.

Show:

- greeting/heading
- selected goal
- selected duration
- weekly plan
- workout/rest days
- completion status where available

Example heading:

"Your 7-Day Plan"

Supporting text:

"A simple routine built around your goal and schedule."

---

# 19. Plan Day Cards

Each day should clearly show:

- day name
- workout title OR Rest / Recovery
- workout duration
- category
- completion state where available

Workout days should allow navigation to:

/workout/:id

Rest days should not navigate to fake workout pages.

Use Lucide icons sparingly.

Do not overcrowd cards.

---

# 20. Current / Recommended Day

If practical, visually distinguish the next actionable workout.

Do not build complicated calendar logic.

A simple first incomplete workout indicator is enough.

Possible label:

"Up Next"

This should help the plan feel like a real product.

---

# 21. Empty / Missing Plan State

A user may manually open:

/plan

without completing onboarding.

Handle this gracefully.

Do NOT crash.

Show an intentional empty state such as:

"Your plan isn’t ready yet."

"Tell us your goal and schedule to create your 7-day routine."

CTA:

Create My Plan

→ /onboarding

---

# 22. Invalid Persisted Plan

If persisted plan data is malformed or references workouts that no longer exist:

- fail gracefully
- avoid crashes
- provide a way to regenerate the plan

Do not build a huge migration system.

Use reasonable defensive handling.

---

# 23. Returning User Behavior

If a user has already completed onboarding and visits /onboarding again:

Do not automatically block access.

They should be able to adjust their preferences and regenerate their plan.

Existing selections should be shown where appropriate.

---

# 24. Home CTA Behavior

Update existing Home CTAs.

First-time user:

Start Free
→ /onboarding

Returning user with a valid generated plan:

It is acceptable to either:

A. still route to onboarding for editing

or preferably:

B. change the experience intelligently to something like:
"View My Plan"
→ /plan

Choose the cleanest approach consistent with the existing Home architecture.

Do not create confusing CTA behavior.

---

# 25. Motion

Use the existing Framer Motion foundation.

Onboarding transitions should feel polished.

Use AnimatePresence for step changes where appropriate.

Suggested direction:

Forward:

current:
opacity 1 → 0
x 0 → -20

next:
opacity 0 → 1
x 20 → 0

Backward:

reverse direction.

Keep movement small.

Duration approximately:
200–300ms.

Avoid:
- large slides
- bouncing
- dramatic transitions

---

# 26. Reduced Motion

Respect prefers-reduced-motion.

When reduced motion is enabled:

- remove directional sliding
- use minimal/no opacity transition
- preserve immediate usability

Do not require animation for state understanding.

---

# 27. Theme Support

Every new component must support:

DARK
LIGHT

Default remains DARK.

Verify:

- option cards
- selected states
- progress indicator
- generating state
- plan cards
- rest day cards
- buttons
- muted text
- borders
- icons

Do not introduce hardcoded colors that break either theme.

Reuse existing semantic design tokens.

---

# 28. Mobile-First Requirements

This phase is MOBILE-FIRST.

Test conceptually and technically at:

360px
390px
430px

Onboarding:

- option cards fit comfortably
- headings do not overflow
- actions remain reachable
- no horizontal scrolling
- progress indicator fits
- mobile keyboard does not matter because no text input is required

Plan:

- day cards fit one column
- metadata wraps gracefully
- CTA remains accessible
- bottom navigation does not cover content

Then enhance for tablet/desktop.

Do not design desktop first.

---

# 29. WebView Readiness

The onboarding must work naturally inside a mobile WebView.

Avoid:

- new tabs
- browser-dependent interactions
- hover-only controls
- tiny buttons
- unnecessary browser UI assumptions

Back navigation must behave predictably.

If the user uses browser/WebView back during onboarding,
avoid obviously broken state.

---

# 30. Accessibility

Requirements:

- semantic headings
- keyboard-accessible option cards
- selected state communicated accessibly
- proper button elements
- visible focus states
- sufficient contrast
- meaningful labels
- progress state communicated appropriately

Selectable cards should not be clickable divs.

Use appropriate:
- button
- radio semantics
- or accessible equivalent

Choose the simplest semantic implementation.

---

# 31. Loading State

The onboarding depends on workouts from TanStack Query.

Handle:

- pending
- error
- success

If workouts are still loading when plan generation is needed,
show a proper state.

Do not attempt generation with undefined data.

---

# 32. Error State

If workouts fail to load:

Show a useful message.

Example:

"We couldn't prepare your workout options."

CTA:

Try Again

Use TanStack Query refetch.

Do not expose technical error details to the user.

---

# 33. Analytics Readiness

The full analytics provider may be implemented in a later phase.

However, this flow must expose clean interaction points for:

click_start
goal_selected
plan_created

Do not tightly couple onboarding components to Google Analytics,
Firebase, or another provider.

If the existing generic analytics layer already exists, use it.

Otherwise do not build a large analytics system in this phase.

---

# 34. Tests

Add meaningful unit tests for plan generation if the test setup exists or can be added without unnecessary complexity.

At minimum test:

1. returns a 7-day plan
2. handles each fitness goal
3. respects duration preference reasonably
4. supports rest/recovery days
5. does not depend on specific workout IDs
6. handles limited workout catalogs gracefully
7. does not mutate the source workouts array

Do not add meaningless snapshot tests.

If no test infrastructure exists and adding it would significantly expand scope,
report this instead of over-engineering.

---

# 35. Suggested Component Structure

Use the existing project conventions.

A reasonable direction might be:

pages/
  Onboarding/
    OnboardingPage.tsx
    components/
      OnboardingProgress.tsx
      GoalStep.tsx
      DurationStep.tsx
      GeneratingStep.tsx
      PlanReadyStep.tsx

  Plan/
    PlanPage.tsx
    components/
      PlanDayCard.tsx
      PlanSummary.tsx

store/
  onboarding.store.ts

lib/
  plan/
    generateWorkoutPlan.ts

Do not follow this structure blindly if the current architecture already has a better convention.

Do not create tiny components with no meaningful responsibility.

---

# 36. Do Not Implement Yet

Do NOT implement:

- full workout timer
- workout execution flow
- workout catalog filters
- backend
- authentication
- payments
- real AI API
- complex recommendation engine
- calendar integration
- notifications
- advanced analytics provider
- PWA

Those belong to later phases.

---

# 37. Definition of Done

Phase 4 is complete when:

Home CTA
→ onboarding works

Goal selection
→ works

Duration selection
→ works

Plan generation
→ works

Generated plan
→ persists

/plan
→ displays generated plan

Workout plan card
→ navigates to correct workout

Rest day
→ does not navigate incorrectly

Reload
→ plan remains available

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

Invalid/missing state
→ handled

Build
→ passes

Lint
→ passes

Relevant tests
→ pass

---

# 38. Validation

After implementation validate the complete flow:

NEW USER:

/
→ Start Free
→ /onboarding
→ choose goal
→ Continue
→ choose duration
→ Create Plan
→ generating state
→ plan ready
→ View My Plan
→ /plan
→ open workout

RETURNING USER:

reload
→ /plan
→ persisted plan still exists

EDIT FLOW:

/plan
→ adjust preferences
→ /onboarding
→ existing choices visible
→ regenerate
→ updated plan

ERROR FLOW:

workouts query fails
→ useful error
→ retry works

EMPTY FLOW:

open /plan without onboarding
→ intentional empty state
→ Create My Plan works

---

# 39. Run Quality Checks

Run:

npm run build
npm run lint

Run typecheck and tests if scripts exist.

Fix issues introduced by Phase 4.

Do not suppress legitimate TypeScript or lint errors.

---

# 40. Final Response

Report:

- onboarding architecture
- routes added
- Zustand state and persistence
- TanStack Query usage
- plan generation algorithm
- plan persistence
- mobile-first decisions
- dark/light theme behavior
- Motion implementation
- accessibility decisions
- tests added
- files changed
- build/lint/typecheck/test results
- anything intentionally postponed

Do not start Phase 5.

Phase 5 will focus on:

Workout Library
→ Search / Filters
→ Workout Details
→ Query-backed states
→ Mobile UX
→ Workout entry flow
~~~~

