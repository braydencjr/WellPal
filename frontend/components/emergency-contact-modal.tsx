"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { emergencyContactStore, type Contact } from "@/lib/emergency-contact-store"
import { Trash2, Phone, MessageSquare, Video } from "lucide-react"

interface EmergencySupportProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EmergencyContactsModal({ isOpen, setIsOpen }: EmergencySupportProps) {
  const [contacts, setContacts] = useState<Contact[]>([])

  // Load contacts when dialog opens
  useEffect(() => {
    const loadContacts = async () => {
      const stored = await emergencyContactStore.getContacts()
      setContacts(stored)
    }
    if (isOpen) loadContacts()
  }, [isOpen])

  const handleDelete = async (name: string) => {
    await emergencyContactStore.removeContact(name)
    const updated = contacts.filter(c => c.name !== name)
    setContacts(updated)
  }

  const getAppLinks = (contact: Contact) => {
    const fullNumber = contact.phone
    return {
      call: `tel:${fullNumber}`,
      whatsapp: `https://wa.me/${fullNumber.replace(/\D/g, "")}`,
      facetime: fullNumber.startsWith("+1") ? `facetime://${fullNumber}` : undefined,
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Emergency Contacts</DialogTitle>
        </DialogHeader>

        {contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No Emergency Contact</p>
        ) : (
          <div className="space-y-2">
            {contacts.map((c, idx) => {
              const links = getAppLinks(c)
              return (
                <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-muted">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.phone}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button asChild size="icon">
                      <a href={links.call}><Phone className="h-4 w-4" /></a>
                    </Button>
                    <Button asChild size="icon">
                      <a href={links.whatsapp}><MessageSquare className="h-4 w-4" /></a>
                    </Button>
                    {links.facetime && (
                      <Button asChild size="icon">
                        <a href={links.facetime}><Video className="h-4 w-4" /></a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(c.name)}
                      className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
