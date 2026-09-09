import { useState } from 'react'
import { Dumbbell } from 'lucide-react'

interface WorkoutImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export function WorkoutImage({ src, alt, className = '', eager = false }: WorkoutImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-accent-soft text-accent ${className}`}>
        <Dumbbell aria-hidden="true" className="size-10" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  )
}
