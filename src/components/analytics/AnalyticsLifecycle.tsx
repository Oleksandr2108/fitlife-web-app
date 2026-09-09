import { usePageViewTracking } from "../../hooks/analytics/usePageViewTracking";

export function AnalyticsLifecycle() {
  usePageViewTracking();
  return null;
}
