import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/Home/HomePage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'
import { NutritionPage } from './pages/Nutrition/NutritionPage'
import { ProgressPage } from './pages/Progress/ProgressPage'
import { WorkoutPage } from './pages/Workout/WorkoutPage'
import { WorkoutsPage } from './pages/Workouts/WorkoutsPage'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/workout/:id" element={<WorkoutPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
