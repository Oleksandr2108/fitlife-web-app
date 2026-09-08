import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { recipeFilterThresholds } from '../../lib/nutrition/filterRecipes'
import type { Recipe } from '../../types'

interface RecipeCardProps {
  recipe: Recipe
}

function characteristicLabel(recipe: Recipe): string | null {
  if (recipe.proteinGrams >= recipeFilterThresholds.highProteinGrams) return 'High protein'
  if (recipe.preparationMinutes <= recipeFilterThresholds.quickPreparationMinutes) return 'Quick'
  if (recipe.calories <= recipeFilterThresholds.lowCalorieMaximum) return 'Light option'
  return null
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const badge = characteristicLabel(recipe)
  return (
    <Link to={`/nutrition/${recipe.id}`} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-surface border border-border bg-surface shadow-surface transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <div className="relative overflow-hidden">
        <img src={recipe.imageUrl} alt={`${recipe.title} recipe`} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" />
        {badge ? <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-xs font-semibold text-white">{badge}</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <span className="text-meta capitalize text-accent">{recipe.mealType}</span>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-text-muted"><Clock3 aria-hidden="true" className="size-3.5" />{recipe.preparationMinutes} min</span>
        </div>
        <h3 className="text-card-title mt-3">{recipe.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">{recipe.description}</p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-xs text-text-muted"><span>{recipe.calories} kcal</span><span aria-hidden="true">·</span><span>{recipe.proteinGrams}g protein</span></div>
      </div>
    </Link>
  )
}
