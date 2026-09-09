import { AppContainer } from "../../components/layout/AppContainer";
import { useUserProgress } from "../../hooks/queries/useUserProgress";
import { useProgressMetrics } from "../../hooks/useProgressMetrics";
import { useWorkouts } from "../../hooks/queries/useWorkouts";
import { useOnboardingStore } from "../../store/onboarding.store";
import { ActivityChart } from "./components/ActivityChart";
import { PlanProgress } from "./components/PlanProgress";
import { ProgressEmptyState } from "./components/ProgressEmptyState";
import { ProgressSummary } from "./components/ProgressSummary";
import { RecentActivity } from "./components/RecentActivity";
import { WeeklyOverview } from "./components/WeeklyOverview";

export function ProgressPage() {
  const now = new Date();
  const {
    completedWorkouts,
    totalWorkouts,
    totalMinutes,
    currentStreak: streak,
    weeklyCount,
    recentActivity,
  } = useProgressMetrics(now);
  const plan = useOnboardingStore((state) => state.generatedPlan);
  const { data: workouts = [] } = useWorkouts();
  const { data: serverProgress } = useUserProgress();
  const weeklyGoal = serverProgress?.weeklyGoal ?? 5;

  return (
    <AppContainer className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-meta uppercase tracking-[0.16em] text-accent">
            Consistency compounds
          </p>
          <h1 className="text-page-title mt-3">Your Progress</h1>
          <p className="text-body mt-3 max-w-2xl text-text-secondary">
            See how your consistency adds up over time.
          </p>
        </header>

        <div className="mt-8 grid min-w-0 gap-6 sm:mt-10 sm:gap-8">
          {totalWorkouts === 0 ? (
            <ProgressEmptyState />
          ) : (
            <ProgressSummary
              streak={streak}
              workouts={totalWorkouts}
              minutes={totalMinutes}
            />
          )}
          <ActivityChart
            completedWorkouts={completedWorkouts}
            now={now}
          />
          {totalWorkouts > 0 ? (
            <WeeklyOverview
              completedWorkouts={completedWorkouts}
              weeklyCount={weeklyCount}
              weeklyGoal={weeklyGoal}
              now={now}
            />
          ) : null}
          <PlanProgress
            plan={plan}
            completedWorkouts={completedWorkouts}
          />
          {recentActivity.length > 0 ? (
            <RecentActivity
              records={recentActivity}
              workouts={workouts}
              now={now}
            />
          ) : null}
        </div>
      </div>
    </AppContainer>
  );
}
