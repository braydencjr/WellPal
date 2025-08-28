"use client"

import { WelcomeHeader } from "@/components/welcome-header"
import { MoodTracker } from "@/components/mood-tracker"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useEffect, useMemo, useState } from "react"
import { loadPhotobook } from "@/lib/photobook-store"
import Link from "next/link"

export default function DashboardPage() {
  const [streak, setStreak] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  useEffect(() => {
    const entries = loadPhotobook()
    const dates = new Set(entries.map(e => e.dateISO.slice(0,10)))
    // compute simple current streak ending today
    let s = 0
    let d = new Date()
    for (;;) {
      const key = d.toISOString().slice(0,10)
      if (dates.has(key)) { s += 1 } else { break }
      d.setDate(d.getDate() - 1)
    }
    setStreak(s)
  }, [])

  const days = useMemo(() => {
    const base = new Date()
    base.setDate(1)
    const startWeekday = base.getDay()
    const next = new Date(base)
    next.setDate(1 - startWeekday)
    return Array.from({ length: 42 }, (_, i) => {
      const day = new Date(next)
      day.setDate(next.getDate() + i)
      return day
    })
  }, [])

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()
  const today = new Date()
  const entries = loadPhotobook()
  const entriesByDate = new Map(entries.map(e => [e.dateISO.slice(0,10), e]))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="max-w-sm mx-auto px-6 pt-8 pb-24">
          <div className="flex items-center justify-between mb-2">
            <WelcomeHeader />
            <span className="ml-3 text-xs px-2 py-1 rounded-full bg-secondary">Streak {streak}🔥</span>
          </div>

          <div className="rounded-xl border border-border p-3 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">This Month</div>
              <Link href="/photobook" className="text-xs text-primary">Open</Link>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, idx) => {
                const key = d.toISOString().slice(0,10)
                const inMonth = d.getMonth() === today.getMonth()
                const entry = entriesByDate.get(key)
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(d)}
                    className={`h-8 rounded-md text-[11px] flex items-center justify-center ${
                      isSameDay(d, today) ? "bg-primary/20" : entry ? "bg-secondary/40" : "bg-muted"
                    } ${inMonth ? "" : "opacity-40"}`}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).textContent = String(d.getDate()) }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).textContent = entry ? entry.mood : String(d.getDate()) }}
                  >
                    {entry ? entry.mood : d.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          <MoodTracker />
          <QuickActions />
        </div>
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  )
}
