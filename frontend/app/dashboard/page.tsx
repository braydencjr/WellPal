"use client"

import { WelcomeHeader } from "@/components/welcome-header"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MusicPlayerCard } from "@/components/music-player-card"
import { MiniCalendar } from "@/components/mini-calendar"
import { CameraButton } from "@/components/camera-button-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="max-w-sm mx-auto px-6 pt-8 pb-24">
          <WelcomeHeader />
            <div className="flex flex-row items-center gap-2 mb-4">
              <CameraButton />
              <MusicPlayerCard />
            </div>
          <MiniCalendar />
          <QuickActions />
        </div>
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  )
}
