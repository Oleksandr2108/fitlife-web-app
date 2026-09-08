import { getStoredValue, setStoredValue } from '../lib/storage'
import type { CompletedWorkout } from '../types'

const COMPLETED_WORKOUTS_STORAGE_KEY = 'fitlife-completed-workouts'

function isCompletedWorkout(value: unknown): value is CompletedWorkout {
  if (!value || typeof value !== 'object') return false
  const workout = value as Partial<CompletedWorkout>
  return typeof workout.id === 'string'
    && typeof workout.workoutId === 'string'
    && typeof workout.completedAt === 'string'
    && typeof workout.durationMinutes === 'number'
    && Number.isInteger(workout.exerciseCount)
    && (workout.planId === undefined || typeof workout.planId === 'string')
    && (workout.planDay === undefined || (Number.isInteger(workout.planDay) && workout.planDay >= 1 && workout.planDay <= 7))
}

export function getLocalCompletedWorkouts(): CompletedWorkout[] {
  const value = getStoredValue<unknown>(COMPLETED_WORKOUTS_STORAGE_KEY)
  return Array.isArray(value) ? value.filter(isCompletedWorkout) : []
}

export function recordCompletedWorkout(record: CompletedWorkout): CompletedWorkout[] {
  const existingRecords = getLocalCompletedWorkouts()
  if (existingRecords.some((item) => item.id === record.id)) return existingRecords
  const nextRecords = [record, ...existingRecords]
  setStoredValue(COMPLETED_WORKOUTS_STORAGE_KEY, nextRecords)
  return nextRecords
}
