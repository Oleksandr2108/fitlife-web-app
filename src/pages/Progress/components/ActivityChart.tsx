import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Link } from "react-router-dom";
import { calculateActivityChartGeometry } from "../../../lib/chart/activityChartGeometry";
import {
  aggregateActivityByDay,
  compareActivityPeriods,
  type ActivityRange,
} from "../../../lib/progress/calculateProgress";
import type { CompletedWorkout } from "../../../types";

interface ActivityChartProps {
  completedWorkouts: CompletedWorkout[];
  now?: Date;
}

const CHART_HEIGHT = 250;
const TOOLTIP_WIDTH = 132;
const chartPadding = { top: 18, right: 12, bottom: 34, left: 38 };

function comparisonLabel(
  comparison: ReturnType<typeof compareActivityPeriods>,
  range: ActivityRange,
): string {
  if (comparison.kind === "new") return "New activity this period";
  if (comparison.kind === "none") return "No activity in either period";
  if (comparison.kind === "same") return `Same as previous ${range} days`;
  const sign = comparison.kind === "increase" ? "+" : "−";
  return `${sign}${comparison.percentage}% vs previous ${range} days`;
}

export function ActivityChart({ completedWorkouts, now }: ActivityChartProps) {
  const [referenceDate] = useState(() => now ?? new Date());
  const [range, setRange] = useState<ActivityRange>(7);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartWidth, setChartWidth] = useState(640);
  const chartRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const current = useMemo(
    () => aggregateActivityByDay(completedWorkouts, range, referenceDate),
    [completedWorkouts, referenceDate, range],
  );
  const previous = useMemo(
    () =>
      aggregateActivityByDay(completedWorkouts, range, referenceDate, -range),
    [completedWorkouts, referenceDate, range],
  );
  const geometry = useMemo(
    () =>
      calculateActivityChartGeometry(current, {
        width: chartWidth,
        height: CHART_HEIGHT,
        padding: chartPadding,
      }),
    [chartWidth, current],
  );
  const totalMinutes = current.reduce(
    (total, point) => total + point.minutes,
    0,
  );
  const totalWorkouts = current.reduce(
    (total, point) => total + point.workouts,
    0,
  );
  const comparison = compareActivityPeriods(current, previous);
  const activeCoordinate =
    activeIndex === null ? null : geometry.coordinates[activeIndex];

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;
    const updateWidth = () => setChartWidth(Math.max(1, element.clientWidth));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function selectNearestPoint(clientX: number) {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect || geometry.coordinates.length === 0) return;
    const relativeX = clientX - rect.left;
    const nearest = geometry.coordinates.reduce(
      (best, coordinate, index) =>
        Math.abs(coordinate.x - relativeX) <
        Math.abs(geometry.coordinates[best].x - relativeX)
          ? index
          : best,
      0,
    );
    setActiveIndex(nearest);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    setActiveIndex((currentIndex) =>
      Math.min(
        current.length - 1,
        Math.max(
          0,
          (currentIndex ?? (direction > 0 ? -1 : current.length)) + direction,
        ),
      ),
    );
  }

  const visibleLabels =
    range === 7
      ? new Set(current.map((_, index) => index))
      : new Set([0, 7, 14, 21, 29]);
  const animationKey = `${range}-${current.map((point) => point.minutes).join("-")}`;
  const accessibleSummary = `Activity over the last ${range} days. ${totalMinutes} training minutes across ${totalWorkouts} ${totalWorkouts === 1 ? "workout" : "workouts"}.`;

  return (
    <section
      className="min-w-0 rounded-surface border border-border bg-surface p-4 shadow-surface sm:p-6"
      aria-labelledby="activity-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            id="activity-heading"
            className="text-card-title"
          >
            Activity
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {totalMinutes} min
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {comparisonLabel(comparison, range)}
          </p>
        </div>
        <div
          className="inline-flex rounded-control border border-border bg-background-secondary p-1"
          aria-label="Activity period"
        >
          {([7, 30] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={range === value}
              onClick={() => {
                setActiveIndex(null);
                setRange(value);
              }}
              className={`min-h-11 min-w-12 rounded-[0.55rem] px-3 text-sm font-bold transition-colors motion-reduce:transition-none ${range === value ? "bg-accent text-accent-foreground" : "text-text-secondary hover:text-text-primary"}`}
            >
              {value}D
            </button>
          ))}
        </div>
      </div>

      {totalMinutes === 0 ? (
        <div className="mt-6 grid min-h-60 place-content-center rounded-control border border-dashed border-border bg-background-secondary px-5 text-center">
          <p className="font-semibold">No activity yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
            Complete a workout to start building your activity chart.
          </p>
          <Link
            to="/workouts"
            className="mt-4 inline-flex min-h-11 items-center justify-center font-semibold text-accent"
          >
            Browse Workouts
          </Link>
        </div>
      ) : (
        <div
          ref={chartRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerMove={(event) => selectNearestPoint(event.clientX)}
          onPointerDown={(event) => selectNearestPoint(event.clientX)}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setActiveIndex(null);
          }}
          className="relative mt-6 min-w-0 touch-pan-y rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label={`${accessibleSummary} Use the left and right arrow keys to inspect daily values.`}
        >
          <svg
            viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
            className="block h-[250px] w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="activity-area-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-accent)"
                  stopOpacity="0.28"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent)"
                  stopOpacity="0.02"
                />
              </linearGradient>
            </defs>
            {geometry.yTicks.map((tick, index) => {
              const y =
                chartPadding.top +
                (index / (geometry.yTicks.length - 1)) *
                  (geometry.baseline - chartPadding.top);
              return (
                <g key={`${tick}-${index}`}>
                  <line
                    x1={chartPadding.left}
                    x2={chartWidth - chartPadding.right}
                    y1={y}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth="1"
                  />
                  <text
                    x={chartPadding.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="var(--color-text-muted)"
                    fontSize="11"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
            <AnimatePresence mode="wait">
              <motion.g
                key={animationKey}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduceMotion ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
              >
                <motion.path
                  d={geometry.areaPath}
                  fill="url(#activity-area-gradient)"
                  initial={{ opacity: reduceMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : 0.18,
                  }}
                />
                <motion.path
                  d={geometry.linePath}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: reduceMotion ? 1 : 0,
                    opacity: reduceMotion ? 1 : 0,
                  }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {geometry.coordinates.map((coordinate, index) =>
                  range === 7 ? (
                    <motion.circle
                      key={coordinate.point.dateKey}
                      cx={coordinate.x}
                      cy={coordinate.y}
                      r="4"
                      fill="var(--color-surface)"
                      stroke="var(--color-accent)"
                      strokeWidth="2.5"
                      initial={{ scale: reduceMotion ? 1 : 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.18,
                        delay: reduceMotion ? 0 : 0.55 + index * 0.035,
                      }}
                    />
                  ) : null,
                )}
              </motion.g>
            </AnimatePresence>
            {activeCoordinate ? (
              <g>
                <line
                  x1={activeCoordinate.x}
                  x2={activeCoordinate.x}
                  y1={chartPadding.top}
                  y2={geometry.baseline}
                  stroke="var(--color-text-muted)"
                  strokeDasharray="3 4"
                />
                <circle
                  cx={activeCoordinate.x}
                  cy={activeCoordinate.y}
                  r="7"
                  fill="var(--color-surface)"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                />
              </g>
            ) : null}
            {geometry.coordinates.map((coordinate, index) =>
              visibleLabels.has(index) ? (
                <text
                  key={coordinate.point.dateKey}
                  x={coordinate.x}
                  y={CHART_HEIGHT - 8}
                  textAnchor={
                    index === 0
                      ? "start"
                      : index === current.length - 1
                        ? "end"
                        : "middle"
                  }
                  fill="var(--color-text-muted)"
                  fontSize="11"
                >
                  {coordinate.point.label}
                </text>
              ) : null,
            )}
          </svg>
          {activeCoordinate ? (
            <div
              className="pointer-events-none absolute z-10 rounded-control border border-border-strong bg-background px-3 py-2 text-xs shadow-surface"
              style={{
                width: TOOLTIP_WIDTH,
                left: Math.min(
                  Math.max(activeCoordinate.x - TOOLTIP_WIDTH / 2, 0),
                  chartWidth - TOOLTIP_WIDTH,
                ),
                top: Math.max(4, activeCoordinate.y - 76),
              }}
            >
              <p className="font-semibold text-text-primary">
                {activeCoordinate.point.fullLabel}
              </p>
              <p className="mt-1 text-text-secondary">
                <span className="font-bold text-accent">
                  {activeCoordinate.point.minutes} min
                </span>{" "}
                · {activeCoordinate.point.workouts}{" "}
                {activeCoordinate.point.workouts === 1 ? "workout" : "workouts"}
              </p>
            </div>
          ) : null}
          <p
            className="sr-only"
            aria-live="polite"
          >
            {activeCoordinate
              ? `${activeCoordinate.point.fullLabel}: ${activeCoordinate.point.minutes} minutes across ${activeCoordinate.point.workouts} workouts.`
              : ""}
          </p>
        </div>
      )}
      <p className="sr-only">{accessibleSummary}</p>
    </section>
  );
}
