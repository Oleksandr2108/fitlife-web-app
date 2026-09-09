import type {
  CompletedWorkout,
  WorkoutPlan,
  WorkoutPlanDay,
} from "../../types";

export function getNextPlanWorkoutDay(
  plan: WorkoutPlan | null,
  completedWorkouts: CompletedWorkout[],
): WorkoutPlanDay | null {
  if (!plan) return null;

  const isCompleted = (day: WorkoutPlanDay) =>
    completedWorkouts.some(
      (record) => record.planId === plan.id && record.planDay === day.day,
    );
  const workoutDays = plan.days.filter(
    (day) => !day.isRestDay && day.workoutId !== null,
  );

  return workoutDays.find((day) => !isCompleted(day)) ?? workoutDays[0] ?? null;
}
