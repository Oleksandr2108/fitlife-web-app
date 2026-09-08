import { useEffect } from 'react'
import { Button } from '../../../components/ui/Button'

interface ExitWorkoutDialogProps {
  open: boolean
  onContinue: () => void
  onEnd: () => void
}

export function ExitWorkoutDialog({ open, onContinue, onEnd }: ExitWorkoutDialogProps) {
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onContinue()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onContinue, open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onContinue() }}>
      <div role="dialog" aria-modal="true" aria-labelledby="exit-workout-title" aria-describedby="exit-workout-description" className="w-full max-w-sm rounded-surface border border-border bg-surface p-6 shadow-surface">
        <h2 id="exit-workout-title" className="text-card-title">End workout?</h2>
        <p id="exit-workout-description" className="mt-3 text-sm leading-6 text-text-secondary">Your current session progress will be lost.</p>
        <div className="mt-6 grid gap-3">
          <Button autoFocus onClick={onContinue}>Continue Workout</Button>
          <Button variant="ghost" onClick={onEnd}>End Workout</Button>
        </div>
      </div>
    </div>
  )
}
