import { Clock3, Dumbbell, Layers3, ListChecks } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";
import { WorkoutImage } from "../../../components/workouts/WorkoutImage";
import { formatWorkoutLabel } from "../../../lib/workouts/filterWorkouts";
import type { Workout } from "../../../types";

export function WorkoutHero({ workout }: { workout: Workout }) {
  const equipment =
    workout.equipment.length > 0
      ? workout.equipment.join(", ")
      : "No equipment";
  return (
    <section className="overflow-hidden rounded-surface border border-border bg-surface shadow-surface lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <WorkoutImage
        src={workout.imageUrl}
        alt={`${workout.title} workout`}
        eager
        className="aspect-[16/10] h-full min-h-64 w-full object-cover lg:aspect-auto"
      />
      <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
        <p className="text-meta text-accent">
          {formatWorkoutLabel(workout.category)}
        </p>
        <h1 className="text-page-title mt-3">{workout.title}</h1>
        <p className="mt-4 leading-7 text-text-secondary">
          {workout.description}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-control bg-surface-muted p-3">
            <dt className="flex items-center gap-2 text-text-muted">
              <Clock3
                aria-hidden="true"
                className="size-4"
              />
              Duration
            </dt>
            <dd className="mt-1 font-semibold text-text-primary">
              {workout.durationMinutes} min
            </dd>
          </div>
          <div className="rounded-control bg-surface-muted p-3">
            <dt className="flex items-center gap-2 text-text-muted">
              <Layers3
                aria-hidden="true"
                className="size-4"
              />
              Difficulty
            </dt>
            <dd className="mt-1 font-semibold text-text-primary">
              {formatWorkoutLabel(workout.difficulty)}
            </dd>
          </div>
          <div className="rounded-control bg-surface-muted p-3">
            <dt className="flex items-center gap-2 text-text-muted">
              <Dumbbell
                aria-hidden="true"
                className="size-4"
              />
              Equipment
            </dt>
            <dd className="mt-1 font-semibold text-text-primary">
              {equipment}
            </dd>
          </div>
          <div className="rounded-control bg-surface-muted p-3">
            <dt className="flex items-center gap-2 text-text-muted">
              <ListChecks
                aria-hidden="true"
                className="size-4"
              />
              Exercises
            </dt>
            <dd className="mt-1 font-semibold text-text-primary">
              {workout.exercises.length}
            </dd>
          </div>
        </dl>
        <ButtonLink
          to={`/workout/${workout.id}/session`}
          size="large"
          className="mt-7 w-full sm:w-auto sm:self-start"
        >
          Start Workout
        </ButtonLink>
      </div>
    </section>
  );
}
