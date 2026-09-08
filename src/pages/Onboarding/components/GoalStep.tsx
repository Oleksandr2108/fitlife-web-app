import { Dumbbell, Flame, Footprints, StretchHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import type { FitnessGoal } from "../../../types";

interface GoalOption {
  value: FitnessGoal;
  title: string;
  description: string;
  icon: LucideIcon;
}
interface GoalStepProps {
  selectedGoal: FitnessGoal | null;
  onSelect: (goal: FitnessGoal) => void;
  onContinue: () => void;
}

const options: GoalOption[] = [
  {
    value: "lose-weight",
    title: "Lose Weight",
    description: "Build an active routine with balanced full-body sessions.",
    icon: Flame,
  },
  {
    value: "build-strength",
    title: "Build Strength",
    description: "Focus on strength-focused bodyweight training.",
    icon: Dumbbell,
  },
  {
    value: "stay-active",
    title: "Stay Active",
    description: "Create a simple routine for consistent everyday movement.",
    icon: Footprints,
  },
  {
    value: "improve-mobility",
    title: "Improve Mobility",
    description: "Focus on flexibility, mobility, and comfortable movement.",
    icon: StretchHorizontal,
  },
];

export function GoalStep({
  selectedGoal,
  onSelect,
  onContinue,
}: GoalStepProps) {
  return (
    <div>
      <h1 className="text-page-title">What’s your main goal?</h1>
      <p className="text-body mt-3 text-text-secondary">
        We’ll use this to build a routine that fits you.
      </p>
      <div
        className="mt-7 grid gap-3"
        role="group"
        aria-label="Fitness goal"
      >
        {options.map(({ value, title, description, icon: Icon }) => {
          const selected = selectedGoal === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(value)}
              className={`flex min-h-20 w-full items-start gap-4 rounded-surface border p-4 text-left transition-colors ${selected ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-hover"}`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-control ${selected ? "bg-accent text-accent-foreground" : "bg-surface-muted text-text-secondary"}`}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5"
                />
              </span>
              <span>
                <span className="block font-semibold text-text-primary">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-5 text-text-secondary">
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <Button
        size="large"
        disabled={!selectedGoal}
        onClick={onContinue}
        className="mt-7 w-full"
      >
        Continue
      </Button>
    </div>
  );
}
