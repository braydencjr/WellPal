"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Phone, Edit3, UserPlus, AlertTriangle } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import type { EmergencyContact } from "@/contexts/user-context"

const countryCodes = [
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
]

interface EmergencyContactManagerProps {
  showInDashboard?: boolean
}

export function EmergencyContactManager({ showInDashboard = false }: EmergencyContactManagerProps) {
  const { user, updateEmergencyContact } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<EmergencyContact>({
    name: user.emergencyContact?.name || "",
    countryCode: user.emergencyContact?.countryCode || "+60",
    phoneNumber: user.emergencyContact?.phoneNumber || "",
  })

  const handleSave = () => {
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      alert("Please fill in all fields")
      return
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d{7,15}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number (7-15 digits)")
      return
    }

    updateEmergencyContact(formData)
    setIsOpen(false)
  }

  const handleCall = () => {
    if (!user.emergencyContact) {
      alert("Please set up an emergency contact first")
      return
    }
    
    const fullNumber = `${user.emergencyContact.countryCode}${user.emergencyContact.phoneNumber}`
    try {
      window.open(`tel:${fullNumber}`, "_blank")
    } catch (error) {
      console.error("Error making call:", error)
      navigator.clipboard.writeText(fullNumber)
      alert(`Phone number copied to clipboard: ${fullNumber}`)
    }
  }

  if (showInDashboard) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Emergency Contact</h3>
              {user.emergencyContact ? (
                <p className="text-sm text-muted-foreground">
                  {user.emergencyContact.name}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Not set up</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {user.emergencyContact && (
              <Button size="sm" onClick={handleCall} className="bg-destructive hover:bg-destructive/90">
                <Phone className="h-4 w-4" />
              </Button>
            )}
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  {user.emergencyContact ? <Edit3 className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle>
                    {user.emergencyContact ? "Edit Emergency Contact" : "Add Emergency Contact"}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter contact name"
                    />
                  </div>
                  
                  <div>
                    <Label>Country Code</Label>
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center space-x-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                              <span className="text-muted-foreground">{country.country}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex space-x-2">
                      <div className="flex items-center px-3 py-2 border rounded-md bg-muted text-sm">
                        {formData.countryCode}
                      </div>
                      <Input
                        id="phone"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                        placeholder="123456789"
                        type="tel"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} className="flex-1">
                      Save Contact
                    </Button>
                    <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    )
  }

  // Full page version for support page
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Emergency Contact</h2>
          <p className="text-sm text-muted-foreground">
            Set up a trusted contact for emergencies
          </p>
        </div>
      </div>

      {user.emergencyContact ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{user.emergencyContact.name}</p>
                <p className="text-sm text-muted-foreground">
                  {user.emergencyContact.countryCode} {user.emergencyContact.phoneNumber}
                </p>
              </div>
              <Button onClick={handleCall} className="bg-destructive hover:bg-destructive/90">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Contact
              </Button>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Edit Emergency Contact</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Contact Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter contact name"
                  />
                </div>
                
                <div>
                  <Label>Country Code</Label>
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                            <span className="text-muted-foreground">{country.country}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <div className="flex items-center px-3 py-2 border rounded-md bg-muted text-sm">
                      {formData.countryCode}
                    </div>
                    <Input
                      id="phone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                      placeholder="123456789"
                      type="tel"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save Contact
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No emergency contact set up</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Emergency Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Contact Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter contact name"
                  />
                </div>
                
                <div>
                  <Label>Country Code</Label>
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                            <span className="text-muted-foreground">{country.country}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <div className="flex items-center px-3 py-2 border rounded-md bg-muted text-sm">
                      {formData.countryCode}
                    </div>
                    <Input
                      id="phone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                      placeholder="123456789"
                      type="tel"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save Contact
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Card>
  )
}
