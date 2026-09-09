import { NavLink } from 'react-router-dom'
import { AppContainer } from '../layout/AppContainer'
import { ThemeToggle } from './ThemeToggle'

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Workouts', to: '/workouts' },
  { label: 'Nutrition', to: '/nutrition' },
  { label: 'Progress', to: '/progress' },
]

function getNavigationClassName({ isActive }: { isActive: boolean }) {
  return `rounded-control px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-accent-soft text-accent-hover' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <AppContainer className="flex min-h-16 items-center justify-between gap-4">
        <NavLink to="/" className="inline-flex min-h-11 items-center gap-2 rounded-control font-bold tracking-tight" aria-label="FitLife home">
          <img
            src="/branding/fitlife-mark.svg"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
            className="size-8 shrink-0"
          />
          <span className="text-lg">FitLife</span>
        </NavLink>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigationItems.map((item) => <NavLink key={item.to} to={item.to} className={getNavigationClassName}>{item.label}</NavLink>)}
          </nav>
          <ThemeToggle />
        </div>
      </AppContainer>
    </header>
  )
}
