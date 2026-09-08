import type { Recipe, RecipeMealType } from '../../types'

export type RecipeMealFilter = RecipeMealType | 'all'
export type RecipeCharacteristic = 'all' | 'high-protein' | 'quick' | 'low-calorie'

export interface RecipeFilters {
  search: string
  mealType: RecipeMealFilter
  characteristic: RecipeCharacteristic
}

export const recipeFilterThresholds = {
  highProteinGrams: 25,
  quickPreparationMinutes: 20,
  lowCalorieMaximum: 450,
} as const

export const recipeMealOptions: ReadonlyArray<{ value: RecipeMealFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
]

export const recipeCharacteristicOptions: ReadonlyArray<{ value: RecipeCharacteristic; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'high-protein', label: 'High Protein' },
  { value: 'quick', label: 'Quick' },
  { value: 'low-calorie', label: 'Low Calorie' },
]

function matchesCharacteristic(recipe: Recipe, characteristic: RecipeCharacteristic): boolean {
  if (characteristic === 'high-protein') return recipe.proteinGrams >= recipeFilterThresholds.highProteinGrams
  if (characteristic === 'quick') return recipe.preparationMinutes <= recipeFilterThresholds.quickPreparationMinutes
  if (characteristic === 'low-calorie') return recipe.calories <= recipeFilterThresholds.lowCalorieMaximum
  return true
}

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  const query = filters.search.trim().toLocaleLowerCase()
  return recipes.filter((recipe) => {
    const searchableText = [recipe.title, recipe.description, recipe.mealType, ...recipe.ingredients.map((ingredient) => ingredient.name)].join(' ').toLocaleLowerCase()
    return (!query || searchableText.includes(query))
      && (filters.mealType === 'all' || recipe.mealType === filters.mealType)
      && matchesCharacteristic(recipe, filters.characteristic)
  })
}
