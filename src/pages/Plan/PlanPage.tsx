import { RotateCcw } from "lucide-react";
import { AppContainer } from "../../components/layout/AppContainer";
import { ButtonLink } from "../../components/ui/Button";
import { useWorkouts } from "../../hooks/queries/useWorkouts";
import {
  dayNames,
  getDurationLabel,
  goalLabels,
} from "../../lib/plan/planLabels";
import { useOnboardingStore } from "../../store/onboarding.store";
import { useProgressStore } from "../../store/progress.store";
import { PlanDayCard } from "./components/PlanDayCard";

export function PlanPage() {
  const plan = useOnboardingStore((state) => state.generatedPlan);
  const beginAdjustment = useOnboardingStore(
    (state) => state.beginAdjustment,
  );
  const completedWorkouts = useProgressStore(
    (state) => state.completedWorkouts,
  );
  const { data: workouts, isPending, isError, refetch } = useWorkouts();

  if (!plan)
    return (
      <AppContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-surface border border-border bg-surface p-6 text-center shadow-surface sm:p-8">
          <h1 className="text-section-title">Your plan isn’t ready yet.</h1>
          <p className="text-body mt-3 text-text-secondary">
            Tell us your goal and schedule to create your 7-day routine.
          </p>
          <ButtonLink
            to="/onboarding"
            size="large"
            className="mt-6 w-full min-[430px]:w-auto"
          >
            Create My Plan
          </ButtonLink>
        </div>
      </AppContainer>
    );
  if (isPending)
    return (
      <AppContainer className="py-12">
        <div
          className="mx-auto h-80 max-w-2xl animate-pulse rounded-surface bg-surface-muted motion-reduce:animate-none"
          aria-label="Loading your plan"
        />
      </AppContainer>
    );
  if (isError || !workouts)
    return (
      <AppContainer className="py-12">
        <div className="mx-auto max-w-xl rounded-surface border border-border bg-surface p-6 text-center">
          <h1 className="text-section-title">
            We couldn’t load your workouts.
          </h1>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-5 min-h-11 font-semibold text-accent"
          >
            Try again
          </button>
        </div>
      </AppContainer>
    );

  const workoutMap = new Map(workouts.map((workout) => [workout.id, workout]));
  const hasInvalidReference = plan.days.some(
    (day) =>
      !day.isRestDay && (!day.workoutId || !workoutMap.has(day.workoutId)),
  );
  if (hasInvalidReference)
    return (
      <AppContainer className="py-12">
        <div className="mx-auto max-w-xl rounded-surface border border-border bg-surface p-6 text-center">
          <h1 className="text-section-title">
            Your plan needs a quick refresh.
          </h1>
          <p className="mt-3 text-text-secondary">
            Some workouts have changed. Regenerate your plan to continue.
          </p>
          <ButtonLink
            to="/onboarding"
            size="large"
            icon={RotateCcw}
            className="mt-6 w-full min-[430px]:w-auto"
          >
            Regenerate Plan
          </ButtonLink>
        </div>
      </AppContainer>
    );

  const isDayCompleted = (day: number) =>
    completedWorkouts.some(
      (record) => record.planId === plan.id && record.planDay === day,
    );
  const upNextDay = plan.days.find(
    (day) => !day.isRestDay && !isDayCompleted(day.day),
  );
  return (
    <AppContainer className="py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-meta uppercase text-accent">
          {goalLabels[plan.goal]} · {getDurationLabel(plan.duration)}
        </p>
        <h1 className="text-page-title mt-3">Your 7-Day Plan</h1>
        <p className="text-body mt-3 text-text-secondary">
          A simple routine built around your goal and schedule.
        </p>
        <ol className="mt-8 grid gap-3">
          {plan.days.map((day) => (
            <PlanDayCard
              key={day.day}
              dayName={dayNames[day.day - 1]}
              planDay={day}
              workout={
                day.workoutId ? (workoutMap.get(day.workoutId) ?? null) : null
              }
              isUpNext={day.day === upNextDay?.day}
              isCompleted={isDayCompleted(day.day)}
            />
          ))}
        </ol>
        <ButtonLink
          to="/onboarding"
          variant="ghost"
          icon={RotateCcw}
          onClick={beginAdjustment}
          className="mt-6 w-full"
        >
          Adjust Preferences
        </ButtonLink>
      </div>
    </AppContainer>
  );
}
