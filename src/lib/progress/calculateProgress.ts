import type { CompletedWorkout, WorkoutPlan } from '../../types'
import { addCalendarDays, formatActivityDate, isValidDate, startOfLocalDay, startOfLocalWeek, toLocalDateKey } from './dateUtils'

export type ActivityRange = 7 | 30

export interface ActivityPoint {
  dateKey: string
  label: string
  fullLabel: string
  minutes: number
  workouts: number
}

export interface PeriodComparison {
  kind: 'increase' | 'decrease' | 'same' | 'new' | 'none'
  percentage?: number
}

export interface PlanCompletion {
  completed: number
  required: number
  percentage: number
  completedDays: Set<number>
}

function uniqueRecords(records: CompletedWorkout[]): CompletedWorkout[] {
  const seen = new Set<string>()
  return records.filter((record) => {
    if (seen.has(record.id)) return false
    seen.add(record.id)
    return true
  })
}

export function calculateTotalWorkouts(records: CompletedWorkout[]): number {
  return uniqueRecords(records).length
}

export function calculateTotalMinutes(records: CompletedWorkout[]): number {
  return uniqueRecords(records).reduce((total, record) => total + Math.max(0, record.durationMinutes), 0)
}

export function calculateCurrentStreak(records: CompletedWorkout[], now = new Date()): number {
  const activeDays = new Set(uniqueRecords(records).flatMap((record) => {
    const date = new Date(record.completedAt)
    return isValidDate(date) ? [toLocalDateKey(date)] : []
  }))
  let cursor = startOfLocalDay(now)
  if (!activeDays.has(toLocalDateKey(cursor))) cursor = addCalendarDays(cursor, -1)
  if (!activeDays.has(toLocalDateKey(cursor))) return 0

  let streak = 0
  while (activeDays.has(toLocalDateKey(cursor))) {
    streak += 1
    cursor = addCalendarDays(cursor, -1)
  }
  return streak
}

export function calculateWeeklyCount(records: CompletedWorkout[], now = new Date()): number {
  const weekStart = startOfLocalWeek(now)
  const weekEnd = addCalendarDays(weekStart, 7)
  return uniqueRecords(records).filter((record) => {
    const date = new Date(record.completedAt)
    return isValidDate(date) && date >= weekStart && date < weekEnd
  }).length
}

export function aggregateActivityByDay(records: CompletedWorkout[], days: ActivityRange, now = new Date(), endOffset = 0): ActivityPoint[] {
  const end = addCalendarDays(now, endOffset)
  const start = addCalendarDays(end, -(days - 1))
  const points = Array.from({ length: days }, (_, index) => {
    const date = addCalendarDays(start, index)
    return {
      dateKey: toLocalDateKey(date),
      label: days === 7
        ? new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
        : formatActivityDate(date),
      fullLabel: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date),
      minutes: 0,
      workouts: 0,
    }
  })
  const pointMap = new Map(points.map((point) => [point.dateKey, point]))

  uniqueRecords(records).forEach((record) => {
    const date = new Date(record.completedAt)
    if (!isValidDate(date)) return
    const point = pointMap.get(toLocalDateKey(date))
    if (!point) return
    point.minutes += Math.max(0, record.durationMinutes)
    point.workouts += 1
  })

  return points
}

export function compareActivityPeriods(current: ActivityPoint[], previous: ActivityPoint[]): PeriodComparison {
  const currentMinutes = current.reduce((total, point) => total + point.minutes, 0)
  const previousMinutes = previous.reduce((total, point) => total + point.minutes, 0)
  if (previousMinutes === 0) return currentMinutes > 0 ? { kind: 'new' } : { kind: 'none' }
  const percentage = Math.round(((currentMinutes - previousMinutes) / previousMinutes) * 100)
  if (percentage === 0) return { kind: 'same', percentage: 0 }
  return { kind: percentage > 0 ? 'increase' : 'decrease', percentage: Math.abs(percentage) }
}

export function calculatePlanCompletion(plan: WorkoutPlan, records: CompletedWorkout[]): PlanCompletion {
  const requiredDays = plan.days.filter((day) => !day.isRestDay)
  const requiredDayNumbers = new Set(requiredDays.map((day) => day.day))
  const completedDays = new Set(uniqueRecords(records).flatMap((record) => (
    record.planId === plan.id && record.planDay !== undefined && requiredDayNumbers.has(record.planDay)
      ? [record.planDay]
      : []
  )))
  const required = requiredDays.length
  const completed = completedDays.size
  return { completed, required, percentage: required > 0 ? Math.round((completed / required) * 100) : 0, completedDays }
}

export function getRecentActivity(records: CompletedWorkout[], limit = 5): CompletedWorkout[] {
  return [...uniqueRecords(records)]
    .sort((first, second) => new Date(second.completedAt).getTime() - new Date(first.completedAt).getTime())
    .slice(0, limit)
}
