import { useEffect } from 'react'
import { stopWorkoutAudio } from '../../lib/audio/workoutAudio'

let activeAudioConsumers = 0

export function useWorkoutAudioLifecycle() {
  useEffect(() => {
    activeAudioConsumers += 1
    const handleVisibilityChange = () => {
      if (document.hidden) stopWorkoutAudio()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      activeAudioConsumers -= 1
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      queueMicrotask(() => {
        if (activeAudioConsumers === 0) stopWorkoutAudio()
      })
    }
  }, [])
}
