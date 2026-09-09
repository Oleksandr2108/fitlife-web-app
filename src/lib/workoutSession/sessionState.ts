import type { Workout } from "../../types";
import type {
  WorkoutSessionData,
  WorkoutSessionPlanContext,
} from "./workoutSession.types";

const sessionStatuses = ["idle", "active", "paused", "completed"] as const;
const sessionPhases = ["exercise", "rest"] as const;

export const idleWorkoutSession: WorkoutSessionData = {
  workoutId: null,
  status: "idle",
  currentExerciseIndex: 0,
  phase: "exercise",
  remainingSeconds: 0,
  completedExerciseIds: [],
  startedAt: null,
  completedAt: null,
  elapsedSeconds: 0,
  lastTickAt: null,
  planId: null,
  planDay: null,
};

function getExerciseSeconds(workout: Workout, index: number): number {
  return workout.exercises[index]?.durationSeconds ?? 0;
}

function finishSession(
  state: WorkoutSessionData,
  completedAt: string,
): WorkoutSessionData {
  return {
    ...state,
    status: "completed",
    phase: "exercise",
    remainingSeconds: 0,
    completedAt,
    lastTickAt: null,
  };
}

function enterExercise(
  state: WorkoutSessionData,
  workout: Workout,
  index: number,
): WorkoutSessionData {
  return {
    ...state,
    currentExerciseIndex: index,
    phase: "exercise",
    remainingSeconds: getExerciseSeconds(workout, index),
  };
}

function advanceFromExercise(
  state: WorkoutSessionData,
  workout: Workout,
  markCompleted: boolean,
  completedAt: string,
): WorkoutSessionData {
  const exercise = workout.exercises[state.currentExerciseIndex];
  if (!exercise) return idleWorkoutSession;

  const completedExerciseIds =
    markCompleted && !state.completedExerciseIds.includes(exercise.id)
      ? [...state.completedExerciseIds, exercise.id]
      : state.completedExerciseIds;
  const nextState = { ...state, completedExerciseIds };
  const isFinalExercise =
    state.currentExerciseIndex >= workout.exercises.length - 1;

  if (isFinalExercise) return finishSession(nextState, completedAt);
  if ((exercise.restDurationSeconds ?? 0) > 0) {
    return {
      ...nextState,
      phase: "rest",
      remainingSeconds: exercise.restDurationSeconds ?? 0,
    };
  }

  return enterExercise(nextState, workout, state.currentExerciseIndex + 1);
}

function hasCountdown(state: WorkoutSessionData, workout: Workout): boolean {
  return (
    state.phase === "rest" ||
    workout.exercises[state.currentExerciseIndex]?.durationSeconds !== undefined
  );
}

function resolveExpiredCountdowns(
  state: WorkoutSessionData,
  workout: Workout,
  completedAt: string,
): WorkoutSessionData {
  let nextState = state;
  const maximumTransitions = workout.exercises.length * 2 + 1;

  for (let transition = 0; transition < maximumTransitions; transition += 1) {
    if (
      nextState.status !== "active" ||
      !hasCountdown(nextState, workout) ||
      nextState.remainingSeconds > 0
    )
      return nextState;
    nextState =
      nextState.phase === "rest"
        ? skipRestPeriod(nextState, workout)
        : advanceFromExercise(nextState, workout, true, completedAt);
  }

  return nextState;
}

export function createWorkoutSession(
  workout: Workout,
  context?: Partial<WorkoutSessionPlanContext>,
  startedAt = new Date().toISOString(),
): WorkoutSessionData {
  const session: WorkoutSessionData = {
    ...idleWorkoutSession,
    workoutId: workout.id,
    status: "active",
    remainingSeconds: getExerciseSeconds(workout, 0),
    startedAt,
    lastTickAt: startedAt,
    planId: context?.planId ?? null,
    planDay: context?.planDay ?? null,
  };
  return resolveExpiredCountdowns(session, workout, startedAt);
}

export function pauseWorkoutSession(
  state: WorkoutSessionData,
  workout?: Workout,
  now = Date.now(),
): WorkoutSessionData {
  if (state.status !== "active") return state;
  const synchronized = workout
    ? tickWorkoutSession(state, workout, now)
    : state;
  return synchronized.status === "active"
    ? { ...synchronized, status: "paused", lastTickAt: null }
    : synchronized;
}

export function resumeWorkoutSession(
  state: WorkoutSessionData,
  now = Date.now(),
): WorkoutSessionData {
  return state.status === "paused"
    ? { ...state, status: "active", lastTickAt: new Date(now).toISOString() }
    : state;
}

export function completeCurrentExercise(
  state: WorkoutSessionData,
  workout: Workout,
  completedAt = new Date().toISOString(),
): WorkoutSessionData {
  if (state.status !== "active" || state.phase !== "exercise") return state;
  return resolveExpiredCountdowns(
    advanceFromExercise(state, workout, true, completedAt),
    workout,
    completedAt,
  );
}

export function skipCurrentExercise(
  state: WorkoutSessionData,
  workout: Workout,
  completedAt = new Date().toISOString(),
): WorkoutSessionData {
  if (state.status !== "active" || state.phase !== "exercise") return state;
  return resolveExpiredCountdowns(
    advanceFromExercise(state, workout, false, completedAt),
    workout,
    completedAt,
  );
}

export function skipRestPeriod(
  state: WorkoutSessionData,
  workout: Workout,
): WorkoutSessionData {
  if (state.status !== "active" || state.phase !== "rest") return state;
  return enterExercise(state, workout, state.currentExerciseIndex + 1);
}

export function previousExercise(
  state: WorkoutSessionData,
  workout: Workout,
): WorkoutSessionData {
  if (state.status !== "active" && state.status !== "paused") return state;
  const targetIndex =
    state.phase === "rest"
      ? state.currentExerciseIndex
      : state.currentExerciseIndex - 1;
  if (targetIndex < 0) return state;

  const retainedIds = new Set(
    workout.exercises.slice(0, targetIndex).map((exercise) => exercise.id),
  );
  return enterExercise(
    {
      ...state,
      completedExerciseIds: state.completedExerciseIds.filter((id) =>
        retainedIds.has(id),
      ),
    },
    workout,
    targetIndex,
  );
}

export function tickWorkoutSession(
  state: WorkoutSessionData,
  workout: Workout,
  now = Date.now(),
): WorkoutSessionData {
  if (state.status !== "active") return state;
  const lastTickTime = state.lastTickAt
    ? new Date(state.lastTickAt).getTime()
    : now;
  if (!Number.isFinite(lastTickTime) || now <= lastTickTime) return state;
  let secondsToConsume = Math.floor((now - lastTickTime) / 1000);
  if (secondsToConsume <= 0) return state;

  const completedAt = new Date(now).toISOString();
  let nextState = resolveExpiredCountdowns(state, workout, completedAt);
  const consumedTotal = secondsToConsume;

  while (secondsToConsume > 0 && nextState.status === "active") {
    if (!hasCountdown(nextState, workout)) {
      nextState = {
        ...nextState,
        elapsedSeconds: nextState.elapsedSeconds + secondsToConsume,
      };
      break;
    }

    const consumed = Math.min(
      secondsToConsume,
      Math.max(0, nextState.remainingSeconds),
    );
    nextState = {
      ...nextState,
      remainingSeconds: Math.max(0, nextState.remainingSeconds - consumed),
      elapsedSeconds: nextState.elapsedSeconds + consumed,
    };
    secondsToConsume -= consumed;
    nextState = resolveExpiredCountdowns(nextState, workout, completedAt);
  }

  if (nextState.status !== "active") return nextState;
  return {
    ...nextState,
    lastTickAt: new Date(lastTickTime + consumedTotal * 1000).toISOString(),
  };
}

export function isStoredWorkoutSession(
  value: unknown,
): value is WorkoutSessionData {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<WorkoutSessionData>;
  return (
    (session.workoutId === null || typeof session.workoutId === "string") &&
    sessionStatuses.some((status) => status === session.status) &&
    sessionPhases.some((phase) => phase === session.phase) &&
    Number.isInteger(session.currentExerciseIndex) &&
    (session.currentExerciseIndex ?? -1) >= 0 &&
    Number.isInteger(session.remainingSeconds) &&
    (session.remainingSeconds ?? -1) >= 0 &&
    Number.isInteger(session.elapsedSeconds) &&
    (session.elapsedSeconds ?? -1) >= 0 &&
    (session.lastTickAt === null ||
      (typeof session.lastTickAt === "string" &&
        Number.isFinite(new Date(session.lastTickAt).getTime()))) &&
    Array.isArray(session.completedExerciseIds) &&
    session.completedExerciseIds.every((id) => typeof id === "string") &&
    (session.startedAt === null || typeof session.startedAt === "string") &&
    (session.completedAt === null || typeof session.completedAt === "string") &&
    (session.planId === null || typeof session.planId === "string") &&
    (session.planDay === null ||
      (Number.isInteger(session.planDay) &&
        (session.planDay ?? 0) >= 1 &&
        (session.planDay ?? 8) <= 7))
  );
}

export function isSessionCompatible(
  state: WorkoutSessionData,
  workout: Workout,
): boolean {
  if (state.workoutId !== workout.id || workout.exercises.length === 0)
    return false;
  if (
    state.currentExerciseIndex < 0 ||
    state.currentExerciseIndex >= workout.exercises.length
  )
    return false;
  return state.completedExerciseIds.every((id) =>
    workout.exercises.some((exercise) => exercise.id === id),
  );
}
