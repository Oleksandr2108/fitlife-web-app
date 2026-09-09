import { beforeEach, describe, expect, it, vi } from "vitest";

const trackEvent = vi.hoisted(() => vi.fn());
vi.mock("../../lib/analytics/analytics", () => ({ trackEvent }));

import {
  resetPageViewTrackingForTests,
  trackRouteLifecycle,
} from "./usePageViewTracking";

describe("route analytics lifecycle", () => {
  beforeEach(() => {
    trackEvent.mockClear();
    resetPageViewTrackingForTests();
  });

  it("emits one page view for a StrictMode-style duplicate effect", () => {
    trackRouteLifecycle("default", "/", null, "FitLife");
    trackRouteLifecycle("default", "/", null, "FitLife");
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("page_view", {
      path: "/",
      title: "FitLife",
    });
  });

  it("tracks detail opens with explicit navigation source", () => {
    trackRouteLifecycle("key-2", "/workout/workout-001", { analyticsSource: "home" });
    expect(trackEvent).toHaveBeenNthCalledWith(2, "workout_open", {
      workoutId: "workout-001",
      source: "home",
    });
  });
});
