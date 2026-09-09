# Screenshot capture guide

Use real application state and keep all metrics and events unaltered. The primary mobile capture size is **390 × 844**, with the dark theme selected unless a light-theme comparison is explicitly requested.

| File | Route/state to capture |
| --- | --- |
| `home.png` | `/` with the complete Home content visible from the top |
| `onboarding.png` | `/onboarding` on goal selection |
| `plan.png` | `/plan` after generating a 7-day plan |
| `workouts.png` | `/workouts` with search and filters visible |
| `workout-session.png` | `/workout/workout-003/session` during an active timed exercise |
| `progress.png` | `/progress` with summary and Activity Chart visible |
| `nutrition.png` | `/nutrition` with the recipe library visible |
| `recipe.png` | `/nutrition/recipe-001` with details and macro visualization |
| `analytics-debug.png` | `/?utm_source=google&utm_medium=cpc&utm_campaign=fitness_test&utm_content=creative_01&debugAnalytics=true` with the panel open |

Also capture one representative light-theme screen at the same viewport. Keep browser chrome minimal and do not add native-device frames or functionality that the app does not provide.
