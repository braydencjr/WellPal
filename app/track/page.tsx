import { MoodHistory } from "@/components/mood-history"
import { MoodInsights } from "@/components/mood-insights"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Mood Tracking</h1>
          <p className="text-muted-foreground leading-relaxed">
            Track your emotional journey and discover patterns in your wellbeing.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-24 space-y-6">
          <MoodInsights />
          <MoodHistory />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="track" />
      </div>
    </div>
  )
}
