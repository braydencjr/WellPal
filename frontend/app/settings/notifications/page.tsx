"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Clock, Heart, Mail, Calendar } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function NotificationsPage() {
  const { user, updateNotifications } = useUser()
  const [settings, setSettings] = useState(user.notifications)
  const [hasChanges, setHasChanges] = useState(false)

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    setHasChanges(true)
  }

  const handleSave = () => {
    updateNotifications(settings)
    setHasChanges(false)
  }

  const notificationTypes = [
    {
      key: 'reminders' as const,
      icon: Clock,
      title: 'Daily Reminders',
      description: 'Get gentle reminders to check in with your mental health',
      color: 'text-blue-500'
    },
    {
      key: 'wellnessCheckins' as const,
      icon: Heart,
      title: 'Wellness Check-ins',
      description: 'Receive notifications for scheduled wellness assessments',
      color: 'text-pink-500'
    },
    {
      key: 'moodTracking' as const,
      icon: Calendar,
      title: 'Mood Tracking',
      description: 'Reminders to log your daily mood and feelings',
      color: 'text-green-500'
    },
    {
      key: 'emailNotifications' as const,
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive updates and insights via email',
      color: 'text-purple-500'
    }
  ]

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
              <Bell className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">Notifications</h1>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">
            Manage your notification preferences to stay connected with your wellness journey.
          </p>

          {/* Notification Settings */}
          <div className="space-y-4">
            {notificationTypes.map(({ key, icon: Icon, title, description, color }) => (
              <Card key={key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[key]}
                    onCheckedChange={() => handleToggle(key)}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Quiet Hours */}
          <Card className="mt-6 p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Quiet Hours</h3>
              <p className="text-sm text-muted-foreground">
                Notifications will be silenced during these hours (10 PM - 8 AM)
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Enable Quiet Hours</span>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          {hasChanges && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <Button onClick={handleSave} className="shadow-lg">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
