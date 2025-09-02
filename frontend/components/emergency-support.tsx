"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, AlertTriangle, MapPin, Clock, Share2, Calendar } from "lucide-react"
import { useState } from "react"

const emergencyContacts = [
  {
    title: "Crisis Text Line",
    description: "Text SUPPORT to 012-3456789 (hypothetical Malaysian crisis line number)",
    action: "Text Now",
    icon: MessageSquare,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    onClick: () => {
      try {
        window.open("sms:0123456789?body=I need support.", "_blank")
      } catch (error) {
        console.error("Error opening SMS:", error)
        // Fallback: copy number to clipboard
        navigator.clipboard.writeText("0123456789")
        alert("Phone number copied to clipboard: 0123456789")
      }
    },
  },
  {
    title: "National Suicide Prevention Lifeline",
    description: "Call 999 - Available 24/7",
    action: "Call Now",
    icon: Phone,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    onClick: () => {
      try {
        window.open("tel:999", "_blank")
      } catch (error) {
        console.error("Error opening phone:", error)
        // Fallback: copy number to clipboard
        navigator.clipboard.writeText("999")
        alert("Phone number copied to clipboard: 999")
      }
    },
  },
]

const crisisWalkIn = {
  title: "Crisis Walk-in Hours",
  description: "Immediate support when you need it most",
  location: "Counseling Center",
  hours: "Daily: 9AM-4PM",
  phone: "No appointment needed",
  onShare: async () => {
    const googleMapsUrl = "https://www.google.com/maps/search/Counseling+Center+University+Malaya"
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Crisis Walk-in Hours",
          text: "Crisis Walk-in Hours - Immediate support when you need it most. Daily: 9AM-4PM at Counseling Center. No appointment needed.",
          url: googleMapsUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        // Fallback to opening in new tab
        window.open(googleMapsUrl, "_blank")
      }
    } else {
      // Fallback to copying Google Maps URL
      try {
        await navigator.clipboard.writeText(googleMapsUrl)
        alert("Google Maps link copied to clipboard!")
      } catch (err) {
        console.log("Error copying to clipboard:", err)
        // Final fallback: open in new tab
        window.open(googleMapsUrl, "_blank")
      }
    }
  },
}

export function EmergencySupport() {
  const [showScheduling, setShowScheduling] = useState(false)
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    urgency: "normal",
  })

  const handleScheduleAppointment = () => {
    setShowScheduling(true)
  }

  const handleSubmitAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend API
    alert(
      `Appointment request submitted for ${appointmentForm.name}. You will receive a confirmation email at ${appointmentForm.email} within 24 hours.`,
    )
    setShowScheduling(false)
    setAppointmentForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      urgency: "normal",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h2 className="text-lg font-semibold text-foreground">Emergency Support</h2>
      </div>

      <Card className="p-4 border-destructive/20 bg-destructive/5">
        <p className="text-sm text-foreground mb-4 leading-relaxed">
          If you're having thoughts of self-harm or suicide, please reach out immediately. Help is available 24/7.
        </p>

        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.title} className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${contact.bgColor} flex items-center justify-center`}>
                  <contact.icon className={`w-4 h-4 ${contact.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{contact.title}</h3>
                  <p className="text-xs text-muted-foreground">{contact.description}</p>
                </div>
              </div>
              <Button size="sm" variant="destructive" onClick={contact.onClick}>
                {contact.action}
              </Button>
            </div>
          ))}

          <div className="p-3 bg-card rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-foreground text-sm">{crisisWalkIn.title}</h3>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={crisisWalkIn.onShare}>
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{crisisWalkIn.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{crisisWalkIn.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{crisisWalkIn.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>{crisisWalkIn.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Button className="w-full" size="lg" onClick={handleScheduleAppointment}>
        <Calendar className="w-4 h-4 mr-2" />
        Schedule Appointment
      </Button>

      {showScheduling && (
        <Card className="p-4 border-primary/20 bg-primary/5">
          <h3 className="font-semibold text-foreground mb-4">Schedule Counseling Appointment</h3>
          <form onSubmit={handleSubmitAppointment} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input
                type="text"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={appointmentForm.name}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={appointmentForm.email}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={appointmentForm.phone}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-foreground">Preferred Date</label>
                <input
                  type="date"
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  value={appointmentForm.preferredDate}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Preferred Time</label>
                <select
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  value={appointmentForm.preferredTime}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredTime: e.target.value })}
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Urgency Level</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={appointmentForm.urgency}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, urgency: e.target.value })}
              >
                <option value="normal">Normal (within 1 week)</option>
                <option value="urgent">Urgent (within 2-3 days)</option>
                <option value="crisis">Crisis (same day)</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1">
                Submit Request
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowScheduling(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}