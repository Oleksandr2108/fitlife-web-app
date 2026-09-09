import { create } from "zustand";
import {
  playPhaseCompleteSound,
  playTickSound,
  playWorkoutCompleteSound,
  playWorkoutStartSound,
  stopWorkoutAudio,
} from "../lib/audio/workoutAudio";
import {
  getStoredValue,
  removeStoredValue,
  setStoredValue,
} from "../lib/storage";
import {
  completeCurrentExercise,
  createWorkoutSession,
  idleWorkoutSession,
  isStoredWorkoutSession,
  pauseWorkoutSession,
  previousExercise,
  resumeWorkoutSession,
  skipCurrentExercise,
  skipRestPeriod,
  tickWorkoutSession,
} from "../lib/workoutSession/sessionState";
import type {
  WorkoutSessionData,
  WorkoutSessionPlanContext,
} from "../lib/workoutSession/workoutSession.types";
import type { Workout } from "../types";
import { useWorkoutPreferencesStore } from "./workoutPreferences.store";

interface WorkoutSessionState extends WorkoutSessionData {
  startSession: (
    workout: Workout,
    context?: Partial<WorkoutSessionPlanContext>,
  ) => void;
  pauseSession: (workout?: Workout) => void;
  resumeSession: () => void;
  tick: (workout: Workout) => void;
  completeExercise: (workout: Workout) => void;
  skipExercise: (workout: Workout) => void;
  skipRest: (workout: Workout) => void;
  goToPreviousExercise: (workout: Workout) => void;
  resetSession: () => void;
}

const SESSION_STORAGE_KEY = "fitlife-workout-session";
const SESSION_STORAGE_VERSION = 1;
const TIMER_PERSIST_INTERVAL_MS = 5_000;
let lastTimerPersistAt = 0;

interface StoredSessionEnvelope {
  version: typeof SESSION_STORAGE_VERSION;
  session: unknown;
}

function getStoredSessionPayload(value: unknown): unknown {
  if (!value || typeof value !== "object") return null;
  const envelope = value as Partial<StoredSessionEnvelope>;
  if (envelope.version === SESSION_STORAGE_VERSION) return envelope.session;
  if ("version" in value) return null;
  const legacy = value as Record<string, unknown>;
  return { ...legacy, lastTickAt: null };
}

function readPersistedSession(): WorkoutSessionData {
  const storedSession = getStoredSessionPayload(
    getStoredValue<unknown>(SESSION_STORAGE_KEY),
  );
  if (!isStoredWorkoutSession(storedSession)) {
    removeStoredValue(SESSION_STORAGE_KEY);
    return idleWorkoutSession;
  }

  return storedSession.status === "active"
    ? { ...storedSession, status: "paused", lastTickAt: null }
    : storedSession;
}

function persistSession(session: WorkoutSessionData) {
  setStoredValue<StoredSessionEnvelope>(SESSION_STORAGE_KEY, {
    version: SESSION_STORAGE_VERSION,
    session,
  });
}

function canPlayWorkoutSounds(): boolean {
  return useWorkoutPreferencesStore.getState().soundEnabled;
}

function playCompletedTransition(
  previous: WorkoutSessionData,
  next: WorkoutSessionData,
) {
  if (!canPlayWorkoutSounds() || previous.status === "completed") return;
  if (next.status === "completed") playWorkoutCompleteSound();
  else if (
    previous.phase !== next.phase ||
    previous.currentExerciseIndex !== next.currentExerciseIndex
  )
    playPhaseCompleteSound();
}

export const useWorkoutSessionStore = create<WorkoutSessionState>((set) => ({
  ...readPersistedSession(),
  startSession: (workout, context) =>
    set(() => {
      const session = createWorkoutSession(workout, context);
      persistSession(session);
      if (canPlayWorkoutSounds()) playWorkoutStartSound();
      return session;
    }),
  pauseSession: (workout) =>
    set((state) => {
      const session = pauseWorkoutSession(state, workout);
      persistSession(session);
      return session;
    }),
  resumeSession: () =>
    set((state) => {
      const session = resumeWorkoutSession(state);
      persistSession(session);
      return session;
    }),
  tick: (workout) =>
    set((state) => {
      const session = tickWorkoutSession(state, workout);
      const didTransition =
        state.phase !== session.phase ||
        state.currentExerciseIndex !== session.currentExerciseIndex ||
        session.status === "completed";
      if (didTransition) playCompletedTransition(state, session);
      else if (
        canPlayWorkoutSounds() &&
        state.status === "active" &&
        session.elapsedSeconds > state.elapsedSeconds &&
        session.remainingSeconds > 0
      )
        playTickSound(session.remainingSeconds);
      const now = Date.now();
      if (
        didTransition ||
        session.status !== "active" ||
        now - lastTimerPersistAt >= TIMER_PERSIST_INTERVAL_MS
      ) {
        persistSession(session);
        lastTimerPersistAt = now;
      }
      return session;
    }),
  completeExercise: (workout) =>
    set((state) => {
      const synchronized = tickWorkoutSession(state, workout);
      const session = completeCurrentExercise(synchronized, workout);
      persistSession(session);
      playCompletedTransition(state, session);
      return session;
    }),
  skipExercise: (workout) =>
    set((state) => {
      const synchronized = tickWorkoutSession(state, workout);
      const session = skipCurrentExercise(synchronized, workout);
      persistSession(session);
      if (
        canPlayWorkoutSounds() &&
        state.status !== "completed" &&
        session.status === "completed"
      )
        playWorkoutCompleteSound();
      return session;
    }),
  skipRest: (workout) =>
    set((state) => {
      const synchronized = tickWorkoutSession(state, workout);
      const session = skipRestPeriod(synchronized, workout);
      persistSession(session);
      if (session.status === "completed") {
        playCompletedTransition(state, session);
      } else if (
        canPlayWorkoutSounds() &&
        state.phase === "rest" &&
        session.phase === "exercise"
      ) {
        playWorkoutStartSound();
      }
      return session;
    }),
  goToPreviousExercise: (workout) =>
    set((state) => {
      const synchronized = tickWorkoutSession(state, workout);
      const session = previousExercise(synchronized, workout);
      persistSession(session);
      return session;
    }),
  resetSession: () => {
    stopWorkoutAudio();
    removeStoredValue(SESSION_STORAGE_KEY);
    set(idleWorkoutSession);
  },
}));
