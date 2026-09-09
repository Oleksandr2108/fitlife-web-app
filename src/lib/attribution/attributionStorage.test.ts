import { beforeEach, describe, expect, it, vi } from "vitest";

const storage = vi.hoisted(() => ({ value: null as unknown }));
vi.mock("../storage", () => ({
  getStoredValue: () => storage.value,
  setStoredValue: (_key: string, value: unknown) => {
    storage.value = value;
    return true;
  },
}));

import {
  captureAttribution,
  getAttributionContext,
  resetAttributionMemoryForTests,
} from "./attributionStorage";
import type { AttributionData } from "../../types";

const google: AttributionData = {
  source: "google",
  medium: "cpc",
  campaign: "fitness",
  capturedAt: "2026-09-09T10:00:00.000Z",
  landingPath: "/",
};
const instagram: AttributionData = {
  source: "instagram",
  campaign: "retargeting",
  capturedAt: "2026-09-10T10:00:00.000Z",
  landingPath: "/",
};

describe("attribution storage", () => {
  beforeEach(() => {
    storage.value = null;
    resetAttributionMemoryForTests();
  });

  it("preserves first touch while updating current touch", () => {
    captureAttribution(google);
    captureAttribution(instagram);
    expect(getAttributionContext()).toEqual({
      firstTouch: google,
      currentTouch: instagram,
    });
  });

  it("does not erase attribution on a direct return", () => {
    captureAttribution(google);
    expect(captureAttribution(null)).toEqual({
      firstTouch: google,
      currentTouch: google,
    });
  });

  it("handles malformed persisted attribution safely", () => {
    storage.value = { version: 1, context: { firstTouch: { source: 4 } } };
    expect(getAttributionContext()).toEqual({ firstTouch: null, currentTouch: null });
  });
});
