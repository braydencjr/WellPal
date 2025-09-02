"use client"

import { useState } from "react"
import { WelcomeHeader } from "@/components/welcome-header"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MusicPlayerCard } from "@/components/music-player-card"
import { MiniCalendar } from "@/components/mini-calendar"
import { CameraButton } from "@/components/camera-button-dashboard"
import { DogPal } from "@/components/DogPal-animation"
import { DogChatReminder } from "@/components/dogpal-chat"

export default function DashboardPage() {
  const [hasTakenPhotoToday, setHasTakenPhotoToday] = useState(false)

  return (
     <>
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card relative"> {/* ✅ relative */}
        <div className="max-w-sm mx-auto px-6 pt-8 pb-24">
          <WelcomeHeader />
          <div className="flex flex-row items-center gap-2 mb-4">
            <CameraButton />
            <MusicPlayerCard />
          </div>
          <MiniCalendar />
          <QuickActions />
        </div>

        {/* 🐶 DogPal inside card */}
        <div className="absolute bottom-16 right-4">
          <DogPal />
        </div>
      </div>
      <BottomNavigation activeTab="home" />
    </div>

    {!hasTakenPhotoToday && (
  <DogChatReminder onClose={() => setHasTakenPhotoToday(true)} />
)}
    </>
  )
}
