import { X } from 'lucide-react'

interface SessionHeaderProps {
  workoutTitle: string
  currentExercise: number
  exerciseCount: number
  progressPercent: number
  onExit: () => void
}

export function SessionHeader({ workoutTitle, currentExercise, exerciseCount, progressPercent, onExit }: SessionHeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-3xl items-center gap-3 px-4 sm:px-6">
        <button type="button" onClick={onExit} aria-label="Exit workout" className="grid size-11 shrink-0 place-items-center rounded-control text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <X aria-hidden="true" className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">{workoutTitle}</p>
          <p className="mt-0.5 text-xs text-text-muted">Exercise {currentExercise} of {exerciseCount}</p>
        </div>
        <span className="text-sm font-semibold text-accent">{progressPercent}%</span>
      </div>
      <div className="h-1 bg-surface-muted" role="progressbar" aria-label="Workout progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
        <div className="h-full bg-accent transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progressPercent}%` }} />
      </div>
    </header>
  )
}
