import { Link } from "react-router-dom";
import { AppContainer } from "../../../components/layout/AppContainer";

const links = [
  { label: "Workouts", to: "/workouts" },
  { label: "Nutrition", to: "/nutrition" },
  { label: "Progress", to: "/progress" },
];

export function HomeFooter() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <AppContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="text-lg font-bold tracking-tight"
          >
            FitLife
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
              className="min-h-11 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </AppContainer>
    </footer>
  );
}
