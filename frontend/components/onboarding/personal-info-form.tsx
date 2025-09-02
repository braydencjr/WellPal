"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"


const languages = [
  "English",
  "Malay",
  "Chinese",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Russian",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Other",
]

const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate", "PhD", "Other"]

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Other",
]

export function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    faculty: "",
    studyYear: "",
    timeZone: "",
    language: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    crisisHotlineCountry: "",
    includeEmergencyContact: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.university.trim()) {
      newErrors.university = "University is required"
    }

    if (!formData.faculty.trim()) {
      newErrors.faculty = "Faculty/Major is required"
    }

    if (!formData.studyYear) {
      newErrors.studyYear = "Year of study is required"
    }

    if (!formData.timeZone) {
      newErrors.timeZone = "Time zone is required"
    }

    if (!formData.language) {
      newErrors.language = "Preferred language is required"
    }

    if (!formData.crisisHotlineCountry) {
      newErrors.crisisHotlineCountry = "Crisis hotline country is required"
    }

    if (formData.includeEmergencyContact) {
      if (!formData.emergencyContactName.trim()) {
        newErrors.emergencyContactName = "Emergency contact name is required"
      }
      if (!formData.emergencyContactPhone.trim()) {
        newErrors.emergencyContactPhone = "Emergency contact phone is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({}) // clear errors if any

    // here you could add validation logic
    // e.g. if (!formData.firstName) { setErrors({ firstName: "Required" }); setIsLoading(false); return; }

    // simulate "saving" delay
    setTimeout(() => {
      // ✅ navigate after "saving"
      router.push("/onboarding/preferences")
      setIsLoading(false)
    }, 1000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
          <div className="h-2 w-8 rounded-full bg-muted"></div>
          <div className="h-2 w-8 rounded-full bg-muted"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold">Tell us about yourself</CardTitle>
              <CardDescription>This helps us personalize your experience and provide relevant support</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                {/* University */}
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    placeholder="University of Example"
                    value={formData.university}
                    onChange={(e) => updateFormData("university", e.target.value)}
                    className={errors.university ? "border-destructive" : ""}
                  />
                  {errors.university && <p className="text-xs text-destructive">{errors.university}</p>}
                </div>


                {/* Preferred Language */}
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                    <SelectTrigger className={errors.language ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && <p className="text-xs text-destructive">{errors.language}</p>}
                </div>

                {/* Crisis Hotline Country */}
                <div className="space-y-2">
                  <Label htmlFor="crisisHotlineCountry">Crisis Hotline Country</Label>
                  <Select
                    value={formData.crisisHotlineCountry}
                    onValueChange={(value) => updateFormData("crisisHotlineCountry", value)}
                  >
                    <SelectTrigger className={errors.crisisHotlineCountry ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.crisisHotlineCountry && (
                    <p className="text-xs text-destructive">{errors.crisisHotlineCountry}</p>
                  )}
                </div>

                {/* Emergency Contact Toggle */}
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="includeEmergencyContact"
                    checked={formData.includeEmergencyContact}
                    onCheckedChange={(checked) => updateFormData("includeEmergencyContact", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="includeEmergencyContact"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Add emergency contact (optional)
                    </label>
                    <p className="text-xs text-muted-foreground">Someone we can contact in case of emergency</p>
                  </div>
                </div>

                {/* Emergency Contact Fields */}
                {formData.includeEmergencyContact && (
                  <div className="space-y-4 pt-2 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        placeholder="Contact name"
                        value={formData.emergencyContactName}
                        onChange={(e) => updateFormData("emergencyContactName", e.target.value)}
                        className={errors.emergencyContactName ? "border-destructive" : ""}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-xs text-destructive">{errors.emergencyContactName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => updateFormData("emergencyContactPhone", e.target.value)}
                        className={errors.emergencyContactPhone ? "border-destructive" : ""}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-xs text-destructive">{errors.emergencyContactPhone}</p>
                      )}
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 mt-6" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Continue"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
