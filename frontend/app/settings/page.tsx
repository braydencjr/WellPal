import { ProfileDogBanner } from "@/components/profile-dog-banner"
import { ProfileHeader } from "@/components/profile-header"
import { PersonalizationSettings } from "@/components/personalization-settings"
import { AppSettings } from "@/components/settings"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SettingsDogAnimation } from "@/components/settings-dog-animation"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card relative">
        {/* Main Content */}
        <div className="px-6 pt-12 pb-24 space-y-6">
          <ProfileDogBanner />
          <ProfileHeader />
          <PersonalizationSettings />
          <AppSettings />
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="settings" />
      
      {/* Settings Dog Animation fixed in bottom-right corner of app container */}
      <div 
        className="fixed bottom-16 z-50"
        style={{
          right: `max(1rem, calc(50vw - 192px + 1rem))`
        }}
      >
        <SettingsDogAnimation />
      </div>

    </div>
  )
}
