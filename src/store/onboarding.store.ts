import { create } from "zustand";
import {
  getStoredValue,
  removeStoredValue,
  setStoredValue,
} from "../lib/storage";
import type { FitnessGoal, WorkoutDuration, WorkoutPlan } from "../types";

type OnboardingStep = 1 | 2 | 3;

interface PersistedOnboardingState {
  selectedGoal: FitnessGoal | null;
  selectedDuration: WorkoutDuration | null;
  generatedPlan: WorkoutPlan | null;
  onboardingCompleted: boolean;
}

interface OnboardingState extends PersistedOnboardingState {
  currentStep: OnboardingStep;
  setGoal: (goal: FitnessGoal) => void;
  setDuration: (duration: WorkoutDuration) => void;
  setCurrentStep: (step: OnboardingStep) => void;
  activatePlan: (plan: WorkoutPlan) => void;
  beginAdjustment: () => void;
  resetOnboarding: () => void;
}

const STORAGE_KEY = "fitlife-onboarding";
const STORAGE_VERSION = 1;
interface StoredOnboardingEnvelope {
  version: typeof STORAGE_VERSION;
  state: unknown;
}
const fitnessGoals: FitnessGoal[] = [
  "lose-weight",
  "build-strength",
  "stay-active",
  "improve-mobility",
];
const workoutDurations: WorkoutDuration[] = [10, 20, 30];

function isWorkoutPlan(value: unknown): value is WorkoutPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Partial<WorkoutPlan>;
  return (
    typeof plan.id === "string" &&
    fitnessGoals.includes(plan.goal as FitnessGoal) &&
    workoutDurations.includes(plan.duration as WorkoutDuration) &&
    Array.isArray(plan.days) &&
    plan.days.length === 7 &&
    plan.days.every(
      (day) =>
        typeof day === "object" &&
        day !== null &&
        typeof day.day === "number" &&
        typeof day.isRestDay === "boolean" &&
        (day.workoutId === null || typeof day.workoutId === "string"),
    )
  );
}

function readPersistedState(): PersistedOnboardingState {
  const value = getStoredValue<unknown>(STORAGE_KEY);
  if (!value || typeof value !== "object")
    return {
      selectedGoal: null,
      selectedDuration: null,
      generatedPlan: null,
      onboardingCompleted: false,
    };
  const envelope = value as Partial<StoredOnboardingEnvelope>;
  const payload =
    envelope.version === STORAGE_VERSION &&
    envelope.state &&
    typeof envelope.state === "object"
      ? envelope.state
      : "version" in value
        ? null
        : value;
  if (!payload || typeof payload !== "object")
    return {
      selectedGoal: null,
      selectedDuration: null,
      generatedPlan: null,
      onboardingCompleted: false,
    };
  const stored = payload as Partial<PersistedOnboardingState>;
  const selectedGoal = fitnessGoals.includes(stored.selectedGoal as FitnessGoal)
    ? (stored.selectedGoal as FitnessGoal)
    : null;
  const selectedDuration = workoutDurations.includes(
    stored.selectedDuration as WorkoutDuration,
  )
    ? (stored.selectedDuration as WorkoutDuration)
    : null;
  const generatedPlan = isWorkoutPlan(stored.generatedPlan)
    ? stored.generatedPlan
    : null;
  return {
    selectedGoal,
    selectedDuration,
    generatedPlan,
    onboardingCompleted:
      stored.onboardingCompleted === true && generatedPlan !== null,
  };
}

const initialState = readPersistedState();

function persist(state: PersistedOnboardingState) {
  setStoredValue<StoredOnboardingEnvelope>(STORAGE_KEY, {
    version: STORAGE_VERSION,
    state,
  });
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  currentStep: 1,
  setGoal: (selectedGoal) =>
    set((state) => {
      const preferencesChanged = state.selectedGoal !== selectedGoal;
      persist({
        selectedGoal,
        selectedDuration: state.selectedDuration,
        generatedPlan: preferencesChanged ? null : state.generatedPlan,
        onboardingCompleted: preferencesChanged
          ? false
          : state.onboardingCompleted,
      });
      return {
        selectedGoal,
        ...(preferencesChanged
          ? { generatedPlan: null, onboardingCompleted: false }
          : {}),
      };
    }),
  setDuration: (selectedDuration) =>
    set((state) => {
      const preferencesChanged = state.selectedDuration !== selectedDuration;
      persist({
        selectedGoal: state.selectedGoal,
        selectedDuration,
        generatedPlan: preferencesChanged ? null : state.generatedPlan,
        onboardingCompleted: preferencesChanged
          ? false
          : state.onboardingCompleted,
      });
      return {
        selectedDuration,
        ...(preferencesChanged
          ? { generatedPlan: null, onboardingCompleted: false }
          : {}),
      };
    }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  activatePlan: (generatedPlan) =>
    set(() => {
      const nextState = {
        selectedGoal: generatedPlan.goal,
        selectedDuration: generatedPlan.duration,
        generatedPlan,
        onboardingCompleted: true,
      };
      persist(nextState);
      return nextState;
    }),
  beginAdjustment: () =>
    set((state) => {
      const nextState = {
        selectedGoal: state.selectedGoal,
        selectedDuration: state.selectedDuration,
        generatedPlan: null,
        onboardingCompleted: false,
      };
      persist({
        ...nextState,
      });
      return { ...nextState, currentStep: 1 as const };
    }),
  resetOnboarding: () => {
    removeStoredValue(STORAGE_KEY);
    set({
      currentStep: 1,
      selectedGoal: null,
      selectedDuration: null,
      generatedPlan: null,
      onboardingCompleted: false,
    });
  },
}));
