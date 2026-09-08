import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryKeys'
import { getRecipes } from '../../services/nutrition.service'

export function useRecipes() {
  return useQuery({
    queryKey: queryKeys.recipes,
    queryFn: getRecipes,
  })
}
