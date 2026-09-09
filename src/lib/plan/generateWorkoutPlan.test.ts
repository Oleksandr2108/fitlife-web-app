import { describe, expect, it } from "vitest";
import { workoutsMock } from "../../mocks/workouts.mock";
import { calculatePlanCompletion } from "../progress/calculateProgress";
import { generateWorkoutPlan } from "./generateWorkoutPlan";

describe("generateWorkoutPlan", () => {
  it("creates a unique identity for each plan instance", () => {
    const input = {
      goal: "stay-active" as const,
      duration: 20 as const,
      workouts: workoutsMock,
    };

    expect(generateWorkoutPlan(input).id).not.toBe(generateWorkoutPlan(input).id);
  });

  it("supports a controlled instance id without changing plan contents", () => {
    const plan = generateWorkoutPlan({
      goal: "build-strength",
      duration: 30,
      workouts: workoutsMock,
      instanceId: "plan-controlled",
    });

    expect(plan.id).toBe("plan-controlled");
    expect(plan.days).toHaveLength(7);
  });

  it("does not carry completion into a newly generated plan instance", () => {
    const input = {
      goal: "stay-active" as const,
      duration: 20 as const,
      workouts: workoutsMock,
    };
    const previousPlan = generateWorkoutPlan(input);
    const nextPlan = generateWorkoutPlan(input);
    const completedDay = previousPlan.days.find((day) => !day.isRestDay);
    if (!completedDay?.workoutId) throw new Error("Expected an active plan day");

    expect(
      calculatePlanCompletion(nextPlan, [
        {
          id: "completed-old-plan",
          workoutId: completedDay.workoutId,
          completedAt: new Date(2026, 8, 9).toISOString(),
          durationMinutes: 20,
          exerciseCount: 3,
          planId: previousPlan.id,
          planDay: completedDay.day,
        },
      ]).completed,
    ).toBe(0);
  });
});
