export type FitnessGoal = 'lose-weight' | 'build-strength' | 'stay-active' | 'improve-mobility'
export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type WorkoutCategory = 'full-body' | 'strength' | 'cardio' | 'core' | 'mobility'
export type WorkoutDuration = 10 | 20 | 30

export interface Exercise { id: string; name: string; instructions: string; durationSeconds?: number; repetitions?: number; restDurationSeconds?: number }
export interface Workout { id: string; slug: string; title: string; description: string; difficulty: WorkoutDifficulty; durationMinutes: number; category: WorkoutCategory; equipment: string[]; imageUrl: string; exercises: Exercise[] }
export interface Recipe { id: string; slug: string; title: string; description: string; imageUrl: string; calories: number; proteinGrams: number; carbohydrateGrams: number; fatGrams: number; preparationMinutes: number; ingredients: string[] }
export interface UserPreferences { goal: FitnessGoal; preferredWorkoutDuration: WorkoutDuration }
export interface User { id: string; firstName: string; preferences: UserPreferences; createdAt: string }
export interface CompletedWorkout { id: string; workoutId: string; completedAt: string; durationMinutes: number; exerciseCount: number; planId?: string; planDay?: number }
export interface UserProgress { currentStreak: number; completedWorkouts: CompletedWorkout[]; totalMinutes: number; weeklyGoal: number }
export interface WorkoutPlanDay { day: number; workoutId: string | null; isRestDay: boolean }
export interface WorkoutPlan { id: string; goal: FitnessGoal; duration: WorkoutDuration; days: WorkoutPlanDay[] }
export interface AttributionData { source?: string; medium?: string; campaign?: string; content?: string; term?: string; capturedAt: string }
