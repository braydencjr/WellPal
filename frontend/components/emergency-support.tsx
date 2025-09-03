// EmergencySupport.tsx
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  Phone,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Clock,
  Link as LinkIcon,
  Facebook,
  Instagram,
} from "lucide-react"

export function EmergencySupport() {
  const [showScheduling, setShowScheduling] = useState(false)

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

  const renderContacts = (contacts: any[]) =>
    contacts.map((contact) => {
      const Icon = contact.icon
      return (
        <Card key={contact.title} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg ${contact.bgColor} flex items-center justify-center mt-1`}
              >
                {Icon && <Icon className={`w-4 h-4 ${contact.color}`} />}
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
              </div>
            </div>
            {contact.action && contact.onClick && (
              <Button size="sm" variant="destructive" onClick={contact.onClick}>
                {contact.action}
              </Button>
            )}
          </div>
        </Card>
      )
    })

  const sections = [
    { title: "Government / Public Services", contacts: governmentContacts },
    { title: "University Services", contacts: universityServices },
    { title: "Private / NGOs", contacts: privateContacts },
  ]

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
          {renderContacts(section.contacts)}
        </div>
      </Card>
    ))}
  </div>
)
}
