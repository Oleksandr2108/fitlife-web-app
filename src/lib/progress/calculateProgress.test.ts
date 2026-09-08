import { describe, expect, it } from 'vitest'
import type { CompletedWorkout, WorkoutPlan } from '../../types'
import { aggregateActivityByDay, calculateCurrentStreak, calculatePlanCompletion, calculateTotalMinutes, calculateTotalWorkouts, calculateWeeklyCount, compareActivityPeriods, getRecentActivity } from './calculateProgress'

const now = new Date(2026, 8, 8, 12)

function record(id: string, year: number, month: number, day: number, minutes = 20): CompletedWorkout {
  return { id, workoutId: `workout-${id}`, completedAt: new Date(year, month, day, 10).toISOString(), durationMinutes: minutes, exerciseCount: 3 }
}

describe('progress calculations', () => {
  it('calculates totals without counting duplicate record ids', () => {
    const first = record('1', 2026, 8, 8, 20)
    expect(calculateTotalWorkouts([first, first])).toBe(1)
    expect(calculateTotalMinutes([first, first])).toBe(20)
  })

  it('counts multiple workouts on one day but one streak day', () => {
    const records = [record('1', 2026, 8, 8), record('2', 2026, 8, 8)]
    expect(calculateTotalWorkouts(records)).toBe(2)
    expect(calculateCurrentStreak(records, now)).toBe(1)
    expect(aggregateActivityByDay(records, 7, now).at(-1)).toMatchObject({ workouts: 2, minutes: 40 })
  })

  it('calculates a streak that includes today and consecutive prior days', () => {
    const records = [record('1', 2026, 8, 8), record('2', 2026, 8, 7), record('3', 2026, 8, 6)]
    expect(calculateCurrentStreak(records, now)).toBe(3)
  })

  it('allows a current streak to continue from yesterday and stops at a gap', () => {
    const records = [record('1', 2026, 8, 7), record('2', 2026, 8, 6), record('3', 2026, 8, 4)]
    expect(calculateCurrentStreak(records, now)).toBe(2)
  })

  it('counts workouts in the current Monday-to-Sunday week', () => {
    const records = [record('1', 2026, 8, 7), record('2', 2026, 8, 8), record('3', 2026, 8, 6)]
    expect(calculateWeeklyCount(records, now)).toBe(2)
  })

  it.each([7, 30] as const)('returns all %i requested days including zero-activity days', (days) => {
    const points = aggregateActivityByDay([record('1', 2026, 8, 8)], days, now)
    expect(points).toHaveLength(days)
    expect(points.filter((point) => point.workouts === 0)).toHaveLength(days - 1)
  })

  it('sorts recent activity without mutating its source', () => {
    const source = [record('old', 2026, 8, 5), record('new', 2026, 8, 8)]
    const snapshot = [...source]
    expect(getRecentActivity(source).map((item) => item.id)).toEqual(['new', 'old'])
    expect(source).toEqual(snapshot)
  })

  it('calculates positive and negative period comparisons safely', () => {
    const current = aggregateActivityByDay([record('current', 2026, 8, 8, 120)], 7, now)
    const previous100 = aggregateActivityByDay([record('previous', 2026, 7, 31, 100)], 7, now, -7)
    const previous150 = aggregateActivityByDay([record('previous', 2026, 7, 31, 150)], 7, now, -7)
    expect(compareActivityPeriods(current, previous100)).toEqual({ kind: 'increase', percentage: 20 })
    expect(compareActivityPeriods(current, previous150)).toEqual({ kind: 'decrease', percentage: 20 })
    expect(compareActivityPeriods(current, aggregateActivityByDay([], 7, now, -7))).toEqual({ kind: 'new' })
  })

  it('matches plan completion by plan id and scheduled day', () => {
    const plan: WorkoutPlan = { id: 'plan-1', goal: 'stay-active', duration: 20, days: [
      { day: 1, workoutId: 'workout-a', isRestDay: false },
      { day: 2, workoutId: null, isRestDay: true },
      { day: 3, workoutId: 'workout-a', isRestDay: false },
    ] }
    const records = [
      { ...record('1', 2026, 8, 8), workoutId: 'workout-a', planId: 'plan-1', planDay: 1 },
      { ...record('2', 2026, 8, 8), workoutId: 'workout-a', planId: 'other', planDay: 3 },
    ]
    expect(calculatePlanCompletion(plan, records)).toMatchObject({ completed: 1, required: 2, percentage: 50 })
  })
})
