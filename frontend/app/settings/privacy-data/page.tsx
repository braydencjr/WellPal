"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Shield, Eye, Database, User, Heart, Book, Edit2, Save, X } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface OnboardingData {
  personalInfo?: {
    university?: string
    faculty?: string
    year?: string
    language?: string
    crisisHotlineCountry?: string
    emergencyContactName?: string
    emergencyContactPhone?: string
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
    theme?: string
    notificationPreferences?: string[]
    moodCheckInTime?: string
    calendarSync?: boolean
    healthDataSync?: boolean
    haptics?: boolean
    sounds?: boolean
  }
}

export default function PrivacyDataPage() {
  const { user } = useUser()
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({})
  const [editingData, setEditingData] = useState<OnboardingData>({})
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const mentalHealthConditions = ["Anxiety", "Depression", "OCD", "ADHD", "Other"]
  const universities = ["NUS", "NTU", "SMU", "SUSS", "SIT", "Other"]
  const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Graduate"]
  const languages = ["English", "Chinese", "Malay", "Tamil"]
  const themes = ["light", "dark", "system"]
  const calmingThemes = ["oceanBlue", "forestGreen", "sunsetOrange", "lavenderPurple"]

  useEffect(() => {
    if (user?.unsafeMetadata?.onboardingData) {
      const data = user.unsafeMetadata.onboardingData as OnboardingData
      setOnboardingData(data)
      setEditingData(JSON.parse(JSON.stringify(data))) // Deep copy
    }
    setIsLoading(false)
  }, [user])

  const handleSave = async () => {
    if (!user) return
    
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingData: editingData
        }
      })
      setOnboardingData(editingData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update onboarding data:', error)
    }
  }

  const handleCancel = () => {
    setEditingData(JSON.parse(JSON.stringify(onboardingData)))
    setIsEditing(false)
  }

  const updateEditingData = (section: keyof OnboardingData, field: string, value: any) => {
    setEditingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const toggleCondition = (condition: string) => {
    const currentConditions = editingData.mentalHealth?.conditions || []
    const newConditions = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition]
    
    setEditingData(prev => ({
      ...prev,
      mentalHealth: {
        ...prev.mentalHealth,
        conditions: newConditions
      }
    }))
  }

  const toggleNotification = (notification: string) => {
    const currentNotifications = editingData.preferences?.notificationPreferences || []
    const newNotifications = currentNotifications.includes(notification)
      ? currentNotifications.filter(n => n !== notification)
      : [...currentNotifications, notification]
    
    setEditingData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notificationPreferences: newNotifications
      }
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        <div className="px-6 pt-8 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
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
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Personal Information */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">University</Label>
                {isEditing ? (
                  <Input
                    value={editingData.personalInfo?.university || ""}
                    onChange={(e) => updateEditingData('personalInfo', 'university', e.target.value)}
                    placeholder="Enter university name"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.university || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Faculty</Label>
                {isEditing ? (
                  <Input
                    value={editingData.personalInfo?.faculty || ""}
                    onChange={(e) => updateEditingData('personalInfo', 'faculty', e.target.value)}
                    placeholder="Enter faculty"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.faculty || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Year</Label>
                {isEditing ? (
                  <Select
                    value={editingData.personalInfo?.year || ""}
                    onValueChange={(value) => updateEditingData('personalInfo', 'year', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.year || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Language</Label>
                {isEditing ? (
                  <Select
                    value={editingData.personalInfo?.language || ""}
                    onValueChange={(value) => updateEditingData('personalInfo', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.language || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Crisis Hotline Country</Label>
                {isEditing ? (
                  <Input
                    value={editingData.personalInfo?.crisisHotlineCountry || ""}
                    onChange={(e) => updateEditingData('personalInfo', 'crisisHotlineCountry', e.target.value)}
                    placeholder="Enter country"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.crisisHotlineCountry || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Emergency Contact Name</Label>
                {isEditing ? (
                  <Input
                    value={editingData.personalInfo?.emergencyContactName || ""}
                    onChange={(e) => updateEditingData('personalInfo', 'emergencyContactName', e.target.value)}
                    placeholder="Enter emergency contact name"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.emergencyContactName || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Emergency Contact Phone</Label>
                {isEditing ? (
                  <Input
                    value={editingData.personalInfo?.emergencyContactPhone || ""}
                    onChange={(e) => updateEditingData('personalInfo', 'emergencyContactPhone', e.target.value)}
                    placeholder="Enter emergency contact phone"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.personalInfo?.emergencyContactPhone || "Not set"}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Mental Health */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Mental Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Has mental health concerns</Label>
                {isEditing ? (
                  <Switch
                    checked={editingData.mentalHealth?.hasMentalHealth || false}
                    onCheckedChange={(checked) => updateEditingData('mentalHealth', 'hasMentalHealth', checked)}
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {onboardingData.mentalHealth?.hasMentalHealth ? "Yes" : "No"}
                  </span>
                )}
              </div>

              {(isEditing ? editingData.mentalHealth?.hasMentalHealth : onboardingData.mentalHealth?.hasMentalHealth) && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Conditions</Label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {mentalHealthConditions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={editingData.mentalHealth?.conditions?.includes(condition) || false}
                            onCheckedChange={() => toggleCondition(condition)}
                          />
                          <Label htmlFor={condition} className="text-sm">{condition}</Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {onboardingData.mentalHealth?.conditions?.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{condition}</Badge>
                      )) || <span className="text-sm text-muted-foreground">None selected</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Accessibility */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Book className="w-4 h-4" />
              Accessibility
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Dyslexia</Label>
                {isEditing ? (
                  <Switch
                    checked={editingData.accessibility?.hasDyslexia || false}
                    onCheckedChange={(checked) => updateEditingData('accessibility', 'hasDyslexia', checked)}
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {onboardingData.accessibility?.hasDyslexia ? "Yes" : "No"}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Color blindness</Label>
                {isEditing ? (
                  <Switch
                    checked={editingData.accessibility?.hasColorBlindness || false}
                    onCheckedChange={(checked) => updateEditingData('accessibility', 'hasColorBlindness', checked)}
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {onboardingData.accessibility?.hasColorBlindness ? "Yes" : "No"}
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Theme</Label>
                {isEditing ? (
                  <Select
                    value={editingData.preferences?.theme || ""}
                    onValueChange={(value) => updateEditingData('preferences', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme} className="capitalize">{theme}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground capitalize">{onboardingData.preferences?.theme || "Not set"}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Calming Background</Label>
                {isEditing ? (
                  <Select
                    value={editingData.preferences?.calmingTheme || ""}
                    onValueChange={(value) => updateEditingData('preferences', 'calmingTheme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select calming theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {calmingThemes.map((theme) => (
                        <SelectItem key={theme} value={theme} className="capitalize">
                          {theme.replace(/([A-Z])/g, ' $1').trim()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {onboardingData.preferences?.calmingTheme?.replace(/([A-Z])/g, ' $1').trim() || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Mood Check-in Time</Label>
                {isEditing ? (
                  <Input
                    type="time"
                    value={editingData.preferences?.moodCheckInTime || ""}
                    onChange={(e) => updateEditingData('preferences', 'moodCheckInTime', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{onboardingData.preferences?.moodCheckInTime || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Calendar sync</Label>
                    {isEditing ? (
                      <Switch
                        checked={editingData.preferences?.calendarSync || false}
                        onCheckedChange={(checked) => updateEditingData('preferences', 'calendarSync', checked)}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {onboardingData.preferences?.calendarSync ? "On" : "Off"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Health data sync</Label>
                    {isEditing ? (
                      <Switch
                        checked={editingData.preferences?.healthDataSync || false}
                        onCheckedChange={(checked) => updateEditingData('preferences', 'healthDataSync', checked)}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {onboardingData.preferences?.healthDataSync ? "On" : "Off"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Haptics</Label>
                    {isEditing ? (
                      <Switch
                        checked={editingData.preferences?.haptics || false}
                        onCheckedChange={(checked) => updateEditingData('preferences', 'haptics', checked)}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {onboardingData.preferences?.haptics ? "On" : "Off"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Sounds</Label>
                    {isEditing ? (
                      <Switch
                        checked={editingData.preferences?.sounds || false}
                        onCheckedChange={(checked) => updateEditingData('preferences', 'sounds', checked)}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {onboardingData.preferences?.sounds ? "On" : "Off"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
              <Button
                variant="outline"
                className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    // Handle account deletion
                  }
                }}
              >
                Delete My Account
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Your data is stored securely in your Clerk profile. You can edit all information directly on this page.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
