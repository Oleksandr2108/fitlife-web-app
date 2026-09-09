import { AppContainer } from "./AppContainer";

export function RouteLoadingFallback() {
  return (
    <main className="min-h-dvh bg-background text-text-primary" aria-busy="true">
      <AppContainer className="py-8 sm:py-12">
        <div className="flex min-h-11 items-center gap-2 font-bold tracking-tight">
          <img
            src="/branding/fitlife-mark.svg"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
            className="size-8 shrink-0"
          />
          FitLife
        </div>
        <div
          className="mt-10 grid animate-pulse gap-5 motion-reduce:animate-none lg:grid-cols-2"
          aria-hidden="true"
        >
          <div className="space-y-4 py-4">
            <div className="h-4 w-28 rounded bg-surface-muted" />
            <div className="h-12 w-4/5 rounded bg-surface-muted" />
            <div className="h-5 w-full max-w-xl rounded bg-surface-muted" />
            <div className="h-5 w-3/4 rounded bg-surface-muted" />
          </div>
          <div className="min-h-64 rounded-surface border border-border bg-surface-muted" />
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          Loading FitLife
        </p>
      </AppContainer>
    </main>
  );
}
