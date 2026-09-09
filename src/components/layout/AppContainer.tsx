import type { HTMLAttributes } from 'react'

type AppContainerProps = HTMLAttributes<HTMLDivElement>

export function AppContainer({ className = '', ...props }: AppContainerProps) {
  return <div className={`mx-auto w-full max-w-app px-4 sm:px-6 lg:px-8 ${className}`} {...props} />
}
