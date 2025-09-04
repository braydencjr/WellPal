"use client"

import { useState, useEffect } from "react"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { WelcomeHeader } from "@/components/welcome-header"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MusicPlayerCard } from "@/components/music-player-card"
import { MiniCalendar } from "@/components/mini-calendar"
import { CameraButton } from "@/components/camera-button-dashboard"
import { DogPal } from "@/components/DogPal-animation"
import { DogChatReminder } from "@/components/dogpal-chat"
import { ReminderItem } from "@/components/reminder-dashboard"

export default function DashboardPage() {
  const [hasTakenPhotoToday, setHasTakenPhotoToday] = useState(false)

  // ✅ Shared reminders with localStorage
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reminders")
      return stored ? JSON.parse(stored) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-background">
          <div className="max-w-sm mx-auto bg-card relative"> 
            <div className="max-w-sm mx-auto px-6 pt-8 pb-24">
              <WelcomeHeader />
              <div className="flex flex-row items-center gap-2 mb-4">
                <CameraButton />
                <MusicPlayerCard />
              </div>
              <MiniCalendar reminders={reminders} setReminders={setReminders} />
              <QuickActions />
            </div>
          </div>
          <BottomNavigation activeTab="home" />

          {/* 🐶 DogPal fixed in bottom-right corner of app container */}
          <div 
            className="fixed bottom-16 z-50"
            style={{
              right: `max(1rem, calc(50vw - 192px + 1rem))`
            }}
          >
            <DogPal />
          </div>
        </div>

        {!hasTakenPhotoToday && (
          <DogChatReminder onClose={() => setHasTakenPhotoToday(true)} />
        )}
      </SignedIn>
    </>
  )
}
