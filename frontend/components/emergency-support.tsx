// EmergencySupport.tsx
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Phone,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Clock,
  Link as LinkIcon,
  Facebook,
  Instagram,
  Plus,
  Trash2,
} from "lucide-react"

export function EmergencySupport() {
  const [showScheduling, setShowScheduling] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [addDialogType, setAddDialogType] = useState<'university' | 'private'>('university')
  const [customContacts, setCustomContacts] = useState<{
    university: any[]
    private: any[]
  }>({ university: [], private: [] })

  const governmentContacts = [
    {
      title: "National Suicide Prevention Lifeline",
      description: "Call 999 - Emergency Services",
      action: "Call Now",
      icon: Phone,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      onClick: () => {
        try {
          window.open("tel:999", "_blank")
        } catch {
          navigator.clipboard.writeText("999")
          alert("Phone number copied to clipboard: 999")
        }
      },
    },
    {
      title: "Crisis Text Line",
      description: "Text SUPPORT to 15999 (Befrienders Malaysia)",
      action: "Text Now",
      icon: MessageSquare,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      onClick: () => {
        try {
          window.open("sms:15999?body=I need support.", "_blank")
        } catch {
          navigator.clipboard.writeText("15999")
          alert("Phone number copied to clipboard: 15999")
        }
      },
    },
  ]

  const universityServices = [
    {
      title: "University Counseling Center",
      description: "Free confidential counseling for all students",
      location: "Student Health Building, 2nd Floor",
      hours: "Mon-Fri: 8AM-5PM",
      phone: "+603-7967 3546",
      onPhoneClick: () => {
        try {
          window.open("tel:+60379673546", "_blank")
        } catch {
          navigator.clipboard.writeText("+603-7967 3546")
          alert("Phone number copied to clipboard: +603-7967 3546")
        }
      },
    },
    {
      title: "Peer Support Groups",
      description: "Connect with other students facing similar challenges",
      location: "Various campus locations",
      hours: "Weekly meetings",
      phone: "Contact counseling center",
      socialLinks: [
        {
          icon: Facebook,
          url: "https://www.facebook.com/groups/UMStudentSupport",
          label: "Facebook Group",
        },
        {
          icon: Instagram,
          url: "https://www.instagram.com/um_peersupport",
          label: "Instagram",
        },
      ],
      onPhoneClick: () => {
        try {
          window.open("tel:+60379673546", "_blank")
        } catch {
          navigator.clipboard.writeText("+603-7967 3546")
          alert("Phone number copied to clipboard: +603-7967 3546")
        }
      },
    },
  ]

  const privateContacts = [
    {
      title: "WhatsApp",
      description: "Chat via WhatsApp",
      action: "WhatsApp",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
      onClick: () => {
        try {
          window.open(
            "https://wa.me/60376272929?text=I need support",
            "_blank"
          )
        } catch {
          alert("Please contact via WhatsApp: +60 3-7627 2929")
        }
      },
    },
    {
      title: "Facebook",
      description: "Befrienders KL Official Page",
      action: "Facebook",
      icon: LinkIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      onClick: () => {
        try {
          window.open("https://www.facebook.com/BefriendersKL", "_blank")
        } catch {
          alert("Visit: facebook.com/BefriendersKL")
        }
      },
    },
    {
      title: "Instagram",
      description: "@befrienderskl",
      action: "Instagram",
      icon: LinkIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      onClick: () => {
        try {
          window.open("https://www.instagram.com/befrienderskl", "_blank")
        } catch {
          alert("Visit: @befrienderskl on Instagram")
        }
      },
    },
  ]

  const renderContacts = (contacts: any[], sectionTitle: string) =>
    contacts.map((contact, index) => {
      const Icon = contact.icon
      const isCustomContact = sectionTitle === "University Services" ? 
        index >= universityServices.length : 
        sectionTitle === "Private / NGOs" ? index >= privateContacts.length : false
      
      return (
        <Card key={`${contact.title}-${index}`} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg ${contact.bgColor || 'bg-blue-100'} flex items-center justify-center mt-1`}
              >
                {Icon && <Icon className={`w-4 h-4 ${contact.color || 'text-blue-600'}`} />}
              </div>
              <div>
                <h4 className="text-sm font-medium">{contact.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {contact.description}
                </p>
                {contact.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {contact.location}
                  </div>
                )}
                {contact.hours && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {contact.hours}
                  </div>
                )}
                {contact.phone && contact.onPhoneClick && (
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Phone className="w-3 h-3" />
                    <button
                      onClick={contact.onPhoneClick}
                      className="hover:underline"
                    >
                      {contact.phone}
                    </button>
                  </div>
                )}
                {contact.socialLinks && contact.socialLinks.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    {contact.socialLinks.map((link: any, linkIndex: number) => {
                      const SocialIcon = link.icon
                      return (
                        <button
                          key={linkIndex}
                          onClick={() => window.open(link.url, '_blank')}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        >
                          <SocialIcon className="w-3 h-3" />
                          {link.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {contact.action && contact.onClick && (
                <Button size="sm" variant="destructive" onClick={contact.onClick}>
                  {contact.action}
                </Button>
              )}
              {isCustomContact && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteContact(
                    contact.title, 
                    sectionTitle === "University Services" ? 'university' : 'private'
                  )}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )
    })

  const sections = [
    { title: "Government / Public Services", contacts: governmentContacts },
    { title: "University Services", contacts: [...universityServices, ...customContacts.university] },
    { title: "Private / NGOs", contacts: [...privateContacts, ...customContacts.private] },
  ]

  const handleAddContact = (formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const phone = formData.get('phone') as string
    const facebookUrl = formData.get('facebookUrl') as string
    const instagramUrl = formData.get('instagramUrl') as string

    const newContact = {
      title,
      description,
      phone: phone || undefined,
      onPhoneClick: phone ? () => {
        try {
          window.open(`tel:${phone}`, "_blank")
        } catch {
          navigator.clipboard.writeText(phone)
          alert(`Phone number copied to clipboard: ${phone}`)
        }
      } : undefined,
      socialLinks: [
        ...(facebookUrl ? [{
          icon: Facebook,
          url: facebookUrl,
          label: "Facebook",
        }] : []),
        ...(instagramUrl ? [{
          icon: Instagram,
          url: instagramUrl,
          label: "Instagram",
        }] : []),
      ],
    }

    setCustomContacts(prev => ({
      ...prev,
      [addDialogType]: [...prev[addDialogType], newContact]
    }))
    setShowAddDialog(false)
  }

  const handleDeleteContact = (contactTitle: string, sectionType: 'university' | 'private') => {
    setCustomContacts(prev => ({
      ...prev,
      [sectionType]: prev[sectionType].filter(contact => contact.title !== contactTitle)
    }))
  }

  return (
  <div className="space-y-6">
    <div className="flex items-center gap-2 mb-4">
      <AlertTriangle className="w-5 h-5 text-destructive" />
      <h2 className="text-lg font-semibold text-foreground">
        Emergency Support
      </h2>
    </div>

    {sections.map((section) => (
      <Card key={section.title} className="p-4 space-y-3">
        <h3 className="text-md font-semibold text-foreground">
          {section.title}
        </h3>
        <div className="space-y-3">
          {renderContacts(section.contacts, section.title)}
        </div>
        
        {/* Add button only for University Services and Private/NGOs */}
        {(section.title === "University Services" || section.title === "Private / NGOs") && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => {
                  setAddDialogType(section.title === "University Services" ? 'university' : 'private')
                  setShowAddDialog(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {section.title === "University Services" ? "University Service" : "Private/NGO Contact"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New {section.title === "University Services" ? "University Service" : "Private/NGO Contact"}</DialogTitle>
                <DialogDescription>
                  Add a new contact for {section.title.toLowerCase()}. All fields are optional except title and description.
                </DialogDescription>
              </DialogHeader>
              <form action={handleAddContact} className="space-y-4">
                <div>
                  <Label htmlFor="title">Contact Title *</Label>
                  <Input id="title" name="title" placeholder="e.g., Student Counseling Service" required />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input id="description" name="description" placeholder="Brief description of the service" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" name="phone" placeholder="e.g., +603-1234-5678" />
                </div>
                <div>
                  <Label htmlFor="facebookUrl">Facebook URL (Optional)</Label>
                  <Input id="facebookUrl" name="facebookUrl" placeholder="https://facebook.com/..." />
                </div>
                <div>
                  <Label htmlFor="instagramUrl">Instagram URL (Optional)</Label>
                  <Input id="instagramUrl" name="instagramUrl" placeholder="https://instagram.com/..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Contact
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    ))}
  </div>
)
}