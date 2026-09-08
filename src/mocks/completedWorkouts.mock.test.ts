import { describe, expect, it } from 'vitest'
import { differenceInCalendarDays, startOfLocalDay } from '../lib/progress/dateUtils'
import { aggregateActivityByDay, calculateCurrentStreak } from '../lib/progress/calculateProgress'
import { workoutsMock } from './workouts.mock'
import { createMockCompletedWorkouts } from './completedWorkouts.mock'

describe('completed workout mock history', () => {
  it('creates stable, typed catalog-backed activity across the previous 30 days', () => {
    const referenceDate = new Date(2026, 8, 8, 12)
    const history = createMockCompletedWorkouts(referenceDate)
    const workoutIds = new Set(workoutsMock.map((workout) => workout.id))
    const ids = new Set(history.map((record) => record.id))
    const offsets = history.map((record) => differenceInCalendarDays(startOfLocalDay(referenceDate), startOfLocalDay(new Date(record.completedAt))))

    expect(history).toHaveLength(19)
    expect(ids.size).toBe(history.length)
    expect(history.every((record) => workoutIds.has(record.workoutId))).toBe(true)
    expect(Math.min(...offsets)).toBeGreaterThanOrEqual(1)
    expect(Math.max(...offsets)).toBeLessThanOrEqual(30)
    expect(new Set(offsets).size).toBeLessThan(30)
    expect(new Set(history.map((record) => record.durationMinutes))).toEqual(new Set([15, 20, 25, 30, 35, 40, 45, 55]))
    expect(calculateCurrentStreak(history, referenceDate)).toBe(4)
    expect(aggregateActivityByDay(history, 7, referenceDate).reduce((total, point) => total + point.workouts, 0)).toBe(5)
  })
})
