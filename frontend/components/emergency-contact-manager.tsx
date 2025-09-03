"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Phone, UserPlus, MessageSquare, Video, Trash2 } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import type { EmergencyContact } from "@/contexts/user-context"

const countryCodes = [
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  // ... add more
]

export function EmergencyContactManager() {
  const { user, updateEmergencyContacts } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<EmergencyContact>({
    name: "",
    countryCode: "+60",
    phoneNumber: "",
  })

  const handleSave = () => {
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      alert("Please fill in all fields")
      return
    }

    const phoneRegex = /^\d{7,15}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Enter a valid phone number (7-15 digits)")
      return
    }

    updateEmergencyContacts([...user.emergencyContacts, formData])
    setFormData({ name: "", countryCode: "+60", phoneNumber: "" })
    setIsOpen(false)
  }

  const handleDelete = (indexToDelete: number) => {
    const updatedContacts = user.emergencyContacts.filter((_, idx) => idx !== indexToDelete)
    updateEmergencyContacts(updatedContacts)
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

      {/* Show existing contacts */}
      {user.emergencyContacts.map((contact, idx) => {
        const links = getAppLinks(contact)
        return (
          <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-muted">
            <div className="flex flex-col">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">
                {contact.countryCode} {contact.phoneNumber}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button asChild>
                <a href={links.call}><Phone className="h-4 w-4" /></a>
              </Button>
              <Button asChild>
                <a href={links.whatsapp}><MessageSquare className="h-4 w-4" /></a>
              </Button>
              <Button 
                variant="outline"
                size="icon"
                onClick={() => handleDelete(idx)}
                className="h-10 w-10 hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {links.facetime && (
                <Button asChild>
                  <a href={links.facetime}><Video className="h-4 w-4" /></a>
                </Button>
              )}
            </div>
          </div>
        )
      })}

      {/* Add button (only if less than 3 contacts) */}
      {user.emergencyContacts.length < 3 && (
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
