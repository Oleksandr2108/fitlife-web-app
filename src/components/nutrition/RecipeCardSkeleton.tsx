export function RecipeCardSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse overflow-hidden rounded-surface border border-border bg-surface motion-reduce:animate-none">
      <div className="aspect-[16/10] bg-surface-muted" />
      <div className="space-y-3 p-5"><div className="h-3 w-1/3 rounded bg-surface-muted" /><div className="h-5 w-2/3 rounded bg-surface-muted" /><div className="h-4 w-full rounded bg-surface-muted" /><div className="h-4 w-1/2 rounded bg-surface-muted" /></div>
    </div>
  )
}
