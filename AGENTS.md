# FitLife — AGENTS.md

## 1. Project Overview

FitLife is a mobile-first fitness and lifestyle web application built as a test assignment for an AI Product Builder role.

The project should demonstrate:

- strong frontend engineering
- product thinking
- AI-assisted development
- clean and modern UI/UX
- mobile-first responsive design
- purposeful animations
- WebView readiness
- mock-first but backend-ready architecture
- user acquisition attribution
- analytics event tracking
- maintainable and scalable code

FitLife is a white / non-gambling product.

The application helps users:

- choose a fitness goal
- choose their preferred workout duration
- receive a simple personalized 7-day workout plan
- browse workouts
- complete guided workouts
- track workout progress
- browse simple nutrition content

The application should feel like a real consumer mobile product rather than a generic landing page.

---

# 2. Product Philosophy

The project is not just a marketing website.

It should behave like a lightweight fitness web application that could later:

- receive paid acquisition traffic
- run inside a mobile WebView
- communicate with a real backend
- use a real analytics provider
- persist authenticated user data
- evolve into a production application

At the same time, this is a test project.

Do not over-engineer features that are not needed for the demonstration.

Prefer a polished, coherent MVP over a large unfinished product.

---

# 3. Main User Journey

The primary product funnel is:

```text
Advertisement / UAC traffic
        ↓
Landing Page
        ↓
Start Free
        ↓
Choose Fitness Goal
        ↓
Choose Workout Duration
        ↓
Generate 7-Day Plan
        ↓
View Workout
        ↓
Start Workout
        ↓
Complete Workout
        ↓
Progress
```

The UI and architecture should support this flow clearly.

The primary conversion action is completing the onboarding and starting the fitness plan.

Secondary conversion events include:

- starting onboarding
- selecting a goal
- generating a plan
- opening a workout
- starting a workout
- completing a workout

---

# 4. Technology Stack

Core stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Motion / Framer Motion
- Lucide React
- TanStack Query

Development tools:

- ESLint
- Prettier
- TypeScript
- Vite

Testing may use:

- Vitest
- React Testing Library

Do not introduce additional dependencies unless they provide clear value.

Before installing a new package:

1. Check whether the functionality can reasonably be implemented with the existing stack.
2. Explain why the dependency is useful.
3. Avoid large libraries for trivial functionality.

Do not install a UI component framework such as:

- Material UI
- Chakra UI
- Ant Design
- Bootstrap

The visual system should be implemented using Tailwind CSS and project components.

---

# 5. General Development Rules

Always inspect the existing code before modifying it.

When implementing a feature:

1. Understand the current architecture.
2. Identify reusable existing components.
3. Briefly explain the implementation approach.
4. Make focused changes.
5. Avoid rewriting unrelated working code.
6. Run relevant checks after implementation.
7. Fix issues introduced by the changes.
8. Summarize what changed.

Do not implement multiple large unrelated features in one step unless explicitly requested.

Prefer incremental development.

---

# 6. TypeScript Rules

Use TypeScript strictly.

Requirements:

- avoid `any`
- prefer explicit domain types
- use unions for finite states
- use typed function arguments
- use typed return values for services
- type component props
- keep API/domain models consistent
- use `unknown` instead of `any` when the type is genuinely unknown

Example:

```ts
type FitnessGoal =
  | "lose-weight"
  | "build-strength"
  | "stay-active"
  | "improve-mobility";
```

Do not create unnecessary complex generic abstractions.

Types should improve clarity rather than increase complexity.

---

# 7. React Rules

Use modern functional React.

Prefer:

- functional components
- hooks
- composition
- reusable components
- custom hooks for reusable stateful logic
- early returns

Avoid:

- class components
- giant page components
- deeply nested JSX
- duplicated UI logic
- unnecessary `useEffect`
- unnecessary `useMemo`
- unnecessary `useCallback`
- unnecessary global state
- storing derived state when it can be calculated

Keep components focused on one responsibility.

---

# 8. Component Architecture

Shared reusable UI belongs in:

```text
src/components/
```

Page-specific components may live close to their page if they are not reused elsewhere.

Examples of shared components:

```text
Button
Container
Section
Header
Footer
MobileNavigation
WorkoutCard
RecipeCard
ProgressBar
Badge
LoadingState
ErrorState
EmptyState
```

Do not create a component for every tiny piece of markup.

Extract components when they:

- are reused
- contain meaningful logic
- improve readability
- represent a clear UI concept

---

# 9. Project Structure

Use this structure as the baseline:

```text
src/
├── api/
│   └── client.ts
│
├── assets/
│
├── components/
│
├── data/
│
├── hooks/
│
├── lib/
│   ├── analytics.ts
│   ├── attribution.ts
│   └── storage.ts
│
├── mocks/
│   ├── user.mock.ts
│   ├── workouts.mock.ts
│   ├── recipes.mock.ts
│   └── progress.mock.ts
│
├── pages/
│   ├── Home/
│   ├── Workouts/
│   ├── Workout/
│   ├── Nutrition/
│   ├── Progress/
│   └── NotFound/
│
├── services/
│   ├── user.service.ts
│   ├── workout.service.ts
│   └── nutrition.service.ts
│
├── store/
│
├── types/
│
├── App.tsx
├── main.tsx
└── index.css
```

This is a guideline, not a reason to create empty or unnecessary files.

Create files and folders only when they have a purpose.

---

# 10. Routing

Use React Router.

Planned routes:

```text
/
 /workouts
 /workout/:id
 /nutrition
 /progress
```

Add a 404 fallback route.

Onboarding may use:

- a dedicated route
- nested routes
- or an application flow

Choose the simplest solution that provides good UX.

Navigation should work correctly when the application runs inside a mobile WebView.

Do not rely on desktop-only navigation patterns.

---

# 11. UI Direction

The UI should feel:

- modern
- clean
- lightweight
- polished
- trustworthy
- energetic
- premium but approachable
- fitness/lifestyle oriented

The application must NOT look like a generic AI-generated landing page.

Avoid:

- excessive gradients
- glassmorphism everywhere
- huge rounded cards everywhere
- excessive shadows
- random decorative blobs
- unnecessary floating elements
- excessive icons
- excessive text
- visually noisy sections

Use visual hierarchy intentionally.

---

# 12. Design System

Maintain consistent design tokens.

Primary direction:

```text
Background: light neutral
Surface: white
Text: dark neutral
Secondary text: muted neutral
Accent: fitness-oriented green
Borders: subtle neutral
```

Initial color direction may use values similar to:

```text
Dark:
#111827

Background:
#F8FAFC

Surface:
#FFFFFF

Accent:
#22C55E
```

These values may be refined if necessary to improve the design.

Do not scatter arbitrary color values throughout components.

Prefer centralized Tailwind theme variables/tokens where appropriate.

---

# 13. Typography

Use a clean modern sans-serif typeface.

Preferred direction:

```text
Inter
```

Typography should have a clear hierarchy.

Typical hierarchy:

```text
Hero heading:
large, bold, high contrast

Section heading:
strong but smaller than hero

Card title:
medium/semibold

Body:
comfortable reading size

Metadata:
smaller and muted
```

Avoid excessive font-size variations.

Maintain readable line heights.

---

# 14. Layout

Use reusable layout primitives.

Content should generally live inside a consistent container.

Avoid:

- random maximum widths
- inconsistent horizontal padding
- different section spacing without reason

Mobile should have comfortable side padding.

Desktop content should not stretch excessively across very wide screens.

---

# 15. Responsive Design

The project is MOBILE-FIRST.

Start with mobile styles and enhance for larger screens.

Important viewport widths include approximately:

```text
360px
390px
430px
768px
1024px
1440px
```

Requirements:

- no horizontal overflow
- responsive images
- readable text
- responsive cards
- touch-friendly controls
- sensible section spacing
- no desktop-only functionality
- no hover dependency for critical actions

Desktop should still look polished and intentional.

---

# 16. Mobile Navigation

Because the application may run inside a WebView, mobile navigation is especially important.

A bottom navigation may be used for primary application sections such as:

```text
Home
Workouts
Progress
```

Use Lucide icons if icons are needed.

Navigation must:

- clearly show the active page
- be touch-friendly
- respect safe areas where practical
- not obscure page content
- work without hover

Do not add bottom navigation simply for decoration.

---

# 17. Accessibility

Accessibility is required.

Use:

- semantic HTML
- correct heading hierarchy
- actual `button` elements for actions
- actual links for navigation
- descriptive alt text for meaningful images
- accessible form labels
- visible keyboard focus states
- sufficient color contrast
- keyboard-accessible interactive elements

Avoid clickable `div` or `span` elements when semantic controls exist.

Animations must respect reduced-motion preferences.

---

# 18. Animations

Use Motion / Framer Motion for purposeful animations.

Animations should make the application feel polished without becoming distracting.

Good animation use cases:

- hero entrance
- section reveal
- card entrance
- onboarding step transitions
- progress updates
- workout timer state changes
- workout completion feedback
- modal/dialog transitions
- subtle CTA interaction

Prefer:

- opacity
- small vertical translation
- small horizontal translation for step navigation
- subtle scale
- simple staggered children

Typical animation duration:

```text
150ms – 400ms
```

Longer animations should only be used when clearly justified.

Avoid:

- large parallax effects
- constant looping animations
- animating every element
- excessive bounce
- large movements
- animations that delay interaction

Use CSS transitions for simple hover/focus effects when Motion is unnecessary.

---

# 19. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

When using Motion, use its reduced-motion capabilities where appropriate.

Users who prefer reduced motion should still have a fully usable application.

Animation must never be required to understand content or complete an action.

---

# 20. Data Architecture

The application initially uses mocked data.

However, the architecture must make it easy to replace mock data with a real backend later.

UI components should NOT directly depend on raw mock files for server-like entities.

Avoid:

```ts
import { mockUser } from "@/mocks/user.mock";
```

inside page components.

Prefer:

```ts
const user = await getCurrentUser();
```

through a service abstraction.

---

# 21. Service Layer

Use services for server-like domain operations.

Examples:

```ts
getCurrentUser();
getWorkouts();
getWorkoutById();
getRecipes();
getUserProgress();
```

All server-like service functions should be asynchronous even when they currently use mock data.

Example:

```ts
export async function getCurrentUser(): Promise<User> {
  return mockUser;
}
```

This allows the mock implementation to later become:

```ts
export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>("/users/me");
}
```

without requiring UI components to be rewritten.

---

# 22. Mock Data

Use realistic but clearly fictional mock data.

Required initial mock entities:

- current user
- workouts
- exercises
- recipes
- progress

Mock data should be typed.

Do not place large mock datasets inside React components.

Example user concept:

```ts
{
  id: 'user-001',
  firstName: 'Alex',
  goal: 'stay-active',
  preferredWorkoutDuration: 20,
  streak: 4,
  completedWorkouts: 12,
  totalMinutes: 245
}
```

Do not use real personal information.

---

# 23. Async Mock Behavior

Mock services may simulate a short network delay.

Example:

```ts
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
```

This can be used to demonstrate realistic:

- loading states
- skeleton states
- asynchronous UI
- error handling

Keep delays short.

Do not intentionally make the application feel slow.

---

# 24. Backend Readiness

Create a lightweight generic API client foundation.

The API base URL should come from:

```text
VITE_API_URL
```

Provide:

```text
.env.example
```

Example:

```env
VITE_API_URL=https://api.example.com
```

Do not hardcode production API URLs.

The API client should support typed responses.

Do not build authentication until explicitly required.

Do not implement a fake complex backend.

---

# 25. Server State — TanStack Query

Use TanStack Query for asynchronous server-like data.

Even though the project currently uses mock data, entities that conceptually come from a backend should be treated as server state.

Use TanStack Query for:

- current user
- workouts
- individual workout details
- recipes
- user progress
- other future API-backed resources

Architecture:

React Component
→ Custom Query Hook
→ TanStack Query
→ Service Layer
→ Mock Data (currently) / Real API (later)

Page components should not call service functions through manual
`useEffect` + `useState` data-fetching patterns.

Prefer custom query hooks such as:

- useCurrentUser()
- useWorkouts()
- useWorkout(id)
- useRecipes()
- useUserProgress()

Keep query keys centralized and consistent.

TanStack Query manages server-like state.

Zustand manages client/application state.

Do not duplicate the same state between TanStack Query and Zustand.

Examples of TanStack Query state:

- workouts received from a service/API
- recipes
- current user received from backend
- backend progress data

Examples of Zustand state:

- onboarding flow state
- currently selected fitness goal
- selected workout duration
- temporary workout session
- other client-only application state

When the backend is connected later, service implementations should change
without requiring page components or query hooks to be rewritten.

# 26. Zustand State

Use Zustand for global client state that needs to survive across screens.

Appropriate examples:

- selected fitness goal
- preferred workout duration
- generated workout plan
- completed workouts
- workout progress
- onboarding completion

Use local React state for temporary component-specific UI.

Do not put every value in Zustand.

---

# 27. Persistence

Persist appropriate client state using localStorage.

Examples:

- onboarding preferences
- generated plan
- completed workouts
- progress
- attribution data

Storage logic should be centralized where practical.

Avoid directly accessing localStorage throughout many unrelated components.

Handle malformed or missing stored values safely.

---

# 28. Domain Models

Create clear TypeScript domain models.

Initial concepts include:

```text
User
UserPreferences
FitnessGoal
Workout
Exercise
Recipe
WorkoutPlan
WorkoutPlanDay
CompletedWorkout
UserProgress
AttributionData
AnalyticsEvent
```

Do not create unnecessarily complicated models before they are needed.

---

# 29. Workouts

A workout should contain useful structured information such as:

```text
id
slug
title
description
difficulty
duration
category
equipment
image
exercises
```

Potential categories:

```text
Full Body
Strength
Cardio
Core
Mobility
```

Potential difficulty levels:

```text
Beginner
Intermediate
Advanced
```

---

# 30. Exercises

Exercises may include:

```text
id
name
duration
repetitions
restDuration
instructions
```

Not every exercise needs both duration and repetitions.

Keep the data model practical.

---

# 31. Nutrition

Nutrition is lifestyle content, not medical advice.

Recipes may contain:

```text
id
slug
title
description
image
calories
protein
carbohydrates
fat
preparationTime
ingredients
```

Do not make medical claims.

Do not present FitLife as a medical or diagnostic application.

---

# 32. Home Page

The Home page is the primary acquisition landing page.

Its main objective is to quickly communicate value and lead users toward:

```text
Start Free
```

Expected sections:

1. Header
2. Hero
3. Primary CTA
4. Benefits
5. Popular workouts
6. Nutrition preview
7. Final CTA
8. Footer

The page should not feel overloaded.

The primary CTA should remain visually clear.

---

# 33. Onboarding

The onboarding flow should be short.

Step 1:

```text
What's your main goal?
```

Options:

```text
Lose Weight
Build Strength
Stay Active
Improve Mobility
```

Step 2:

```text
How much time do you have?
```

Options:

```text
10 min
20 min
30+ min
```

Step 3:

Generate/show a simple personalized 7-day plan.

Persist relevant selections.

Use animated transitions between steps.

The user should understand progress through the onboarding flow.

---

# 34. Workout Library

The Workouts page should support browsing workouts.

Possible filters:

Difficulty:

```text
All
Beginner
Intermediate
Advanced
```

Category:

```text
Full Body
Strength
Cardio
Core
Mobility
```

Workout cards should communicate:

- title
- image
- duration
- difficulty
- equipment requirement
- category

Filtering should feel immediate.

---

# 35. Workout Details

Route:

```text
/workout/:id
```

Display:

- title
- description
- duration
- difficulty
- equipment
- exercise list
- primary Start Workout CTA

Handle an invalid workout ID gracefully.

Do not crash when workout data is missing.

---

# 36. Workout Timer

The workout experience should demonstrate meaningful frontend functionality.

Required capabilities:

- countdown
- pause
- resume
- next exercise
- skip where appropriate
- progress indication
- current exercise
- next exercise preview
- workout completion

Avoid multiple timers or interval leaks.

Clean up timers correctly.

Completing a workout should update progress state.

---

# 37. Progress

The Progress page should demonstrate persisted user data.

Possible information:

- current streak
- completed workouts
- total workout minutes
- weekly progress
- recent activity

Example:

```text
4 Day Streak
12 Workouts
245 Minutes
4 / 5 This Week
```

Use mock data initially and transition naturally to locally persisted progress as the user interacts with the application.

---

# 38. Loading States

Any asynchronous server-like data should have a proper loading state.

Prefer skeleton UI where appropriate.

Avoid large centered spinners for every page.

Loading states should resemble the final content structure.

---

# 39. Empty States

Provide useful empty states.

Example:

```text
No workouts completed yet.

Start your first workout today.

[ Explore Workouts ]
```

Empty states should guide users toward an action.

---

# 40. Error States

Server-like operations should be able to display meaningful error states.

Example:

```text
Something went wrong.

[ Try Again ]
```

Do not expose technical stack traces to users.

---

# 41. UAC / User Acquisition Context

FitLife should be designed with paid user acquisition traffic in mind.

A user may arrive directly from an advertisement without previous product knowledge.

Therefore the landing experience must quickly answer:

1. What is FitLife?
2. What value does it provide?
3. What should I do next?

Avoid requiring registration before the user can understand or experience the product.

---

# 42. UTM Attribution

Support the following query parameters:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Example:

```text
/?utm_source=google&utm_medium=cpc&utm_campaign=fitness_launch&utm_content=creative_01
```

Capture first-touch attribution.

Persist attribution locally.

Do not overwrite valid first-touch attribution on every page navigation.

Keep attribution logic separate from page components.

---

# 43. Analytics

Create a lightweight provider-agnostic analytics layer.

Initial events:

```text
page_view
click_start
goal_selected
plan_created
workout_open
workout_started
workout_completed
conversion
```

During development, events may be logged to the console.

Example API:

```ts
trackEvent("goal_selected", {
  goal: "build-strength",
});
```

UI components should not contain analytics-provider-specific code.

Later it should be possible to connect:

- Google Analytics
- Firebase Analytics
- another analytics provider

without rewriting product logic.

---
# Theme System

FitLife supports two visual themes:

- dark
- light

Default theme:

dark

Requirements:

- dark theme must be the default on first visit
- user can manually switch between dark and light
- selected theme must persist in localStorage
- theme should apply at the application root level
- all shared UI components must support both themes
- do not implement theme-specific duplicate components
- do not scatter theme state across pages
- avoid hardcoded colors that only work in one theme

Use semantic design tokens rather than direct colors where practical.

Examples:

- background
- surface
- surface-muted
- text-primary
- text-secondary
- border
- accent
- accent-hover

Dark theme should feel premium and fitness-oriented, not pure black everywhere.

Prefer deep neutral/slate backgrounds with slightly lighter surfaces.

Light theme should remain clean and calm.

Theme switching should not cause layout shift.

Persist the selected theme using localStorage.

Default to dark when no preference exists.

Do not automatically override the user's manual preference with the operating system theme.
# 44. Conversion

The main conversion funnel should be measurable.

Example:

```text
page_view
    ↓
click_start
    ↓
goal_selected
    ↓
plan_created
    ↓
workout_open
    ↓
workout_started
    ↓
workout_completed
    ↓
conversion
```

Do not artificially trigger conversions.

Events should correspond to actual user actions.

---

# 45. WebView Readiness

FitLife should be suitable for later integration into a mobile WebView.

Prioritize:

- mobile-first layout
- touch-friendly interactions
- SPA navigation
- persistent local state
- lightweight assets
- no horizontal overflow
- predictable navigation
- good performance
- clear loading/error states

Do not assume:

- hover
- large screens
- physical keyboard
- browser-specific desktop UI

Avoid unnecessary new-window behavior.

---

# 46. Safe Areas

For fixed mobile UI such as bottom navigation, account for mobile safe areas where appropriate.

Consider:

```css
env(safe-area-inset-bottom)
```

when implementing fixed bottom controls.

Do not allow navigation or CTAs to overlap device UI.

---

# 47. Performance

Performance matters because users may arrive from paid mobile traffic.

Prefer:

- optimized image formats
- appropriate image dimensions
- lazy-loaded below-the-fold images
- code splitting where useful
- limited dependencies
- lightweight components
- minimal unnecessary re-renders

Do not prematurely optimize trivial code.

Measure or identify a real issue before introducing complex optimization.

---

# 48. Images

Use consistent high-quality fitness/lifestyle imagery.

Images should support the product and not dominate it.

Requirements:

- responsive
- appropriate aspect ratio
- optimized
- meaningful alt text
- lazy loading below the fold where appropriate

Avoid:

- obviously mismatched stock images
- inconsistent visual styles
- giant unoptimized images
- decorative images with no purpose

---

# 49. Icons

Use Lucide React for UI icons where appropriate.

Keep icon style consistent.

Do not mix multiple icon libraries.

Icons should support text, not replace important labels where clarity would suffer.

---

# 50. SEO

Even though the product is WebView-ready, the public website should have basic SEO.

Include:

- meaningful page title
- meta description
- favicon
- semantic headings
- Open Graph metadata where practical

Example title:

```text
FitLife — Simple Fitness & Wellness
```

Do not keyword-stuff content.

---

# 51. Content

Product copy should be:

- concise
- natural
- clear
- motivating without exaggeration
- easy to scan

Avoid:

- fake testimonials
- fake medical claims
- fake statistics
- unrealistic fitness promises
- excessive marketing buzzwords

Do not claim guaranteed weight loss or health outcomes.

---

# 52. Code Style

Prefer:

- descriptive names
- short focused functions
- early returns
- readable JSX
- consistent import ordering
- reusable utilities where appropriate

Avoid:

- magic values
- huge files
- deeply nested conditions
- duplicated logic
- unnecessary comments
- commented-out dead code

Comments should explain WHY, not restate obvious code.

---

# 53. Styling Rules

Use Tailwind CSS consistently.

Avoid mixing multiple styling approaches without reason.

Do not add:

- styled-components
- Emotion
- CSS-in-JS libraries

unless explicitly requested.

Global CSS should contain:

- Tailwind setup
- design tokens if needed
- global typography/base rules
- genuinely global styles

Component-specific styling should generally use Tailwind classes.

---

# 54. Reusable Variants

For reusable components such as Button, define a small intentional set of variants.

Example:

```text
primary
secondary
ghost
```

Avoid dozens of arbitrary variants.

Components should expose enough flexibility for real use without becoming mini-frameworks.

---

# 55. Forms and Inputs

If forms are introduced:

- use labels
- show clear validation
- use appropriate input types
- support keyboard interaction
- provide useful error messages

Do not introduce a form library unless form complexity justifies it.

---

# 56. Error Handling

Handle expected failures gracefully.

Service errors should not crash the entire application.

Prefer clear boundaries between:

```text
API/service
domain/state
UI
```

Do not silently swallow important errors during development.

---

# 57. Environment Variables

Never commit real secrets.

Only variables intended for the browser may use the Vite `VITE_` prefix.

Provide `.env.example` for required configuration.

Do not place:

- API secrets
- private keys
- credentials

in frontend environment files.

---

# 58. Testing

Prioritize tests for meaningful logic.

Good candidates:

- workout plan generation
- attribution parsing
- first-touch attribution behavior
- progress calculations
- workout timer logic
- storage helpers

Do not create meaningless snapshot tests just to increase test count.

Tests should protect important behavior.

---

# 59. Quality Checks

After meaningful changes, run the available relevant commands.

Examples:

```bash
npm run build
npm run lint
npm run test
```

If a dedicated type-check script exists, run it.

Fix errors caused by the implementation.

Do not ignore TypeScript or lint errors simply to finish a feature.

---

# 60. AI-Assisted Development Rules

This project intentionally uses AI-assisted development.

AI should behave as a development copilot, not as an uncontrolled code generator.

For every significant task:

1. Inspect existing implementation.
2. Understand established patterns.
3. Plan before editing.
4. Implement the smallest coherent change.
5. Reuse existing components.
6. Avoid unrelated refactors.
7. Run quality checks.
8. Report results.

Do not regenerate the entire application because one feature needs modification.

---

# 61. Do Not Build Everything at Once

Development order:

```text
1. Project foundation
2. Domain types
3. Mock/backend-ready service layer
4. Design system
5. Router
6. Main layout
7. Header/navigation
8. Home page
9. Onboarding
10. Workout library
11. Workout details
12. Workout timer
13. Progress
14. Nutrition
15. UTM attribution
16. Analytics
17. Loading/error/empty states
18. Animations polish
19. Responsive QA
20. Accessibility QA
21. Performance review
22. Tests
23. README
24. Final production review
```

Do not skip directly to implementing every screen unless explicitly instructed.

---

# 62. Current MVP Priorities

## Must Have

- responsive mobile-first UI
- Home page
- onboarding
- workout library
- workout details
- functional workout timer
- progress tracking
- nutrition content
- local persistence
- mock/backend-ready data architecture
- UTM attribution
- analytics events
- purposeful animations
- loading states
- empty states
- error states
- 404 page
- deployed production build
- README

## Nice to Have

- skeleton loaders
- richer progress visualization
- PWA support
- offline behavior
- advanced animations
- additional tests

## Not Required Initially

- authentication
- real backend
- payments
- subscriptions
- admin panel
- real AI recommendation API
- social features
- chat
- complex profile management

---

# 63. Things to Avoid

Do NOT:

- build a backend for the initial test assignment
- implement authentication without a requirement
- add unnecessary dependencies
- over-engineer state management
- create dozens of abstractions
- put mock data directly into page components
- tightly couple UI to mock data
- tightly couple analytics to one provider
- create huge monolithic components
- use `any` casually
- use excessive animations
- use fake testimonials
- make medical claims
- add gambling/betting content
- make the UI dependent on hover
- ignore mobile WebView constraints
- ignore loading/error states
- commit secrets
- rewrite working code without reason

---

# 64. Definition of Done for a Feature

A feature is considered complete when:

- it works according to requirements
- TypeScript is valid
- it works on mobile
- it works on desktop
- loading state exists when relevant
- empty state exists when relevant
- error state exists when relevant
- accessibility is considered
- animations are purposeful
- state persists when required
- analytics events are added when relevant
- existing functionality is not broken
- build succeeds
- lint succeeds
- relevant tests succeed

---

# 65. Final Product Standard

The final FitLife application should look and behave like a small but real product that could reasonably be:

1. advertised through a user acquisition campaign
2. opened by a user from a mobile ad
3. used as a standalone web application
4. wrapped in a mobile WebView
5. connected to a production backend later
6. connected to a production analytics provider later

The codebase should demonstrate that the developer understands both frontend implementation and product architecture.

The goal is not maximum feature count.

The goal is a polished, coherent, maintainable MVP.
