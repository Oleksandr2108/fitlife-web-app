import { create } from 'zustand'
import { getStoredValue, removeStoredValue, setStoredValue } from '../lib/storage'
import type { FitnessGoal, WorkoutDuration, WorkoutPlan } from '../types'

type OnboardingStep = 1 | 2 | 3

interface PersistedOnboardingState {
  selectedGoal: FitnessGoal | null
  selectedDuration: WorkoutDuration | null
  generatedPlan: WorkoutPlan | null
  onboardingCompleted: boolean
}

interface OnboardingState extends PersistedOnboardingState {
  currentStep: OnboardingStep
  setGoal: (goal: FitnessGoal) => void
  setDuration: (duration: WorkoutDuration) => void
  setCurrentStep: (step: OnboardingStep) => void
  setGeneratedPlan: (plan: WorkoutPlan) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
}

const STORAGE_KEY = 'fitlife-onboarding'
const fitnessGoals: FitnessGoal[] = ['lose-weight', 'build-strength', 'stay-active', 'improve-mobility']
const workoutDurations: WorkoutDuration[] = [10, 20, 30]

function isWorkoutPlan(value: unknown): value is WorkoutPlan {
  if (!value || typeof value !== 'object') return false
  const plan = value as Partial<WorkoutPlan>
  return typeof plan.id === 'string' && fitnessGoals.includes(plan.goal as FitnessGoal) && workoutDurations.includes(plan.duration as WorkoutDuration) && Array.isArray(plan.days) && plan.days.length === 7 && plan.days.every((day) => typeof day === 'object' && day !== null && typeof day.day === 'number' && typeof day.isRestDay === 'boolean' && (day.workoutId === null || typeof day.workoutId === 'string'))
}

function readPersistedState(): PersistedOnboardingState {
  const value = getStoredValue<unknown>(STORAGE_KEY)
  if (!value || typeof value !== 'object') return { selectedGoal: null, selectedDuration: null, generatedPlan: null, onboardingCompleted: false }
  const stored = value as Partial<PersistedOnboardingState>
  const selectedGoal = fitnessGoals.includes(stored.selectedGoal as FitnessGoal) ? stored.selectedGoal as FitnessGoal : null
  const selectedDuration = workoutDurations.includes(stored.selectedDuration as WorkoutDuration) ? stored.selectedDuration as WorkoutDuration : null
  const generatedPlan = isWorkoutPlan(stored.generatedPlan) ? stored.generatedPlan : null
  return { selectedGoal, selectedDuration, generatedPlan, onboardingCompleted: stored.onboardingCompleted === true && generatedPlan !== null }
}

const initialState = readPersistedState()

function persist(state: PersistedOnboardingState) {
  setStoredValue(STORAGE_KEY, state)
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  currentStep: 1,
  setGoal: (selectedGoal) => set((state) => {
    persist({ selectedGoal, selectedDuration: state.selectedDuration, generatedPlan: state.generatedPlan, onboardingCompleted: state.onboardingCompleted })
    return { selectedGoal }
  }),
  setDuration: (selectedDuration) => set((state) => {
    persist({ selectedGoal: state.selectedGoal, selectedDuration, generatedPlan: state.generatedPlan, onboardingCompleted: state.onboardingCompleted })
    return { selectedDuration }
  }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setGeneratedPlan: (generatedPlan) => set((state) => {
    persist({ selectedGoal: state.selectedGoal, selectedDuration: state.selectedDuration, generatedPlan, onboardingCompleted: state.onboardingCompleted })
    return { generatedPlan }
  }),
  completeOnboarding: () => set((state) => {
    persist({ selectedGoal: state.selectedGoal, selectedDuration: state.selectedDuration, generatedPlan: state.generatedPlan, onboardingCompleted: true })
    return { onboardingCompleted: true }
  }),
  resetOnboarding: () => {
    removeStoredValue(STORAGE_KEY)
    set({ currentStep: 1, selectedGoal: null, selectedDuration: null, generatedPlan: null, onboardingCompleted: false })
  },
}))
