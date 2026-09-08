import { create } from 'zustand'
import type { Theme } from '../types/theme'

const THEME_STORAGE_KEY = 'fitlife-theme'

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light'
}

function getStoredTheme(): Theme {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : 'dark'
  } catch {
    return 'dark'
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

const initialTheme = getStoredTheme()
applyTheme(initialTheme)

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  toggleTheme: () => {
    set((state) => {
      const theme: Theme = state.theme === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
      } catch {
        // Theme switching still works when browser storage is unavailable.
      }
      applyTheme(theme)
      return { theme }
    })
  },
}))
