# Phase 3 — Home & Theme

**Status:** Completed  
**Purpose:** Implement the dark-first theme system and acquisition-focused Home page.

## Prompt

~~~~text
Read AGENTS.md completely before making changes.

Phase 1 and Phase 2 are complete.

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
- mock/backend-ready service architecture
- application layout
- Header
- mobile bottom navigation
- shared UI foundations
- motion foundations

We are starting Phase 3:

Theme System
+
Home Page

IMPORTANT:

The project is MOBILE-FIRST.

The primary target is mobile:
- 360px
- 390px
- 430px

Desktop should enhance the mobile experience.

The application must support:

- Dark theme
- Light theme

DEFAULT THEME MUST BE DARK.

Do not use system theme as the default.

If the user has not explicitly selected a theme before,
use dark.

The selected theme must persist in localStorage.

---

# Part 1 — Theme System

## 1. Inspect the current design system

First inspect:

- index.css
- Tailwind setup
- existing design tokens
- shared UI components
- App layout
- Header
- Mobile navigation
- Button
- Card/surface components
- current Motion setup

Do not rewrite the existing design system unnecessarily.

Extend it cleanly.

## 2. Create semantic theme tokens

Use semantic colors rather than hardcoding theme colors inside components.

Create tokens for concepts such as:

- background
- background-secondary
- surface
- surface-hover
- surface-muted
- text-primary
- text-secondary
- text-muted
- border
- border-strong
- accent
- accent-hover
- accent-foreground

Exact names may follow the existing project conventions.

Dark theme direction:

- deep neutral/slate background
- slightly lighter cards/surfaces
- high-contrast readable text
- green FitLife accent
- subtle borders
- restrained shadows

Avoid pure #000 backgrounds everywhere.

Light theme direction:

- soft neutral/light background
- white or near-white surfaces
- dark text
- same recognizable green accent
- subtle neutral borders

Both themes must feel like the same product.

## 3. Theme state

Create a clean centralized theme implementation.

Theme type:

'dark' | 'light'

Default:

'dark'

Requirements:

- apply theme at the root/document level
- persist selected theme
- restore theme before/at application initialization where practical
- avoid visible theme flash
- do not duplicate theme state in multiple stores/components

Use the simplest appropriate architecture.

A small custom hook or Zustand slice is acceptable.

Do not use TanStack Query for theme state.

## 4. Theme toggle

Add a theme toggle to the Header.

Use Lucide icons such as:

- Moon
- Sun

Requirements:

- accessible button
- aria-label reflects the action
- clear focus state
- comfortable mobile touch target
- subtle animation
- no layout shift
- usable on mobile and desktop

Do not add a large settings menu just for theme switching.

## 5. Motion for theme switch

Theme switching may have a very subtle visual transition.

Do not animate the entire application with expensive effects.

Avoid:
- page flashes
- huge fades
- rotating the whole UI
- long transitions

The switch should feel responsive.

Respect reduced-motion preferences.

---

# Part 2 — Home Page

Now implement the real FitLife Home page.

The Home page is the main landing page for users arriving from paid user acquisition traffic.

Its primary purpose is:

1. explain FitLife immediately
2. communicate clear value
3. encourage the user to press "Start Free"
4. introduce workouts and nutrition
5. lead toward onboarding

Do not turn the Home page into a generic marketing template.

---

# 6. Home page structure

Implement these sections:

1. Header
2. Hero
3. Benefits
4. Popular Workouts
5. Simple process / how it works
6. Nutrition Preview
7. Progress / product preview section
8. Final CTA
9. Footer

Keep the page focused.

Do not add unnecessary sections.

---

# 7. Hero

The hero is the most important section.

Suggested content direction:

Eyebrow:
Simple fitness for everyday life

Heading:
Build a healthier routine,
one day at a time.

Supporting text:
Short workouts, simple nutrition ideas and a fitness plan
built around your goals and schedule.

Primary CTA:
Start Free

Secondary action may be:
Explore Workouts

Supporting trust/value line:

- No equipment required
or
- Start in just a few minutes

Do not add fake user counts or fake statistics.

## Hero layout

Mobile-first:

- clear content hierarchy
- CTA visible without excessive scrolling
- strong visual
- comfortable spacing
- no overcrowding

Desktop may use a two-column layout:

content | visual

but mobile must remain the primary design.

## Hero visual

Create a polished fitness-product visual area.

It may contain:

- high-quality fitness imagery
- small UI card overlays
- workout/progress preview

Avoid excessive floating cards.

The visual should look like part of a real product.

---

# 8. Benefits

Create three concise benefit cards.

Content direction:

Quick Workouts
15–30 minute sessions that fit into your day.

Personal Goals
Choose your goal and build a simple weekly routine.

Simple Nutrition
Easy meal ideas and everyday nutrition inspiration.

Use Lucide icons.

Do not use emoji icons.

Mobile:

cards may stack vertically.

Tablet/desktop:

use responsive grid.

Add subtle entrance animation using existing Motion patterns.

---

# 9. Popular Workouts

Retrieve workout data through the existing TanStack Query architecture.

Flow:

Home
→ useWorkouts()
→ TanStack Query
→ service
→ current mock data

Do NOT import workout mock data directly.

Show approximately 3 featured workouts.

Each workout card should show:

- image
- title
- duration
- difficulty
- category
- equipment status where useful
- action

Clicking the card/action should navigate to:

/workout/:id

or existing slug strategy from Phase 1.

Handle:

- loading state
- error state
- success state

Use a lightweight skeleton or existing shared loading pattern.

Do not display six giant cards on the Home page.

Add:

View All Workouts

leading to:

/workouts

---

# 10. How It Works

Create a simple 3-step section.

Example:

1. Choose your goal
2. Get your plan
3. Start moving

Keep copy short.

This section should explain the product journey without looking like documentation.

On mobile:
stack naturally.

On desktop:
can use three columns.

Use subtle stagger animation.

---

# 11. Nutrition Preview

Fetch recipe data through:

useRecipes()
→ TanStack Query
→ service

Do not import mocks directly.

Show approximately 3 recipes.

Card information:

- image
- title
- calories
- protein
- preparation time

Keep nutrition content lifestyle-focused.

Do not make medical claims.

Add CTA:

Explore Nutrition

→ /nutrition

Handle loading/error states.

---

# 12. Product / Progress Preview

Create one visually interesting section showing the value of progress tracking.

This is a marketing preview, not the full Progress page.

Example UI:

Your Weekly Progress

4 Day Streak

4 / 5 workouts

245 min total

Use existing or realistic mock/query-backed data where appropriate.

If this represents server-like progress,
consume it through useUserProgress().

Do not directly import progress mocks.

This section should visually demonstrate that FitLife is more than a static content site.

Keep it compact on mobile.

---

# 13. Final CTA

Create a strong final conversion section.

Example:

Ready to start?

Create a simple fitness routine that fits your day.

[ Start My Plan ]

The CTA should trigger the same onboarding entry point as the Hero CTA.

Do not create separate inconsistent flows.

---

# 14. Start Free behavior

Do not implement the full onboarding yet.

For Phase 3, prepare one consistent onboarding entry action.

If onboarding route/state already exists, use it.

Otherwise create the minimal routing/state foundation required
so "Start Free" has a valid destination.

Do NOT build the full onboarding screens in this phase.

Phase 4 will implement onboarding.

Do not leave the main CTA as a dead button.

---

# 15. Footer

Create a small clean footer.

Include only useful content.

Possible links:

- Workouts
- Nutrition
- Progress

Brand:
FitLife

Optional short text:
Simple fitness for everyday life.

Avoid huge multi-column corporate footers.

On mobile keep it compact.

---

# 16. Dark theme quality

The Home page must be designed primarily in dark mode because dark is the default.

Dark theme should NOT simply be:

black background + white text.

Use depth:

page background
↓
surface
↓
raised cards

Use subtle contrast differences.

Make sure:

- cards are distinguishable
- borders are visible
- muted text remains readable
- green accent has sufficient contrast
- images integrate naturally with dark surfaces

---

# 17. Light theme quality

After dark mode is complete,
verify every section in light mode.

Do not treat light mode as an afterthought.

Check:

- cards
- borders
- text
- muted text
- buttons
- icons
- navigation
- footer
- skeletons
- error states

The brand identity should remain consistent.

---

# 18. Mobile-first validation

Pay special attention to 360px width.

Verify:

Hero:
- heading does not overflow
- CTA fits naturally
- visual does not become too large

Benefits:
- cards fit without overflow

Workout cards:
- readable and touch-friendly

Nutrition cards:
- images maintain aspect ratio

Progress preview:
- stats do not overflow

Footer:
- no cramped links

Navigation:
- bottom navigation does not overlap CTA/footer

Add enough bottom padding for fixed mobile navigation.

---

# 19. Responsive enhancement

Tablet:
- increase grid density where appropriate

Desktop:
- wider container
- two-column hero
- card grids
- desktop Header navigation

Do NOT drastically change the product experience between mobile and desktop.

---

# 20. Motion

Use existing Framer Motion foundations.

Good motion usage:

Hero:
- heading/content fade-up
- visual subtle entrance

Benefits:
- small stagger

Workout cards:
- reveal as section enters viewport

Nutrition:
- subtle reveal

Final CTA:
- subtle reveal

Do not animate every text line.

Animations should generally remain within 150–400ms.

Respect reduced motion.

---

# 21. Image handling

Use optimized and consistent fitness/lifestyle visuals.

If local image assets already exist, reuse them where appropriate.

If placeholder image URLs are required for now,
keep image sources centralized in mock/domain data.

Do not hardcode random image URLs inside page JSX.

Use:
- responsive dimensions
- object-cover
- meaningful alt text
- lazy loading for below-the-fold images

Hero image may load eagerly if appropriate.

---

# 22. Accessibility

Verify:

- proper h1/h2 hierarchy
- accessible CTA buttons
- theme toggle labels
- navigation landmarks
- visible focus states
- meaningful alt text
- color contrast in both themes
- keyboard navigation

Do not use clickable divs.

---

# 23. Analytics integration points

Do not implement the full analytics layer yet unless already available.

However, make the CTA architecture ready for future events:

- click_start
- workout_open

Avoid tightly coupling the Home UI to an analytics provider.

Full analytics implementation remains a later phase.

---

# 24. Code organization

Do not put the entire Home page into one huge component.

Split meaningful sections.

Example direction:

pages/Home/
  HomePage.tsx
  components/
    HeroSection.tsx
    BenefitsSection.tsx
    PopularWorkoutsSection.tsx
    HowItWorksSection.tsx
    NutritionPreviewSection.tsx
    ProgressPreviewSection.tsx
    FinalCtaSection.tsx

Use this only if it matches the current project structure.

Do not over-componentize trivial markup.

---

# 25. Do not implement yet

Do NOT implement:

- complete onboarding
- workout timer
- workout filtering
- full Nutrition page
- full Progress page
- authentication
- backend
- payments
- PWA
- advanced analytics

Those are later phases.

---

# 26. Before editing

First inspect the existing project.

Then briefly report:

- current Phase 2 design architecture
- how theme support will integrate
- files you plan to create/change
- Home component breakdown
- how mobile-first behavior will be maintained

Then implement.

---

# 27. Validation

After implementation verify both:

DARK
LIGHT

at:

360px
390px
430px
768px
1024px
1440px

Check:

- horizontal overflow
- typography
- theme contrast
- navigation overlap
- cards
- CTA sizes
- images
- spacing
- footer
- reduced-motion behavior

---

# 28. Run quality checks

Run:

npm run build
npm run lint

Run typecheck/tests if scripts exist.

Fix issues introduced by this phase.

---

# 29. Final response

Report:

- theme architecture
- dark default behavior
- persistence behavior
- Home sections implemented
- TanStack Query usage
- responsive decisions
- Motion usage
- files changed
- build/lint/typecheck results
- intentionally postponed items

Do not start Phase 4.

Phase 4 will be:

Onboarding
→ Goal Selection
→ Duration Selection
→ 7-Day Plan Generation
→ Zustand Persistence
→ Animated Step Transitions
~~~~

