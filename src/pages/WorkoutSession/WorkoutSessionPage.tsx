import { ChevronLeft, Timer } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AppContainer } from '../../components/layout/AppContainer'
import { useWorkout } from '../../hooks/queries/useWorkout'

export function WorkoutSessionPage() {
  const { id } = useParams<{ id: string }>()
  const { data: workout, isPending } = useWorkout(id)

  return (
    <main className="py-10 sm:py-14">
      <AppContainer className="max-w-3xl">
        <Link to={id ? `/workout/${id}` : '/workouts'} className="inline-flex min-h-11 items-center gap-1 font-semibold text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <ChevronLeft aria-hidden="true" className="size-5" />Back to workout
        </Link>
        <div className="mt-6 rounded-surface border border-border bg-surface p-7 text-center shadow-surface sm:p-12">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-accent"><Timer aria-hidden="true" className="size-7" /></span>
          <p className="text-meta mt-5 text-accent">Guided session</p>
          <h1 className="text-section-title mt-3">{isPending ? 'Preparing your workout…' : workout ? workout.title : 'Workout unavailable'}</h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-text-secondary">
            {workout ? 'The guided timer and exercise controls will be added in the workout-session phase. Your workout details are ready.' : isPending ? 'Loading the session details.' : 'Return to the workout library and choose an available session.'}
          </p>
        </div>
      </AppContainer>
    </main>
  )
}
