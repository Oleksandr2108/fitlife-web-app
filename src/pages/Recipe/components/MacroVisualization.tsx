import { motion, useReducedMotion } from "framer-motion";
import { calculateMacroComposition } from "../../../lib/nutrition/calculateMacroComposition";
import type { Recipe } from "../../../types";

export function MacroVisualization({ recipe }: { recipe: Recipe }) {
  const reduceMotion = useReducedMotion();
  const macros = calculateMacroComposition(recipe);
  return (
    <section
      className="rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6"
      aria-labelledby="macro-heading"
    >
      <h2
        id="macro-heading"
        className="text-section-title"
      >
        Macro composition
      </h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Relative share of energy from protein, carbohydrates, and fat in this
        recipe—not a daily target.
      </p>
      <div className="mt-6 grid gap-5">
        {macros.map((macro) => (
          <div key={macro.key}>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold">{macro.label}</span>
              <span className="text-text-secondary">
                {macro.grams}g · {macro.percentage}%
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: reduceMotion ? `${macro.percentage}%` : 0 }}
                whileInView={{ width: `${macro.percentage}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
