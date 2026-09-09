import { CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRecentActivityDate } from "../../../lib/progress/dateUtils";
import type { CompletedWorkout, Workout } from "../../../types";

interface RecentActivityProps {
  records: CompletedWorkout[];
  workouts: Workout[];
  now?: Date;
}

function ActivityContent({
  record,
  workout,
  now,
}: {
  record: CompletedWorkout;
  workout?: Workout;
  now: Date;
}) {
  return (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-control bg-accent-soft text-accent">
        <CheckCircle2
          aria-hidden="true"
          className="size-5"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">
          {workout?.title ?? "Completed workout"}
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          {formatRecentActivityDate(record.completedAt, now)} ·{" "}
          {record.durationMinutes} min
          {workout ? ` · ${workout.category.replace("-", " ")}` : ""}
        </p>
      </div>
      {workout ? (
        <ChevronRight
          aria-hidden="true"
          className="size-5 shrink-0 text-text-muted"
        />
      ) : null}
    </>
  );
}

export function RecentActivity({
  records,
  workouts,
  now = new Date(),
}: RecentActivityProps) {
  const workoutMap = new Map(workouts.map((workout) => [workout.id, workout]));
  return (
    <section aria-labelledby="recent-activity-heading">
      <h2
        id="recent-activity-heading"
        className="text-section-title"
      >
        Recent Activity
      </h2>
      <ul className="mt-4 grid gap-3">
        {records.map((record) => {
          const workout = workoutMap.get(record.workoutId);
          const classes =
            "flex min-w-0 items-center gap-3 rounded-surface border border-border bg-surface p-4 shadow-surface transition-colors sm:p-5";
          return (
            <li key={record.id}>
              {workout ? (
                <Link
                  to={`/workout/${workout.id}`}
                  className={`${classes} hover:bg-surface-hover`}
                >
                  <ActivityContent
                    record={record}
                    workout={workout}
                    now={now}
                  />
                </Link>
              ) : (
                <div className={classes}>
                  <ActivityContent
                    record={record}
                    now={now}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
