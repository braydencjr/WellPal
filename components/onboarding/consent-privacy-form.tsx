"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, Shield, Eye, BarChart3, FileText, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ConsentPrivacyForm() {
  const [consents, setConsents] = useState({
    dataUsage: false,
    termsAndPrivacy: false,
    anonymizedAnalytics: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!consents.dataUsage) {
      newErrors.dataUsage = "You must consent to data usage to continue"
    }

    if (!consents.termsAndPrivacy) {
      newErrors.termsAndPrivacy = "You must agree to the Terms of Service and Privacy Policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/onboarding/preferences")
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const updateConsent = (key: string, value: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: value }))
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold">Privacy & Consent</CardTitle>
              <CardDescription>
                Your privacy and data security are our top priorities. Please review and consent to how we handle your
                information.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                {/* Data Usage Consent */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataUsage"
                      checked={consents.dataUsage}
                      onCheckedChange={(checked) => updateConsent("dataUsage", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <label htmlFor="dataUsage" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        Data Usage Consent (Required)
                      </label>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <p>I consent to HaventDecide collecting and processing my data to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Provide personalized mental health support and recommendations</li>
                          <li>Track mood patterns and wellness progress</li>
                          <li>Send relevant notifications and reminders</li>
                          <li>Ensure app functionality and user safety</li>
                        </ul>
                        <p className="font-medium">
                          Your data is encrypted and never shared with third parties without your explicit consent.
                        </p>
                      </div>
                      {errors.dataUsage && <p className="text-xs text-destructive">{errors.dataUsage}</p>}
                    </div>
                  </div>

                  {/* Terms and Privacy */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="termsAndPrivacy"
                      checked={consents.termsAndPrivacy}
                      onCheckedChange={(checked) => updateConsent("termsAndPrivacy", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <label
                        htmlFor="termsAndPrivacy"
                        className="text-sm font-medium cursor-pointer flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-primary" />
                        Terms & Privacy Agreement (Required)
                      </label>
                      <div className="text-xs text-muted-foreground">
                        <p>
                          I have read and agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline font-medium">
                            Privacy Policy
                          </Link>
                          . I understand my rights regarding data access, correction, and deletion.
                        </p>
                      </div>
                      {errors.termsAndPrivacy && <p className="text-xs text-destructive">{errors.termsAndPrivacy}</p>}
                    </div>
                  </div>

                  {/* Analytics Opt-in */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="anonymizedAnalytics"
                      checked={consents.anonymizedAnalytics}
                      onCheckedChange={(checked) => updateConsent("anonymizedAnalytics", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <label
                        htmlFor="anonymizedAnalytics"
                        className="text-sm font-medium cursor-pointer flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4 text-secondary" />
                        Anonymized Analytics (Optional)
                      </label>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <p>Help us improve the app by sharing anonymized usage data:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>App performance and crash reports</li>
                          <li>Feature usage patterns (no personal content)</li>
                          <li>General wellness trends (aggregated data only)</li>
                        </ul>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          This data is completely anonymous and helps us create better mental health tools for students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Highlights */}
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Your Privacy Rights</h4>
                      <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                        <li>• Access and download your data anytime</li>
                        <li>• Request corrections or deletions</li>
                        <li>• Withdraw consent at any time</li>
                        <li>• Data is stored securely and encrypted</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Accept and Continue"}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Questions about privacy?{" "}
                    <Link href="/privacy-help" className="text-primary hover:underline">
                      Contact our privacy team
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
