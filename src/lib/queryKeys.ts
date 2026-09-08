export const queryKeys = {
  currentUser: ['current-user'] as const,
  workouts: ['workouts'] as const,
  workout: (id: string | undefined) => ['workouts', 'detail', id] as const,
  recipes: ['recipes'] as const,
  userProgress: ['user-progress'] as const,
}
