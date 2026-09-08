import { Search, X } from 'lucide-react'

interface WorkoutSearchProps {
  value: string
  onChange: (value: string) => void
}

export function WorkoutSearch({ value, onChange }: WorkoutSearchProps) {
  return (
    <div className="relative">
      <label htmlFor="workout-search" className="sr-only">
        Search workouts
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
      <input
        id="workout-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search workouts"
        className="min-h-12 w-full rounded-control border border-border bg-surface py-3 pl-12 pr-12 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear workout search"
          className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-control text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
