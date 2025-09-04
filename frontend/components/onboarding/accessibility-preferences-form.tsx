"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, Eye, Type, Palette, MousePointer, Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function AccessibilityPreferencesForm() {
  const [preferences, setPreferences] = useState({
    largerText: false,
    highContrast: false,
    colorBlindness: false,
    colorBlindnessType: "",
    dyslexia: false,
    dyslexiaSupport: "",
    reduceMotion: false,
    screenReaderHints: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/onboarding/consent")
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreference = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const goBack = () => {
    router.back()
  }

  const accessibilityOptions = [
    {
      key: "largerText",
      title: "Larger Text",
      description: "Increase text size throughout the app for better readability",
      icon: Type,
      value: preferences.largerText,
    },
    {
      key: "highContrast",
      title: "High Contrast",
      description: "Use higher contrast colors to improve visibility",
      icon: Palette,
      value: preferences.highContrast,
    },
    {
      key: "colorBlindness",
      title: "I have colour blindness",
      description: "Enable color accessibility features",
      icon: Eye,
      value: preferences.colorBlindness,
    },
    {
      key: "dyslexia",
      title: "I have dyslexia",
      description: "Enable dyslexia-friendly reading features",
      icon: Type,
      value: preferences.dyslexia,
    },
    {
      key: "reduceMotion",
      title: "Reduce Motion",
      description: "Minimize animations and transitions that may cause discomfort",
      icon: MousePointer,
      value: preferences.reduceMotion,
    },
    {
      key: "screenReaderHints",
      title: "Screen Reader Hints",
      description: "Add extra context and descriptions for screen readers",
      icon: Volume2,
      value: preferences.screenReaderHints,
    },
  ]

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
          <div className="h-2 w-8 rounded-full bg-muted"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold">Accessibility Preferences</CardTitle>
              <CardDescription>
                Customize your experience to make the app more comfortable and accessible for you
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  {accessibilityOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <div key={option.key}>
                        <div className="flex items-start space-x-4 p-4 rounded-lg border bg-card/50">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={option.key} className="text-sm font-medium cursor-pointer">
                                {option.title}
                              </Label>
                              <Switch
                                id={option.key}
                                checked={option.value}
                                onCheckedChange={(checked) => updatePreference(option.key, checked)}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{option.description}</p>
                          </div>
                        </div>

                        {/* Color Blindness Sub-options */}
                        {option.key === "colorBlindness" && preferences.colorBlindness && (
                          <div className="ml-6 mt-3 space-y-2">
                            <Label className="text-sm font-medium">Type of color blindness:</Label>
                            <div className="space-y-2">
                              {["Protanopia (Red-Green)", "Deuteranopia (Red-Green)", "Tritanopia (Blue-Yellow)", "Monochromacy", "Other"].map((type) => (
                                <label key={type} className="flex items-center space-x-2 p-2 rounded border bg-card/30 cursor-pointer hover:bg-card/50">
                                  <input
                                    type="radio"
                                    name="colorBlindnessType"
                                    value={type}
                                    checked={preferences.colorBlindnessType === type}
                                    onChange={(e) => updatePreference("colorBlindnessType", e.target.value)}
                                    className="w-4 h-4 text-primary"
                                  />
                                  <span className="text-sm">{type}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Dyslexia Sub-options */}
                        {option.key === "dyslexia" && preferences.dyslexia && (
                          <div className="ml-6 mt-3 space-y-2">
                            <Label className="text-sm font-medium">Dyslexia support options:</Label>
                            <div className="space-y-2">
                              {["OpenDyslexic Font", "Increased Letter Spacing", "Larger Line Height", "Reading Ruler/Guide", "Text-to-Speech", "All of the above"].map((support) => (
                                <label key={support} className="flex items-center space-x-2 p-2 rounded border bg-card/30 cursor-pointer hover:bg-card/50">
                                  <input
                                    type="radio"
                                    name="dyslexiaSupport"
                                    value={support}
                                    checked={preferences.dyslexiaSupport === support}
                                    onChange={(e) => updatePreference("dyslexiaSupport", e.target.value)}
                                    className="w-4 h-4 text-primary"
                                  />
                                  <span className="text-sm">{support}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Preview</h4>
                  <div
                    className={`space-y-2 ${preferences.largerText ? "text-lg" : "text-sm"} ${
                      preferences.highContrast ? "contrast-150" : ""
                    } ${preferences.dyslexia && preferences.dyslexiaSupport === "OpenDyslexic Font" ? "font-mono" : ""}`}
                    style={{
                      animation: preferences.reduceMotion ? "none" : undefined,
                      letterSpacing: preferences.dyslexia && preferences.dyslexiaSupport === "Increased Letter Spacing" ? "0.1em" : undefined,
                      lineHeight: preferences.dyslexia && preferences.dyslexiaSupport === "Larger Line Height" ? "1.8" : undefined,
                    }}
                  >
                    <p className="text-foreground">Sample text with your preferences applied.</p>
                    <p className="text-muted-foreground">
                      This shows how text will appear throughout the app.
                      {preferences.screenReaderHints && (
                        <span className="sr-only">
                          {" "}
                          (Screen reader hint: This is a preview of your accessibility settings)
                        </span>
                      )}
                    </p>
                    {preferences.colorBlindness && preferences.colorBlindnessType && (
                      <p className="text-xs text-blue-600">
                        Color accessibility enabled for: {preferences.colorBlindnessType}
                      </p>
                    )}
                    {preferences.dyslexia && preferences.dyslexiaSupport && (
                      <p className="text-xs text-green-600">
                        Dyslexia support: {preferences.dyslexiaSupport}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> You can change these settings anytime in your profile preferences.
                  </p>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isLoading}>
                  {isLoading ? "Saving preferences..." : "Continue"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => router.push("/onboarding/consent")}
                >
                  Skip for now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
