"use client"

import { useState, useEffect } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Calendar } from "@/components/calendar-ui"
import { Reminder, ReminderItem } from "@/components/reminder"
import { PostCardList } from "@/components/postcard-list"

export default function CalendarPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reminders")
      return stored ? JSON.parse(stored) : []
    }
    return []
  })

  // ✅ Use consistent YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="max-w-sm mx-auto px-6 pt-12 pb-24">
          <h1 className="text-2xl font-semibold mb-2">Calendar</h1>
          <p className="text-muted-foreground mb-6">
            Keep track of your schedule and important dates here.
          </p>

          {/* Calendar passes selection back */}
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* Show reminders for that date */}
          <div className="mt-6">
            <Reminder
              reminders={reminders.filter((r) => r.dateISO === selectedDate)}
              setReminders={(newReminders) => {
                // merge back with all reminders
                const others = reminders.filter((r) => r.dateISO !== selectedDate)
                setReminders([...others, ...newReminders])
              }}
              selectedDate={selectedDate}
            />
          </div>

          <div className="mt-6 w-full">
            <PostCardList selectedDate={selectedDate} />
          </div>
        </div>
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  )
}
