import { describe, expect, it } from "vitest";
import { calculateMacroComposition } from "./calculateMacroComposition";

describe("calculateMacroComposition", () => {
  it("calculates macro shares from caloric contribution without mutating the input", () => {
    const values = { proteinGrams: 30, carbohydrateGrams: 40, fatGrams: 10 };
    const snapshot = { ...values };
    const result = calculateMacroComposition(values);
    expect(result.map((macro) => macro.percentage)).toEqual([32, 43, 24]);
    expect(values).toEqual(snapshot);
    expect(result.every((macro) => Number.isFinite(macro.percentage))).toBe(
      true,
    );
  });

  it("handles zero and negative macro values safely", () => {
    const result = calculateMacroComposition({
      proteinGrams: 0,
      carbohydrateGrams: 0,
      fatGrams: -2,
    });
    expect(result.map((macro) => macro.percentage)).toEqual([0, 0, 0]);
    expect(result.map((macro) => macro.grams)).toEqual([0, 0, 0]);
  });
});
