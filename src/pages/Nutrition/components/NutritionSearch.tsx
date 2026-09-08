import { Search, X } from 'lucide-react'

interface NutritionSearchProps {
  value: string
  onChange: (value: string) => void
}

export function NutritionSearch({ value, onChange }: NutritionSearchProps) {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">Search recipes</span>
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search recipes or ingredients" className="min-h-12 w-full min-w-0 rounded-control border border-border bg-surface py-3 pl-12 pr-12 text-base text-text-primary shadow-surface outline-none placeholder:text-text-muted focus:border-accent" />
      {value ? <button type="button" onClick={() => onChange('')} aria-label="Clear recipe search" className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-control text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"><X aria-hidden="true" className="size-4" /></button> : null}
    </label>
  )
}
