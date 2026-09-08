import { Apple, ChartNoAxesColumnIncreasing, Dumbbell, House } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface NavigationItem { label: string; to: string; icon: LucideIcon }

const navigationItems: NavigationItem[] = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Workouts', to: '/workouts', icon: Dumbbell },
  { label: 'Nutrition', to: '/nutrition', icon: Apple },
  { label: 'Progress', to: '/progress', icon: ChartNoAxesColumnIncreasing },
]

export function MobileNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-lg grid-cols-4 px-1">
        {navigationItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `flex min-h-17 flex-col items-center justify-center gap-1 rounded-control px-1 py-2 text-[0.6875rem] font-semibold transition-colors ${isActive ? 'text-accent-hover' : 'text-text-secondary'}`}
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'rounded-lg bg-accent-soft px-3 py-1' : 'px-3 py-1'}>
                  <Icon aria-hidden="true" className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
