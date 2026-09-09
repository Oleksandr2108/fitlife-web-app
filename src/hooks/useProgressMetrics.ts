import {
  calculateCurrentStreak,
  calculateTotalMinutes,
  calculateTotalWorkouts,
  calculateWeeklyCount,
  getRecentActivity,
} from "../lib/progress/calculateProgress";
import { useProgressStore } from "../store/progress.store";

export function useProgressMetrics(now = new Date()) {
  const completedWorkouts = useProgressStore(
    (state) => state.completedWorkouts,
  );

  return {
    completedWorkouts,
    totalWorkouts: calculateTotalWorkouts(completedWorkouts),
    totalMinutes: calculateTotalMinutes(completedWorkouts),
    currentStreak: calculateCurrentStreak(completedWorkouts, now),
    weeklyCount: calculateWeeklyCount(completedWorkouts, now),
    recentActivity: getRecentActivity(completedWorkouts, 5, now),
  };
}
