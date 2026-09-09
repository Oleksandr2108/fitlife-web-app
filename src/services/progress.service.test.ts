import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CompletedWorkout } from "../types";

const storage = vi.hoisted(() => ({ value: null as unknown }));

vi.mock("../lib/storage", () => ({
  getStoredValue: () => storage.value,
  setStoredValue: (_key: string, value: unknown) => {
    storage.value = value;
    return true;
  },
}));

import {
  getInitialCompletedWorkouts,
  getLocalCompletedWorkouts,
  recordCompletedWorkout,
} from "./progress.service";

function storedRecords(): unknown {
  if (!storage.value || typeof storage.value !== "object") return null;
  return (storage.value as { records?: unknown }).records;
}

describe("completed workout seed", () => {
  beforeEach(() => {
    storage.value = null;
  });

  it("seeds an empty history once and returns the stored records on refresh", () => {
    const firstLoad = getInitialCompletedWorkouts();
    const secondLoad = getInitialCompletedWorkouts();

    expect(firstLoad).toHaveLength(19);
    expect(secondLoad).toEqual(firstLoad);
    expect(storage.value).toMatchObject({ version: 1, records: firstLoad });
  });

  it("seeds a stored empty array", () => {
    storage.value = [];
    expect(getInitialCompletedWorkouts()).toHaveLength(19);
  });

  it("does not overwrite existing user workout history", () => {
    const existingRecord: CompletedWorkout = {
      id: "completed-user-session",
      workoutId: "workout-001",
      completedAt: new Date(2026, 8, 8, 10).toISOString(),
      durationMinutes: 20,
      exerciseCount: 3,
    };
    storage.value = [existingRecord];

    expect(getInitialCompletedWorkouts()).toEqual([existingRecord]);
    expect(storage.value).toMatchObject({
      version: 1,
      records: [existingRecord],
    });
  });

  it("does not append the same completed workout twice", () => {
    const existingRecord: CompletedWorkout = {
      id: "completed-once",
      workoutId: "workout-001",
      completedAt: new Date(2026, 8, 8, 10).toISOString(),
      durationMinutes: 20,
      exerciseCount: 3,
    };
    storage.value = { version: 1, records: [existingRecord] };

    expect(recordCompletedWorkout(existingRecord)).toEqual([existingRecord]);
    expect(storedRecords()).toEqual([existingRecord]);
  });

  it("does not persist a malformed new completed workout", () => {
    const malformed = {
      id: "malformed",
      workoutId: "workout-001",
      completedAt: "invalid",
      durationMinutes: Infinity,
      exerciseCount: -1,
    };
    storage.value = { version: 1, records: [] };

    expect(recordCompletedWorkout(malformed)).toEqual([]);
    expect(storedRecords()).toEqual([]);
  });

  it("filters malformed numeric values and completion dates", () => {
    const validRecord: CompletedWorkout = {
      id: "valid",
      workoutId: "workout-001",
      completedAt: new Date(2026, 8, 8, 10).toISOString(),
      durationMinutes: 20,
      exerciseCount: 3,
    };
    storage.value = {
      version: 1,
      records: [
        validRecord,
        { ...validRecord, id: "nan", durationMinutes: Number.NaN },
        { ...validRecord, id: "infinity", durationMinutes: Infinity },
        { ...validRecord, id: "negative-duration", durationMinutes: -1 },
        { ...validRecord, id: "negative-count", exerciseCount: -1 },
        { ...validRecord, id: "invalid-date", completedAt: "not-a-date" },
        null,
      ],
    };

    expect(getLocalCompletedWorkouts()).toEqual([validRecord]);
  });

  it("safely rejects an unsupported persisted schema version", () => {
    storage.value = { version: 99, records: [] };

    expect(getInitialCompletedWorkouts()).toEqual([]);
    expect(storedRecords()).toEqual([]);
  });
});
