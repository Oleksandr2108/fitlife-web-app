import type {
  AnalyticsEnvelope,
  AnalyticsEventMap,
  AnalyticsEventName,
} from "../../types/analytics";
import { getAttributionContext } from "../attribution/attributionStorage";
import { initializeAttribution } from "../attribution/attribution";
import { appendDebugEvent } from "./analyticsDebugStore";
import {
  noopAnalyticsProvider,
  type AnalyticsProvider,
} from "./analyticsProvider";
import { consoleAnalyticsProvider } from "./consoleAnalyticsProvider";
import { getAnonymousId, getSessionId, initializeIdentity } from "./identity";

let provider: AnalyticsProvider = import.meta.env.DEV
  ? consoleAnalyticsProvider
  : noopAnalyticsProvider;

export function initializeAnalytics(): void {
  initializeAttribution(window.location.search, window.location.pathname);
  initializeIdentity();
}

export function createAnalyticsEnvelope<Name extends AnalyticsEventName>(
  name: Name,
  properties: AnalyticsEventMap[Name],
  now = new Date(),
): AnalyticsEnvelope<Name> {
  const attribution = getAttributionContext();
  return {
    name,
    timestamp: now.toISOString(),
    anonymousId: getAnonymousId(),
    sessionId: getSessionId(),
    path: window.location.pathname,
    firstTouch: attribution.firstTouch,
    currentTouch: attribution.currentTouch,
    properties,
  } as AnalyticsEnvelope<Name>;
}

export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  properties: AnalyticsEventMap[Name],
): void {
  try {
    const event = createAnalyticsEnvelope(name, properties);
    appendDebugEvent(event);
    const result = provider.track(event);
    if (result instanceof Promise) void result.catch(() => undefined);
  } catch {
    // Analytics must never interrupt the product action that emitted it.
  }
}

export function setAnalyticsProvider(nextProvider: AnalyticsProvider): void {
  provider = nextProvider;
}
