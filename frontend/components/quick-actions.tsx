"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { MailOpen, BarChart, Heart, Phone } from "lucide-react"
import Link from "next/link"
import { EmergencyContactsModal } from "@/components/emergency-contact-modal"

export function QuickActions() {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false)

  const actions = [
    {
      icon: MailOpen,
      title: "Memory Pocket",
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/photobook",
    },
    {
      icon: Heart,
      title: "Relax",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      href: "/relax",
    },
    {
      icon: BarChart,
      title: "Insights",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      href: "/memories",
    },
    {
      icon: Phone,
      title: "Emergency Call",
      color: "text-red-700",       // darker red for the icon
      bgColor: "bg-red-200/20",    // slightly darker translucent red background
      onClick: () => setShowEmergencyContacts(true),
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const content = (
            <Card
              className="p-3 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col h-24 items-start"
              onClick={action.onClick}
            >
              <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center mb-2`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <h3 className="font-medium text-sm">{action.title}</h3>
            </Card>
          )

          return action.href ? (
            <Link key={action.title} href={action.href}>{content}</Link>
          ) : (
            <div key={action.title}>{content}</div>
          )
        })}
      </div>

      {/* Emergency Contacts Modal */}
      <EmergencyContactsModal isOpen={showEmergencyContacts} setIsOpen={setShowEmergencyContacts} />
    </div>
  )
}
