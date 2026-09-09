import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryKeys'
import { getUserProgress } from '../../services/user.service'

export function useUserProgress() {
  return useQuery({
    queryKey: queryKeys.userProgress,
    queryFn: getUserProgress,
  })
}
