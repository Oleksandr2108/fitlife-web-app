export interface MacroValues {
  proteinGrams: number;
  carbohydrateGrams: number;
  fatGrams: number;
}

export interface MacroCompositionItem {
  key: "protein" | "carbohydrates" | "fat";
  label: string;
  grams: number;
  percentage: number;
}

export function calculateMacroComposition(
  values: MacroValues,
): MacroCompositionItem[] {
  const proteinGrams = Math.max(0, values.proteinGrams);
  const carbohydrateGrams = Math.max(0, values.carbohydrateGrams);
  const fatGrams = Math.max(0, values.fatGrams);
  const energy = [proteinGrams * 4, carbohydrateGrams * 4, fatGrams * 9];
  const totalEnergy = energy.reduce((total, value) => total + value, 0);
  const percentage = (value: number) =>
    totalEnergy > 0 ? Math.round((value / totalEnergy) * 100) : 0;

  return [
    {
      key: "protein",
      label: "Protein",
      grams: proteinGrams,
      percentage: percentage(energy[0]),
    },
    {
      key: "carbohydrates",
      label: "Carbs",
      grams: carbohydrateGrams,
      percentage: percentage(energy[1]),
    },
    {
      key: "fat",
      label: "Fat",
      grams: fatGrams,
      percentage: percentage(energy[2]),
    },
  ];
}
