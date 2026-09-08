import { create } from 'zustand'
import { getLocalCompletedWorkouts, recordCompletedWorkout } from '../services/progress.service'
import type { CompletedWorkout } from '../types'

interface ProgressState {
  completedWorkouts: CompletedWorkout[]
  addCompletedWorkout: (record: CompletedWorkout) => void
}

export const useProgressStore = create<ProgressState>((set) => ({
  completedWorkouts: getLocalCompletedWorkouts(),
  addCompletedWorkout: (record) => set({ completedWorkouts: recordCompletedWorkout(record) }),
}))
