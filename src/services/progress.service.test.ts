import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CompletedWorkout } from '../types'

const storage = vi.hoisted(() => ({ value: null as unknown }))

vi.mock('../lib/storage', () => ({
  getStoredValue: () => storage.value,
  setStoredValue: (_key: string, value: unknown) => {
    storage.value = value
    return true
  },
}))

import { getInitialCompletedWorkouts } from './progress.service'

describe('completed workout seed', () => {
  beforeEach(() => {
    storage.value = null
  })

  it('seeds an empty history once and returns the stored records on refresh', () => {
    const firstLoad = getInitialCompletedWorkouts()
    const secondLoad = getInitialCompletedWorkouts()

    expect(firstLoad).toHaveLength(19)
    expect(secondLoad).toEqual(firstLoad)
    expect(storage.value).toEqual(firstLoad)
  })

  it('seeds a stored empty array', () => {
    storage.value = []
    expect(getInitialCompletedWorkouts()).toHaveLength(19)
  })

  it('does not overwrite existing user workout history', () => {
    const existingRecord: CompletedWorkout = {
      id: 'completed-user-session',
      workoutId: 'workout-001',
      completedAt: new Date(2026, 8, 8, 10).toISOString(),
      durationMinutes: 20,
      exerciseCount: 3,
    }
    storage.value = [existingRecord]

    expect(getInitialCompletedWorkouts()).toEqual([existingRecord])
    expect(storage.value).toEqual([existingRecord])
  })
})
