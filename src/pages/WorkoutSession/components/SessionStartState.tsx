import { Play } from 'lucide-react'
import { Button, ButtonLink } from '../../../components/ui/Button'
import type { Workout } from '../../../types'

export function SessionStartState({ workout, onStart }: { workout: Workout; onStart: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(2rem+env(safe-area-inset-top))] sm:px-6">
      <section className="w-full max-w-lg rounded-surface border border-border bg-surface p-6 text-center shadow-surface sm:p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent"><Play aria-hidden="true" className="size-7" /></span>
        <p className="text-meta mt-6 text-accent">Ready when you are</p>
        <h1 className="text-section-title mt-3">{workout.title}</h1>
        <p className="mt-3 leading-7 text-text-secondary">{workout.exercises.length} exercises · about {workout.durationMinutes} minutes</p>
        <Button size="large" icon={Play} onClick={onStart} className="mt-7 w-full">Start Workout</Button>
        <ButtonLink to={`/workout/${workout.id}`} size="large" variant="ghost" className="mt-2 w-full">Back to Workout</ButtonLink>
      </section>
    </main>
  )
}
