import { workoutsMock } from './workouts.mock'
import type { CompletedWorkout } from '../types'

interface MockWorkoutScheduleItem {
  id: string
  workoutId: string
  daysAgo: number
  hour: number
  minute: number
  durationMinutes: number
}

const mockWorkoutSchedule = [
  { id: 'mock-completed-01', workoutId: 'workout-001', daysAgo: 1, hour: 7, minute: 20, durationMinutes: 25 },
  { id: 'mock-completed-02', workoutId: 'workout-006', daysAgo: 2, hour: 18, minute: 10, durationMinutes: 45 },
  { id: 'mock-completed-03', workoutId: 'workout-005', daysAgo: 3, hour: 8, minute: 0, durationMinutes: 20 },
  { id: 'mock-completed-04', workoutId: 'workout-002', daysAgo: 4, hour: 17, minute: 40, durationMinutes: 35 },
  { id: 'mock-completed-05', workoutId: 'workout-003', daysAgo: 6, hour: 7, minute: 45, durationMinutes: 15 },
  { id: 'mock-completed-06', workoutId: 'workout-004', daysAgo: 8, hour: 18, minute: 30, durationMinutes: 40 },
  { id: 'mock-completed-07', workoutId: 'workout-001', daysAgo: 9, hour: 7, minute: 10, durationMinutes: 25 },
  { id: 'mock-completed-08', workoutId: 'workout-005', daysAgo: 9, hour: 19, minute: 0, durationMinutes: 20 },
  { id: 'mock-completed-09', workoutId: 'workout-006', daysAgo: 11, hour: 17, minute: 20, durationMinutes: 55 },
  { id: 'mock-completed-10', workoutId: 'workout-002', daysAgo: 12, hour: 8, minute: 15, durationMinutes: 30 },
  { id: 'mock-completed-11', workoutId: 'workout-004', daysAgo: 15, hour: 18, minute: 5, durationMinutes: 35 },
  { id: 'mock-completed-12', workoutId: 'workout-001', daysAgo: 17, hour: 7, minute: 30, durationMinutes: 25 },
  { id: 'mock-completed-13', workoutId: 'workout-006', daysAgo: 18, hour: 17, minute: 50, durationMinutes: 45 },
  { id: 'mock-completed-14', workoutId: 'workout-005', daysAgo: 19, hour: 8, minute: 20, durationMinutes: 20 },
  { id: 'mock-completed-15', workoutId: 'workout-002', daysAgo: 22, hour: 18, minute: 15, durationMinutes: 40 },
  { id: 'mock-completed-16', workoutId: 'workout-004', daysAgo: 24, hour: 7, minute: 40, durationMinutes: 30 },
  { id: 'mock-completed-17', workoutId: 'workout-003', daysAgo: 26, hour: 18, minute: 35, durationMinutes: 15 },
  { id: 'mock-completed-18', workoutId: 'workout-001', daysAgo: 27, hour: 8, minute: 5, durationMinutes: 35 },
  { id: 'mock-completed-19', workoutId: 'workout-005', daysAgo: 29, hour: 17, minute: 30, durationMinutes: 25 },
] satisfies readonly MockWorkoutScheduleItem[]

function completedAtFromDaysAgo(referenceDate: Date, daysAgo: number, hour: number, minute: number): string {
  const completedAt = new Date(referenceDate)
  completedAt.setDate(completedAt.getDate() - daysAgo)
  completedAt.setHours(hour, minute, 0, 0)
  return completedAt.toISOString()
}

export function createMockCompletedWorkouts(referenceDate = new Date()): CompletedWorkout[] {
  return mockWorkoutSchedule.map((item) => {
    const workout = workoutsMock.find((candidate) => candidate.id === item.workoutId)
    if (!workout) throw new Error(`Mock completed workout references an unknown workout: ${item.workoutId}`)
    return {
      id: item.id,
      workoutId: workout.id,
      completedAt: completedAtFromDaysAgo(referenceDate, item.daysAgo, item.hour, item.minute),
      durationMinutes: item.durationMinutes,
      exerciseCount: workout.exercises.length,
    }
  })
}
