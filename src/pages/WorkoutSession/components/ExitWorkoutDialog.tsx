import { useEffect, useRef } from "react";
import { Button } from "../../../components/ui/Button";

interface ExitWorkoutDialogProps {
  open: boolean;
  onContinue: () => void;
  onEnd: () => void;
}

export function ExitWorkoutDialog({
  open,
  onContinue,
  onEnd,
}: ExitWorkoutDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onContinue();
        return;
      }
      if (event.key !== "Tab") return;
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onContinue, open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onContinue();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-workout-title"
        aria-describedby="exit-workout-description"
        className="w-full max-w-sm rounded-surface border border-border bg-surface p-6 shadow-surface"
      >
        <h2
          id="exit-workout-title"
          className="text-card-title"
        >
          End workout?
        </h2>
        <p
          id="exit-workout-description"
          className="mt-3 text-sm leading-6 text-text-secondary"
        >
          Your current session progress will be lost.
        </p>
        <div className="mt-6 grid gap-3">
          <Button onClick={onContinue}>
            Continue Workout
          </Button>
          <Button
            variant="ghost"
            onClick={onEnd}
          >
            End Workout
          </Button>
        </div>
      </div>
    </div>
  );
}
