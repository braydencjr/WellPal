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
    // Return default values instead of throwing an error
    return {
      calmingTheme: 'default' as CalmingTheme,
      setCalmingTheme: () => {}
    }
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [calmingTheme, setCalmingTheme] = React.useState<CalmingTheme>('default')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('calming-theme') as CalmingTheme
    if (savedTheme) {
      setCalmingTheme(savedTheme)
    }
  }, [])

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem('calming-theme', calmingTheme)
      document.documentElement.setAttribute('data-calming-theme', calmingTheme)
    }
  }, [calmingTheme, mounted])

  if (!mounted) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }

  return (
    <NextThemesProvider {...props}>
      <CalmingThemeContext.Provider value={{ calmingTheme, setCalmingTheme }}>
        {children}
      </CalmingThemeContext.Provider>
    </NextThemesProvider>
  )
}
