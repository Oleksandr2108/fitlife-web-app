import type { WorkoutPlan } from '../../types'
import type { WorkoutSessionPlanContext } from '../workoutSession/workoutSession.types'

export function getWorkoutPlanContext(plan: WorkoutPlan | null, workoutId: string, rawPlanDay: string | null): WorkoutSessionPlanContext | null {
  const planDay = Number(rawPlanDay)
  if (!plan || !Number.isInteger(planDay)) return null
  const day = plan.days.find((item) => item.day === planDay)
  if (!day || day.isRestDay || day.workoutId !== workoutId) return null
  return { planId: plan.id, planDay }
}
