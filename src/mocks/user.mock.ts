import type { User } from "../types";

export const currentUserMock: User = {
  id: "user-001",
  firstName: "Alex",
  preferences: { goal: "stay-active", preferredWorkoutDuration: 20 },
  createdAt: "2026-08-18T09:00:00.000Z",
};
