import { describe, expect, it } from 'vitest'
import { recipesMock } from '../../mocks/recipes.mock'
import { filterRecipes, type RecipeFilters } from './filterRecipes'

const defaults: RecipeFilters = { search: '', mealType: 'all', characteristic: 'all' }

describe('filterRecipes', () => {
  it('searches by title', () => expect(filterRecipes(recipesMock, { ...defaults, search: 'Berry Oat' }).map((recipe) => recipe.id)).toEqual(['recipe-001']))
  it('searches case-insensitively', () => expect(filterRecipes(recipesMock, { ...defaults, search: 'SALMON' }).map((recipe) => recipe.id)).toEqual(['recipe-006']))
  it('searches ingredient names', () => expect(filterRecipes(recipesMock, { ...defaults, search: 'tahini' }).map((recipe) => recipe.id)).toEqual(['recipe-003']))
  it('filters by meal type', () => expect(filterRecipes(recipesMock, { ...defaults, mealType: 'breakfast' })).toHaveLength(2))
  it('filters high-protein recipes', () => expect(filterRecipes(recipesMock, { ...defaults, characteristic: 'high-protein' }).every((recipe) => recipe.proteinGrams >= 25)).toBe(true))
  it('filters quick recipes', () => expect(filterRecipes(recipesMock, { ...defaults, characteristic: 'quick' }).every((recipe) => recipe.preparationMinutes <= 20)).toBe(true))
  it('filters low-calorie recipes', () => expect(filterRecipes(recipesMock, { ...defaults, characteristic: 'low-calorie' }).every((recipe) => recipe.calories <= 450)).toBe(true))
  it('combines search, meal type, and characteristic filters', () => expect(filterRecipes(recipesMock, { search: 'yogurt', mealType: 'snack', characteristic: 'high-protein' }).map((recipe) => recipe.id)).toEqual(['recipe-008']))
  it('returns the full catalog for default filters', () => expect(filterRecipes(recipesMock, defaults)).toEqual(recipesMock))
  it('does not mutate the source array', () => { const source = [...recipesMock]; filterRecipes(source, { ...defaults, search: 'egg' }); expect(source).toEqual(recipesMock) })
})
