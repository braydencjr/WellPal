"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Bell, Shield, Palette, Calendar, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data - in a real app, this would come from the onboarding state/context
const mockUserData = {
  name: "John Doe",
  university: "University of Example",
  faculty: "Computer Science",
  studyYear: "3rd Year",
  timeZone: "UTC-05:00",
  language: "English",
  moodCheckInTime: "09:00",
  notifications: {
    reminders: true,
    encouragement: true,
    studyBreaks: false,
  },
  accessibility: {
    largerText: false,
    highContrast: false,
    dyslexiaFriendlyFont: true,
    reduceMotion: false,
    screenReaderHints: false,
  },
  privacy: {
    dataUsage: true,
    termsAndPrivacy: true,
    anonymizedAnalytics: true,
  },
  theme: "Calming Green",
  backgroundStyle: "Solid Colors",
  integrations: {
    calendarSync: true,
    healthDataSync: false,
  },
}

export function OnboardingSummary() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStartApp = async () => {
    setIsLoading(true)

    try {
      // Simulate final setup completion
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const enabledNotifications = Object.entries(mockUserData.notifications)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key)

  const enabledAccessibility = Object.entries(mockUserData.accessibility)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key)

  const enabledIntegrations = Object.entries(mockUserData.integrations)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex space-x-2 justify-center">
          <div className="h-2 w-8 rounded-full bg-primary"></div>
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
          {/* Welcome Message */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold">
                  You're all set, {mockUserData.name.split(" ")[0]}!
                </CardTitle>
                <CardDescription className="mt-2">
                  Your personalized mental wellness experience is ready. Here's a summary of your preferences.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">University:</span>
                <span className="font-medium">{mockUserData.university}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Faculty:</span>
                <span className="font-medium">{mockUserData.faculty}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Year:</span>
                <span className="font-medium">{mockUserData.studyYear}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Language:</span>
                <span className="font-medium">{mockUserData.language}</span>
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Schedule */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily check-in:</span>
                <span className="font-medium">{mockUserData.moodCheckInTime}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Enabled notifications:</p>
                <div className="flex flex-wrap gap-2">
                  {enabledNotifications.map((notification) => (
                    <Badge key={notification} variant="secondary" className="text-xs">
                      {notification === "reminders" && "Gentle Reminders"}
                      {notification === "encouragement" && "Encouragement"}
                      {notification === "studyBreaks" && "Study Breaks"}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Data usage consent provided</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Terms & Privacy Policy accepted</span>
              </div>
              {mockUserData.privacy.anonymizedAnalytics && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Anonymized analytics enabled</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Accessibility */}
          {enabledAccessibility.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {enabledAccessibility.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature === "largerText" && "Larger Text"}
                      {feature === "highContrast" && "High Contrast"}
                      {feature === "dyslexiaFriendlyFont" && "Dyslexia-Friendly Font"}
                      {feature === "reduceMotion" && "Reduce Motion"}
                      {feature === "screenReaderHints" && "Screen Reader Hints"}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personalization */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Personalization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Theme:</span>
                <span className="font-medium">{mockUserData.theme}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Background:</span>
                <span className="font-medium">{mockUserData.backgroundStyle}</span>
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          {enabledIntegrations.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {enabledIntegrations.map((integration) => (
                    <div key={integration} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>
                        {integration === "calendarSync" && "Google Calendar Sync"}
                        {integration === "healthDataSync" && "Health Data Sync"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="border-0 shadow-sm bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-primary">What's Next?</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span>Complete your first mood check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span>Explore stress relief tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span>Set up your support network</span>
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
          <Button onClick={handleStartApp} className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Setting up your experience..." : "Start using HaventDecide"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            You can change these settings anytime in your profile
          </p>
        </div>
      </div>
    </div>
  )
}
