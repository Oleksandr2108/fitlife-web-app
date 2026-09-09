import { Outlet } from 'react-router-dom'

export function WorkoutSessionLayout() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <Outlet />
    </div>
  )
}
