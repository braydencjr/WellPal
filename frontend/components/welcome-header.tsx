"use client"

import { useUser } from "@clerk/nextjs"

export function WelcomeHeader() {
  const { user } = useUser()
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"
  
  // Get first name from Clerk user
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || "there"

  return (
    <div className="mb-2">
      <h1 className="text-2xl font-semibold text-foreground mb-2">{greeting}, {firstName}</h1>
      <p className="text-muted-foreground leading-relaxed">
        "Preserve Your Moments with WellPal"
      </p>
    </div>
  )
}
