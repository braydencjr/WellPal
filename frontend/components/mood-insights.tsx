"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"

const insights = [
  {
    icon: TrendingUp,
    title: "Weekly Trend",
    value: "Improving",
    description: "Your mood has been trending upward this week",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Check-in Streak",
    value: "7 days",
    description: "Great job staying consistent with daily check-ins",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Award,
    title: "Most Common",
    value: "Good",
    description: "Your most frequent mood this month",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function MoodInsights() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Insights</h2>

      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight) => (
          <Card key={insight.title} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">{insight.title}</h3>
                  <span className={`text-sm font-semibold ${insight.color}`}>{insight.value}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
