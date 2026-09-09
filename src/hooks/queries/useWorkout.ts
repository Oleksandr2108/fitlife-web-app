import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryKeys'
import { getWorkoutById } from '../../services/workout.service'

export function useWorkout(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.workout(id),
    queryFn: () => getWorkoutById(id ?? ''),
    enabled: Boolean(id),
  })
}
