import type { UserProgress } from '../types'

export const userProgressMock: UserProgress = {
  currentStreak: 4,
  completedWorkouts: [
    { id: 'completed-001', workoutId: 'workout-001', completedAt: '2026-09-07T07:30:00.000Z', durationMinutes: 20, exerciseCount: 3 },
    { id: 'completed-002', workoutId: 'workout-005', completedAt: '2026-09-06T18:10:00.000Z', durationMinutes: 10, exerciseCount: 3 },
    { id: 'completed-003', workoutId: 'workout-004', completedAt: '2026-09-05T07:20:00.000Z', durationMinutes: 20, exerciseCount: 3 },
    { id: 'completed-004', workoutId: 'workout-003', completedAt: '2026-09-04T17:45:00.000Z', durationMinutes: 10, exerciseCount: 3 },
  ],
  totalMinutes: 245,
  weeklyGoal: 5,
}
