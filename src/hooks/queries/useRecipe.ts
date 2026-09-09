import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../lib/queryKeys'
import { getRecipeById } from '../../services/nutrition.service'

export function useRecipe(identifier: string | undefined) {
  return useQuery({
    queryKey: queryKeys.recipe(identifier),
    queryFn: () => getRecipeById(identifier ?? ''),
    enabled: Boolean(identifier),
  })
}
