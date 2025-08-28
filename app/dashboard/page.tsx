import { WelcomeHeader } from "@/components/welcome-header"
import { MoodTracker } from "@/components/mood-tracker"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="max-w-sm mx-auto px-6 pt-8 pb-24">
          <WelcomeHeader />
          <MoodTracker />
          <QuickActions />
        </div>
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  )

  
}
