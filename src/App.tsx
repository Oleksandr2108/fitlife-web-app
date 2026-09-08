import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home/HomePage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'
import { NutritionPage } from './pages/Nutrition/NutritionPage'
import { ProgressPage } from './pages/Progress/ProgressPage'
import { WorkoutPage } from './pages/Workout/WorkoutPage'
import { WorkoutsPage } from './pages/Workouts/WorkoutsPage'

export function App() {
  return (
    <BrowserRouter>
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/workout/:id" element={<WorkoutPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
