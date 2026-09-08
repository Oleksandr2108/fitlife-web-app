import { useWorkoutSessionStore } from '../../../store/workoutSession.store'

interface TimerDialProps {
  totalSeconds: number
  label: string
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`
}

export function TimerDial({ totalSeconds, label }: TimerDialProps) {
  const remainingSeconds = useWorkoutSessionStore((state) => state.remainingSeconds)
  const radius = 86
  const circumference = 2 * Math.PI * radius
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0

  return (
    <div className="relative mx-auto size-52 sm:size-60" role="timer" aria-label={`${label}: ${formatTime(remainingSeconds)} remaining`}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-surface-muted)" strokeWidth="10" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} className="transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none" />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-5xl font-bold tabular-nums tracking-tight sm:text-6xl">{formatTime(remainingSeconds)}</span>
        <span className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">{label}</span>
      </div>
    </div>
  )
}
