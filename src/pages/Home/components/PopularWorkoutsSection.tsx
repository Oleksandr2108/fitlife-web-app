import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { ButtonLink } from "../../../components/ui/Button";
import { WorkoutCard } from "../../../components/workouts/WorkoutCard";
import { WorkoutCardSkeleton } from "../../../components/workouts/WorkoutCardSkeleton";
import { useWorkouts } from "../../../hooks/queries/useWorkouts";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import { SectionHeading } from "./SectionHeading";

export function PopularWorkoutsSection() {
  const { data, isPending, isError, refetch } = useWorkouts();
  return (
    <Section>
      <AppContainer>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Popular workouts"
            title="Move in a way that works for you"
            description="Approachable sessions designed for different goals and schedules."
          />
          <ButtonLink
            to="/workouts"
            variant="ghost"
            icon={ArrowRight}
            className="self-start sm:self-auto"
          >
            View All Workouts
          </ButtonLink>
        </div>
        {isError ? (
          <div className="mt-8 rounded-surface border border-border bg-surface p-5">
            <p className="text-text-secondary">We couldn’t load workouts.</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 min-h-11 font-semibold text-accent"
            >
              Try again
            </button>
          </div>
        ) : null}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-8 grid gap-5 md:grid-cols-3"
        >
          {isPending
            ? Array.from({ length: 3 }, (_, index) => (
                <WorkoutCardSkeleton key={index} />
              ))
            : data?.slice(0, 3).map((workout) => (
                <motion.div
                  key={workout.id}
                  variants={fadeUp}
                >
                  <WorkoutCard workout={workout} />
                </motion.div>
              ))}
        </motion.div>
      </AppContainer>
    </Section>
  );
}
