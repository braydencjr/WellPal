import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "WellPal - Mental Wellness Companion",
  description: "Your personal mental wellness companion for university students",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["mental health", "wellness", "university", "students", "wellbeing"],
  authors: [{ name: "WellPal Team" }],
  icons: {
    icon: "/icon-192x192.png",
    shortcut: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#65a3a8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
