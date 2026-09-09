import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, RotateCcw } from "lucide-react";
import { AppContainer } from "../../components/layout/AppContainer";
import { WorkoutCard } from "../../components/workouts/WorkoutCard";
import { WorkoutCardSkeleton } from "../../components/workouts/WorkoutCardSkeleton";
import { Button } from "../../components/ui/Button";
import { useWorkouts } from "../../hooks/queries/useWorkouts";
import { fadeUp, staggerContainer } from "../../lib/motion";
import {
  filterWorkouts,
  type WorkoutCategoryFilter,
  type WorkoutDifficultyFilter,
} from "../../lib/workouts/filterWorkouts";
import { WorkoutFilters } from "./components/WorkoutFilters";
import { WorkoutSearch } from "./components/WorkoutSearch";

export function WorkoutsPage() {
  const { data, isPending, isError, refetch } = useWorkouts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<WorkoutCategoryFilter>("all");
  const [difficulty, setDifficulty] = useState<WorkoutDifficultyFilter>("all");

  const workouts = data ?? [];
  const filteredWorkouts = filterWorkouts(workouts, {
    search,
    category,
    difficulty,
  });
  const hasActiveFilters =
    search.trim().length > 0 || category !== "all" || difficulty !== "all";

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
  }

  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <AppContainer>
        <div className="max-w-2xl">
          <p className="text-meta text-accent">Workout library</p>
          <h1 className="text-page-title mt-3">Find your next workout</h1>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            Search focused sessions by goal, movement style, or experience
            level.
          </p>
        </div>

        <div className="mt-8 grid min-w-0 max-w-full gap-6 rounded-surface border border-border bg-surface p-4 shadow-surface sm:p-6 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <WorkoutSearch
            value={search}
            onChange={setSearch}
          />
          <WorkoutFilters
            category={category}
            difficulty={difficulty}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
          />
        </div>

        {isError ? (
          <div className="mt-8 rounded-surface border border-border bg-surface p-6 text-center">
            <h2 className="text-card-title">
              We couldn’t load the workout library
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Check your connection and try again.
            </p>
            <Button
              className="mt-5"
              onClick={() => void refetch()}
            >
              Try again
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 flex min-h-11 items-center justify-between gap-4">
              <p
                className="text-sm text-text-secondary"
                aria-live="polite"
              >
                {isPending
                  ? "Loading workouts…"
                  : `${filteredWorkouts.length} ${filteredWorkouts.length === 1 ? "workout" : "workouts"}`}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <RotateCcw
                    aria-hidden="true"
                    className="size-4"
                  />
                  Reset filters
                </button>
              ) : null}
            </div>

            {isPending ? (
              <div
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Loading workouts"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <WorkoutCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredWorkouts.length > 0 ? (
              <motion.div
                key={`${search}-${category}-${difficulty}`}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredWorkouts.map((workout) => (
                  <motion.div
                    key={workout.id}
                    variants={fadeUp}
                  >
                    <WorkoutCard workout={workout} source="library" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-surface border border-dashed border-border-strong bg-surface p-8 text-center sm:p-12">
                <Dumbbell
                  aria-hidden="true"
                  className="mx-auto size-9 text-accent"
                />
                <h2 className="text-card-title mt-4">
                  No workouts match those filters
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
                  Try a broader search or reset the filters to see the full
                  library.
                </p>
                <Button
                  className="mt-5"
                  variant="secondary"
                  onClick={resetFilters}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </>
        )}
      </AppContainer>
    </div>
  );
}
