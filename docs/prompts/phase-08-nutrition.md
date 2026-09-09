# Phase 8 — Nutrition

**Status:** Completed  
**Purpose:** Build the nutrition library, filtering, recipe details, and macro visualization.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–7 are complete.

The project already contains:

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- Vitest
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
- workout timer / pause / resume / rest
- workout audio feedback
- persisted workout completion
- Progress Dashboard
- custom animated SVG Activity Chart
- derived progress analytics

We are starting Phase 8:

NUTRITION
→ Recipe Library
→ Search
→ Meal Type Filters
→ Nutrition Filters
→ Recipe Cards
→ Recipe Details
→ Macro Visualization
→ Query-backed Data
→ Responsive Mobile UX

IMPORTANT:

The application remains MOBILE-FIRST.

Primary target widths:
- 360px
- 390px
- 430px

Then enhance for:
- 768px
- 1024px
- 1440px

Both DARK and LIGHT themes must be fully supported.

Do not redesign working functionality from Phases 1–7.

Do not implement calorie tracking, diet plans, AI meal generation,
or other features outside this phase.

---

# 1. Product Goal

Turn the existing Nutrition section into a complete recipe discovery experience.

Users should be able to:

1. Open /nutrition
2. Browse recipes
3. Search recipes
4. Filter by meal type
5. Filter by useful nutrition characteristics
6. Open a recipe
7. View nutrition information
8. View ingredients
9. Follow preparation instructions

The experience should feel like part of the same FitLife mobile product.

Do not build a generic food blog.

---

# 2. Inspect Existing Architecture First

Before editing inspect:

- current /nutrition page
- Home nutrition preview
- Recipe types
- recipe mock data
- recipe service
- TanStack Query recipe hooks
- query keys
- existing RecipeCard if any
- shared Card/Button/Badge components
- theme tokens
- Motion utilities
- AppShell
- mobile navigation
- loading/error patterns
- existing image handling
- Vitest setup

Reuse existing architecture.

Do not duplicate:
- recipe types
- services
- query hooks
- design primitives

Before editing briefly report:

- what already exists
- current Recipe domain model
- files you plan to create/change
- search/filter architecture
- Recipe Details architecture
- mobile-first approach

Then implement.

---

# 3. Data Architecture

Recipe data must flow through:

Nutrition UI
→ useRecipes() / useRecipe()
→ TanStack Query
→ Recipe Service
→ Mock Data currently
→ Real API later

Do NOT import recipe mocks directly into page components.

Do NOT put recipe catalog data into Zustand.

TanStack Query owns server-like recipe data.

Search/filter UI state should remain local unless there is a strong reason otherwise.

---

# 4. Recipe Domain Model

Inspect the existing Recipe type first.

Extend it only where necessary.

A recipe may need fields such as:

- id
- title
- description
- image
- mealType
- preparationTime
- difficulty
- calories
- protein
- carbs
- fat
- ingredients
- instructions

Optional useful fields:

- servings
- tags

Do not add fields purely to make cards look busy.

Keep the model backend-ready.

Use typed meal categories rather than arbitrary strings where practical.

---

# 5. Ingredients Model

Prefer structured ingredient data.

Example concept:

type Ingredient = {
  name: string;
  amount?: number;
  unit?: string;
};

or another clean representation consistent with existing architecture.

Do not store ingredients as JSX or formatted HTML.

The UI should be responsible for presentation.

Handle ingredients where amount/unit may be absent.

---

# 6. Instructions Model

Instructions should be structured.

Example:

string[]

or:

type RecipeInstruction = {
  step: number;
  text: string;
};

Choose the simplest model that fits the current data.

Do not store numbered strings such as:

"1. Cook chicken"

if numbering can be derived by the UI.

---

# 7. Nutrition Library

Implement/refine:

/nutrition

Recommended page structure:

1. Page heading
2. Supporting copy
3. Search
4. Meal Type filters
5. Nutrition characteristic filters
6. Results count
7. Recipe grid
8. Loading/error/empty states

Suggested copy:

Heading:
"Simple Nutrition"

Supporting text:
"Easy meal ideas to support your everyday routine."

Avoid language implying medical or professionally personalized nutrition advice.

---

# 8. Search

Add recipe search.

Search should match useful fields such as:

- title
- description
- ingredients
- meal type where appropriate

Requirements:

- case-insensitive
- trimmed query
- controlled input
- clear button
- Lucide Search icon
- accessible label
- mobile-friendly touch/input height

Because the current dataset is local/mock,
filter client-side.

Do not add debounce unnecessarily.

Do not create backend-style complexity for a small local dataset.

---

# 9. Meal Type Filters

Support meal categories such as:

- All
- Breakfast
- Lunch
- Dinner
- Snack

Use the existing RecipeMealType/domain values if available.

Do not duplicate strings across components.

Use compact filter chips/buttons.

Requirements:

- accessible
- obvious selected state
- touch-friendly
- keyboard accessible
- dark/light theme
- no hover dependency

On narrow mobile screens:

horizontal chip scrolling is acceptable.

However:

ONLY the filter row may scroll horizontally.

The page itself must never horizontally overflow.

---

# 10. Nutrition Characteristic Filters

Add useful secondary filters.

Recommended:

- All
- High Protein
- Quick
- Low Calorie

These should be derived from actual recipe data.

Do not require hardcoded tags if the characteristic can be calculated.

Use clearly defined constants.

Example direction:

High Protein:
protein >= 25g

Quick:
preparationTime <= 20 minutes

Low Calorie:
calories <= 450 kcal

These thresholds are product/UI filtering rules,
not medical recommendations.

Centralize them.

Do not scatter magic numbers through components.

---

# 11. Filter Combination

Search and filters must work together.

Example:

Search = "chicken"
Meal = Lunch
Characteristic = High Protein

should show recipes matching all active criteria.

Filtering should be deterministic.

Create a pure helper if appropriate:

filterRecipes(recipes, {
  search,
  mealType,
  characteristic,
})

Do not mutate the source array.

---

# 12. Filter State

Search/filter state is temporary page UI state.

Prefer local React state.

Do NOT add it to Zustand unless the current architecture has a strong reason.

Do not persist these filters to localStorage.

Optional URL search params are acceptable only if they genuinely improve the current architecture.

Do not over-engineer.

---

# 13. Results Count

Show a subtle result count.

Examples:

8 recipes

3 recipes found

Update when filters change.

Do not make the count visually dominant.

---

# 14. Clear Filters

When filters/search are active,
provide a clear/reset action.

Reset:

- search
- meal type
- characteristic

Return to full catalog.

Do not show Clear Filters when nothing is active.

---

# 15. Recipe Card

Create/refine a reusable RecipeCard.

It should show:

- image
- title
- meal type where useful
- calories
- protein
- preparation time

Optional:
- one useful characteristic badge

Example:

Chicken & Avocado Bowl

420 kcal
32g protein
20 min

Do not overload cards with every macro.

Full nutrition belongs on Recipe Details.

---

# 16. Recipe Card Navigation

Recipe cards should navigate to:

/nutrition/:id

or the existing recipe identifier strategy.

If the project already has:

/recipe/:id

inspect current routing and preserve consistency.

Do not arbitrarily rename existing working routes.

Use semantic Link navigation.

Do not use clickable divs.

---

# 17. Recipe Card Visual Design

Recipe cards must feel related to WorkoutCard,
but should not be identical if nutrition content benefits from a different hierarchy.

Use:

- consistent radius
- consistent surface treatment
- image-first presentation
- restrained badges
- readable metadata

Avoid:

- huge shadows
- excessive gradients
- too many pills
- cluttered nutrition labels

---

# 18. Recipe Grid

MOBILE:

360–430px:
prefer one-column cards.

If the existing design supports compact two-column recipe cards without harming readability,
evaluate carefully before using them.

Do not force two columns merely because food apps often use them.

TABLET:
2 columns where appropriate.

DESKTOP:
2–3 columns depending on container width.

Maintain consistent image aspect ratios.

---

# 19. Images

Images must come from recipe data.

Do NOT hardcode image URLs inside JSX.

Requirements:

- responsive
- consistent aspect ratio
- object-cover
- meaningful alt text
- lazy loading below the fold

Handle missing images gracefully if practical.

Home Nutrition Preview should reuse the same underlying recipe data/component patterns where possible.

---

# 20. Loading State

Use TanStack Query loading state.

Implement polished recipe card skeletons.

Skeleton should roughly match final card dimensions.

Support:

- dark theme
- light theme
- reduced motion

Do not use only a giant centered spinner.

---

# 21. Error State

If recipes fail to load:

Show:

"We couldn't load recipes."

Supporting text:
"Please try again."

CTA:
Try Again

Use TanStack Query refetch.

Do not expose raw errors or stack traces.

---

# 22. Empty Search / Filter State

If filters return no recipes:

Show an intentional empty state.

Example:

"No recipes found"

"Try changing your search or filters."

CTA:
Clear Filters

Do not show an empty blank grid.

---

# 23. Recipe Details

Implement/refine the Recipe Details route.

The page must retrieve data through:

useRecipe(identifier)
→ TanStack Query
→ Recipe Service

Do NOT manually search imported mocks inside the page.

---

# 24. Recipe Details Hero

The top section should communicate:

- large recipe image
- title
- short description
- meal type
- preparation time
- difficulty if available
- servings if available

Mobile-first.

Important information should appear quickly.

Desktop may use a split layout:

image | content

Do not make the hero excessively tall on mobile.

---

# 25. Nutrition Summary

Show:

Calories
Protein
Carbs
Fat

Example:

420 kcal
32g protein
38g carbs
14g fat

Use actual recipe data.

Do not calculate health scores.

Do not label recipes as objectively "healthy" based solely on macros.

---

# 26. Macro Visualization

Create a polished visual macro section.

Example:

Protein
32g
████████████████

Carbs
38g
██████████████████

Fat
14g
███████

This visualization is informational.

It is NOT a daily target.

IMPORTANT:

Do not imply that these bars represent recommended daily intake
unless real target data exists.

The bars should visualize relative macro composition within the recipe.

---

# 27. Macro Calculation

Create a small pure helper to calculate relative macro energy/composition if appropriate.

A more meaningful visualization can use caloric contribution:

Protein:
4 kcal per gram

Carbohydrates:
4 kcal per gram

Fat:
9 kcal per gram

For visualization only:

proteinCalories = protein * 4
carbCalories = carbs * 4
fatCalories = fat * 9

Then calculate each macro's share of macro-derived calories.

Do not overwrite the recipe's stated calorie value.

Do not claim the calculated macro calories must exactly equal displayed calories,
because real recipe data may include rounding/fiber/etc.

Use this only for relative visualization.

If this approach conflicts with the existing data model,
use a simpler normalized visualization and explain the decision.

---

# 28. Macro Animation

Use Framer Motion to animate macro bars when they enter the viewport.

Example:

width/scaleX:
0 → calculated value

Duration:
approximately 400–700ms

Keep animation subtle.

Do not delay information unnecessarily.

Respect prefers-reduced-motion.

---

# 29. Ingredients Section

Create a clear Ingredients section.

Display:

- ingredient name
- amount
- unit

Example:

Chicken breast          150 g
Avocado                 1/2
Rice                    100 g
Tomato                  1

Make it easy to scan on mobile.

Do not use a dense table if it harms mobile readability.

---

# 30. Servings

If serving count exists,
show:

Serves 2

Do NOT implement serving-size recalculation unless the architecture already supports it naturally.

Interactive serving scaling is outside this phase.

---

# 31. Instructions

Create a numbered preparation section.

Example:

01
Cook the chicken

02
Prepare the rice

03
Chop the vegetables

04
Assemble the bowl

Requirements:

- easy to scan
- comfortable spacing
- mobile-friendly
- semantic ordered structure where appropriate

Do not put all instructions into one paragraph.

---

# 32. Instruction Motion

Use subtle stagger/reveal animation.

Do not animate every word.

Each instruction may enter with:

opacity
small translateY

Keep duration short.

Reduced motion must be respected.

---

# 33. Recipe Metadata

Use Lucide icons only where useful.

Possible metadata:

Clock → preparation time
Gauge/Signal → difficulty
Users → servings

Do not add icons to every macro value.

Nutrition numbers should remain visually simple.

---

# 34. Back Navigation

Recipe Details should provide sensible navigation back to Nutrition.

If using a Back button:

- use router history when valid
- provide /nutrition fallback for direct URL entry

Do not create a button that becomes useless when the recipe URL was opened directly.

---

# 35. Invalid Recipe

If user opens an invalid recipe identifier:

Do not crash.

Show:

"Recipe not found"

"This recipe may no longer be available."

CTA:

Browse Recipes

→ /nutrition

Do not silently render undefined content.

---

# 36. Loading Recipe Details

While a single recipe is loading:

show a detail-page skeleton matching:

- hero image
- title
- metadata
- nutrition section

Avoid major layout shift.

---

# 37. Home Integration

Inspect the Home Nutrition Preview from Phase 3.

Ensure it uses the same recipe architecture.

Home should continue to retrieve recipes through TanStack Query.

If Home recipe cards duplicate new RecipeCard functionality,
refactor carefully where appropriate.

Do not break the Home page.

Home CTA:

Explore Nutrition

must navigate correctly to:

/nutrition

---

# 38. Motion

Use the existing Framer Motion foundation.

Good uses:

Nutrition Library:
- page entrance
- card reveal
- subtle result transition

Recipe Details:
- hero image/content entrance
- nutrition stats reveal
- macro bars
- ingredient section
- instruction stagger

Avoid animating every element.

The Progress ActivityChart remains the project's most visually complex data animation.

Nutrition should feel polished but calmer.

---

# 39. Filter Animation

When filters change:

results should update immediately.

A subtle layout/reveal transition is acceptable.

Do not:

- fade the entire page
- delay filtering
- dramatically animate every card

Usability first.

---

# 40. Dark Theme

Verify:

- search
- filters
- selected filters
- cards
- images
- badges
- detail hero
- macro visualization
- ingredients
- instructions
- skeletons
- empty/error states

Dark mode remains the default.

Keep surfaces distinguishable without using pure black everywhere.

---

# 41. Light Theme

Verify the entire Nutrition experience in light mode.

Pay attention to:

- subtle borders
- muted text
- macro bars
- badges
- skeleton contrast
- image overlays
- selected filter state

Do not treat light theme as an afterthought.

---

# 42. Mobile-First Validation

Test:

320px
360px
390px
430px

Especially verify:

- no page-level horizontal overflow
- search fits container
- filter rows do not escape container
- horizontal filter scrolling stays inside its own row
- recipe cards fit
- images maintain ratio
- nutrition stats do not overflow
- macro labels/bars fit
- ingredient rows wrap gracefully
- instructions remain readable
- bottom navigation does not cover content

Remember the mobile filter overflow issue previously found on /workouts.

Do NOT repeat that bug on /nutrition.

Inspect parent:
- min-width
- max-width
- overflow
- flex shrink
- white-space

carefully.

---

# 43. Desktop

At larger widths:

- increase content density
- use responsive recipe grid
- give Recipe Details more breathing room
- use split hero where appropriate

Do not create a completely different desktop product.

---

# 44. WebView Readiness

Nutrition must work naturally in mobile WebView.

Avoid:

- hover-only interactions
- new tabs
- tiny controls
- browser-dependent UI
- page-level horizontal scrolling

All important controls must work with touch.

---

# 45. Accessibility

Requirements:

- semantic h1/h2 hierarchy
- accessible search
- accessible filter controls
- selected filter state communicated
- keyboard navigation
- visible focus states
- meaningful image alt text
- semantic recipe links
- readable nutrition labels
- sufficient contrast
- ordered instructions where appropriate

Do not use color as the only indicator.

Do not use clickable divs.

---

# 46. Nutrition Disclaimer / Wording

This is a general fitness/wellness product.

Avoid medical or diagnostic claims.

Do not write:

"this meal will make you lose weight"

or:

"this is the correct diet for you"

Use language such as:

"meal ideas"
"nutrition information"
"high protein"
"quick meal"

where supported by the data.

No large legal disclaimer is necessary.

Just keep product copy responsible.

---

# 47. Tests — Filtering

Use existing Vitest setup.

Add useful tests for recipe filtering.

Test:

1. search by title
2. case-insensitive search
3. ingredient search if implemented
4. meal type filter
5. High Protein filter
6. Quick filter
7. Low Calorie filter
8. combined search + filters
9. reset/default behavior
10. source array is not mutated

Do not write snapshot tests for basic markup.

---

# 48. Tests — Macro Utility

If macro composition calculation is implemented,
test it.

Examples:

protein = 30g
carbs = 40g
fat = 10g

Verify:

- valid percentages/shares
- no NaN
- no Infinity
- zero macro values handled
- source data not mutated

Do not test animation pixel values.

---

# 49. Performance

Do not prematurely optimize.

Recipe dataset is small.

Do NOT add:

- virtualization
- infinite scroll
- complex caching logic beyond TanStack Query
- large image libraries
- additional state libraries

Use:

- lazy-loaded below-fold images
- stable keys
- simple pure filters

Keep bundle impact low.

---

# 50. Backend Readiness

The Nutrition UI must not know that data currently comes from mocks.

Components should consume typed query results.

Future replacement should conceptually be:

MockRecipeService
→ ApiRecipeService

without rewriting Nutrition UI.

Do not call local mock arrays from components.

---

# 51. Analytics Readiness

Do not implement full analytics yet.

Keep clean future interaction points for:

nutrition_open
recipe_open

Phase 9 will implement UAC attribution and analytics.

If a generic analytics abstraction already exists,
use it only if appropriate.

Do not add Google Analytics/Firebase directly in this phase.

---

# 52. Suggested Structure

Follow current project conventions.

A reasonable structure may be:

pages/
  Nutrition/
    NutritionPage.tsx
    components/
      NutritionSearch.tsx
      NutritionFilters.tsx
      RecipeGrid.tsx
      NutritionEmptyState.tsx

  Recipe/
    RecipePage.tsx
    components/
      RecipeHero.tsx
      NutritionSummary.tsx
      MacroVisualization.tsx
      IngredientList.tsx
      RecipeInstructions.tsx

components/
  RecipeCard/

lib/
  nutrition/
    filterRecipes.ts
    calculateMacroComposition.ts

Do not follow this structure blindly.

Reuse existing components where appropriate.

Do not over-componentize trivial markup.

---

# 53. Do Not Implement Yet

DO NOT implement:

- calorie tracking
- daily food diary
- personalized diet plans
- AI meal generation
- meal-plan generator
- BMI
- weight-loss calculations
- medical nutrition recommendations
- favorites
- shopping list
- grocery integration
- recipe ratings
- comments
- social sharing
- backend
- authentication
- UAC analytics
- PWA

These are outside Phase 8.

---

# 54. Definition of Done

Phase 8 is complete when:

/nutrition
→ real Nutrition Library implemented

Recipes
→ loaded through TanStack Query

Search
→ works

Meal filters
→ work

Nutrition filters
→ work

Combined filters
→ work

Clear filters
→ works

Loading state
→ works

Error state
→ works

Empty results
→ handled

Recipe cards
→ display real data

Recipe card
→ opens Recipe Details

Recipe Details
→ loads through query/service layer

Nutrition stats
→ correct

Macro visualization
→ works

Macro animation
→ works

Ingredients
→ render correctly

Instructions
→ render correctly

Invalid recipe
→ handled

Home Nutrition Preview
→ still works

Dark theme
→ works

Light theme
→ works

320px
→ no overflow

360px
→ works

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

Typecheck
→ passes if configured

Vitest
→ passes

---

# 55. Manual Validation

Validate:

LIBRARY:

/nutrition
→ recipes load
→ search recipe
→ select meal type
→ select nutrition characteristic
→ combined filtering works
→ clear filters

MOBILE FILTERS:

320px / 360px
→ filters stay inside their section
→ filter row may scroll horizontally
→ page itself does NOT scroll horizontally

DETAIL:

open recipe
→ correct image
→ title
→ calories
→ protein
→ carbs
→ fat
→ preparation time
→ ingredients
→ instructions

MACROS:

recipe with normal macros
→ bars correct

recipe with zero/missing macro values
→ no NaN/Infinity
→ UI remains stable

INVALID:

/nutrition/invalid-id
→ safe not-found state
→ Browse Recipes

HOME:

/
→ Nutrition Preview
→ recipe opens correctly
→ Explore Nutrition works

THEME:

dark
→ all content readable

light
→ all content readable

REDUCED MOTION:

enabled
→ content remains immediately usable

---

# 56. Quality Checks

Run:

npm run build
npm run lint

Run:

npm run test

or the appropriate existing Vitest script.

Run typecheck if configured.

Fix all issues introduced by Phase 8.

Do not suppress legitimate TypeScript, lint, or test errors.

---

# 57. Final Response

Report:

- Nutrition architecture
- Recipe domain changes
- TanStack Query usage
- search implementation
- filtering implementation
- nutrition characteristic thresholds
- RecipeCard implementation/reuse
- Recipe Details implementation
- macro visualization calculation
- Motion usage
- mobile filter overflow prevention
- dark/light validation
- accessibility decisions
- tests added
- files changed
- build/lint/typecheck/test results
- anything intentionally postponed

Do not start Phase 9.

Phase 9 will focus on:

UAC ATTRIBUTION & ANALYTICS
→ UTM Capture
→ First-Touch Attribution
→ Session Attribution
→ Conversion Events
→ click_start
→ goal_selected
→ plan_created
→ workout_open
→ workout_started
→ workout_completed
→ recipe_open
→ Analytics Abstraction
→ WebView-safe Tracking
~~~~

