import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AppContainer } from "../../components/layout/AppContainer";
import { useWorkouts } from "../../hooks/queries/useWorkouts";
import { delay } from "../../lib/delay";
import { onboardingStep } from "../../lib/motion";
import { generateWorkoutPlan } from "../../lib/plan/generateWorkoutPlan";
import { useOnboardingStore } from "../../store/onboarding.store";
import { DurationStep } from "./components/DurationStep";
import { GeneratingStep } from "./components/GeneratingStep";
import { GoalStep } from "./components/GoalStep";
import { OnboardingProgress } from "./components/OnboardingProgress";
import { PlanReadyStep } from "./components/PlanReadyStep";

export function OnboardingPage() {
  const { data: workouts, isPending, isError, refetch } = useWorkouts();
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const selectedGoal = useOnboardingStore((state) => state.selectedGoal);
  const selectedDuration = useOnboardingStore(
    (state) => state.selectedDuration,
  );
  const generatedPlan = useOnboardingStore((state) => state.generatedPlan);
  const setGoal = useOnboardingStore((state) => state.setGoal);
  const setDuration = useOnboardingStore((state) => state.setDuration);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const activatePlan = useOnboardingStore((state) => state.activatePlan);
  const beginAdjustment = useOnboardingStore(
    (state) => state.beginAdjustment,
  );
  const [direction, setDirection] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  function goToStep(step: 1 | 2, nextDirection: -1 | 1) {
    setDirection(nextDirection);
    setCurrentStep(step);
  }

  async function createPlan() {
    if (!selectedGoal || !selectedDuration || !workouts) return;
    setDirection(1);
    setCurrentStep(3);
    setIsGenerating(true);
    await delay(700);
    activatePlan(
      generateWorkoutPlan({
        goal: selectedGoal,
        duration: selectedDuration,
        workouts,
      }),
    );
    setIsGenerating(false);
  }

  function adjustPreferences() {
    beginAdjustment();
    setDirection(-1);
    setIsGenerating(false);
  }

  return (
    <AppContainer className="py-6 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:py-10">
      <div className="mx-auto max-w-xl">
        <OnboardingProgress step={currentStep} />
        <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-border bg-background-secondary p-5 shadow-surface sm:p-8">
          <AnimatePresence
            mode="wait"
            custom={direction}
            initial={false}
          >
            <motion.div
              key={currentStep}
              custom={direction}
              variants={onboardingStep}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {currentStep === 1 ? (
                <GoalStep
                  selectedGoal={selectedGoal}
                  onSelect={setGoal}
                  onContinue={() => goToStep(2, 1)}
                />
              ) : null}
              {currentStep === 2 ? (
                <DurationStep
                  selectedDuration={selectedDuration}
                  isLoading={isPending}
                  isError={isError}
                  onSelect={setDuration}
                  onBack={() => goToStep(1, -1)}
                  onContinue={() => void createPlan()}
                  onRetry={() => void refetch()}
                />
              ) : null}
              {currentStep === 3 && isGenerating ? <GeneratingStep /> : null}
              {currentStep === 3 &&
              !isGenerating &&
              generatedPlan &&
              workouts ? (
                <PlanReadyStep
                  plan={generatedPlan}
                  workouts={workouts}
                  onAdjust={adjustPreferences}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AppContainer>
  );
}
