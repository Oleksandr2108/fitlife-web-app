import type { AnalyticsEnvelope } from "../../types/analytics";

export interface AnalyticsProvider {
  track(event: AnalyticsEnvelope): void | Promise<void>;
}

export const noopAnalyticsProvider: AnalyticsProvider = {
  track: () => undefined,
};
