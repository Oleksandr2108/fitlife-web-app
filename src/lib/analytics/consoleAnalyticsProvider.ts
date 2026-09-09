import type { AnalyticsProvider } from "./analyticsProvider";

export const consoleAnalyticsProvider: AnalyticsProvider = {
  track(event) {
    console.info("[FitLife Analytics]", event.name, event);
  },
};
