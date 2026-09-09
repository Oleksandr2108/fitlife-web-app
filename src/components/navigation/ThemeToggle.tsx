import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/theme.store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.94 }}
      className="relative grid size-11 shrink-0 place-items-center rounded-control border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
      aria-label={label}
      title={label}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {isDark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
