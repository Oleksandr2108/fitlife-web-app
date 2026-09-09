import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalyticsLifecycle } from "./components/analytics/AnalyticsLifecycle";
import { AppLayout } from "./components/layout/AppLayout";
import { FocusedLayout } from "./components/layout/FocusedLayout";
import { RouteLoadingFallback } from "./components/layout/RouteLoadingFallback";
import { WorkoutSessionLayout } from "./components/layout/WorkoutSessionLayout";
import { isAnalyticsDebugEnabled } from "./lib/analytics/analyticsDebug";

const HomePage = lazy(() =>
  import("./pages/Home/HomePage").then((module) => ({ default: module.HomePage })),
);
const OnboardingPage = lazy(() =>
  import("./pages/Onboarding/OnboardingPage").then((module) => ({ default: module.OnboardingPage })),
);
const PlanPage = lazy(() =>
  import("./pages/Plan/PlanPage").then((module) => ({ default: module.PlanPage })),
);
const WorkoutsPage = lazy(() =>
  import("./pages/Workouts/WorkoutsPage").then((module) => ({ default: module.WorkoutsPage })),
);
const WorkoutPage = lazy(() =>
  import("./pages/Workout/WorkoutPage").then((module) => ({ default: module.WorkoutPage })),
);
const WorkoutSessionPage = lazy(() =>
  import("./pages/WorkoutSession/WorkoutSessionPage").then((module) => ({ default: module.WorkoutSessionPage })),
);
const ProgressPage = lazy(() =>
  import("./pages/Progress/ProgressPage").then((module) => ({ default: module.ProgressPage })),
);
const PrivacyPage = lazy(() =>
  import("./pages/Privacy/PrivacyPage").then((module) => ({ default: module.PrivacyPage })),
);
const NutritionPage = lazy(() =>
  import("./pages/Nutrition/NutritionPage").then((module) => ({ default: module.NutritionPage })),
);
const RecipePage = lazy(() =>
  import("./pages/Recipe/RecipePage").then((module) => ({ default: module.RecipePage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFound/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);
const AnalyticsDebugPanel = lazy(() =>
  import("./components/dev/AnalyticsDebugPanel").then((module) => ({
    default: module.AnalyticsDebugPanel,
  })),
);

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AnalyticsLifecycle />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/workout/:id" element={<WorkoutPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/nutrition/:id" element={<RecipePage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<FocusedLayout />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>
            <Route element={<WorkoutSessionLayout />}>
              <Route path="/workout/:id/session" element={<WorkoutSessionPage />} />
            </Route>
          </Routes>
        </Suspense>
        {isAnalyticsDebugEnabled() ? (
          <Suspense fallback={null}>
            <AnalyticsDebugPanel />
          </Suspense>
        ) : null}
      </BrowserRouter>
    </MotionConfig>
  );
}
