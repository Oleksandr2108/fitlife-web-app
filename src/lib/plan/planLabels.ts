import type { FitnessGoal, WorkoutDuration } from "../../types";

export const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const goalLabels: Record<FitnessGoal, string> = {
  "lose-weight": "Lose Weight",
  "build-strength": "Build Strength",
  "stay-active": "Stay Active",
  "improve-mobility": "Improve Mobility",
};

export function getDurationLabel(duration: WorkoutDuration) {
  return duration === 30 ? "30+ min" : `${duration} min`;
}
