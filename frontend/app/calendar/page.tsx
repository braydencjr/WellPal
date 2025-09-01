"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Calendar } from "@/components/calendar-ui"
import { Reminder } from "@/components/reminder"
import { PostCardList } from "@/components/postcard-list"


export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* White card container like Dashboard */}
      <div className="max-w-sm mx-auto bg-card">
        <div className="max-w-sm mx-auto px-6 pt-12 pb-24">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-foreground mb-2">Calendar</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Keep track of your schedule and important dates here.
          </p>

          {/* Calendar inside the card */}
          <Calendar />

           {/* Reminder below calendar */}
          <div className="mt-6">
            <Reminder />
          </div>

          <div className="mt-6 w-full">
            <PostCardList />
          </div>

        </div>
      </div>

      {/* Bottom navigation bar */}
      <BottomNavigation activeTab="home" />
    </div>
  )
}
