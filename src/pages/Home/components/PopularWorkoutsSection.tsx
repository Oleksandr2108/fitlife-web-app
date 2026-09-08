import { motion } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { ButtonLink } from "../../../components/ui/Button";
import { useWorkouts } from "../../../hooks/queries/useWorkouts";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import type { Workout } from "../../../types";
import { SectionHeading } from "./SectionHeading";

function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      to={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-surface border border-border bg-surface shadow-surface transition-colors hover:border-border-strong"
    >
      <div className="overflow-hidden">
        <img
          src={workout.imageUrl}
          alt={`${workout.title} workout`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-meta capitalize text-accent">
            {workout.category.replace("-", " ")}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-text-muted">
            <Clock3
              aria-hidden="true"
              className="size-3.5"
            />
            {workout.durationMinutes} min
          </span>
        </div>
        <h3 className="text-card-title mt-3">{workout.title}</h3>
        <p className="mt-2 text-sm capitalize text-text-secondary">
          {workout.difficulty} ·{" "}
          {workout.equipment.length
            ? workout.equipment.join(", ")
            : "No equipment"}
        </p>
      </div>
    </Link>
  );
}

function WorkoutSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-surface border border-border bg-surface">
      <div className="aspect-[16/10] bg-surface-muted" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-surface-muted" />
        <div className="h-5 w-2/3 rounded bg-surface-muted" />
        <div className="h-4 w-1/2 rounded bg-surface-muted" />
      </div>
    </div>
  );
}

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
                <WorkoutSkeleton key={index} />
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
