import { Check, Minus } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { startOfLocalWeek, addCalendarDays, toLocalDateKey } from '../../../lib/progress/dateUtils'
import type { CompletedWorkout } from '../../../types'

interface WeeklyOverviewProps {
  completedWorkouts: CompletedWorkout[]
  weeklyCount: number
  weeklyGoal: number
  now?: Date
}

export function WeeklyOverview({ completedWorkouts, weeklyCount, weeklyGoal, now = new Date() }: WeeklyOverviewProps) {
  const reduceMotion = useReducedMotion()
  const percentage = weeklyGoal > 0 ? Math.min(100, Math.round((weeklyCount / weeklyGoal) * 100)) : 0
  const activeDays = new Set(completedWorkouts.map((record) => toLocalDateKey(new Date(record.completedAt))))
  const weekStart = startOfLocalWeek(now)
  const todayKey = toLocalDateKey(now)
  const days = Array.from({ length: 7 }, (_, index) => addCalendarDays(weekStart, index))

  return (
    <section className="grid gap-4 lg:grid-cols-2" aria-label="This week's progress">
      <article className="rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-card-title">Weekly Goal</p><p className="mt-2 text-2xl font-bold">{weeklyCount} / {weeklyGoal} workouts</p></div><p className="text-sm font-bold text-accent">{percentage}%</p></div>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar" aria-label="Weekly workout goal" aria-valuemin={0} aria-valuemax={weeklyGoal} aria-valuenow={Math.min(weeklyCount, weeklyGoal)}>
          <motion.div className="h-full rounded-full bg-accent" initial={{ width: reduceMotion ? `${percentage}%` : 0 }} whileInView={{ width: `${percentage}%` }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </article>
      <article className="rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6">
        <p className="text-card-title">Weekly Activity</p>
        <div className="mt-5 grid grid-cols-7 gap-1.5">
          {days.map((day) => {
            const key = toLocalDateKey(day)
            const active = activeDays.has(key)
            const today = key === todayKey
            return <div key={key} className="text-center"><span className="text-xs font-semibold text-text-muted">{new Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(day)}</span><span aria-label={`${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day)}: ${active ? 'activity completed' : 'no activity'}${today ? ', today' : ''}`} className={`mx-auto mt-2 grid size-8 place-items-center rounded-full border ${active ? 'border-accent bg-accent text-accent-foreground' : 'border-border bg-surface-muted text-text-muted'} ${today ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface' : ''}`}>{active ? <Check aria-hidden="true" className="size-4" /> : <Minus aria-hidden="true" className="size-3" />}</span></div>
          })}
        </div>
      </article>
    </section>
  )
}
