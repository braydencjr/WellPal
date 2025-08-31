"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Eye, Database, Key, User, Mail } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function PrivacyDataPage() {
  const { user, updateUser, updatePrivacy, resetPassword } = useUser()
  const [privacySettings, setPrivacySettings] = useState(user.privacy)
  const [hasPrivacyChanges, setHasPrivacyChanges] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    const newSettings = { ...privacySettings, [key]: !privacySettings[key] }
    setPrivacySettings(newSettings)
    setHasPrivacyChanges(true)
  }

  const handlePrivacyVisibility = (value: typeof privacySettings.profileVisibility) => {
    const newSettings = { ...privacySettings, profileVisibility: value }
    setPrivacySettings(newSettings)
    setHasPrivacyChanges(true)
  }

  const handleSavePrivacy = () => {
    updatePrivacy(privacySettings)
    setHasPrivacyChanges(false)
  }

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match')
      return
    }
    
    setIsChangingPassword(true)
    const success = await resetPassword(passwords.current, passwords.new)
    setIsChangingPassword(false)
    
    if (success) {
      setPasswords({ current: '', new: '', confirm: '' })
      setShowPasswordChange(false)
      alert('Password changed successfully')
    } else {
      alert('Failed to change password. Please check your current password.')
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

          {/* Account Information */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Account Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">Username</Label>
                <Input 
                  value={user.username} 
                  onChange={(e) => updateUser({ username: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <Input 
                  value={user.email} 
                  onChange={(e) => updateUser({ email: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Password Security */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Password & Security
            </h3>
            
            {!showPasswordChange ? (
              <Button 
                variant="outline" 
                onClick={() => setShowPasswordChange(true)}
                className="w-full"
              >
                Change Password
              </Button>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handlePasswordChange}
                    disabled={isChangingPassword || !passwords.current || !passwords.new || !passwords.confirm}
                    className="flex-1"
                  >
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowPasswordChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Privacy Settings */}
          <Card className="mb-6 p-4">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Privacy Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Profile Visibility</Label>
                <Select 
                  value={privacySettings.profileVisibility}
                  onValueChange={handlePrivacyVisibility}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private - Only me</SelectItem>
                    <SelectItem value="friends">Friends only</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Data Sharing</p>
                  <p className="text-xs text-muted-foreground">Share anonymous data to improve the app</p>
                </div>
                <Switch
                  checked={privacySettings.dataSharing}
                  onCheckedChange={() => handlePrivacyToggle('dataSharing')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">Help us understand how you use the app</p>
                </div>
                <Switch
                  checked={privacySettings.analytics}
                  onCheckedChange={() => handlePrivacyToggle('analytics')}
                />
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
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5">
                Delete My Account
              </Button>
            </div>
          </Card>

          {/* Save Privacy Changes */}
          {hasPrivacyChanges && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <Button onClick={handleSavePrivacy} className="shadow-lg">
                Save Privacy Settings
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
