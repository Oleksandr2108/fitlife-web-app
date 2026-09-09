import {
  formatWorkoutLabel,
  workoutCategories,
  workoutDifficulties,
  type WorkoutCategoryFilter,
  type WorkoutDifficultyFilter,
} from "../../../lib/workouts/filterWorkouts";

interface WorkoutFiltersProps {
  category: WorkoutCategoryFilter;
  difficulty: WorkoutDifficultyFilter;
  onCategoryChange: (category: WorkoutCategoryFilter) => void;
  onDifficultyChange: (difficulty: WorkoutDifficultyFilter) => void;
}

interface FilterChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function FilterChip({ active, label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export function WorkoutFilters({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}: WorkoutFiltersProps) {
  return (
    <div className="min-w-0 max-w-full space-y-5">
      <fieldset className="min-w-0 max-w-full">
        <legend className="mb-2 text-sm font-semibold text-text-primary">
          Category
        </legend>
        <div className="flex max-w-full flex-wrap gap-2">
          <FilterChip
            active={category === "all"}
            label="All"
            onClick={() => onCategoryChange("all")}
          />
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
      <fieldset className="min-w-0 max-w-full">
        <legend className="mb-2 text-sm font-semibold text-text-primary">
          Difficulty
        </legend>
        <div className="flex max-w-full flex-wrap gap-2">
          <FilterChip
            active={difficulty === "all"}
            label="All"
            onClick={() => onDifficultyChange("all")}
          />
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
  );
}
