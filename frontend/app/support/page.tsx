// SupportPage.tsx
"use client"

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { EmergencyContactManager } from "@/components/emergency-contact-manager"
import { EmergencySupport } from "@/components/emergency-support"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SupportDogAnimation } from "@/components/support-dog-animation"

export default function SupportPage() {
  return (
    <>
      <SignedIn>
        <SupportContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

function SupportContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card relative">
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Support & Resources
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            You're not alone. Here are resources and support options available to you.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-24 space-y-6">
          {/* 1️⃣ Your Emergency Contacts */}
          <EmergencyContactManager />

          {/* 2️⃣ Other Emergency Support */}
          <EmergencySupport />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="support" />

      {/* Support Dog Animation fixed in bottom-right corner */}
      <div
        className="fixed bottom-16 z-50"
        style={{ right: `max(1rem, calc(50vw - 192px + 1rem))` }}
      >
        <SupportDogAnimation />
      </div>
    </div>
  )
}
