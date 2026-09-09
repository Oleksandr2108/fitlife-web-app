import { describe, expect, it } from "vitest";
import type { CompletedWorkout, WorkoutPlan } from "../../types";
import { getNextPlanWorkoutDay } from "./getNextPlanWorkoutDay";

const plan: WorkoutPlan = {
  id: "plan-test",
  goal: "stay-active",
  duration: 20,
  days: [
    { day: 1, workoutId: "workout-1", isRestDay: false },
    { day: 2, workoutId: null, isRestDay: true },
    { day: 3, workoutId: "workout-3", isRestDay: false },
  ],
};

const completedDayOne: CompletedWorkout = {
  id: "completed-1",
  workoutId: "workout-1",
  completedAt: "2026-09-09T08:00:00.000Z",
  durationMinutes: 20,
  exerciseCount: 5,
  planId: plan.id,
  planDay: 1,
};

describe("next plan workout day", () => {
  it("returns the first incomplete workout day and skips rest days", () => {
    expect(getNextPlanWorkoutDay(plan, [completedDayOne])).toEqual(
      plan.days[2],
    );
  });

  it("returns the first workout day when the plan is complete", () => {
    const completedDayThree = {
      ...completedDayOne,
      id: "completed-3",
      workoutId: "workout-3",
      planDay: 3,
    };

    expect(
      getNextPlanWorkoutDay(plan, [completedDayOne, completedDayThree]),
    ).toEqual(plan.days[0]);
  });
});
