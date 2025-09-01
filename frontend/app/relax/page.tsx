import { StressReliefTabs } from "@/components/stress-relief-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function RelaxPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Stress Relief</h1>
          <p className="text-muted-foreground leading-relaxed">
            Take a moment to unwind with activities designed to help you relax and recharge.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-24">
          <StressReliefTabs />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="relax" />
      </div>
    </div>
  )
}