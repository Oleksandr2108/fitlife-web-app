# Phase 9 — UAC Attribution & Analytics

**Status:** Completed  
**Purpose:** Implement first/current-touch attribution, typed events, identity, and provider-agnostic analytics.

## Prompt

~~~~text
Read AGENTS.md completely before making any changes.

Phases 1–8.5 are complete.

The application already contains:

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- Vitest
- dark/light theme system
- mobile-first responsive AppShell
- Home page
- onboarding
- personalized workout plan
- workout library and details
- active workout session
- workout timer and audio
- persisted completion history
- Progress Dashboard
- custom animated SVG Activity Chart
- Nutrition library and Recipe Details
- stabilized timer/progress/persistence architecture

We are starting Phase 9:

UAC ATTRIBUTION & ANALYTICS
→ UTM Capture
→ First-Touch Attribution
→ Current/Session Attribution
→ Anonymous Visitor ID
→ Session ID
→ Typed Analytics Events
→ Conversion Funnel
→ SPA Page Views
→ Development Analytics Debug Panel
→ Provider-Agnostic Analytics Architecture

IMPORTANT:

This project is still MOBILE-FIRST and WebView-ready.

Do not redesign existing pages.
Do not add a real third-party analytics SDK yet.
Do not add Google Analytics, Firebase, AppsFlyer, Adjust,
Amplitude, Mixpanel, Meta Pixel, or another provider.

The implementation should make adding a real provider later easy.

Do not implement fingerprinting or invasive tracking.

--------------------------------------------------
1. PRODUCT / UAC GOAL
--------------------------------------------------

The goal of this phase is to make FitLife measurable as a
user-acquisition product.

A user may arrive from a paid campaign such as:

/?utm_source=google
&utm_medium=cpc
&utm_campaign=fitness_launch
&utm_content=video_01
&utm_term=home_workout

FitLife should be able to:

1. capture campaign attribution
2. preserve first-touch attribution
3. track the current/session acquisition touch
4. assign an anonymous visitor ID
5. assign a session ID
6. track meaningful product events
7. associate events with attribution context
8. observe the complete conversion funnel
9. expose a development-only debug view

The core funnel is:

page_view
→ click_start
→ goal_selected
→ duration_selected
→ plan_created
→ workout_open
→ workout_started
→ workout_completed

Nutrition events should also be tracked where useful.

--------------------------------------------------
2. INSPECT EXISTING ARCHITECTURE FIRST
--------------------------------------------------

Before editing inspect:

- current `src/lib/analytics*`
- current attribution utilities if any
- existing `AttributionData` type
- localStorage/storage helpers
- routing
- Home CTA implementation
- onboarding components/store
- plan generation
- workout cards/details
- workout session/completion flow
- nutrition library/details
- theme system
- environment configuration
- tests
- any analytics placeholders already created in previous phases

Reuse existing architecture.

Do not create duplicate analytics or attribution systems.

Before editing briefly report:

- what analytics/attribution foundation already exists
- files you plan to create/change
- event architecture
- attribution architecture
- persistence strategy
- session strategy
- debug panel strategy

Then implement.

--------------------------------------------------
3. ATTRIBUTION DATA MODEL
--------------------------------------------------

Use a typed attribution model.

Support:

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Internally use clean domain naming if appropriate:

source
medium
campaign
content
term

Include useful metadata such as:

- capturedAt
- landingPath

Do not persist the entire URL unnecessarily.

Do not capture arbitrary query parameters.

Do not capture sensitive information.

--------------------------------------------------
4. FIRST-TOUCH ATTRIBUTION
--------------------------------------------------

Implement first-touch attribution.

Behavior:

First visit with valid UTM parameters:

?utm_source=google
&utm_medium=cpc
&utm_campaign=fitness_launch

→ save as firstTouch.

Later visit:

?utm_source=instagram
&utm_medium=paid_social
&utm_campaign=retargeting

→ DO NOT overwrite firstTouch.

firstTouch must represent the first known attributed acquisition source.

Requirements:

- persisted locally
- validated when reading
- malformed data handled safely
- no crashes
- no overwrite after valid capture

If the first visit has no UTM data,
do not invent campaign attribution.

A later properly attributed visit may establish firstTouch
if no firstTouch exists yet.

Document this behavior.

--------------------------------------------------
5. CURRENT / SESSION TOUCH
--------------------------------------------------

Also support currentTouch.

When a new valid UTM-tagged entry occurs:

update currentTouch.

Example:

firstTouch:
google / fitness_launch

currentTouch:
instagram / retargeting

This allows future attribution analysis without losing the original source.

Do not overwrite currentTouch on every SPA navigation.

Only update it when there is meaningful acquisition data
from the entry URL.

--------------------------------------------------
6. DIRECT TRAFFIC
--------------------------------------------------

Do not invent UTM attribution for direct traffic.

If the current visit contains no campaign parameters:

- preserve existing firstTouch
- do not replace it with "direct"
unless the architecture explicitly distinguishes direct sessions

For the MVP, null/undefined current attribution for direct traffic
is acceptable.

Keep semantics clear.

--------------------------------------------------
7. ATTRIBUTION PARSER
--------------------------------------------------

Create a pure attribution parser.

Example concept:

parseAttribution(searchParams)

or:

parseUtmParams(location.search)

Requirements:

- pure
- testable
- trims values
- ignores empty values
- handles partial UTM data
- does not mutate URLSearchParams
- does not access localStorage itself

Separate:

URL parsing

from:

persistence.

--------------------------------------------------
8. ATTRIBUTION STORAGE
--------------------------------------------------

Use the existing storage abstraction.

Suggested persisted data:

{
  firstTouch: AttributionData | null,
  currentTouch: AttributionData | null
}

Add schema validation/versioning consistent with Phase 8.5.

Do not call localStorage directly throughout React components.

--------------------------------------------------
9. ANONYMOUS VISITOR ID
--------------------------------------------------

Create a lightweight anonymous visitor identifier.

Example:

anon_xxxxxxxxx

Generate it once and persist it.

Requirements:

- no fingerprinting
- no hardware/device-derived identity
- no IP usage
- no personal information
- browser-safe
- sufficiently unique for this demo

Prefer browser-native crypto where available.

For example, crypto.randomUUID() may be used if appropriate,
with a reasonable fallback if needed.

Do not add a UUID dependency.

Anonymous ID should survive page reloads and later sessions.

--------------------------------------------------
10. SESSION ID
--------------------------------------------------

Create a session identifier.

Example:

sess_xxxxxxxxx

Unlike anonymousId:

anonymousId:
long-lived local visitor identity

sessionId:
one browsing/product session

Choose a simple MVP session policy.

Preferred:

- create session ID on application initialization
- keep it for the current browser tab/session
- `sessionStorage` is acceptable
- opening a new tab may create a new session

Do not implement complicated inactivity/session-expiration logic.

Do not store sessionId in permanent localStorage unless justified.

--------------------------------------------------
11. ANALYTICS EVENT MODEL
--------------------------------------------------

Create strongly typed analytics events.

Do NOT allow arbitrary event names and arbitrary payloads.

Use an AnalyticsEventMap or equivalent typed structure.

Required events:

page_view
click_start
goal_selected
duration_selected
plan_created
workout_open
workout_started
workout_completed
nutrition_open
recipe_open

Optional low-priority event:

theme_changed

Only add it if the architecture remains clean.

--------------------------------------------------
12. EVENT PAYLOAD TYPES
--------------------------------------------------

Define meaningful payloads.

Conceptual examples:

page_view:
{
  path: string;
  title?: string;
}

click_start:
{
  location:
    | 'hero'
    | 'final_cta'
    | 'progress_empty'
    | another existing real CTA location;
}

goal_selected:
{
  goal: FitnessGoal;
}

duration_selected:
{
  duration: number;
}

plan_created:
{
  planId: string;
  goal: FitnessGoal;
  duration: number;
}

workout_open:
{
  workoutId: string;
  source:
    | 'library'
    | 'plan'
    | 'home'
    | 'progress'
    | 'unknown';
}

workout_started:
{
  workoutId: string;
  planId?: string;
}

workout_completed:
{
  workoutId: string;
  actualDurationMinutes: number;
  planId?: string;
}

nutrition_open:
{
  source?: string;
}

recipe_open:
{
  recipeId: string;
  source?: 'nutrition_library' | 'home' | 'unknown';
}

Match payloads to the actual current application architecture.

Do not include unused fields simply for future possibilities.

--------------------------------------------------
13. TYPE-SAFE trackEvent()
--------------------------------------------------

The API should provide compile-time payload safety.

Conceptually:

trackEvent('goal_selected', {
  goal: 'build-strength'
})

must compile.

This should fail TypeScript:

trackEvent('goal_selected', {
  recipeId: 'abc'
})

Avoid `Record<string, unknown>` as the main public event API
if a typed event map can provide stronger safety.

--------------------------------------------------
14. EVENT ENVELOPE
--------------------------------------------------

Each emitted event should be wrapped with common context.

Conceptually:

{
  name,
  timestamp,
  anonymousId,
  sessionId,
  path,
  firstTouch,
  currentTouch,
  properties
}

Do not duplicate these common values manually at every call site.

Create them centrally.

Use ISO timestamp or another consistent representation.

--------------------------------------------------
15. ANALYTICS PROVIDER ABSTRACTION
--------------------------------------------------

Create a provider-agnostic analytics interface.

Conceptual API:

interface AnalyticsProvider {
  track(event: AnalyticsEnvelope): void | Promise<void>;
}

Initial provider:

ConsoleAnalyticsProvider

Future providers may be:

GoogleAnalyticsProvider
FirebaseAnalyticsProvider
BackendAnalyticsProvider

Do NOT implement future providers now.

UI components should know only about trackEvent(),
not about provider implementation.

--------------------------------------------------
16. CONSOLE ANALYTICS PROVIDER
--------------------------------------------------

For development, emit useful structured logs.

Example:

[FitLife Analytics]
workout_started
{
  workoutId: 'full-body',
  ...
}

Do not spam production console.

Preferred:

- console provider enabled in DEV
- production can use a no-op provider until a real provider exists

Choose a clear implementation.

Do not make analytics failure affect product functionality.

--------------------------------------------------
17. ANALYTICS MUST NEVER BREAK PRODUCT FLOW
--------------------------------------------------

trackEvent() must be safe.

If provider throws or rejects:

- catch appropriately
- product action continues
- navigation continues
- workout completion remains persisted

Analytics is secondary to product functionality.

Do not make event emission blocking.

--------------------------------------------------
18. SPA PAGE VIEW TRACKING
--------------------------------------------------

React Router navigation does not reload the document.

Implement automatic page_view tracking on route changes.

Track:

- path
- optionally title

Avoid duplicate `page_view` emission in React StrictMode.

Verify:

/
→ one page_view

/workouts
→ one page_view

/workout/:id
→ one page_view

Do not fire page_view repeatedly because unrelated state changes rerender.

--------------------------------------------------
19. INITIAL ATTRIBUTION CAPTURE ORDER
--------------------------------------------------

At application startup:

1. parse entry UTM parameters
2. update attribution storage
3. initialize visitor/session context
4. allow page_view event to include correct attribution

Avoid initial page_view being emitted before attribution context exists
if it can be prevented cleanly.

Do not create complicated async startup if everything is local/synchronous.

--------------------------------------------------
20. HOME CTA EVENTS
--------------------------------------------------

Track the real acquisition CTA interactions.

Examples:

Hero "Start Free":
click_start
location: hero

Final CTA:
click_start
location: final_cta

If returning user sees "View My Plan",
do NOT incorrectly track that as click_start unless it truly represents
the onboarding acquisition CTA.

Track only semantically correct actions.

--------------------------------------------------
21. ONBOARDING EVENTS
--------------------------------------------------

Track:

goal_selected

when the user actually selects/confirms a goal.

Track:

duration_selected

when the duration is selected/confirmed.

Avoid firing duplicate events on rerender.

Do not fire `goal_selected` merely because persisted state hydrates.

User action should cause the event.

--------------------------------------------------
22. PLAN CREATED EVENT
--------------------------------------------------

Track:

plan_created

only after a new plan instance is successfully generated and stored.

Include:

- planId
- goal
- duration

Do not fire if plan generation fails.

Do not fire again merely because /plan mounts.

--------------------------------------------------
23. WORKOUT OPEN EVENT
--------------------------------------------------

Track:

workout_open

when a user intentionally opens a workout detail page.

Source should be determined where reliably known.

Possible sources:

- home
- library
- plan
- progress

Do not infer source incorrectly from URL alone if navigation state
or explicit metadata can be passed safely.

If source cannot be known:

unknown

is better than incorrect attribution.

Avoid duplicate `workout_open` events caused by rerenders.

--------------------------------------------------
24. WORKOUT STARTED EVENT
--------------------------------------------------

Track:

workout_started

when the user explicitly starts a workout session.

Do not track on session page mount if an existing paused/restored session is opened.

A restored session is not a new workout start.

Include:

- workoutId
- planId if associated

--------------------------------------------------
25. WORKOUT COMPLETED EVENT
--------------------------------------------------

Track:

workout_completed

only once per actual completion.

Use the completion deduplication architecture already established in Phase 6/8.5.

Include:

- workoutId
- actualDurationMinutes
- planId if relevant

Analytics must not create duplicate completion records
or control completion business logic.

--------------------------------------------------
26. NUTRITION EVENTS
--------------------------------------------------

Track:

nutrition_open

when the user intentionally enters the Nutrition experience
if this event adds value beyond page_view.

If it would only duplicate page_view with no meaningful semantic distinction,
it is acceptable to omit nutrition_open and explain why.

Track:

recipe_open

when a recipe is intentionally opened.

Include:

- recipeId
- source where reliably known

Do not over-track every filter/search interaction.

--------------------------------------------------
27. DO NOT OVER-TRACK
--------------------------------------------------

Do NOT track:

- every timer tick
- every animation
- every filter hover
- every chart hover
- every scroll
- every second of workout
- every component mount
- every theme render

Only track meaningful product/acquisition events.

--------------------------------------------------
28. CONVERSION EVENT
--------------------------------------------------

Decide whether to keep a generic:

conversion

event.

Preferred approach:

Do NOT use a vague generic conversion event if specific events already
represent the funnel clearly.

Instead, define the primary conversion in documentation as:

plan_created

and a deeper conversion as:

workout_completed

If the existing architecture already contains `conversion`,
either map it intentionally or remove/deprecate it cleanly.

Do not double-fire:

plan_created
+
conversion

for the exact same semantic event unless there is a documented reason.

--------------------------------------------------
29. ATTRIBUTION ATTACHMENT
--------------------------------------------------

Every analytics envelope should automatically include available:

firstTouch
currentTouch

Do not manually pass UTM values from components.

This is a core architecture requirement.

Component:

trackEvent('workout_started', {...})

Analytics layer automatically adds:

anonymousId
sessionId
firstTouch
currentTouch
timestamp
path

--------------------------------------------------
30. DEVELOPMENT EVENT BUFFER
--------------------------------------------------

Create a small in-memory development event buffer for debugging.

Store a limited number of recent events.

Example maximum:

50–100

Do not persist the entire analytics event history indefinitely.

This buffer is for the Debug Panel only.

Avoid memory growth.

--------------------------------------------------
31. ANALYTICS DEBUG PANEL
--------------------------------------------------

Create a development-only Analytics Debug Panel.

This is a key demonstration feature.

The panel should be available only when:

- import.meta.env.DEV

AND preferably either:

?debugAnalytics=true

or a similarly explicit debug flag.

Do not show it in normal production UI.

--------------------------------------------------
32. DEBUG PANEL CONTENT
--------------------------------------------------

Show:

Anonymous ID

Session ID

First Touch:
- source
- medium
- campaign
- content
- term
- landing path

Current Touch:
same fields where available

Recent Events:
- timestamp/time
- event name
- compact payload

Example:

Analytics Debug

Anonymous
anon_...

Session
sess_...

First Touch
google / cpc
fitness_launch

Recent Events

12:40 page_view
12:41 click_start
12:41 goal_selected
12:42 plan_created

Do not build a full analytics dashboard.

--------------------------------------------------
33. DEBUG PANEL UX
--------------------------------------------------

The debug UI should not interfere with the real FitLife interface.

Recommended:

small floating dev button
→ opens panel/drawer

or a compact fixed development drawer.

MOBILE-FIRST:

The panel must work at 360px.

Use:
- full-width bottom sheet or drawer on mobile
- compact side panel on desktop if appropriate

Do not cause horizontal overflow.

Do not obscure critical workout controls when closed.

--------------------------------------------------
34. DEBUG PANEL ACTIONS
--------------------------------------------------

Useful development actions may include:

- Copy analytics context
- Clear displayed debug events

Optional:
- Clear attribution

BUT be careful.

If adding a Clear Attribution action:

make it clearly development-only
and do not mix it with normal app settings.

Do not create excessive tooling.

--------------------------------------------------
35. DEBUG PANEL EVENT UPDATES
--------------------------------------------------

Recent Events should update as events are emitted.

Do not introduce a global application rerender for every event in production.

A development-only subscriber/store/event emitter is acceptable.

Keep production overhead minimal.

--------------------------------------------------
36. PRIVACY
--------------------------------------------------

Do not collect or generate:

- email
- name
- phone
- IP
- exact geolocation
- advertising device ID
- browser fingerprint
- health/medical information
- raw workout notes
- recipe search terms unless explicitly required
- sensitive localStorage contents

Analytics should focus on product behavior and attribution.

--------------------------------------------------
37. WEBVIEW READINESS
--------------------------------------------------

The architecture must work inside a mobile WebView.

Do not depend on:

- third-party cookies
- desktop-only APIs
- popup windows
- hover
- browser extensions

UTM capture should work from the initial WebView URL.

Storage errors must be handled gracefully.

If localStorage/sessionStorage are unavailable,
the product must continue to function.

Analytics may fall back to ephemeral IDs/state.

--------------------------------------------------
38. STORAGE FAILURE SAFETY
--------------------------------------------------

Wrap storage access safely.

Analytics/attribution storage failures must not crash the app.

If persistence fails:

- use in-memory values where practical
- continue product flow

Do not throw fatal errors from attribution initialization.

--------------------------------------------------
39. THEME
--------------------------------------------------

The Debug Panel must support:

DARK
LIGHT

Default app theme remains DARK.

Do not add hardcoded debug colors that are unreadable in light mode.

Reuse semantic tokens.

--------------------------------------------------
40. ACCESSIBILITY
--------------------------------------------------

Debug UI:

- accessible open/close control
- visible focus
- Escape closes panel
- keyboard navigation
- semantic buttons
- proper dialog/drawer semantics if modal
- focus restoration

Analytics integration itself must not interfere with accessibility.

--------------------------------------------------
41. MOTION
--------------------------------------------------

Use Framer Motion only for subtle Debug Panel open/close transitions.

Do not animate analytics events dramatically.

Respect prefers-reduced-motion.

Do not make analytics tracking depend on animation lifecycle.

--------------------------------------------------
42. TESTS — ATTRIBUTION PARSER
--------------------------------------------------

Use existing Vitest setup.

Add tests for:

1. full UTM set
2. partial UTM set
3. empty parameters ignored
4. whitespace handling
5. unrelated params ignored
6. source data not mutated

--------------------------------------------------
43. TESTS — FIRST TOUCH
--------------------------------------------------

Test:

1. first valid attribution is saved
2. later attribution does not overwrite firstTouch
3. later attribution updates currentTouch
4. no-UTM visit does not erase attribution
5. malformed persisted attribution handled safely

--------------------------------------------------
44. TESTS — IDENTITY
--------------------------------------------------

Test where practical:

- anonymous ID persists
- session ID exists
- anonymous ID and session ID are different concepts
- IDs are non-empty
- storage failure does not crash initialization

Do not test cryptographic randomness statistically.

--------------------------------------------------
45. TESTS — TYPED EVENTS / ENVELOPE
--------------------------------------------------

Test event envelope creation.

Verify:

- event name
- properties
- timestamp
- anonymousId
- sessionId
- path
- attribution

Do not test console formatting as the core behavior.

--------------------------------------------------
46. TESTS — EVENT DEDUPLICATION
--------------------------------------------------

Where event lifecycle logic requires it, test:

- page_view once per navigation
- workout_completed once
- plan_created once per actual generated plan
- restored session does not emit workout_started again

Do not introduce a generic deduplication system that accidentally
blocks valid repeated events across a session.

Deduplicate only where product semantics require it.

--------------------------------------------------
47. STRICTMODE
--------------------------------------------------

React StrictMode can run effects more than once in development.

Explicitly verify analytics effects do not produce misleading duplicate events.

Do not solve this by globally suppressing identical event names.

Two real user actions with the same event name must still both track.

Use lifecycle-specific guards where required.

--------------------------------------------------
48. TEST / DEBUG UAC SCENARIO
--------------------------------------------------

The following URL must work as a demonstration:

/?utm_source=google
&utm_medium=cpc
&utm_campaign=fitness_test
&utm_content=video_1
&debugAnalytics=true

Expected Debug Panel:

First Touch:
google
cpc
fitness_test
video_1

Then user:

Start Free
→ click_start

Select Build Strength
→ goal_selected

Select 20 min
→ duration_selected

Generate Plan
→ plan_created

Open planned workout
→ workout_open

Start Workout
→ workout_started

Complete Workout
→ workout_completed

Recent Events should reflect this flow.

--------------------------------------------------
49. SECOND ATTRIBUTION SCENARIO
--------------------------------------------------

After firstTouch exists:

open:

/?utm_source=instagram
&utm_medium=paid_social
&utm_campaign=retargeting_test
&debugAnalytics=true

Expected:

First Touch:
still Google / fitness_test

Current Touch:
Instagram / retargeting_test

Do not overwrite firstTouch.

--------------------------------------------------
50. DIRECT RETURN SCENARIO
--------------------------------------------------

After attributed traffic:

open:

/
without UTM parameters.

Expected:

- firstTouch remains preserved
- attribution data is not erased
- current/session semantics remain consistent with the chosen design

Document exactly what happens to currentTouch on a direct return.

--------------------------------------------------
51. SUGGESTED STRUCTURE
--------------------------------------------------

Follow existing project conventions.

A reasonable structure may be:

src/
  lib/
    analytics/
      analytics.ts
      analyticsProvider.ts
      consoleAnalyticsProvider.ts
      analyticsContext.ts
      analyticsDebugStore.ts

    attribution/
      parseAttribution.ts
      attributionStorage.ts
      attribution.ts

    identity/
      anonymousId.ts
      sessionId.ts

  hooks/
    analytics/
      usePageViewTracking.ts

  components/
    dev/
      AnalyticsDebugPanel.tsx

  types/
    analytics.ts

Do not follow this blindly.

If existing analytics/attribution files already exist,
extend/refactor them rather than duplicating.

Avoid over-fragmentation.

--------------------------------------------------
52. DO NOT IMPLEMENT
--------------------------------------------------

DO NOT add:

- Google Analytics
- Firebase
- AppsFlyer
- Adjust
- Meta Pixel
- TikTok Pixel
- Amplitude
- Mixpanel
- backend analytics endpoint
- cookies banner
- CMP platform
- fingerprinting
- ad targeting
- device advertising ID
- push notifications
- production analytics dashboard
- cohort analysis
- revenue analytics
- A/B testing platform

These are outside Phase 9.

--------------------------------------------------
53. DEFINITION OF DONE
--------------------------------------------------

Phase 9 is complete when:

UTM parser
→ works

firstTouch
→ persists correctly

currentTouch
→ updates correctly

anonymousId
→ generated/persisted

sessionId
→ generated per session

trackEvent()
→ strongly typed

event envelope
→ includes common context

provider abstraction
→ exists

console provider
→ works in development

SPA page_view
→ works without duplicates

Home CTA
→ click_start

Goal
→ goal_selected

Duration
→ duration_selected

Plan generation
→ plan_created

Workout details
→ workout_open

Start Workout
→ workout_started

Workout completion
→ workout_completed once

Recipe open
→ recipe_open

Attribution
→ automatically attached to events

Debug Panel
→ works in DEV

Debug Panel mobile
→ works at 360px

Storage failure
→ does not break app

StrictMode
→ no fake duplicate lifecycle events

Dark theme
→ works

Light theme
→ works

Reduced motion
→ works

Build
→ passes

Lint
→ passes

Tests
→ pass

--------------------------------------------------
54. MANUAL VALIDATION
--------------------------------------------------

Validate:

ATTRIBUTED FIRST VISIT:

Google UTM URL
→ attribution saved
→ page_view contains Google attribution

FUNNEL:

Start Free
→ goal
→ duration
→ plan
→ workout
→ workout session
→ completion

→ events appear in correct sequence

SECOND CAMPAIGN:

Instagram UTM URL
→ firstTouch remains Google
→ currentTouch becomes Instagram

DIRECT RETURN:

no UTM
→ saved firstTouch remains valid

SPA:

navigate between routes
→ one page_view per route transition

RELOAD:

anonymous ID remains
→ session behavior follows chosen policy
→ attribution remains

NEW TAB:

anonymous ID remains
→ new session ID if using sessionStorage/tab session semantics

RESTORED WORKOUT:

resume existing workout
→ no false workout_started event

COMPLETION:

complete workout
→ one workout_completed event

MOBILE:

360px
→ Debug Panel fits
→ no page-level overflow

THEME:

dark/light
→ Debug Panel readable

--------------------------------------------------
55. QUALITY CHECKS
--------------------------------------------------

Run:

npm run build
npm run lint
npm run test

Build includes TypeScript compilation if that remains the current setup.

Fix all issues introduced by Phase 9.

Do not suppress legitimate errors.

--------------------------------------------------
56. FINAL RESPONSE
--------------------------------------------------

Report:

1. attribution architecture
2. firstTouch behavior
3. currentTouch behavior
4. direct-return behavior
5. anonymous ID implementation
6. session ID implementation
7. typed analytics event architecture
8. event envelope/context
9. provider abstraction
10. SPA page-view tracking
11. all integrated product events
12. duplicate-event prevention
13. StrictMode handling
14. storage failure handling
15. WebView considerations
16. Debug Panel implementation
17. privacy decisions
18. tests added
19. files changed
20. build result
21. lint result
22. test result and total test count

Do NOT start Phase 10.

Phase 10 will focus on:

FINAL PRODUCTION POLISH
→ Route-level Lazy Loading
→ Bundle Review
→ Responsive QA
→ Accessibility QA
→ Performance
→ SEO / Metadata
→ WebView Readiness
→ Error Boundaries
→ Final Tests
→ README
→ Deployment Preparation
~~~~

