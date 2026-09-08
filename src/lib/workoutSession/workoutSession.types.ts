export type WorkoutSessionStatus = 'idle' | 'active' | 'paused' | 'completed'
export type WorkoutSessionPhase = 'exercise' | 'rest'

export interface WorkoutSessionPlanContext {
  planId: string | null
  planDay: number | null
}

export interface WorkoutSessionData extends WorkoutSessionPlanContext {
  workoutId: string | null
  status: WorkoutSessionStatus
  currentExerciseIndex: number
  phase: WorkoutSessionPhase
  remainingSeconds: number
  completedExerciseIds: string[]
  startedAt: string | null
  completedAt: string | null
  elapsedSeconds: number
}
