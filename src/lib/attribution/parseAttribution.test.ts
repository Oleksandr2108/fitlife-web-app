import { describe, expect, it } from "vitest";
import { parseAttribution } from "./parseAttribution";

describe("parseAttribution", () => {
  it("parses a full UTM set with capture metadata", () => {
    expect(
      parseAttribution(
        "?utm_source=google&utm_medium=cpc&utm_campaign=fitness&utm_content=video&utm_term=home",
        "/",
        "2026-09-09T10:00:00.000Z",
      ),
    ).toEqual({
      source: "google",
      medium: "cpc",
      campaign: "fitness",
      content: "video",
      term: "home",
      capturedAt: "2026-09-09T10:00:00.000Z",
      landingPath: "/",
    });
  });

  it("supports partial attribution and trims values", () => {
    expect(parseAttribution("?utm_source=%20instagram%20", "/offer")).toMatchObject({
      source: "instagram",
      landingPath: "/offer",
    });
  });

  it("ignores empty and unrelated parameters", () => {
    expect(parseAttribution("?utm_source=%20&debugAnalytics=true", "/")).toBeNull();
  });

  it("does not mutate supplied URLSearchParams", () => {
    const params = new URLSearchParams("utm_source=google&other=value");
    const before = params.toString();
    parseAttribution(params, "/");
    expect(params.toString()).toBe(before);
  });
});
