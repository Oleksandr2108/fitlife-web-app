import { Clock3, Repeat2 } from "lucide-react";
import type { Exercise } from "../../../types";

interface ExerciseListProps {
  exercises: Exercise[];
}

function getExerciseTarget(exercise: Exercise): string | null {
  if (exercise.durationSeconds !== undefined)
    return `${exercise.durationSeconds} sec`;
  if (exercise.repetitions !== undefined) return `${exercise.repetitions} reps`;
  return null;
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <section aria-labelledby="exercise-list-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-meta text-accent">Session outline</p>
          <h2
            id="exercise-list-heading"
            className="text-section-title mt-2"
          >
            Exercises
          </h2>
        </div>
        <span className="text-sm text-text-muted">
          {exercises.length} total
        </span>
      </div>
      <ol className="mt-6 space-y-3">
        {exercises.map((exercise, index) => {
          const target = getExerciseTarget(exercise);
          return (
            <li
              key={exercise.id}
              className="rounded-surface border border-border bg-surface p-4 shadow-surface sm:p-5"
            >
              <div className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-semibold text-text-primary">
                      {exercise.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                      {target ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1">
                          <Repeat2
                            aria-hidden="true"
                            className="size-3.5"
                          />
                          {target}
                        </span>
                      ) : null}
                      {exercise.restDurationSeconds !== undefined ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1">
                          <Clock3
                            aria-hidden="true"
                            className="size-3.5"
                          />
                          {exercise.restDurationSeconds} sec rest
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {exercise.instructions}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
