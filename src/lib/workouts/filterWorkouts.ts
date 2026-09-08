import type { Workout, WorkoutCategory, WorkoutDifficulty } from '../../types'

export type WorkoutCategoryFilter = WorkoutCategory | 'all'
export type WorkoutDifficultyFilter = WorkoutDifficulty | 'all'

export interface WorkoutFilters {
  search: string
  category: WorkoutCategoryFilter
  difficulty: WorkoutDifficultyFilter
}

export const workoutCategories: readonly WorkoutCategory[] = ['full-body', 'strength', 'cardio', 'core', 'mobility']
export const workoutDifficulties: readonly WorkoutDifficulty[] = ['beginner', 'intermediate', 'advanced']

export function formatWorkoutLabel(value: WorkoutCategory | WorkoutDifficulty): string {
  return value
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

export function filterWorkouts(workouts: readonly Workout[], filters: WorkoutFilters): Workout[] {
  const normalizedSearch = filters.search.trim().toLocaleLowerCase()

  return workouts.filter((workout) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [workout.title, workout.description, formatWorkoutLabel(workout.category)].some((value) =>
        value.toLocaleLowerCase().includes(normalizedSearch),
      )
    const matchesCategory = filters.category === 'all' || workout.category === filters.category
    const matchesDifficulty = filters.difficulty === 'all' || workout.difficulty === filters.difficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })
}
