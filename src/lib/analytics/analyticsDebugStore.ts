import type { AnalyticsEnvelope } from "../../types/analytics";

const EVENT_LIMIT = 75;
let events: AnalyticsEnvelope[] = [];
const listeners = new Set<() => void>();

export function getDebugEvents(): AnalyticsEnvelope[] {
  return events;
}

export function subscribeToDebugEvents(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function appendDebugEvent(event: AnalyticsEnvelope): void {
  if (!import.meta.env.DEV) return;
  events = [...events.slice(-(EVENT_LIMIT - 1)), event];
  listeners.forEach((listener) => listener());
}

export function clearDebugEvents(): void {
  events = [];
  listeners.forEach((listener) => listener());
}
