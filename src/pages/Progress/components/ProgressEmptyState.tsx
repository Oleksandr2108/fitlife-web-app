import { ArrowRight, ChartNoAxesCombined } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";

export function ProgressEmptyState() {
  return (
    <section className="rounded-surface border border-border bg-surface p-6 text-center shadow-surface sm:p-8">
      <span className="mx-auto grid size-12 place-items-center rounded-control bg-accent-soft text-accent">
        <ChartNoAxesCombined
          aria-hidden="true"
          className="size-6"
        />
      </span>
      <h2 className="text-card-title mt-5">
        Your progress starts with your first workout.
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-text-secondary">
        Complete a session and your activity, streak and training time will
        appear here.
      </p>
      <ButtonLink
        to="/workouts"
        icon={ArrowRight}
        className="mt-5 w-full min-[430px]:w-auto"
      >
        Find a Workout
      </ButtonLink>
    </section>
  );
}
