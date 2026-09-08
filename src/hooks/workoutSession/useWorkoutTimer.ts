import { useEffect } from 'react'
import { useWorkoutSessionStore } from '../../store/workoutSession.store'
import type { Workout } from '../../types'

export function useWorkoutTimer(workout: Workout | null) {
  const status = useWorkoutSessionStore((state) => state.status)
  const phase = useWorkoutSessionStore((state) => state.phase)
  const currentExerciseIndex = useWorkoutSessionStore((state) => state.currentExerciseIndex)
  const tick = useWorkoutSessionStore((state) => state.tick)

  useEffect(() => {
    const exercise = workout?.exercises[currentExerciseIndex]
    const hasCountdown = phase === 'rest' || exercise?.durationSeconds !== undefined
    if (!workout || status !== 'active' || !hasCountdown) return

    const intervalId = window.setInterval(() => tick(workout), 1000)
    return () => window.clearInterval(intervalId)
  }, [currentExerciseIndex, phase, status, tick, workout])
}
