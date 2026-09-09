export function hasAnalyticsDebugFlag(search: string): boolean {
  return new URLSearchParams(search).get("debugAnalytics") === "true";
}

const enabledAtStartup =
  typeof window !== "undefined" && hasAnalyticsDebugFlag(window.location.search);

export function isAnalyticsDebugEnabled(): boolean {
  return enabledAtStartup;
}
