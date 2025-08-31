"use client"

import { useUser } from "@/contexts/user-context"

export function WelcomeHeader() {
  const { user } = useUser()
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"
  
  // Get first name from full name
  const firstName = user.name.split(' ')[0]

  return (
    <div className="mb-2
    
    
    
    ">
      <h1 className="text-2xl font-semibold text-foreground mb-2">{greeting}, Alex</h1>
      <p className="text-muted-foreground leading-relaxed">
        "Preserve Your Moments with WellPal"
      </p>
    </div>
  )
}
