"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: "text-primary" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-secondary" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-muted-foreground" },
  { emoji: "😔", label: "Low", value: 2, color: "text-chart-4" },
  { emoji: "😢", label: "Struggling", value: 1, color: "text-destructive" },
]

export function MoodTracker() {
  return (
    <Card className="p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Dear Moments</h2>
          <p className="text-sm text-muted-foreground">Tap to capture today’s mood</p>
        </div>
        <Link href="/memories" className="text-primary text-sm">Create</Link>
      </div>
    </Card>
  )
}
