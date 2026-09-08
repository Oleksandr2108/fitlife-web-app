import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AppContainer } from '../../components/layout/AppContainer'
import { Button } from '../../components/ui/Button'
import { useWorkout } from '../../hooks/queries/useWorkout'
import { ExerciseList } from './components/ExerciseList'
import { WorkoutHero } from './components/WorkoutHero'

export function WorkoutPage() {
  const { id } = useParams<{ id: string }>()
  const { data: workout, isPending, isError, refetch } = useWorkout(id)

  return (
    <main className="py-6 sm:py-10 lg:py-12">
      <AppContainer>
        <Link to="/workouts" className="inline-flex min-h-11 items-center gap-1 font-semibold text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <ChevronLeft aria-hidden="true" className="size-5" />Back to workouts
        </Link>
        {isPending ? (
          <div className="mt-4 animate-pulse overflow-hidden rounded-surface border border-border bg-surface lg:grid lg:grid-cols-2" aria-label="Loading workout details">
            <div className="aspect-[16/10] bg-surface-muted lg:aspect-auto lg:min-h-[30rem]" />
            <div className="space-y-4 p-6 sm:p-10"><div className="h-3 w-1/4 rounded bg-surface-muted" /><div className="h-10 w-3/4 rounded bg-surface-muted" /><div className="h-20 rounded bg-surface-muted" /><div className="grid grid-cols-2 gap-3">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-20 rounded bg-surface-muted" />)}</div></div>
          </div>
        ) : isError ? (
          <div className="mt-4 rounded-surface border border-border bg-surface p-8 text-center"><h1 className="text-section-title">We couldn’t load this workout</h1><p className="mt-3 text-text-secondary">Please try again in a moment.</p><Button className="mt-5" onClick={() => void refetch()}>Try again</Button></div>
        ) : !workout ? (
          <div className="mt-4 rounded-surface border border-border bg-surface p-8 text-center sm:p-12"><p className="text-meta text-accent">Workout not found</p><h1 className="text-section-title mt-3">That workout isn’t in the library</h1><p className="mx-auto mt-3 max-w-md text-text-secondary">The link may be outdated, or the workout may no longer be available.</p><Link to="/workouts" className="mt-5 inline-flex min-h-11 items-center font-semibold text-accent hover:text-accent-hover">Browse all workouts</Link></div>
        ) : (
          <div className="mt-4 space-y-10 sm:space-y-12"><WorkoutHero workout={workout} /><ExerciseList exercises={workout.exercises} /></div>
        )}
      </AppContainer>
    </main>
  )
}
