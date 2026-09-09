import { Clock3, Dumbbell, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../lib/motion";

interface ProgressSummaryProps {
  streak: number;
  workouts: number;
  minutes: number;
}

const stats = [
  { key: "streak", label: "Current streak", icon: Flame },
  { key: "workouts", label: "Completed workouts", icon: Dumbbell },
  { key: "minutes", label: "Training time", icon: Clock3 },
] as const;

export function ProgressSummary({
  streak,
  workouts,
  minutes,
}: ProgressSummaryProps) {
  const values = {
    streak: `${streak} ${streak === 1 ? "day" : "days"}`,
    workouts: String(workouts),
    minutes: `${minutes} min`,
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
      aria-label="Progress summary"
    >
      {stats.map(({ key, label, icon: Icon }, index) => (
        <motion.article
          key={key}
          variants={fadeUp}
          className={`rounded-surface border border-border bg-surface p-4 shadow-surface sm:p-5 ${index === 0 ? "col-span-2 sm:col-span-1" : ""}`}
        >
          <span className="grid size-10 place-items-center rounded-control bg-accent-soft text-accent">
            <Icon
              aria-hidden="true"
              className="size-5"
            />
          </span>
          <p className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            {values[key]}
          </p>
          <p className="mt-1 text-sm text-text-secondary">{label}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
