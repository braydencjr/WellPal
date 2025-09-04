"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface OnboardingData {
  personalInfo?: any
  preferences?: any
  accessibility?: any
}

export function CheckOnboarding() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (user) {
      console.log("User data:", user.unsafeMetadata?.onboardingData)
      
      // Check if user has completed onboarding
      const onboardingData = user.unsafeMetadata?.onboardingData as OnboardingData | undefined
      const hasPersonalInfo = onboardingData && onboardingData.personalInfo
      const hasPreferences = onboardingData && onboardingData.preferences  
      const hasAccessibility = onboardingData && onboardingData.accessibility

      console.log("Onboarding check:", { hasPersonalInfo, hasPreferences, hasAccessibility })

      if (hasPersonalInfo && hasPreferences && hasAccessibility) {
        // Returning user - go to dashboard
        console.log("Redirecting to dashboard (returning user)")
        router.push("/dashboard")
      } else {
        // New user - go to onboarding
        console.log("Redirecting to onboarding (new user)")
        router.push("/onboarding")
      }
    }
  }, [user, isLoaded, router])

  // Show loading while checking
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
    </div>
  )
}
