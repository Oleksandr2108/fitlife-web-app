import { motion } from 'framer-motion'
import { ArrowLeft, Pause, Play, SkipForward } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { fadeUp } from '../../../lib/motion'
import type { WorkoutSessionPhase, WorkoutSessionStatus } from '../../../lib/workoutSession/workoutSession.types'
import type { Exercise } from '../../../types'
import { TimerDial } from './TimerDial'

interface SessionWorkoutViewProps {
  exercise: Exercise
  nextExercise: Exercise | null
  phase: WorkoutSessionPhase
  status: WorkoutSessionStatus
  remainingSeconds: number
  canGoPrevious: boolean
  onPause: () => void
  onResume: () => void
  onCompleteExercise: () => void
  onSkipExercise: () => void
  onSkipRest: () => void
  onPrevious: () => void
}

function ExercisePreview({ exercise }: { exercise: Exercise }) {
  const target = exercise.durationSeconds !== undefined ? `${exercise.durationSeconds} sec` : `${exercise.repetitions ?? 0} reps`
  return <div className="mt-6 rounded-control border border-border bg-background-secondary p-4"><p className="text-meta text-text-muted">Next</p><div className="mt-1 flex items-center justify-between gap-4"><p className="font-semibold">{exercise.name}</p><span className="shrink-0 text-sm text-text-secondary">{target}</span></div></div>
}

export function SessionWorkoutView(props: SessionWorkoutViewProps) {
  const { exercise, nextExercise, phase, status, remainingSeconds, canGoPrevious, onPause, onResume, onCompleteExercise, onSkipExercise, onSkipRest, onPrevious } = props
  const isPaused = status === 'paused'

  if (phase === 'rest') {
    return (
      <motion.section key="rest" variants={fadeUp} initial="hidden" animate="visible" className="text-center">
        <p className="text-meta uppercase tracking-[0.2em] text-accent">Rest</p>
        <h1 className="text-section-title mt-3">Catch your breath</h1>
        <div className="mt-8"><TimerDial remainingSeconds={remainingSeconds} totalSeconds={exercise.restDurationSeconds ?? remainingSeconds} label={isPaused ? 'Paused' : 'Rest'} /></div>
        {nextExercise ? <ExercisePreview exercise={nextExercise} /> : null}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Button size="large" icon={isPaused ? Play : Pause} onClick={isPaused ? onResume : onPause}>{isPaused ? 'Resume' : 'Pause'}</Button>
          <Button size="large" variant="secondary" icon={SkipForward} disabled={isPaused} onClick={onSkipRest}>Skip Rest</Button>
        </div>
      </motion.section>
    )
  }

  const isTimed = exercise.durationSeconds !== undefined
  return (
    <motion.section key={exercise.id} variants={fadeUp} initial="hidden" animate="visible">
      <div className="text-center">
        <p className="text-meta uppercase tracking-[0.16em] text-accent">Current exercise</p>
        <h1 className="text-section-title mt-3">{exercise.name}</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-text-secondary">{exercise.instructions}</p>
      </div>
      <div className="mt-8">
        {isTimed ? <TimerDial remainingSeconds={remainingSeconds} totalSeconds={exercise.durationSeconds ?? remainingSeconds} label={isPaused ? 'Paused' : 'Remaining'} /> : <div className="mx-auto grid size-52 place-content-center rounded-full border-[10px] border-surface-muted text-center sm:size-60"><span className="text-6xl font-bold tabular-nums">{exercise.repetitions}</span><span className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Repetitions</span></div>}
      </div>
      <div className="mt-8 grid gap-3">
        {isPaused ? <Button size="large" icon={Play} onClick={onResume}>Resume Workout</Button> : isTimed ? <Button size="large" icon={Pause} onClick={onPause}>Pause</Button> : <Button size="large" onClick={onCompleteExercise}>Done</Button>}
        <div className="grid grid-cols-2 gap-3">
          <Button size="large" variant="secondary" icon={ArrowLeft} disabled={!canGoPrevious || isPaused} onClick={onPrevious}>Previous</Button>
          <Button size="large" variant="ghost" icon={SkipForward} disabled={isPaused} onClick={onSkipExercise}>Skip Exercise</Button>
        </div>
      </div>
      {nextExercise ? <ExercisePreview exercise={nextExercise} /> : null}
    </motion.section>
  )
}
