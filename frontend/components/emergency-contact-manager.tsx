"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Phone, UserPlus, MessageSquare, Video, Trash2 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface EmergencyContact {
  id: string
  name: string
  countryCode: string
  phoneNumber: string
}

const countryCodes = [
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  // ... add more
]

export function EmergencyContactManager() {
  const { user } = useUser()
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+60",
    phoneNumber: "",
  })

  // Load emergency contacts from onboarding data and any additional stored contacts
  useEffect(() => {
    const storedContacts: EmergencyContact[] = []
    
    // Load from onboarding data if available
    if (user?.unsafeMetadata?.onboardingData) {
      const onboardingData = user.unsafeMetadata.onboardingData as any
      if (onboardingData.personalInfo?.emergencyContactName && onboardingData.personalInfo?.emergencyContactPhone) {
        storedContacts.push({
          id: 'onboarding-contact',
          name: onboardingData.personalInfo.emergencyContactName,
          countryCode: "+60", // Default, could be made dynamic
          phoneNumber: onboardingData.personalInfo.emergencyContactPhone.replace(/^\+\d+\s*/, '') // Remove country code if present
        })
      }
    }
    
    // Load additional contacts from metadata
    if (user?.unsafeMetadata?.emergencyContacts) {
      const additionalContacts = user.unsafeMetadata.emergencyContacts as EmergencyContact[]
      storedContacts.push(...additionalContacts)
    }
    
    setEmergencyContacts(storedContacts)
  }, [user])

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      alert("Please fill in all fields")
      return
    }

    const phoneRegex = /^\d{7,15}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Enter a valid phone number (7-15 digits)")
      return
    }

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: formData.name,
      countryCode: formData.countryCode,
      phoneNumber: formData.phoneNumber
    }

    const newContacts = [...emergencyContacts, newContact]
    setEmergencyContacts(newContacts)
    
    // Update Clerk metadata - store additional contacts separately
    if (user) {
      try {
        const additionalContacts = newContacts.filter(contact => contact.id !== 'onboarding-contact')
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            emergencyContacts: additionalContacts
          }
        })
      } catch (error) {
        console.error('Failed to update emergency contacts:', error)
      }
    }
    
    setFormData({ name: "", countryCode: "+60", phoneNumber: "" })
    setIsOpen(false)
  }

  const handleDelete = async (contactId: string) => {
    if (contactId === 'onboarding-contact') {
      alert("Cannot delete the primary emergency contact from onboarding. Please update it in settings.")
      return
    }

    const confirmed = window.confirm("Are you sure you want to delete this emergency contact?")
    if (!confirmed) return

    const newContacts = emergencyContacts.filter(contact => contact.id !== contactId)
    setEmergencyContacts(newContacts)
    
    // Update Clerk metadata
    if (user) {
      try {
        const additionalContacts = newContacts.filter(contact => contact.id !== 'onboarding-contact')
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            emergencyContacts: additionalContacts
          }
        })
      } catch (error) {
        console.error('Failed to update emergency contacts:', error)
        alert('Failed to delete contact. Please try again.')
      }
    }
  }

  // Detect app links
  const getAppLinks = (contact: EmergencyContact) => {
    const fullNumber = contact.countryCode + contact.phoneNumber
    return {
      call: `tel:${fullNumber}`,
      whatsapp: `https://wa.me/${fullNumber.replace(/\D/g, "")}`,
      facetime: contact.countryCode === "+1" ? `facetime://${fullNumber}` : undefined,
    }
  }

  return (
    <Card className="p-3 space-y-3">
      <h2 className="text-lg font-semibold">Emergency Contacts</h2>

      {/* Show message if no contacts */}
      {emergencyContacts.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p>No emergency contacts added yet.</p>
          <p className="text-sm">Add contacts for quick access during emergencies.</p>
        </div>
      )}

      {/* Show existing contacts */}
      {emergencyContacts.map((contact) => {
        const links = getAppLinks(contact)
        return (
          <div key={contact.id} className="flex items-center justify-between p-3 rounded-md bg-muted">
            <div className="flex flex-col">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">
                {contact.countryCode} {contact.phoneNumber}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" asChild>
                <a href={links.call}><Phone className="h-4 w-4" /></a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={links.whatsapp}><MessageSquare className="h-4 w-4" /></a>
              </Button>
              {links.facetime && (
                <Button size="sm" variant="outline" asChild>
                  <a href={links.facetime}><Video className="h-4 w-4" /></a>
                </Button>
              )}
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => handleDelete(contact.id)}
                className="ml-2"
                title={contact.id === 'onboarding-contact' ? 'Cannot delete primary contact' : 'Delete contact'}
                disabled={contact.id === 'onboarding-contact'}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}      {/* Add button (only if less than 3 contacts) */}
      {emergencyContacts.length < 3 && (
        <div className="text-center py-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-8 px-2 text-sm flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Country Code</Label>
                  <Select
                    value={formData.countryCode}
                    onValueChange={value => setFormData({...formData, countryCode: value})}
                  >
                    <SelectTrigger>
                      <SelectValue>{formData.countryCode}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map(cc => (
                        <SelectItem key={cc.code} value={cc.code}>
                          {cc.flag} {cc.country} ({cc.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                    placeholder="12345678"
                  />
                </div>
                <Button onClick={handleSave} className="mt-2 w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Card>
  )
}