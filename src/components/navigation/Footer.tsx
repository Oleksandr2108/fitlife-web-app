import { Link } from "react-router-dom";
import { AppContainer } from "../layout/AppContainer";

const links = [
  { label: "Workouts", to: "/workouts" },
  { label: "Nutrition", to: "/nutrition" },
  { label: "Progress", to: "/progress" },
  { label: "Privacy", to: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <AppContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-control text-lg font-bold tracking-tight"
            aria-label="FitLife home"
          >
            <img
              src="/branding/fitlife-mark.svg"
              alt=""
              aria-hidden="true"
              width="32"
              height="32"
              loading="lazy"
              className="size-8 shrink-0"
            />
            <span>FitLife</span>
          </Link>
          <p className="mt-1 text-sm text-text-muted">
            Simple fitness for everyday life.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-3"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="min-h-11 rounded-control py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </AppContainer>
    </footer>
  );
}
