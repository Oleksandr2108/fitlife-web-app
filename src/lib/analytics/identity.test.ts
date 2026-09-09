import { beforeEach, describe, expect, it, vi } from "vitest";

const storage = vi.hoisted(() => ({
  local: null as unknown,
  session: null as string | null,
  fail: false,
}));
vi.mock("../storage", () => ({
  getStoredValue: () => (storage.fail ? null : storage.local),
  setStoredValue: (_key: string, value: unknown) => {
    if (storage.fail) return false;
    storage.local = value;
    return true;
  },
  getSessionStoredValue: () => (storage.fail ? null : storage.session),
  setSessionStoredValue: (_key: string, value: string) => {
    if (storage.fail) return false;
    storage.session = value;
    return true;
  },
}));

import {
  getAnonymousId,
  getSessionId,
  resetIdentityMemoryForTests,
} from "./identity";

describe("analytics identity", () => {
  beforeEach(() => {
    storage.local = null;
    storage.session = null;
    storage.fail = false;
    resetIdentityMemoryForTests();
  });

  it("persists an anonymous ID and keeps session identity distinct", () => {
    const anonymousId = getAnonymousId();
    const sessionId = getSessionId();
    expect(anonymousId).toMatch(/^anon_/);
    expect(sessionId).toMatch(/^sess_/);
    expect(getAnonymousId()).toBe(anonymousId);
    expect(getSessionId()).toBe(sessionId);
    expect(anonymousId).not.toBe(sessionId);
  });

  it("falls back to stable in-memory IDs when storage is unavailable", () => {
    storage.fail = true;
    expect(() => getAnonymousId()).not.toThrow();
    expect(getAnonymousId()).toBe(getAnonymousId());
    expect(getSessionId()).toBe(getSessionId());
  });
});
