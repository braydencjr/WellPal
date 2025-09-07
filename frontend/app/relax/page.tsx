import { StressReliefTabs } from "@/components/stress-relief-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { RelaxDogAnimation } from "@/components/relax-dog-animation"

export default function RelaxPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card relative min-h-screen">
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
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="relax" />
      
      {/* Relax Dog Animation fixed in bottom-right corner of app container */}
      <div 
        className="fixed bottom-16 z-50"
        style={{
          right: `max(1rem, calc(50vw - 192px + 1rem))`
        }}
      >
        <RelaxDogAnimation />
      </div>
    </div>
  )
}