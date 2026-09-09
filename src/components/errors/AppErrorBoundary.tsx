import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("FitLife render error", error, errorInfo);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-dvh place-items-center bg-background px-4 py-10 text-text-primary">
        <section className="w-full max-w-lg rounded-surface border border-border bg-surface p-6 text-center shadow-surface sm:p-8">
          <p className="text-meta uppercase text-accent">FitLife</p>
          <h1 className="text-section-title mt-3">Something went wrong</h1>
          <p className="mt-3 text-text-secondary">
            We couldn&apos;t display this screen. Reload the app or return home.
          </p>
          <div className="mt-6 grid gap-3 min-[430px]:grid-cols-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-accent bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:border-accent-hover hover:bg-accent-hover"
            >
              Reload
            </button>
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-border-strong bg-surface px-4 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Go Home
            </a>
          </div>
        </section>
      </main>
    );
  }
}
