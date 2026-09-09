import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { FocusedLayout } from "./components/layout/FocusedLayout";
import { WorkoutSessionLayout } from "./components/layout/WorkoutSessionLayout";
import { HomePage } from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { NutritionPage } from "./pages/Nutrition/NutritionPage";
import { OnboardingPage } from "./pages/Onboarding/OnboardingPage";
import { PlanPage } from "./pages/Plan/PlanPage";
import { ProgressPage } from "./pages/Progress/ProgressPage";
import { RecipePage } from "./pages/Recipe/RecipePage";
import { WorkoutPage } from "./pages/Workout/WorkoutPage";
import { WorkoutSessionPage } from "./pages/WorkoutSession/WorkoutSessionPage";
import { WorkoutsPage } from "./pages/Workouts/WorkoutsPage";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/workouts"
              element={<WorkoutsPage />}
            />
            <Route
              path="/workout/:id"
              element={<WorkoutPage />}
            />
            <Route
              path="/nutrition"
              element={<NutritionPage />}
            />
            <Route
              path="/nutrition/:id"
              element={<RecipePage />}
            />
            <Route
              path="/plan"
              element={<PlanPage />}
            />
            <Route
              path="/progress"
              element={<ProgressPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
          <Route element={<FocusedLayout />}>
            <Route
              path="/onboarding"
              element={<OnboardingPage />}
            />
          </Route>
          <Route element={<WorkoutSessionLayout />}>
            <Route
              path="/workout/:id/session"
              element={<WorkoutSessionPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
