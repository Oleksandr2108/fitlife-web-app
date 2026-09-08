import { Outlet } from 'react-router-dom'
import { Header } from '../navigation/Header'
import { MobileNavigation } from '../navigation/MobileNavigation'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <Header />
      <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>
      <MobileNavigation />
    </div>
  )
}
