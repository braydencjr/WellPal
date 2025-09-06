// src/components/theme-provider.tsx
"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"
import { getAccessibleTheme , CalmingTheme } from "@/lib/user-condition"

interface CalmingThemeContextType {
  calmingTheme: CalmingTheme
  setCalmingTheme: (theme: CalmingTheme) => void
}

const CalmingThemeContext = React.createContext<CalmingThemeContextType | undefined>(undefined)

export function useCalmingTheme() {
  const context = React.useContext(CalmingThemeContext)
  if (!context) {
    return {
      calmingTheme: "default" as CalmingTheme,
      setCalmingTheme: () => {},
    }
  }
  console.log("useCalmingTheme context:", context) // Add this
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [calmingTheme, setCalmingThemeState] = React.useState<CalmingTheme>("default")
  const [mounted, setMounted] = React.useState(false)

  // --- Helper function to update theme everywhere ---
  const applyTheme = React.useCallback((theme: CalmingTheme) => {
  const accessible = getAccessibleTheme(theme)
  setCalmingThemeState(accessible) // Update the state to trigger re-render
  localStorage.setItem("calming-theme", accessible)
  document.documentElement.setAttribute("data-calming-theme", accessible)
}, [])

  // --- Load saved theme on mount ---
  React.useEffect(() => {
  if (typeof window === "undefined") return
  setMounted(true)
  const saved = (localStorage.getItem("calming-theme") as CalmingTheme) || "default"
  setCalmingThemeState(saved) // Update state directly
  document.documentElement.setAttribute("data-calming-theme", saved)
}, [])

  return (
    <NextThemesProvider {...props}>
      <CalmingThemeContext.Provider
        value={{
          calmingTheme,
          setCalmingTheme: applyTheme,
        }}
      >
        {children}
      </CalmingThemeContext.Provider>
    </NextThemesProvider>
  )
}
