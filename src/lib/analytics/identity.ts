import {
  getSessionStoredValue,
  getStoredValue,
  setSessionStoredValue,
  setStoredValue,
} from "../storage";

const ANONYMOUS_ID_KEY = "fitlife-anonymous-id";
const SESSION_ID_KEY = "fitlife-session-id";
let memoryAnonymousId: string | null = null;
let memorySessionId: string | null = null;
let fallbackSequence = 0;

function createId(prefix: "anon" | "sess"): string {
  if (typeof globalThis.crypto?.randomUUID === "function")
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  fallbackSequence += 1;
  return `${prefix}_${Date.now().toString(36)}_${fallbackSequence.toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function isValidId(value: unknown, prefix: "anon" | "sess"): value is string {
  return typeof value === "string" && value.startsWith(`${prefix}_`) && value.length > 8;
}

export function getAnonymousId(): string {
  const stored = getStoredValue<unknown>(ANONYMOUS_ID_KEY);
  if (isValidId(stored, "anon")) {
    memoryAnonymousId = stored;
    return stored;
  }
  if (memoryAnonymousId) return memoryAnonymousId;
  memoryAnonymousId = createId("anon");
  setStoredValue(ANONYMOUS_ID_KEY, memoryAnonymousId);
  return memoryAnonymousId;
}

export function getSessionId(): string {
  const stored = getSessionStoredValue(SESSION_ID_KEY);
  if (isValidId(stored, "sess")) {
    memorySessionId = stored;
    return stored;
  }
  if (memorySessionId) return memorySessionId;
  memorySessionId = createId("sess");
  setSessionStoredValue(SESSION_ID_KEY, memorySessionId);
  return memorySessionId;
}

export function initializeIdentity() {
  return { anonymousId: getAnonymousId(), sessionId: getSessionId() };
}

export function resetIdentityMemoryForTests(): void {
  memoryAnonymousId = null;
  memorySessionId = null;
}
