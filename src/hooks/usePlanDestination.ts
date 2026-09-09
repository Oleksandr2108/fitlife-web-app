import { useOnboardingStore } from '../store/onboarding.store'

export function usePlanDestination() {
  const generatedPlan = useOnboardingStore((state) => state.generatedPlan)
  const onboardingCompleted = useOnboardingStore((state) => state.onboardingCompleted)
  return onboardingCompleted && generatedPlan
    ? { to: '/plan', label: 'View My Plan' }
    : { to: '/onboarding', label: 'Start Free' }
}
