import { Clock3, Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatWorkoutLabel } from '../../lib/workouts/filterWorkouts'
import type { Workout } from '../../types'
import type { WorkoutOpenSource } from '../../types/analytics'
import { WorkoutImage } from './WorkoutImage'

interface WorkoutCardProps {
  workout: Workout
  source?: WorkoutOpenSource
}

export function WorkoutCard({ workout, source = 'unknown' }: WorkoutCardProps) {
  const equipment = workout.equipment.length > 0 ? workout.equipment.join(', ') : 'No equipment'

  return (
    <Link
      to={`/workout/${workout.id}`}
      state={{ analyticsSource: source }}
      className="group flex h-full flex-col overflow-hidden rounded-surface border border-border bg-surface shadow-surface transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="overflow-hidden">
        <WorkoutImage
          src={workout.imageUrl}
          alt={`${workout.title} workout`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-meta text-accent">{formatWorkoutLabel(workout.category)}</span>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-text-muted">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {workout.durationMinutes} min
          </span>
        </div>
        <h3 className="text-card-title mt-3">{workout.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">{workout.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-text-muted">
          <span>{formatWorkoutLabel(workout.difficulty)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Dumbbell aria-hidden="true" className="size-3.5" />
            {equipment}
          </span>
          <span aria-hidden="true">·</span>
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>
    </Link>
  )
}
