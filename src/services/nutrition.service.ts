import { delay } from '../lib/delay'
import { recipesMock } from '../mocks/recipes.mock'
import type { Recipe } from '../types'

export async function getRecipes(): Promise<Recipe[]> { await delay(150); return recipesMock }
