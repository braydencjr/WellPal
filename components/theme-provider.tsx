'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

type CalmingTheme = 'default' | 'soft-green' | 'calm-blue' | 'warm-beige'

interface CalmingThemeContextType {
  calmingTheme: CalmingTheme
  setCalmingTheme: (theme: CalmingTheme) => void
}

const CalmingThemeContext = React.createContext<CalmingThemeContextType | undefined>(undefined)

export function useCalmingTheme() {
  const context = React.useContext(CalmingThemeContext)
  if (context === undefined) {
    throw new Error('useCalmingTheme must be used within a CalmingThemeProvider')
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [calmingTheme, setCalmingTheme] = React.useState<CalmingTheme>('default')

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('calming-theme') as CalmingTheme
    if (savedTheme) {
      setCalmingTheme(savedTheme)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('calming-theme', calmingTheme)
    document.documentElement.setAttribute('data-calming-theme', calmingTheme)
  }, [calmingTheme])

  return (
    <NextThemesProvider {...props}>
      <CalmingThemeContext.Provider value={{ calmingTheme, setCalmingTheme }}>
        {children}
      </CalmingThemeContext.Provider>
    </NextThemesProvider>
  )
}
