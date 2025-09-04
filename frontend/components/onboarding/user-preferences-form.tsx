"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, Bell, Calendar, Palette, Smartphone, Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useUser } from "@clerk/nextjs"

const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
]

const themeOptions = [
  { id: "green", name: "Calming Green", color: "bg-green-500", description: "Peaceful and natural" },
  { id: "blue", name: "Serene Blue", color: "bg-blue-500", description: "Tranquil and focused" },
  { id: "teal", name: "Balanced Teal", color: "bg-teal-500", description: "Harmonious blend" },
]

const backgroundStyles = [
  { id: "solid", name: "Solid Colors", description: "Clean and minimal" },
  { id: "gradient", name: "Soft Gradients", description: "Gentle color transitions" },
  { id: "illustration", name: "Soft Illustrations", description: "Calming nature themes" },
]

export function UserPreferencesForm() {
  const { data, updateData } = useOnboarding()
  const { user } = useUser()
  const [preferences, setPreferences] = useState({
    moodCheckInTime: "09:00",
    notifications: {
      reminders: true,
      encouragement: true,
      studyBreaks: false,
    },
    calendarSync: false,
    healthDataSync: false,
    theme: "light",
    backgroundStyle: "default",
    haptics: true,
    sounds: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  try {
    // Save preferences to onboarding context
    const preferencesData = {
      calmingTheme: preferences.backgroundStyle,
      theme: preferences.theme,
      notificationPreferences: Object.entries(preferences.notifications)
        .filter(([_, enabled]) => enabled)
        .map(([key, _]) => key),
      moodCheckInTime: preferences.moodCheckInTime,
      calendarSync: preferences.calendarSync,
      healthDataSync: preferences.healthDataSync,
      haptics: preferences.haptics,
      sounds: preferences.sounds,
    }
    
    updateData({
      preferences: preferencesData
    })

    // Save to Clerk metadata (partial onboarding data)
    if (user) {
      const updatedData = {
        ...data,
        preferences: preferencesData
      }
      
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingData: updatedData
        }
      })
    }
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/onboarding/summary")
  } catch (error) {
    setError("Something went wrong. Please try again.")
  } finally {
    setIsLoading(false)
  }
}


  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const updateNotificationPreference = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4">
        <Button variant="ghost" size="sm" onClick={goBack} className="mr-2">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex space-x-2">
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-8 rounded-full bg-primary"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <div className="max-w-sm mx-auto space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold">Customize Your Experience</CardTitle>
              <CardDescription>
                Set up your preferences to make the app work perfectly for your lifestyle and needs
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Mood Check-in Time */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <Label className="text-sm font-medium">Daily Mood Check-in Time</Label>
                </div>
                <Select
                  value={preferences.moodCheckInTime}
                  onValueChange={(value) => updatePreference("moodCheckInTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  When would you like to be reminded to check in with your mood?
                </p>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <Label className="text-sm font-medium">Notification Preferences</Label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <Label htmlFor="reminders" className="text-sm font-medium">
                        Gentle Reminders
                      </Label>
                      <p className="text-xs text-muted-foreground">Mood check-ins and wellness tips</p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={preferences.notifications.reminders}
                      onCheckedChange={(checked) => updateNotificationPreference("reminders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <Label htmlFor="encouragement" className="text-sm font-medium">
                        Encouragement
                      </Label>
                      <p className="text-xs text-muted-foreground">Positive messages and motivation</p>
                    </div>
                    <Switch
                      id="encouragement"
                      checked={preferences.notifications.encouragement}
                      onCheckedChange={(checked) => updateNotificationPreference("encouragement", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <Label htmlFor="studyBreaks" className="text-sm font-medium">
                        Study Break Prompts
                      </Label>
                      <p className="text-xs text-muted-foreground">Reminders to take healthy breaks</p>
                    </div>
                    <Switch
                      id="studyBreaks"
                      checked={preferences.notifications.studyBreaks}
                      onCheckedChange={(checked) => updateNotificationPreference("studyBreaks", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Integrations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <Label className="text-sm font-medium">Integrations</Label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <Label htmlFor="calendarSync" className="text-sm font-medium">
                        Google Calendar Sync
                      </Label>
                      <p className="text-xs text-muted-foreground">Track deadlines and schedule wellness breaks</p>
                    </div>
                    <Switch
                      id="calendarSync"
                      checked={preferences.calendarSync}
                      onCheckedChange={(checked) => updatePreference("calendarSync", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div>
                      <Label htmlFor="healthDataSync" className="text-sm font-medium">
                        Health Data Sync
                      </Label>
                      <p className="text-xs text-muted-foreground">Connect steps and sleep data (optional)</p>
                    </div>
                    <Switch
                      id="healthDataSync"
                      checked={preferences.healthDataSync}
                      onCheckedChange={(checked) => updatePreference("healthDataSync", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Theme and Background Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-orange-600" />
                  <Label className="text-lg font-semibold">Personalization</Label>
                </div>

                {/* Theme Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">🎨 Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.theme === "light" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("theme", "light")}
                    >
                      <div className="mb-2">☀️</div>
                      <div className="text-sm font-medium">Light</div>
                      <div className="text-xs text-gray-500">Bright and clean</div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.theme === "dark" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("theme", "dark")}
                    >
                      <div className="mb-2">🌙</div>
                      <div className="text-sm font-medium">Dark</div>
                      <div className="text-xs text-gray-500">Easy on the eyes</div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.theme === "auto" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("theme", "auto")}
                    >
                      <div className="mb-2">📱</div>
                      <div className="text-sm font-medium">Auto</div>
                      <div className="text-xs text-gray-500">Follows system</div>
                    </div>
                  </div>
                </div>

                {/* Calming Background */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Calming Background</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.backgroundStyle === "default" ? "border-orange-500" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("backgroundStyle", "default")}
                    >
                      <div className="h-12 w-full rounded-lg bg-gray-200 mb-2"></div>
                      <div className="text-sm font-medium">Default</div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.backgroundStyle === "softGreen" ? "border-orange-500" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("backgroundStyle", "softGreen")}
                    >
                      <div className="h-12 w-full rounded-lg bg-green-200 mb-2"></div>
                      <div className="text-sm font-medium">Soft Green</div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.backgroundStyle === "calmBlue" ? "border-orange-500" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("backgroundStyle", "calmBlue")}
                    >
                      <div className="h-12 w-full rounded-lg bg-blue-200 mb-2"></div>
                      <div className="text-sm font-medium">Calm Blue</div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        preferences.backgroundStyle === "warmBeige" ? "border-orange-500" : "border-gray-200"
                      }`}
                      onClick={() => updatePreference("backgroundStyle", "warmBeige")}
                    >
                      <div className="h-12 w-full rounded-lg bg-amber-100 mb-2"></div>
                      <div className="text-sm font-medium">Warm Beige</div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Experience Settings */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Experience Settings</Label>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-primary" />
                      <div>
                        <Label htmlFor="haptics" className="text-sm font-medium">
                          Haptic Feedback
                        </Label>
                        <p className="text-xs text-muted-foreground">Gentle vibrations for interactions</p>
                      </div>
                    </div>
                    <Switch
                      id="haptics"
                      checked={preferences.haptics}
                      onCheckedChange={(checked) => updatePreference("haptics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-primary" />
                      <div>
                        <Label htmlFor="sounds" className="text-sm font-medium">
                          Subtle Sounds
                        </Label>
                        <p className="text-xs text-muted-foreground">Calming audio feedback</p>
                      </div>
                    </div>
                    <Switch
                      id="sounds"
                      checked={preferences.sounds}
                      onCheckedChange={(checked) => updatePreference("sounds", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t">
        <div className="max-w-sm mx-auto">
          <Button onClick={handleSubmit} className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Saving preferences..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}
