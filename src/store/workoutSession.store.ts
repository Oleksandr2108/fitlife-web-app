import { create } from 'zustand'
import { getStoredValue, removeStoredValue, setStoredValue } from '../lib/storage'
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
} from '../lib/workoutSession/sessionState'
import type { WorkoutSessionData, WorkoutSessionPlanContext } from '../lib/workoutSession/workoutSession.types'
import type { Workout } from '../types'

interface WorkoutSessionState extends WorkoutSessionData {
  startSession: (workout: Workout, context?: Partial<WorkoutSessionPlanContext>) => void
  pauseSession: () => void
  resumeSession: () => void
  tick: (workout: Workout) => void
  completeExercise: (workout: Workout) => void
  skipExercise: (workout: Workout) => void
  skipRest: (workout: Workout) => void
  goToPreviousExercise: (workout: Workout) => void
  resetSession: () => void
}

const SESSION_STORAGE_KEY = 'fitlife-workout-session'

function readPersistedSession(): WorkoutSessionData {
  const storedSession = getStoredValue<unknown>(SESSION_STORAGE_KEY)
  if (!isStoredWorkoutSession(storedSession)) {
    removeStoredValue(SESSION_STORAGE_KEY)
    return idleWorkoutSession
  }

  return storedSession.status === 'active' ? { ...storedSession, status: 'paused' } : storedSession
}

function persistSession(session: WorkoutSessionData) {
  setStoredValue(SESSION_STORAGE_KEY, session)
}

export const useWorkoutSessionStore = create<WorkoutSessionState>((set) => ({
  ...readPersistedSession(),
  startSession: (workout, context) => set(() => {
    const session = createWorkoutSession(workout, context)
    persistSession(session)
    return session
  }),
  pauseSession: () => set((state) => {
    const session = pauseWorkoutSession(state)
    persistSession(session)
    return session
  }),
  resumeSession: () => set((state) => {
    const session = resumeWorkoutSession(state)
    persistSession(session)
    return session
  }),
  tick: (workout) => set((state) => {
    const session = tickWorkoutSession(state, workout)
    persistSession(session)
    return session
  }),
  completeExercise: (workout) => set((state) => {
    const session = completeCurrentExercise(state, workout)
    persistSession(session)
    return session
  }),
  skipExercise: (workout) => set((state) => {
    const session = skipCurrentExercise(state, workout)
    persistSession(session)
    return session
  }),
  skipRest: (workout) => set((state) => {
    const session = skipRestPeriod(state, workout)
    persistSession(session)
    return session
  }),
  goToPreviousExercise: (workout) => set((state) => {
    const session = previousExercise(state, workout)
    persistSession(session)
    return session
  }),
  resetSession: () => {
    removeStoredValue(SESSION_STORAGE_KEY)
    set(idleWorkoutSession)
  },
}))
