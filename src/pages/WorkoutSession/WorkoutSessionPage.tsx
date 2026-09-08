import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useWorkout } from '../../hooks/queries/useWorkout'
import { useWorkoutAudioLifecycle } from '../../hooks/workoutSession/useWorkoutAudioLifecycle'
import { useWorkoutTimer } from '../../hooks/workoutSession/useWorkoutTimer'
import { unlockWorkoutAudio } from '../../lib/audio/workoutAudio'
import { getWorkoutPlanContext } from '../../lib/plan/getWorkoutPlanContext'
import { isSessionCompatible } from '../../lib/workoutSession/sessionState'
import { useOnboardingStore } from '../../store/onboarding.store'
import { useProgressStore } from '../../store/progress.store'
import { useWorkoutSessionStore } from '../../store/workoutSession.store'
import { useWorkoutPreferencesStore } from '../../store/workoutPreferences.store'
import type { CompletedWorkout } from '../../types'
import { ExitWorkoutDialog } from './components/ExitWorkoutDialog'
import { SessionHeader } from './components/SessionHeader'
import { SessionStartState } from './components/SessionStartState'
import { SessionWorkoutView } from './components/SessionWorkoutView'
import { WorkoutCompletion } from './components/WorkoutCompletion'

export function WorkoutSessionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data: workout, isPending, isError, refetch } = useWorkout(id)
  const plan = useOnboardingStore((state) => state.generatedPlan)
  const addCompletedWorkout = useProgressStore((state) => state.addCompletedWorkout)
  const workoutId = useWorkoutSessionStore((state) => state.workoutId)
  const status = useWorkoutSessionStore((state) => state.status)
  const phase = useWorkoutSessionStore((state) => state.phase)
  const currentExerciseIndex = useWorkoutSessionStore((state) => state.currentExerciseIndex)
  const completedAt = useWorkoutSessionStore((state) => state.completedAt)
  const sessionPlanId = useWorkoutSessionStore((state) => state.planId)
  const sessionPlanDay = useWorkoutSessionStore((state) => state.planDay)
  const startSession = useWorkoutSessionStore((state) => state.startSession)
  const pauseSession = useWorkoutSessionStore((state) => state.pauseSession)
  const resumeSession = useWorkoutSessionStore((state) => state.resumeSession)
  const completeExercise = useWorkoutSessionStore((state) => state.completeExercise)
  const skipExercise = useWorkoutSessionStore((state) => state.skipExercise)
  const skipRest = useWorkoutSessionStore((state) => state.skipRest)
  const goToPreviousExercise = useWorkoutSessionStore((state) => state.goToPreviousExercise)
  const resetSession = useWorkoutSessionStore((state) => state.resetSession)
  const soundEnabled = useWorkoutPreferencesStore((state) => state.soundEnabled)
  const toggleSound = useWorkoutPreferencesStore((state) => state.toggleSound)
  const [showExitDialog, setShowExitDialog] = useState(false)

  useWorkoutAudioLifecycle()
  useWorkoutTimer(workout ?? null)

  const compatibleSession = workout ? isSessionCompatible(useWorkoutSessionStore.getState(), workout) : false

  useEffect(() => {
    if (!workout || !compatibleSession || status !== 'completed' || !completedAt) return
    const record: CompletedWorkout = {
      id: `completed-${workout.id}-${completedAt}`,
      workoutId: workout.id,
      completedAt,
      durationMinutes: workout.durationMinutes,
      exerciseCount: workout.exercises.length,
      ...(sessionPlanId ? { planId: sessionPlanId } : {}),
      ...(sessionPlanDay ? { planDay: sessionPlanDay } : {}),
    }
    addCompletedWorkout(record)
  }, [addCompletedWorkout, completedAt, compatibleSession, sessionPlanDay, sessionPlanId, status, workout])

  function beginSession() {
    if (!workout) return
    const planContext = getWorkoutPlanContext(plan, workout.id, searchParams.get('planDay'))
    const hasDifferentActiveSession = workoutId !== workout.id && (status === 'active' || status === 'paused')
    if (hasDifferentActiveSession && !window.confirm('Start a new workout? Your current session progress will be replaced.')) return
    if (soundEnabled) void unlockWorkoutAudio()
    startSession(workout, planContext ?? undefined)
  }

  const resumeWithAudio = useCallback(() => {
    if (soundEnabled) void unlockWorkoutAudio()
    resumeSession()
  }, [resumeSession, soundEnabled])

  const handleCompleteExercise = useCallback(() => {
    if (workout) completeExercise(workout)
  }, [completeExercise, workout])

  const handleSkipExercise = useCallback(() => {
    if (workout) skipExercise(workout)
  }, [skipExercise, workout])

  const handleSkipRest = useCallback(() => {
    if (workout) skipRest(workout)
  }, [skipRest, workout])

  const handlePreviousExercise = useCallback(() => {
    if (workout) goToPreviousExercise(workout)
  }, [goToPreviousExercise, workout])

  function toggleWorkoutSound() {
    if (!soundEnabled) void unlockWorkoutAudio()
    toggleSound()
  }

  function requestExit() {
    if (compatibleSession && (status === 'active' || status === 'paused')) {
      setShowExitDialog(true)
      return
    }
    navigate(workout ? `/workout/${workout.id}` : '/workouts')
  }

  function endWorkout() {
    resetSession()
    navigate(workout ? `/workout/${workout.id}` : '/workouts')
  }

  if (isPending) return <main className="grid min-h-dvh place-items-center px-4"><div className="w-full max-w-lg animate-pulse space-y-5" aria-label="Loading workout session"><div className="mx-auto size-52 rounded-full bg-surface-muted" /><div className="mx-auto h-8 w-2/3 rounded bg-surface-muted" /><div className="h-14 rounded-control bg-surface-muted" /></div></main>
  if (isError) return <main className="grid min-h-dvh place-items-center px-4"><section className="w-full max-w-md rounded-surface border border-border bg-surface p-6 text-center"><h1 className="text-section-title">We couldn’t load this workout.</h1><p className="mt-3 text-text-secondary">Try again or return to the workout library.</p><div className="mt-6 grid gap-3"><Button onClick={() => void refetch()}>Try Again</Button><Link to="/workouts" className="inline-flex min-h-11 items-center justify-center gap-2 font-semibold text-accent"><ChevronLeft aria-hidden="true" className="size-4" />Back to Workouts</Link></div></section></main>
  if (!workout) return <main className="grid min-h-dvh place-items-center px-4"><section className="w-full max-w-md rounded-surface border border-border bg-surface p-6 text-center"><p className="text-meta text-accent">Workout not found</p><h1 className="text-section-title mt-3">This session isn’t available</h1><p className="mt-3 text-text-secondary">Choose a workout from the library to begin.</p><Link to="/workouts" className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent">Back to Workouts</Link></section></main>
  if (!compatibleSession || status === 'idle') return <SessionStartState workout={workout} onStart={beginSession} />
  if (status === 'completed') return <WorkoutCompletion workout={workout} hasPlanContext={Boolean(sessionPlanId && sessionPlanDay)} />

  const exercise = workout.exercises[currentExerciseIndex]
  if (!exercise) return <SessionStartState workout={workout} onStart={beginSession} />
  const nextExercise = workout.exercises[currentExerciseIndex + 1] ?? null
  const progressedExercises = currentExerciseIndex + (phase === 'rest' ? 1 : 0)
  const progressPercent = Math.round((progressedExercises / workout.exercises.length) * 100)

  return (
    <div className="min-h-dvh">
      <SessionHeader workoutTitle={workout.title} currentExercise={currentExerciseIndex + 1} exerciseCount={workout.exercises.length} progressPercent={progressPercent} soundEnabled={soundEnabled} onToggleSound={toggleWorkoutSound} onExit={requestExit} />
      <main className="mx-auto w-full max-w-2xl px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-7 sm:px-6 sm:pt-10">
        <SessionWorkoutView
          exercise={exercise}
          nextExercise={nextExercise}
          phase={phase}
          status={status}
          canGoPrevious={phase === 'rest' || currentExerciseIndex > 0}
          onPause={pauseSession}
          onResume={resumeWithAudio}
          onCompleteExercise={handleCompleteExercise}
          onSkipExercise={handleSkipExercise}
          onSkipRest={handleSkipRest}
          onPrevious={handlePreviousExercise}
        />
      </main>
      <ExitWorkoutDialog open={showExitDialog} onContinue={() => setShowExitDialog(false)} onEnd={endWorkout} />
    </div>
  )
}
