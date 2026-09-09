import { useEffect } from "react";
import { useWorkoutSessionStore } from "../../store/workoutSession.store";
import type { Workout } from "../../types";

export function useWorkoutTimer(workout: Workout | null) {
  const status = useWorkoutSessionStore((state) => state.status)
  const tick = useWorkoutSessionStore((state) => state.tick);

  useEffect(() => {
    if (!workout || status !== "active") return;

    const intervalId = window.setInterval(() => tick(workout), 250);
    return () => window.clearInterval(intervalId);
  }, [status, tick, workout]);
}
