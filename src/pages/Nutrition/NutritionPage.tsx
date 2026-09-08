import { motion } from 'framer-motion'
import { RotateCcw, Utensils } from 'lucide-react'
import { useState } from 'react'
import { AppContainer } from '../../components/layout/AppContainer'
import { RecipeCard } from '../../components/nutrition/RecipeCard'
import { RecipeCardSkeleton } from '../../components/nutrition/RecipeCardSkeleton'
import { Button } from '../../components/ui/Button'
import { useRecipes } from '../../hooks/queries/useRecipes'
import { filterRecipes, type RecipeCharacteristic, type RecipeMealFilter } from '../../lib/nutrition/filterRecipes'
import { fadeUp, staggerContainer } from '../../lib/motion'
import { NutritionFilters } from './components/NutritionFilters'
import { NutritionSearch } from './components/NutritionSearch'

export function NutritionPage() {
  const [search, setSearch] = useState('')
  const [mealType, setMealType] = useState<RecipeMealFilter>('all')
  const [characteristic, setCharacteristic] = useState<RecipeCharacteristic>('all')
  const { data: recipes = [], isPending, isError, refetch } = useRecipes()
  const filteredRecipes = filterRecipes(recipes, { search, mealType, characteristic })
  const hasActiveFilters = Boolean(search.trim()) || mealType !== 'all' || characteristic !== 'all'

  function clearFilters() {
    setSearch('')
    setMealType('all')
    setCharacteristic('all')
  }

  return (
    <AppContainer className="min-w-0 py-10 sm:py-14">
      <div className="mx-auto min-w-0 max-w-5xl">
        <header><p className="text-meta uppercase tracking-[0.16em] text-accent">Everyday fuel</p><h1 className="text-page-title mt-3">Simple Nutrition</h1><p className="text-body mt-3 max-w-2xl text-text-secondary">Easy meal ideas to support your everyday routine.</p></header>
        <section className="mt-8 grid min-w-0 max-w-full gap-5 rounded-surface border border-border bg-background-secondary p-4 sm:mt-10 sm:p-5" aria-label="Recipe search and filters">
          <NutritionSearch value={search} onChange={setSearch} />
          <NutritionFilters mealType={mealType} characteristic={characteristic} onMealTypeChange={setMealType} onCharacteristicChange={setCharacteristic} />
        </section>

        {isError ? (
          <section className="mt-8 rounded-surface border border-border bg-surface p-6 text-center shadow-surface"><h2 className="text-card-title">We couldn’t load recipes.</h2><p className="mt-2 text-text-secondary">Please try again.</p><Button onClick={() => void refetch()} icon={RotateCcw} className="mt-5 w-full min-[430px]:w-auto">Try Again</Button></section>
        ) : (
          <>
            <div className="mt-8 flex min-w-0 flex-wrap items-center justify-between gap-3"><p className="text-sm text-text-muted">{isPending ? 'Loading recipes…' : `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recipe' : 'recipes'}${hasActiveFilters ? ' found' : ''}`}</p>{hasActiveFilters ? <button type="button" onClick={clearFilters} className="min-h-11 font-semibold text-accent">Clear filters</button> : null}</div>
            {isPending ? <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading recipes">{Array.from({ length: 6 }, (_, index) => <RecipeCardSkeleton key={index} />)}</div> : filteredRecipes.length > 0 ? (
              <motion.div key={`${mealType}-${characteristic}-${search}`} variants={staggerContainer} initial="hidden" animate="visible" className="mt-4 grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredRecipes.map((recipe) => <motion.div key={recipe.id} variants={fadeUp} className="min-w-0"><RecipeCard recipe={recipe} /></motion.div>)}</motion.div>
            ) : (
              <section className="mt-4 grid min-h-64 place-content-center rounded-surface border border-dashed border-border bg-surface px-5 text-center"><span className="mx-auto grid size-11 place-items-center rounded-control bg-accent-soft text-accent"><Utensils aria-hidden="true" className="size-5" /></span><h2 className="text-card-title mt-4">No recipes found</h2><p className="mt-2 text-sm text-text-secondary">Try changing your search or filters.</p><Button onClick={clearFilters} variant="secondary" className="mt-5">Clear Filters</Button></section>
            )}
          </>
        )}
      </div>
    </AppContainer>
  )
}
