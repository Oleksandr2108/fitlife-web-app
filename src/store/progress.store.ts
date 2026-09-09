import { create } from "zustand";
import {
  getInitialCompletedWorkouts,
  recordCompletedWorkout,
} from "../services/progress.service";
import type { CompletedWorkout } from "../types";

interface ProgressState {
  completedWorkouts: CompletedWorkout[];
  addCompletedWorkout: (record: CompletedWorkout) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  completedWorkouts: getInitialCompletedWorkouts(),
  addCompletedWorkout: (record) =>
    set({ completedWorkouts: recordCompletedWorkout(record) }),
}));
