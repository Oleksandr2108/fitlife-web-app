import {
  formatWorkoutLabel,
  workoutCategories,
  workoutDifficulties,
  type WorkoutCategoryFilter,
  type WorkoutDifficultyFilter,
} from '../../../lib/workouts/filterWorkouts'

interface WorkoutFiltersProps {
  category: WorkoutCategoryFilter
  difficulty: WorkoutDifficultyFilter
  onCategoryChange: (category: WorkoutCategoryFilter) => void
  onDifficultyChange: (difficulty: WorkoutDifficultyFilter) => void
}

interface FilterChipProps {
  active: boolean
  label: string
  onClick: () => void
}

function FilterChip({ active, label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active ? 'border-accent bg-accent text-accent-foreground' : 'border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  )
}

export function WorkoutFilters({ category, difficulty, onCategoryChange, onDifficultyChange }: WorkoutFiltersProps) {
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-text-primary">Category</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip active={category === 'all'} label="All" onClick={() => onCategoryChange('all')} />
          {workoutCategories.map((option) => (
            <FilterChip
              key={option}
              active={category === option}
              label={formatWorkoutLabel(option)}
              onClick={() => onCategoryChange(option)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-text-primary">Difficulty</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip active={difficulty === 'all'} label="All" onClick={() => onDifficultyChange('all')} />
          {workoutDifficulties.map((option) => (
            <FilterChip
              key={option}
              active={difficulty === option}
              label={formatWorkoutLabel(option)}
              onClick={() => onDifficultyChange(option)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )
}
