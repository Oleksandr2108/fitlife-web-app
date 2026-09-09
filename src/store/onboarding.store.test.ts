import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WorkoutPlan } from "../types";

const plan: WorkoutPlan = {
  id: "plan-instance-1",
  goal: "stay-active",
  duration: 20,
  days: Array.from({ length: 7 }, (_, index) => ({
    day: index + 1,
    workoutId: index === 2 || index === 6 ? null : "workout-001",
    isRestDay: index === 2 || index === 6,
  })),
};

function createLocalStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key) {
      return values.get(key) ?? null;
    },
    key(index) {
      return [...values.keys()][index] ?? null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

describe("onboarding store", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("window", { localStorage: createLocalStorage() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("activates a generated plan and matching preferences atomically", async () => {
    const { useOnboardingStore } = await import("./onboarding.store");

    useOnboardingStore.getState().activatePlan(plan);

    expect(useOnboardingStore.getState()).toMatchObject({
      selectedGoal: plan.goal,
      selectedDuration: plan.duration,
      generatedPlan: plan,
      onboardingCompleted: true,
    });
    expect(
      JSON.parse(window.localStorage.getItem("fitlife-onboarding") ?? "null"),
    ).toMatchObject({ version: 1, state: { generatedPlan: plan } });
  });

  it("invalidates the active plan before preferences can diverge", async () => {
    const { useOnboardingStore } = await import("./onboarding.store");
    useOnboardingStore.getState().activatePlan(plan);

    useOnboardingStore.getState().beginAdjustment();

    expect(useOnboardingStore.getState()).toMatchObject({
      currentStep: 1,
      selectedGoal: plan.goal,
      selectedDuration: plan.duration,
      generatedPlan: null,
      onboardingCompleted: false,
    });
  });
});
