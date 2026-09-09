import { describe, expect, it } from "vitest";
import type { Workout } from "../../types";
import {
  completeCurrentExercise,
  createWorkoutSession,
  pauseWorkoutSession,
  previousExercise,
  resumeWorkoutSession,
  skipCurrentExercise,
  skipRestPeriod,
  tickWorkoutSession,
} from "./sessionState";

const startedAt = "2026-09-09T10:00:00.000Z";
const startedAtMs = new Date(startedAt).getTime();

function workoutWithExercises(
  exercises: Workout["exercises"],
): Workout {
  return {
    id: "workout-test",
    slug: "workout-test",
    title: "Test Workout",
    description: "Session state test workout",
    difficulty: "beginner",
    durationMinutes: 10,
    category: "full-body",
    equipment: [],
    imageUrl: "https://example.com/workout.jpg",
    exercises,
  };
}

const mixedWorkout = workoutWithExercises([
  {
    id: "timed",
    name: "Timed",
    instructions: "Move",
    durationSeconds: 5,
    restDurationSeconds: 3,
  },
  {
    id: "repetitions",
    name: "Repetitions",
    instructions: "Move",
    repetitions: 10,
  },
]);

describe("workout session state", () => {
  it("initializes a timed exercise and advances using actual elapsed time", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    const progressed = tickWorkoutSession(initial, mixedWorkout, startedAtMs + 2_000);

    expect(initial).toMatchObject({
      status: "active",
      phase: "exercise",
      remainingSeconds: 5,
      elapsedSeconds: 0,
    });
    expect(progressed).toMatchObject({
      remainingSeconds: 3,
      elapsedSeconds: 2,
    });
  });

  it("catches up after a delayed callback across exercise and rest", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    const progressed = tickWorkoutSession(initial, mixedWorkout, startedAtMs + 8_000);

    expect(progressed).toMatchObject({
      status: "active",
      phase: "exercise",
      currentExerciseIndex: 1,
      remainingSeconds: 0,
      elapsedSeconds: 8,
    });
    expect(progressed.completedExerciseIds).toEqual(["timed"]);
  });

  it("pauses at the synchronized time and resumes from the same remainder", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    const paused = pauseWorkoutSession(
      initial,
      mixedWorkout,
      startedAtMs + 2_000,
    );
    const stillPaused = tickWorkoutSession(
      paused,
      mixedWorkout,
      startedAtMs + 20_000,
    );
    const resumed = resumeWorkoutSession(stillPaused, startedAtMs + 20_000);
    const progressed = tickWorkoutSession(
      resumed,
      mixedWorkout,
      startedAtMs + 21_000,
    );

    expect(paused).toMatchObject({
      status: "paused",
      remainingSeconds: 3,
      elapsedSeconds: 2,
      lastTickAt: null,
    });
    expect(stillPaused).toBe(paused);
    expect(progressed).toMatchObject({
      status: "active",
      remainingSeconds: 2,
      elapsedSeconds: 3,
    });
  });

  it("moves from a timed exercise into rest and can skip rest", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    const resting = tickWorkoutSession(initial, mixedWorkout, startedAtMs + 5_000);
    const nextExercise = skipRestPeriod(resting, mixedWorkout);

    expect(resting).toMatchObject({
      phase: "rest",
      currentExerciseIndex: 0,
      remainingSeconds: 3,
    });
    expect(nextExercise).toMatchObject({
      phase: "exercise",
      currentExerciseIndex: 1,
    });
  });

  it("completes repetition exercises and prevents duplicate completion", () => {
    const repetitionsOnly = workoutWithExercises([
      {
        id: "repetitions",
        name: "Repetitions",
        instructions: "Move",
        repetitions: 10,
      },
    ]);
    const initial = createWorkoutSession(
      repetitionsOnly,
      undefined,
      startedAt,
    );
    const completed = completeCurrentExercise(
      initial,
      repetitionsOnly,
      "2026-09-09T10:00:05.000Z",
    );

    expect(completed).toMatchObject({ status: "completed" });
    expect(completed.completedExerciseIds).toEqual(["repetitions"]);
    expect(completeCurrentExercise(completed, repetitionsOnly)).toBe(completed);
  });

  it("skips an exercise without marking it completed", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    const resting = skipCurrentExercise(initial, mixedWorkout);

    expect(resting.phase).toBe("rest");
    expect(resting.completedExerciseIds).toEqual([]);
  });

  it("respects the previous-exercise boundary", () => {
    const initial = createWorkoutSession(mixedWorkout, undefined, startedAt);
    expect(previousExercise(initial, mixedWorkout)).toBe(initial);

    const resting = tickWorkoutSession(initial, mixedWorkout, startedAtMs + 5_000);
    expect(previousExercise(resting, mixedWorkout)).toMatchObject({
      phase: "exercise",
      currentExerciseIndex: 0,
      remainingSeconds: 5,
      completedExerciseIds: [],
    });
  });

  it("finishes after the final timed exercise", () => {
    const timedOnly = workoutWithExercises([
      {
        id: "timed",
        name: "Timed",
        instructions: "Move",
        durationSeconds: 3,
      },
    ]);
    const completed = tickWorkoutSession(
      createWorkoutSession(timedOnly, undefined, startedAt),
      timedOnly,
      startedAtMs + 3_000,
    );

    expect(completed).toMatchObject({
      status: "completed",
      remainingSeconds: 0,
      elapsedSeconds: 3,
    });
  });

  it("resolves zero-duration timed exercises once without becoming stuck", () => {
    const zeroDuration = workoutWithExercises([
      {
        id: "zero",
        name: "Zero",
        instructions: "Move",
        durationSeconds: 0,
      },
    ]);
    const completed = createWorkoutSession(
      zeroDuration,
      undefined,
      startedAt,
    );

    expect(completed).toMatchObject({
      status: "completed",
      remainingSeconds: 0,
      elapsedSeconds: 0,
    });
    expect(tickWorkoutSession(completed, zeroDuration, startedAtMs + 5_000)).toBe(
      completed,
    );
  });
});
