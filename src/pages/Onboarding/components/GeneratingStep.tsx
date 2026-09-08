import { LoaderCircle } from 'lucide-react'

export function GeneratingStep() {
  return <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status" aria-live="polite"><span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent"><LoaderCircle aria-hidden="true" className="size-7 animate-spin motion-reduce:animate-none" /></span><h1 className="text-section-title mt-6">Creating your plan…</h1><p className="text-body mt-3 max-w-sm text-text-secondary">Matching workouts to your goal and schedule.</p></div>
}
