import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryKeys'
import { getWorkouts } from '../../services/workout.service'

export function useWorkouts() {
  return useQuery({
    queryKey: queryKeys.workouts,
    queryFn: getWorkouts,
  })
}
