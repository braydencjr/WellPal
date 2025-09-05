"use client"

import { useStreak } from "@/hooks/use-streak"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

function InsightsSection() {
  const { streak } = useStreak()
  const insights = [
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <path fill="currentColor" d="M3 3h2v14H3zM7 13h2v4H7zM11 9h2v8h-2zM15 5h2v12h-2zM19 11h2v6h-2z"/>
        </svg>
      ),
      title: "Weekly Trend",
      value: "Improving",
      description: "Your mood has been trending upward this week",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <path fill="currentColor" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
        </svg>
      ),
      title: "Check-in Streak",
      value: `${streak.currentStreak} day${streak.currentStreak !== 1 ? "s" : ""}`,
      description: "Great job staying consistent with daily check-ins",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
          <path d="M8 12h8M12 8v8" stroke="currentColor"/>
        </svg>
      ),
      title: "Most Common",
      value: "Good",
      description: "Your most frequent mood this month",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Insights</h2>
      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight) => (
          <div key={insight.title} className="p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center`}>
                <insight.icon className={`${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">{insight.title}</h3>
                  <span className={`text-sm font-semibold ${insight.color}`}>{insight.value}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface InsightsModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function InsightsModal({ isOpen, setIsOpen }: InsightsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div
        className="bg-card rounded-xl p-4 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal X button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <InsightsSection />
      </div>
    </div>
  )
}