import { delay } from "../lib/delay";
import { workoutsMock } from "../mocks/workouts.mock";
import type { Workout } from "../types";

const MOCK_DELAY_MS = 150;
export async function getWorkouts(): Promise<Workout[]> {
  await delay(MOCK_DELAY_MS);
  return workoutsMock;
}
export async function getWorkoutById(id: string): Promise<Workout | null> {
  await delay(MOCK_DELAY_MS);
  return workoutsMock.find((workout) => workout.id === id) ?? null;
}
