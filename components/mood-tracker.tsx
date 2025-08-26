"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: "text-primary" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-secondary" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-muted-foreground" },
  { emoji: "😔", label: "Low", value: 2, color: "text-chart-4" },
  { emoji: "😢", label: "Struggling", value: 1, color: "text-destructive" },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value)
  }

  const handleSubmit = () => {
    if (selectedMood) {
      setIsSubmitted(true)
      // Here you would typically save to a database
      setTimeout(() => setIsSubmitted(false), 2000)
    }
  }

  return (
    <Card className="p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">Daily Mood Check-in</h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              selectedMood === mood.value ? "bg-primary/10 ring-2 ring-primary" : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className={`text-xs font-medium ${mood.color}`}>{mood.label}</span>
          </button>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={!selectedMood || isSubmitted} className="w-full">
        {isSubmitted ? "Mood Logged!" : "Log Mood"}
      </Button>
    </Card>
  )
}
