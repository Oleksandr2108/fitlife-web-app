# Phase 1 — Project Foundation

**Status:** Completed  
**Purpose:** Establish the typed, mock-first, backend-ready application foundation.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

We are starting Phase 1: Project Foundation.

Current stack is already installed:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Framer Motion
- Lucide React

Your task is to prepare a clean, production-oriented foundation for the FitLife application.

Do not implement the actual Home page or business features yet.

First inspect the existing project and then implement the foundation.

Tasks:

1. Inspect the current project:
   - package.json
   - src/
   - Vite config
   - TypeScript config
   - Tailwind setup
   - ESLint setup
   - existing default Vite files/assets

2. Remove unnecessary default Vite demo code and assets.

3. Create a clean baseline project structure following AGENTS.md.

Use this as the target structure:

src/
├── api/
├── assets/
├── components/
│   └── ui/
├── data/
├── hooks/
├── lib/
├── mocks/
├── pages/
│   ├── Home/
│   ├── Workouts/
│   ├── Workout/
│   ├── Nutrition/
│   ├── Progress/
│   └── NotFound/
├── services/
├── store/
├── types/
├── App.tsx
├── main.tsx
└── index.css

Do not create meaningless empty files.
Create directories and files only where they are already useful for the foundation.

4. Create the initial domain types in `src/types/`.

Include practical types for:

- FitnessGoal
- WorkoutDifficulty
- WorkoutCategory
- Exercise
- Workout
- Recipe
- User
- UserPreferences
- UserProgress
- CompletedWorkout
- WorkoutPlan
- WorkoutPlanDay
- AttributionData

Keep them simple and production-friendly.
Do not over-engineer the type system.

5. Create realistic fictional mock data in `src/mocks/` for:

- current user
- workouts
- recipes
- user progress

Create at least:
- 6 workouts
- 4 recipes
- 1 current user
- progress data

Workout data should cover several categories such as:
- Full Body
- Strength
- Cardio
- Core
- Mobility

Use realistic durations and difficulty levels.

Do not put mock data inside React components.

6. Create an async service layer in `src/services/`.

Implement:

- getCurrentUser()
- getWorkouts()
- getWorkoutById()
- getRecipes()
- getUserProgress()

Requirements:
- all functions must be async
- UI should later consume services, not raw mock files
- services may currently resolve mock data
- keep backend replacement easy later

Add a small reusable mock delay helper if needed.

7. Create `src/api/client.ts`.

Requirements:
- read `VITE_API_URL`
- expose a typed generic `apiRequest<T>()`
- handle non-OK responses
- do not use the API client yet
- do not add authentication yet

8. Create `.env.example` with:

VITE_API_URL=https://api.example.com

Do not put any real secrets in the project.

9. Create basic shared utilities where useful:

- storage helper
- delay helper if needed

Do not build analytics or attribution logic yet.
Those belong to later phases.

10. Set up React Router in the application.

Create placeholder pages for:

- /
- /workouts
- /workout/:id
- /nutrition
- /progress
- *

Each page should only contain a minimal semantic placeholder for now.

Do not design the actual pages yet.

11. Create a minimal application shell.

Add:
- App routing
- basic page container
- no real navigation UI yet
- no footer yet
- no bottom navigation yet

12. Prepare global Tailwind styles.

Create a clean global foundation including:

- body background
- default text color
- font smoothing
- sensible typography defaults
- box sizing
- root minimum height

Do not create the final design system yet.

Do not add excessive custom CSS.

13. Keep Framer Motion available but do not add decorative animations yet.

We will create the motion system in a later phase.

14. Zustand should be installed but do not create unnecessary global state yet.

If you create a store during this phase, it must have a clear foundation purpose only.

15. Code quality requirements:

- no `any`
- no unused imports
- no TypeScript errors
- no giant files
- no unnecessary abstractions
- use named exports where practical
- keep code readable
- follow AGENTS.md

16. Before editing files, first give me a short implementation plan describing:
- what you found
- what you will remove
- what you will create
- any architecture decisions

Then implement the changes.

17. After implementation run:

- npm run build
- npm run lint

If a test or typecheck script exists, run it too.

Fix issues introduced by your changes.

18. Final response should include:

- summary of changes
- final project structure
- created domain models
- created services
- created mock data
- routing setup
- any important architecture decisions
- results of build/lint/typecheck
- anything intentionally postponed to Phase 2

Do not implement Phase 2.

Phase 2 will be:
- design tokens
- reusable UI primitives
- Header
- mobile navigation
- layout system
- Framer Motion foundations
~~~~

