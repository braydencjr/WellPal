"use client"

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { OnboardingCarousel } from "@/components/onboarding/onboarding-carousel"

export default function OnboardingPage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
          <OnboardingCarousel />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
