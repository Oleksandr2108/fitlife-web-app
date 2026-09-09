import { Clock3 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import type { WorkoutDuration } from "../../../types";

interface DurationStepProps {
  selectedDuration: WorkoutDuration | null;
  isLoading: boolean;
  isError: boolean;
  onSelect: (duration: WorkoutDuration) => void;
  onBack: () => void;
  onContinue: () => void;
  onRetry: () => void;
}
const options: Array<{
  value: WorkoutDuration;
  title: string;
  description: string;
}> = [
  { value: 10, title: "10 min", description: "Quick sessions for busy days" },
  { value: 20, title: "20 min", description: "A balanced everyday workout" },
  {
    value: 30,
    title: "30+ min",
    description: "More time for complete sessions",
  },
];

export function DurationStep({
  selectedDuration,
  isLoading,
  isError,
  onSelect,
  onBack,
  onContinue,
  onRetry,
}: DurationStepProps) {
  return (
    <div>
      <h1 className="text-page-title">How much time do you usually have?</h1>
      <p className="text-body mt-3 text-text-secondary">
        Choose the session length that fits your schedule.
      </p>
      <div
        className="mt-7 grid gap-3"
        role="group"
        aria-label="Workout duration"
      >
        {options.map(({ value, title, description }) => {
          const selected = selectedDuration === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(value)}
              className={`flex min-h-20 w-full items-center gap-4 rounded-surface border p-4 text-left transition-colors ${selected ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-hover"}`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-control ${selected ? "bg-accent text-accent-foreground" : "bg-surface-muted text-text-secondary"}`}
              >
                <Clock3
                  aria-hidden="true"
                  className="size-5"
                />
              </span>
              <span>
                <span className="block font-semibold">{title}</span>
                <span className="mt-1 block text-sm text-text-secondary">
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {isError ? (
        <div className="mt-5 rounded-control border border-border bg-surface p-4">
          <p className="text-sm text-text-secondary">
            We couldn’t prepare your workout options.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 min-h-11 font-semibold text-accent"
          >
            Try again
          </button>
        </div>
      ) : null}
      <div className="mt-7 grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          size="large"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          size="large"
          disabled={!selectedDuration || isLoading || isError}
          onClick={onContinue}
        >
          {isLoading ? "Preparing…" : "Create Plan"}
        </Button>
      </div>
    </div>
  );
}
