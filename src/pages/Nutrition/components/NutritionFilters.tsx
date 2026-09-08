import { recipeCharacteristicOptions, recipeMealOptions, type RecipeCharacteristic, type RecipeMealFilter } from '../../../lib/nutrition/filterRecipes'

interface NutritionFiltersProps {
  mealType: RecipeMealFilter
  characteristic: RecipeCharacteristic
  onMealTypeChange: (value: RecipeMealFilter) => void
  onCharacteristicChange: (value: RecipeCharacteristic) => void
}

interface FilterRowProps<T extends string> {
  label: string
  value: T
  options: ReadonlyArray<{ value: T; label: string }>
  onChange: (value: T) => void
}

function FilterRow<T extends string>({ label, value, options, onChange }: FilterRowProps<T>) {
  return (
    <fieldset className="min-w-0 max-w-full">
      <legend className="text-meta text-text-muted">{label}</legend>
      <div className="mt-2 max-w-full overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-2">
          {options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors ${value === option.value ? 'border-accent bg-accent text-accent-foreground' : 'border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary'}`}>{option.label}</button>)}
        </div>
      </div>
    </fieldset>
  )
}

export function NutritionFilters({ mealType, characteristic, onMealTypeChange, onCharacteristicChange }: NutritionFiltersProps) {
  return <div className="grid min-w-0 max-w-full gap-4"><FilterRow label="Meal type" value={mealType} options={recipeMealOptions} onChange={onMealTypeChange} /><FilterRow label="Nutrition" value={characteristic} options={recipeCharacteristicOptions} onChange={onCharacteristicChange} /></div>
}
