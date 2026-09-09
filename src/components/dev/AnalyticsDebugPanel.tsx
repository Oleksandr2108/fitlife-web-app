import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Copy, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  clearDebugEvents,
  getDebugEvents,
  subscribeToDebugEvents,
} from "../../lib/analytics/analyticsDebugStore";
import { getAnonymousId, getSessionId } from "../../lib/analytics/identity";
import { getAttributionContext } from "../../lib/attribution/attributionStorage";
import type { AttributionData } from "../../types";

function TouchDetails({ label, touch }: { label: string; touch: AttributionData | null }) {
  return (
    <div className="rounded-control border border-border bg-surface-muted p-3">
      <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">{label}</h3>
      {touch ? (
        <dl className="mt-2 grid gap-1 text-xs">
          {(["source", "medium", "campaign", "content", "term", "landingPath"] as const).map((field) =>
            touch[field] ? (
              <div key={field} className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-2">
                <dt className="text-text-muted">{field}</dt>
                <dd className="min-w-0 break-words text-text-primary">{touch[field]}</dd>
              </div>
            ) : null,
          )}
        </dl>
      ) : (
        <p className="mt-2 text-xs text-text-muted">No attributed touch</p>
      )}
    </div>
  );
}

export function AnalyticsDebugPanel() {
  const [enabled] = useState(
    () =>
      import.meta.env.DEV &&
      new URLSearchParams(window.location.search).get("debugAnalytics") === "true",
  );
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const events = useSyncExternalStore(
    subscribeToDebugEvents,
    getDebugEvents,
    getDebugEvents,
  );

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  if (!enabled) return null;
  const attribution = getAttributionContext();
  const context = {
    anonymousId: getAnonymousId(),
    sessionId: getSessionId(),
    ...attribution,
    recentEvents: events,
  };

  function closePanel() {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  }

  function copyContext() {
    void navigator.clipboard?.writeText(JSON.stringify(context, null, 2)).catch(() => undefined);
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open analytics debug panel"
        className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-3 z-50 grid size-11 place-items-center rounded-full border border-border bg-surface text-accent shadow-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:bottom-4 md:right-4"
      >
        <BarChart3 aria-hidden="true" className="size-5" />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.aside
            role="dialog"
            aria-modal="false"
            aria-labelledby="analytics-debug-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 z-[60] max-h-[85dvh] overflow-y-auto rounded-t-[1.25rem] border border-border bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-text-primary shadow-surface sm:left-auto sm:right-4 sm:bottom-4 sm:w-[24rem] sm:rounded-surface sm:p-5"
          >
            <header className="flex items-center justify-between gap-3">
              <h2 id="analytics-debug-title" className="font-bold">Analytics Debug</h2>
              <button type="button" onClick={closePanel} aria-label="Close analytics debug panel" className="grid size-10 place-items-center rounded-control text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>
            <dl className="mt-3 grid gap-2 text-xs">
              <div><dt className="text-text-muted">Anonymous ID</dt><dd className="mt-1 break-all font-mono">{context.anonymousId}</dd></div>
              <div><dt className="text-text-muted">Session ID</dt><dd className="mt-1 break-all font-mono">{context.sessionId}</dd></div>
            </dl>
            <div className="mt-4 grid gap-2">
              <TouchDetails label="First Touch" touch={attribution.firstTouch} />
              <TouchDetails label="Current Touch" touch={attribution.currentTouch} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold">Recent Events ({events.length})</h3>
              <div className="flex gap-1">
                <button type="button" onClick={copyContext} aria-label="Copy analytics context" className="grid size-10 place-items-center rounded-control text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><Copy aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={clearDebugEvents} aria-label="Clear debug events" className="grid size-10 place-items-center rounded-control text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><Trash2 aria-hidden="true" className="size-4" /></button>
              </div>
            </div>
            <ol className="mt-2 grid gap-2">
              {[...events].reverse().map((event) => (
                <li key={`${event.timestamp}-${event.name}`} className="min-w-0 rounded-control bg-surface-muted p-3 text-xs">
                  <div className="flex justify-between gap-3"><strong>{event.name}</strong><time className="shrink-0 text-text-muted">{new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</time></div>
                  <p className="mt-1 break-words font-mono text-text-secondary">{JSON.stringify(event.properties)}</p>
                </li>
              ))}
            </ol>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
