import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../../lib/analytics/analytics";
import type {
  AnalyticsNavigationState,
  RecipeOpenSource,
  WorkoutOpenSource,
} from "../../types/analytics";

let lastNavigationSignature: string | null = null;

function getNavigationSource(state: unknown): unknown {
  if (!state || typeof state !== "object") return undefined;
  return (state as AnalyticsNavigationState).analyticsSource;
}

function getWorkoutSource(value: unknown): WorkoutOpenSource {
  return value === "home" ||
    value === "library" ||
    value === "plan" ||
    value === "progress"
    ? value
    : "unknown";
}

function getRecipeSource(value: unknown): RecipeOpenSource {
  return value === "nutrition_library" || value === "home"
    ? value
    : "unknown";
}

function decodeRouteId(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function trackRouteLifecycle(
  navigationKey: string,
  pathname: string,
  state: unknown,
  title?: string,
): void {
  const signature = `${navigationKey}:${pathname}`;
  if (lastNavigationSignature === signature) return;
  lastNavigationSignature = signature;

  trackEvent("page_view", { path: pathname, ...(title ? { title } : {}) });
  const source = getNavigationSource(state);
  const workoutMatch = pathname.match(/^\/workout\/([^/]+)$/);
  if (workoutMatch?.[1])
    trackEvent("workout_open", {
      workoutId: decodeRouteId(workoutMatch[1]),
      source: getWorkoutSource(source),
    });
  const recipeMatch = pathname.match(/^\/nutrition\/([^/]+)$/);
  if (recipeMatch?.[1])
    trackEvent("recipe_open", {
      recipeId: decodeRouteId(recipeMatch[1]),
      source: getRecipeSource(source),
    });
}

export function resetPageViewTrackingForTests(): void {
  lastNavigationSignature = null;
}

export function usePageViewTracking(): void {
  const location = useLocation();
  useEffect(() => {
    trackRouteLifecycle(
      location.key,
      location.pathname,
      location.state,
      document.title,
    );
  }, [location.key, location.pathname, location.state]);
}
