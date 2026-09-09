import { delay } from "../lib/delay";
import { userProgressMock } from "../mocks/progress.mock";
import { currentUserMock } from "../mocks/user.mock";
import type { User, UserProgress } from "../types";

const MOCK_DELAY_MS = 150;
export async function getCurrentUser(): Promise<User> {
  await delay(MOCK_DELAY_MS);
  return currentUserMock;
}
export async function getUserProgress(): Promise<UserProgress> {
  await delay(MOCK_DELAY_MS);
  return userProgressMock;
}
