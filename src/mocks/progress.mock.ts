import { calculateCurrentStreak, calculateTotalMinutes } from '../lib/progress/calculateProgress'
import { createMockCompletedWorkouts } from './completedWorkouts.mock'
import type { UserProgress } from '../types'

const completedWorkouts = createMockCompletedWorkouts()

export const userProgressMock: UserProgress = {
  currentStreak: calculateCurrentStreak(completedWorkouts),
  completedWorkouts,
  totalMinutes: calculateTotalMinutes(completedWorkouts),
  weeklyGoal: 5,
}
