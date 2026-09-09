import type { HTMLAttributes } from 'react'

type SurfaceProps = HTMLAttributes<HTMLDivElement>

export function Surface({ className = '', ...props }: SurfaceProps) {
  return <div className={`rounded-surface border border-border bg-surface shadow-surface ${className}`} {...props} />
}
