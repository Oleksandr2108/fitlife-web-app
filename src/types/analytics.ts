import type { AttributionData, FitnessGoal, WorkoutDuration } from "./index";

export type WorkoutOpenSource =
  | "home"
  | "library"
  | "plan"
  | "progress"
  | "unknown";
export type RecipeOpenSource = "nutrition_library" | "home" | "unknown";

export interface AnalyticsEventMap {
  page_view: { path: string; title?: string };
  click_start: { location: "hero" | "final_cta" | "progress_empty" };
  goal_selected: { goal: FitnessGoal };
  duration_selected: { duration: WorkoutDuration };
  plan_created: {
    planId: string;
    goal: FitnessGoal;
    duration: WorkoutDuration;
  };
  workout_open: { workoutId: string; source: WorkoutOpenSource };
  workout_started: { workoutId: string; planId?: string };
  workout_completed: {
    workoutId: string;
    actualDurationMinutes: number;
    planId?: string;
  };
  nutrition_open: { source?: "navigation" | "home" };
  recipe_open: { recipeId: string; source: RecipeOpenSource };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

interface AnalyticsEnvelopeContext {
  timestamp: string;
  anonymousId: string;
  sessionId: string;
  path: string;
  firstTouch: AttributionData | null;
  currentTouch: AttributionData | null;
}

export type AnalyticsEnvelope<
  Name extends AnalyticsEventName = AnalyticsEventName,
> = AnalyticsEnvelopeContext & {
  name: Name;
  properties: AnalyticsEventMap[Name];
};

export interface AnalyticsNavigationState {
  analyticsSource?: WorkoutOpenSource | RecipeOpenSource;
}
