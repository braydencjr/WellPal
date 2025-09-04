"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Eye, Database, User, Heart, Book } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface OnboardingData {
  personalInfo?: {
    university?: string
    faculty?: string
    year?: string
    language?: string
  }
  mentalHealth?: {
    hasMentalHealth?: boolean
    conditions?: string[]
  }
  accessibility?: {
    hasDyslexia?: boolean
    hasColorBlindness?: boolean
  }
  preferences?: {
    calmingTheme?: string
    notificationPreferences?: string[]
  }
}

export default function PrivacyDataPage() {
  const { user } = useUser()
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load onboarding data from Clerk user metadata
    if (user?.unsafeMetadata?.onboardingData) {
      setOnboardingData(user.unsafeMetadata.onboardingData as OnboardingData)
    }
    setIsLoading(false)
  }, [user])

  const updateOnboardingData = async (newData: Partial<OnboardingData>) => {
    if (!user) return
    
    try {
      const updatedData = { ...onboardingData, ...newData }
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingData: updatedData
        }
      })
      setOnboardingData(updatedData)
    } catch (error) {
      console.error('Failed to update onboarding data:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="px-6 pt-8 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">Privacy & Data</h1>
            </div>
          </div>

          {/* Onboarding Information */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Onboarding Information
            </h3>
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            ) : (
              <div className="space-y-4">
                {/* Personal Information */}
                {onboardingData.personalInfo && (
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Personal Details</Label>
                    <div className="space-y-2 text-sm">
                      {onboardingData.personalInfo.university && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">University:</span>
                          <span>{onboardingData.personalInfo.university}</span>
                        </div>
                      )}
                      {onboardingData.personalInfo.faculty && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Faculty:</span>
                          <span>{onboardingData.personalInfo.faculty}</span>
                        </div>
                      )}
                      {onboardingData.personalInfo.year && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year:</span>
                          <span>{onboardingData.personalInfo.year}</span>
                        </div>
                      )}
                      {onboardingData.personalInfo.language && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Language:</span>
                          <span>{onboardingData.personalInfo.language}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mental Health */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <Label htmlFor="mental-health" className="text-sm font-medium">Mental Health Concerns</Label>
                    </div>
                    <Switch 
                      id="mental-health"
                      checked={onboardingData.mentalHealth?.hasMentalHealth || false}
                      onCheckedChange={(checked) => 
                        updateOnboardingData({
                          mentalHealth: { 
                            ...onboardingData.mentalHealth,
                            hasMentalHealth: checked 
                          }
                        })
                      }
                    />
                  </div>
                  {onboardingData.mentalHealth?.conditions && onboardingData.mentalHealth.conditions.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Conditions:</Label>
                      <div className="flex flex-wrap gap-1">
                        {onboardingData.mentalHealth.conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Accessibility */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      <Label htmlFor="dyslexia" className="text-sm font-medium">Dyslexia</Label>
                    </div>
                    <Switch 
                      id="dyslexia"
                      checked={onboardingData.accessibility?.hasDyslexia || false}
                      onCheckedChange={(checked) => 
                        updateOnboardingData({
                          accessibility: { 
                            ...onboardingData.accessibility,
                            hasDyslexia: checked 
                          }
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <Label htmlFor="color-blindness" className="text-sm font-medium">Color Blindness</Label>
                    </div>
                    <Switch 
                      id="color-blindness"
                      checked={onboardingData.accessibility?.hasColorBlindness || false}
                      onCheckedChange={(checked) => 
                        updateOnboardingData({
                          accessibility: { 
                            ...onboardingData.accessibility,
                            hasColorBlindness: checked 
                          }
                        })
                      }
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all onboarding data? This action cannot be undone.')) {
                      updateOnboardingData({})
                    }
                  }}
                >
                  Reset Onboarding Data
                </Button>
              </div>
            )}
          </Card>

          {/* Data Management */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Management
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5">
                Delete My Account
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Your onboarding data is stored securely in your Clerk profile metadata. 
              This allows you to maintain your preferences across devices without requiring a separate database.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
