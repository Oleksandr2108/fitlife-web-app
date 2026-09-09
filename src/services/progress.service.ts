import { getStoredValue, setStoredValue } from "../lib/storage";
import { createMockCompletedWorkouts } from "../mocks/completedWorkouts.mock";
import type { CompletedWorkout } from "../types";

const COMPLETED_WORKOUTS_STORAGE_KEY = "fitlife-completed-workouts";
const COMPLETED_WORKOUTS_STORAGE_VERSION = 1;

interface StoredCompletedWorkouts {
  version: typeof COMPLETED_WORKOUTS_STORAGE_VERSION;
  records: unknown;
}

export function isCompletedWorkout(value: unknown): value is CompletedWorkout {
  if (!value || typeof value !== "object") return false;
  const workout = value as Partial<CompletedWorkout>;
  return (
    typeof workout.id === "string" &&
    workout.id.length > 0 &&
    typeof workout.workoutId === "string" &&
    workout.workoutId.length > 0 &&
    typeof workout.completedAt === "string" &&
    Number.isFinite(new Date(workout.completedAt).getTime()) &&
    typeof workout.durationMinutes === "number" &&
    Number.isFinite(workout.durationMinutes) &&
    workout.durationMinutes >= 0 &&
    Number.isInteger(workout.exerciseCount) &&
    (workout.exerciseCount ?? -1) >= 0 &&
    (workout.planId === undefined || typeof workout.planId === "string") &&
    (workout.planDay === undefined ||
      (Number.isInteger(workout.planDay) &&
        workout.planDay >= 1 &&
        workout.planDay <= 7))
  );
}

function getStoredRecords(value: unknown): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return null;
  const stored = value as Partial<StoredCompletedWorkouts>;
  return stored.version === COMPLETED_WORKOUTS_STORAGE_VERSION &&
    Array.isArray(stored.records)
    ? stored.records
    : null;
}

function persistCompletedWorkouts(records: CompletedWorkout[]) {
  setStoredValue<StoredCompletedWorkouts>(COMPLETED_WORKOUTS_STORAGE_KEY, {
    version: COMPLETED_WORKOUTS_STORAGE_VERSION,
    records,
  });
}

export function getLocalCompletedWorkouts(): CompletedWorkout[] {
  const value = getStoredValue<unknown>(COMPLETED_WORKOUTS_STORAGE_KEY);
  return getStoredRecords(value)?.filter(isCompletedWorkout) ?? [];
}

export function getInitialCompletedWorkouts(): CompletedWorkout[] {
  const storedValue = getStoredValue<unknown>(COMPLETED_WORKOUTS_STORAGE_KEY);
  const storedRecords = getStoredRecords(storedValue);
  if (storedRecords && storedRecords.length > 0) {
    const validRecords = storedRecords.filter(isCompletedWorkout);
    persistCompletedWorkouts(validRecords);
    return validRecords;
  }
  if (storedValue !== null && storedRecords === null) return [];

  const mockCompletedWorkouts = createMockCompletedWorkouts();
  persistCompletedWorkouts(mockCompletedWorkouts);
  return mockCompletedWorkouts;
}

export function recordCompletedWorkout(
  record: CompletedWorkout,
): CompletedWorkout[] {
  const existingRecords = getLocalCompletedWorkouts();
  if (!isCompletedWorkout(record)) return existingRecords;
  if (existingRecords.some((item) => item.id === record.id))
    return existingRecords;
  const nextRecords = [record, ...existingRecords];
  persistCompletedWorkouts(nextRecords);
  return nextRecords;
}
