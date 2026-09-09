interface OnboardingProgressProps {
  step: number;
}

export function OnboardingProgress({ step }: OnboardingProgressProps) {
  const progress = (step / 3) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Step {step} of 3</span>
        <span className="text-text-muted">Your 7-day plan</span>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-label="Onboarding progress"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={step}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
