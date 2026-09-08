import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "../navigation/ThemeToggle";
import { AppContainer } from "./AppContainer";

export function FocusedLayout() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <header className="border-b border-border bg-background/95">
        <AppContainer className="flex min-h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
            />
            FitLife
          </Link>
          <ThemeToggle />
        </AppContainer>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
