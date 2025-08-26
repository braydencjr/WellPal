"use client"

import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const moodData = [
  { date: "Today", mood: "Good", emoji: "🙂", color: "text-secondary" },
  { date: "Yesterday", mood: "Great", emoji: "😊", color: "text-primary" },
  { date: "Nov 23", mood: "Okay", emoji: "😐", color: "text-muted-foreground" },
  { date: "Nov 22", mood: "Low", emoji: "😔", color: "text-chart-4" },
  { date: "Nov 21", mood: "Good", emoji: "🙂", color: "text-secondary" },
  { date: "Nov 20", mood: "Great", emoji: "😊", color: "text-primary" },
  { date: "Nov 19", mood: "Okay", emoji: "😐", color: "text-muted-foreground" },
]

export function MoodHistory() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          {moodData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{entry.emoji}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{entry.date}</p>
                  <p className={`text-xs font-medium ${entry.color}`}>{entry.mood}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {index === 0 ? "2:30 PM" : index === 1 ? "3:15 PM" : "Morning"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
