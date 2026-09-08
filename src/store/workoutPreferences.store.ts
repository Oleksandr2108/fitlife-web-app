import { create } from 'zustand'
import { stopWorkoutAudio } from '../lib/audio/workoutAudio'
import { getStoredValue, setStoredValue } from '../lib/storage'

const WORKOUT_PREFERENCES_STORAGE_KEY = 'fitlife-workout-preferences'

interface StoredWorkoutPreferences {
  soundEnabled: boolean
}

interface WorkoutPreferencesState extends StoredWorkoutPreferences {
  toggleSound: () => void
}

function getInitialPreferences(): StoredWorkoutPreferences {
  const stored = getStoredValue<unknown>(WORKOUT_PREFERENCES_STORAGE_KEY)
  if (!stored || typeof stored !== 'object') return { soundEnabled: true }
  const preferences = stored as Partial<StoredWorkoutPreferences>
  return { soundEnabled: typeof preferences.soundEnabled === 'boolean' ? preferences.soundEnabled : true }
}

export const useWorkoutPreferencesStore = create<WorkoutPreferencesState>((set) => ({
  ...getInitialPreferences(),
  toggleSound: () => set((state) => {
    const soundEnabled = !state.soundEnabled
    setStoredValue(WORKOUT_PREFERENCES_STORAGE_KEY, { soundEnabled })
    if (!soundEnabled) stopWorkoutAudio()
    return { soundEnabled }
  }),
}))
