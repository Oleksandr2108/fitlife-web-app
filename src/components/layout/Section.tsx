import type { HTMLAttributes } from 'react'

type SectionProps = HTMLAttributes<HTMLElement>

export function Section({ className = '', ...props }: SectionProps) {
  return <section className={`py-10 sm:py-14 lg:py-16 ${className}`} {...props} />
}
