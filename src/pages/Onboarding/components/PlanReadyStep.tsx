import { ArrowRight, RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "../../../components/ui/Button";
import {
  dayNames,
  getDurationLabel,
  goalLabels,
} from "../../../lib/plan/planLabels";
import type { Workout, WorkoutPlan } from "../../../types";

interface PlanReadyStepProps {
  plan: WorkoutPlan;
  workouts: Workout[];
  onAdjust: () => void;
}

export function PlanReadyStep({
  plan,
  workouts,
  onAdjust,
}: PlanReadyStepProps) {
  const workoutMap = new Map(workouts.map((workout) => [workout.id, workout]));
  return (
    <div>
      <p className="text-meta uppercase text-accent">Your plan is ready</p>
      <h1 className="text-page-title mt-3">A week built around you.</h1>
      <p className="text-body mt-3 text-text-secondary">
        {goalLabels[plan.goal]} · {getDurationLabel(plan.duration)}
      </p>
      <ol className="mt-7 divide-y divide-border overflow-hidden rounded-surface border border-border bg-surface">
        {plan.days.map((day) => {
          const workout = day.workoutId ? workoutMap.get(day.workoutId) : null;
          return (
            <li
              key={day.day}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="text-xs font-semibold text-text-muted">
                  {dayNames[day.day - 1]}
                </p>
                <p className="mt-1 font-semibold">
                  {day.isRestDay
                    ? "Rest & Recovery"
                    : (workout?.title ?? "Workout")}
                </p>
              </div>
              <span className="text-sm text-text-secondary">
                {workout ? `${workout.durationMinutes} min` : "Reset"}
              </span>
            </li>
          );
        })}
      </ol>
      <ButtonLink
        to="/plan"
        size="large"
        icon={ArrowRight}
        className="mt-7 w-full"
      >
        View My Plan
      </ButtonLink>
      <Button
        variant="ghost"
        size="large"
        icon={RotateCcw}
        onClick={onAdjust}
        className="mt-2 w-full"
      >
        Adjust Preferences
      </Button>
    </div>
  );
}
