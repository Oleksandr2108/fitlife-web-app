import { afterEach, describe, expect, it, vi } from "vitest";
import type { AttributionData } from "../../types";

const touch: AttributionData = {
  source: "google",
  campaign: "fitness",
  capturedAt: "2026-09-09T09:00:00.000Z",
  landingPath: "/",
};
vi.mock("./identity", () => ({
  getAnonymousId: () => "anon_test",
  getSessionId: () => "sess_test",
  initializeIdentity: () => ({ anonymousId: "anon_test", sessionId: "sess_test" }),
}));
vi.mock("../attribution/attributionStorage", () => ({
  getAttributionContext: () => ({ firstTouch: touch, currentTouch: touch }),
}));

import { createAnalyticsEnvelope } from "./analytics";

describe("analytics envelope", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("adds identity, route, timestamp and attribution centrally", () => {
    vi.stubGlobal("window", { location: { pathname: "/workouts" } });
    expect(
      createAnalyticsEnvelope(
        "goal_selected",
        { goal: "build-strength" },
        new Date("2026-09-09T12:00:00.000Z"),
      ),
    ).toEqual({
      name: "goal_selected",
      properties: { goal: "build-strength" },
      timestamp: "2026-09-09T12:00:00.000Z",
      anonymousId: "anon_test",
      sessionId: "sess_test",
      path: "/workouts",
      firstTouch: touch,
      currentTouch: touch,
    });
  });
});
