import { describe, expect, it } from "vitest";
import { hasAnalyticsDebugFlag } from "./analyticsDebug";

describe("analytics debug availability", () => {
  it("enables the panel only for an explicit true flag", () => {
    expect(hasAnalyticsDebugFlag("?debugAnalytics=true")).toBe(true);
    expect(hasAnalyticsDebugFlag("?utm_source=google&debugAnalytics=true")).toBe(
      true,
    );
  });

  it("keeps the panel hidden for normal or non-matching URLs", () => {
    expect(hasAnalyticsDebugFlag("")).toBe(false);
    expect(hasAnalyticsDebugFlag("?debugAnalytics=false")).toBe(false);
    expect(hasAnalyticsDebugFlag("?debugAnalytics=True")).toBe(false);
  });
});
