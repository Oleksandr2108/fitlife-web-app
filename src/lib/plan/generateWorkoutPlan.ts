import type {
  FitnessGoal,
  Workout,
  WorkoutCategory,
  WorkoutDuration,
  WorkoutPlan,
} from "../../types";

interface GenerateWorkoutPlanInput {
  goal: FitnessGoal;
  duration: WorkoutDuration;
  workouts: Workout[];
  instanceId?: string;
}

let fallbackSequence = 0;

export function createPlanInstanceId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return `plan-${globalThis.crypto.randomUUID()}`;
  }
  fallbackSequence += 1;
  return `plan-${Date.now().toString(36)}-${fallbackSequence.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const goalSchedules: Record<FitnessGoal, Array<WorkoutCategory | null>> = {
  "lose-weight": [
    "full-body",
    "cardio",
    null,
    "core",
    "cardio",
    "full-body",
    null,
  ],
  "build-strength": [
    "strength",
    "full-body",
    null,
    "strength",
    "core",
    "full-body",
    null,
  ],
  "stay-active": [
    "full-body",
    "cardio",
    null,
    "mobility",
    "full-body",
    "core",
    null,
  ],
  "improve-mobility": [
    "mobility",
    "core",
    null,
    "mobility",
    "full-body",
    "mobility",
    null,
  ],
};

function workoutScore(
  workout: Workout,
  category: WorkoutCategory,
  duration: WorkoutDuration,
  useCount: number,
) {
  const categoryPenalty = workout.category === category ? 0 : 40;
  const durationPenalty = Math.abs(workout.durationMinutes - duration);
  return categoryPenalty + durationPenalty + useCount * 15;
}

export function generateWorkoutPlan({
  goal,
  duration,
  workouts,
  instanceId,
}: GenerateWorkoutPlanInput): WorkoutPlan {
  const usage = new Map<string, number>();
  const days = goalSchedules[goal].map((category, index) => {
    if (category === null || workouts.length === 0) {
      return { day: index + 1, workoutId: null, isRestDay: true };
    }

    const workout = [...workouts].sort((first, second) => {
      const scoreDifference =
        workoutScore(first, category, duration, usage.get(first.id) ?? 0) -
        workoutScore(second, category, duration, usage.get(second.id) ?? 0);
      return scoreDifference || first.id.localeCompare(second.id);
    })[0];

    if (!workout) {
      return { day: index + 1, workoutId: null, isRestDay: true };
    }

    usage.set(workout.id, (usage.get(workout.id) ?? 0) + 1);
    return { day: index + 1, workoutId: workout.id, isRestDay: false };
  });

  return {
    id: instanceId ?? createPlanInstanceId(),
    goal,
    duration,
    days,
  };
}
