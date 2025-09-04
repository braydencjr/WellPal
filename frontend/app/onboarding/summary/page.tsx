"use client"

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { AccessibilityForm } from "@/components/onboarding/accessibility-form"

export default function SummaryPage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
          <AccessibilityForm />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
