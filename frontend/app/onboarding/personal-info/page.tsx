"use client"

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { PersonalInfoForm } from "@/components/onboarding/personal-info-form"

export default function PersonalInfoPage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
          <PersonalInfoForm />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
