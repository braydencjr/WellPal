"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Bell, Shield, Palette, Calendar, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useOnboarding } from "@/contexts/onboarding-context"

export function OnboardingSummary() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const { data } = useOnboarding()
  const router = useRouter()

  const handleStartApp = async () => {
    if (!user) return

    setIsLoading(true)

    try {
      // Save onboarding data to Clerk metadata
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingData: data,
          onboardingCompleted: true,
        }
      })

      // Wait a moment for the update to process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
      // Still navigate to dashboard even if metadata update fails
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  // Get user's first name for personalization
  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "User"

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
                  You're all set, {firstName}!
                </CardTitle>
                <CardDescription className="mt-2">
                  Your personalized mental wellness experience is ready. Here's a summary of your preferences.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information */}
          {data.personalInfo && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.personalInfo.university && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">University:</span>
                    <span className="font-medium">{data.personalInfo.university}</span>
                  </div>
                )}
                {data.personalInfo.faculty && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Faculty:</span>
                    <span className="font-medium">{data.personalInfo.faculty}</span>
                  </div>
                )}
                {data.personalInfo.year && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{data.personalInfo.year}</span>
                  </div>
                )}
                {data.personalInfo.language && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">{data.personalInfo.language}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Mental Health Information */}
          {data.mentalHealth && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Mental Health Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>
                    {data.mentalHealth.hasMentalHealth 
                      ? "Mental health support enabled" 
                      : "General wellness support enabled"
                    }
                  </span>
                </div>
                {data.mentalHealth.conditions && data.mentalHealth.conditions.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Support areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.mentalHealth.conditions.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Accessibility Features */}
          {data.accessibility && (Object.values(data.accessibility).some(v => v === true)) && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Accessibility Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.accessibility.hasDyslexia && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Dyslexia-friendly features enabled</span>
                    </div>
                  )}
                  {data.accessibility.hasColorBlindness && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Color accessibility features enabled</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personalization */}
          {data.preferences && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.preferences.calmingTheme && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-medium">{data.preferences.calmingTheme}</span>
                  </div>
                )}
                {data.preferences.notificationPreferences && data.preferences.notificationPreferences.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Notifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.preferences.notificationPreferences.map((pref, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
            {isLoading ? "Setting up your experience..." : "Start Your Journey"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            You can change these settings anytime in your profile
          </p>
        </div>
      </div>
    </div>
  )
}
