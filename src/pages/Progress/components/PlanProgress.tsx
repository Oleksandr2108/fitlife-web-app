import { Check, MoonStar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { calculatePlanCompletion } from '../../../lib/progress/calculateProgress'
import type { CompletedWorkout, WorkoutPlan } from '../../../types'

interface PlanProgressProps {
  plan: WorkoutPlan | null
  completedWorkouts: CompletedWorkout[]
}

export function PlanProgress({ plan, completedWorkouts }: PlanProgressProps) {
  if (!plan) {
    return <article className="rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6"><p className="text-card-title">Your Plan</p><p className="mt-2 text-sm leading-6 text-text-secondary">Create a personalized 7-day routine and track every scheduled workout here.</p><Link to="/onboarding" className="mt-4 inline-flex min-h-11 items-center font-semibold text-accent">Create Your Plan</Link></article>
  }
  const completion = calculatePlanCompletion(plan, completedWorkouts)
  return (
    <article className="rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-card-title">Your Plan</p><p className="mt-2 text-2xl font-bold">{completion.completed} of {completion.required}</p><p className="mt-1 text-sm text-text-secondary">workouts completed · {completion.percentage}%</p></div><Link to="/plan" className="inline-flex min-h-11 items-center font-semibold text-accent">View My Plan</Link></div>
      <ol className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Personalized plan progress">
        {plan.days.map((day) => {
          const completed = completion.completedDays.has(day.day)
          return <li key={day.day} className="text-center"><span className="text-xs font-semibold text-text-muted">D{day.day}</span><span className={`mx-auto mt-2 grid size-8 place-items-center rounded-full border ${completed ? 'border-accent bg-accent text-accent-foreground' : day.isRestDay ? 'border-border bg-background-secondary text-text-muted' : 'border-border bg-surface-muted text-text-muted'}`} aria-label={`Day ${day.day}: ${day.isRestDay ? 'rest day' : completed ? 'completed' : 'not completed'}`}>{completed ? <Check aria-hidden="true" className="size-4" /> : day.isRestDay ? <MoonStar aria-hidden="true" className="size-3.5" /> : day.day}</span></li>
        })}
      </ol>
    </article>
  )
}
