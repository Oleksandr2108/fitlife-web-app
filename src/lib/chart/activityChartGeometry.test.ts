import { describe, expect, it } from 'vitest'
import type { ActivityPoint } from '../progress/calculateProgress'
import { calculateActivityChartGeometry } from './activityChartGeometry'

const dimensions = { width: 360, height: 250, padding: { top: 18, right: 12, bottom: 34, left: 38 } }

function points(length: number, valueAt: (index: number) => number): ActivityPoint[] {
  return Array.from({ length }, (_, index) => ({ dateKey: `day-${index}`, label: String(index), fullLabel: `Day ${index}`, minutes: valueAt(index), workouts: valueAt(index) > 0 ? 1 : 0 }))
}

describe('activity chart geometry', () => {
  it.each([
    ['all-zero', points(7, () => 0)],
    ['one-high-point', points(7, (index) => index === 3 ? 120 : 0)],
    ['seven-points', points(7, (index) => index * 10)],
    ['thirty-points', points(30, (index) => (index % 5) * 15)],
  ])('creates finite geometry for %s data', (_name, activity) => {
    const geometry = calculateActivityChartGeometry(activity, dimensions)
    expect(geometry.coordinates).toHaveLength(activity.length)
    expect(geometry.linePath).not.toContain('NaN')
    expect(geometry.linePath).not.toContain('Infinity')
    expect(geometry.areaPath).not.toContain('NaN')
    expect(geometry.coordinates.every(({ x, y }) => Number.isFinite(x) && Number.isFinite(y))).toBe(true)
    expect(geometry.coordinates.every(({ y }) => y <= geometry.baseline)).toBe(true)
  })
})
