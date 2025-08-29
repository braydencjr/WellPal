import { ProfileDogBanner } from "@/components/profile-dog-banner"
import { ProfileHeader } from "@/components/profile-header"
import { PersonalizationSettings } from "@/components/personalization-settings"
import { AppSettings } from "@/components/app-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        {/* Main Content */}
        <div className="px-6 pt-12 pb-24 space-y-6">
          <ProfileDogBanner />
          <ProfileHeader />
          <PersonalizationSettings />
          <AppSettings />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="profile" />
      </div>
    </div>
  )
}
