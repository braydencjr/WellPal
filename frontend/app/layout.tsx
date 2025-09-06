// app/layout.tsx
"use client" // ✅ make this file a client component

import type { ReactNode } from "react"
import { useEffect } from "react"
import { Poppins } from "next/font/google"
import { ThemeProvider, useCalmingTheme } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/user-context"
import "./globals.css"
import "./animations.css"

const poppins = Poppins({ 
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

function CalmingThemeWrapper({ children }: { children: ReactNode }) {
  const { calmingTheme } = useCalmingTheme()

  // Apply the calming theme to the document element so it works with CSS selectors
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-calming-theme', calmingTheme)
    }
  }, [calmingTheme])

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </div>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <UserProvider>
            <CalmingThemeWrapper>{children}</CalmingThemeWrapper>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}