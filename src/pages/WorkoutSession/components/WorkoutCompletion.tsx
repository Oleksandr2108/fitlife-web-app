import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import type { Workout } from "../../../types";

interface WorkoutCompletionProps {
  workout: Workout;
  hasPlanContext: boolean;
}

export function WorkoutCompletion({
  workout,
  hasPlanContext,
}: WorkoutCompletionProps) {
  return (
    <main className="grid min-h-dvh place-items-center px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(2rem+env(safe-area-inset-top))] sm:px-6">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg rounded-surface border border-border bg-surface p-6 text-center shadow-surface sm:p-10"
      >
        <motion.span
          variants={fadeUp}
          className="mx-auto grid size-20 place-items-center rounded-full bg-accent text-accent-foreground"
        >
          <Check
            aria-hidden="true"
            className="size-10"
            strokeWidth={3}
          />
        </motion.span>
        <motion.p
          variants={fadeUp}
          className="text-meta mt-6 uppercase tracking-[0.16em] text-accent"
        >
          Workout complete
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-section-title mt-3"
        >
          Great work!
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 leading-7 text-text-secondary"
        >
          You completed {workout.title}.
        </motion.p>
        <motion.dl
          variants={fadeUp}
          className="mt-7 grid grid-cols-2 gap-3"
        >
          <div className="rounded-control bg-surface-muted p-4">
            <dt className="text-xs text-text-muted">Duration</dt>
            <dd className="mt-1 text-xl font-bold">
              {workout.durationMinutes} min
            </dd>
          </div>
          <div className="rounded-control bg-surface-muted p-4">
            <dt className="text-xs text-text-muted">Exercises</dt>
            <dd className="mt-1 text-xl font-bold">
              {workout.exercises.length}
            </dd>
          </div>
        </motion.dl>
        <motion.div
          variants={fadeUp}
          className="mt-7 grid gap-3"
        >
          <ButtonLink
            to="/progress"
            size="large"
          >
            View Progress
          </ButtonLink>
          <ButtonLink
            to={hasPlanContext ? "/plan" : "/workouts"}
            size="large"
            variant="ghost"
          >
            {hasPlanContext ? "Back to My Plan" : "Browse Workouts"}
          </ButtonLink>
        </motion.div>
      </motion.section>
    </main>
  );
}
