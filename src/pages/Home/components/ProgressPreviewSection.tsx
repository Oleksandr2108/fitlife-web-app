import { motion } from "framer-motion";
import { CalendarCheck2, Flame, Timer } from "lucide-react";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { useUserProgress } from "../../../hooks/queries/useUserProgress";
import { useProgressMetrics } from "../../../hooks/useProgressMetrics";
import { fadeUp } from "../../../lib/motion";
import { SectionHeading } from "./SectionHeading";

export function ProgressPreviewSection() {
  const { data, isPending, isError, refetch } = useUserProgress();
  const {
    weeklyCount: completedThisWeek,
    currentStreak,
    totalMinutes,
  } = useProgressMetrics();
  const weeklyGoal = data?.weeklyGoal ?? 5;
  const progress = Math.min((completedThisWeek / weeklyGoal) * 100, 100);

  return (
    <Section className="border-y border-border bg-background-secondary">
      <AppContainer className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="See your momentum"
          title="Progress you can actually feel"
          description="Small sessions add up. FitLife keeps your weekly routine visible and motivating."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="rounded-[1.25rem] border border-border bg-surface p-5 shadow-surface sm:p-7"
        >
          {isPending ? (
            <div className="animate-pulse space-y-5">
              <div className="h-5 w-1/2 rounded bg-surface-muted" />
              <div className="h-20 rounded bg-surface-muted" />
              <div className="h-3 rounded bg-surface-muted" />
            </div>
          ) : null}
          {isError ? (
            <div>
              <p className="text-text-secondary">We couldn’t load progress.</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-3 min-h-11 font-semibold text-accent"
              >
                Try again
              </button>
            </div>
          ) : null}
          {data ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-meta uppercase text-text-muted">
                    Your weekly progress
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {completedThisWeek} of {weeklyGoal} workouts
                  </p>
                </div>
                <span className="grid size-12 place-items-center rounded-control bg-accent-soft text-accent">
                  <CalendarCheck2
                    aria-hidden="true"
                    className="size-6"
                  />
                </span>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-control bg-surface-muted p-4">
                  <Flame
                    aria-hidden="true"
                    className="size-5 text-accent"
                  />
                  <p className="mt-3 text-xl font-bold">
                    {currentStreak} days
                  </p>
                  <p className="text-xs text-text-muted">Current streak</p>
                </div>
                <div className="rounded-control bg-surface-muted p-4">
                  <Timer
                    aria-hidden="true"
                    className="size-5 text-accent"
                  />
                  <p className="mt-3 text-xl font-bold">
                    {totalMinutes} min
                  </p>
                  <p className="text-xs text-text-muted">Total movement</p>
                </div>
              </div>
            </>
          ) : null}
        </motion.div>
      </AppContainer>
    </Section>
  );
}
