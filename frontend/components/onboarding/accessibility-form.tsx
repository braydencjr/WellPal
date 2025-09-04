"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Accessibility, Eye, Brain, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useUser } from "@clerk/nextjs"

const mentalHealthConditions = [
  "Anxiety",
  "Depression", 
  "OCD",
  "ADHD",
  "Bipolar Disorder",
  "PTSD",
  "Eating Disorders",
  "Other"
]

export function AccessibilityForm() {
  const { data, updateData } = useOnboarding()
  const { user } = useUser()
  const [formData, setFormData] = useState({
    hasColorBlindness: data.accessibility?.hasColorBlindness || false,
    hasDyslexia: data.accessibility?.hasDyslexia || false,
    hasMentalHealth: data.mentalHealth?.hasMentalHealth || false,
    conditions: data.mentalHealth?.conditions || []
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save to onboarding context
      const updatedData = {
        ...data,
        accessibility: {
          hasColorBlindness: formData.hasColorBlindness,
          hasDyslexia: formData.hasDyslexia
        },
        mentalHealth: {
          hasMentalHealth: formData.hasMentalHealth,
          conditions: formData.conditions
        }
      }
      
      updateData({
        accessibility: {
          hasColorBlindness: formData.hasColorBlindness,
          hasDyslexia: formData.hasDyslexia
        },
        mentalHealth: {
          hasMentalHealth: formData.hasMentalHealth,
          conditions: formData.conditions
        }
      })
      
      // Save all onboarding data to Clerk metadata
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            onboardingData: updatedData
          }
        })
      }
      
      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving accessibility data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold">Help us understand you better</CardTitle>
              <CardDescription>
                This information helps us provide better support and customize your experience
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Color Blindness */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <Label className="text-base font-medium">Visual Accessibility</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="colorBlindness"
                    checked={formData.hasColorBlindness}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, hasColorBlindness: checked as boolean }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="colorBlindness" className="text-sm font-medium">
                      I have color blindness
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      We'll adjust colors and use patterns to help you navigate better
                    </p>
                  </div>
                </div>
              </div>

              {/* Dyslexia */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <Label className="text-base font-medium">Learning Accessibility</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dyslexia"
                    checked={formData.hasDyslexia}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, hasDyslexia: checked as boolean }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="dyslexia" className="text-sm font-medium">
                      I have dyslexia
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      We'll use dyslexia-friendly fonts and spacing to make reading easier
                    </p>
                  </div>
                </div>
              </div>

              {/* Mental Health */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <Label className="text-base font-medium">Mental Health Support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mentalHealth"
                    checked={formData.hasMentalHealth}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, hasMentalHealth: checked as boolean }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="mentalHealth" className="text-sm font-medium">
                      I would like mental health support
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      We can provide additional resources and tailor our approach to your needs
                    </p>
                  </div>
                </div>

                {/* Mental Health Conditions */}
                {formData.hasMentalHealth && (
                  <div className="ml-6 space-y-3 p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium">Which areas would you like support with? (optional)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {mentalHealthConditions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={formData.conditions.includes(condition)}
                            onCheckedChange={() => toggleCondition(condition)}
                          />
                          <Label htmlFor={condition} className="text-sm">{condition}</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This helps us provide relevant resources and support options
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  All information is kept private and secure. You can change these settings anytime in your profile.
                </p>
              </div>

              <Button onClick={handleSubmit} className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Completing setup..." : "Complete Setup"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
