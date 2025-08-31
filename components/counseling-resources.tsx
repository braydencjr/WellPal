"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, ExternalLink, Facebook, Instagram } from "lucide-react"

const counselingServices = [
  {
    title: "University Counseling Center",
    location: "Student Health Building, 2nd Floor",
    hours: "Mon-Fri: 8AM-5PM",
    phone: "+603-7967 3546",
    description: "Free confidential counseling for all students",
    onMapClick: () => {
      try {
        window.open("https://www.google.com/maps/search/Pusat+Kaunseling+Universiti+Malaya", "_blank")
      } catch (error) {
        console.error("Error opening map:", error)
        alert("Unable to open map. Please search for 'Pusat Kaunseling Universiti Malaya' on Google Maps.")
      }
    },
    onPhoneClick: () => {
      try {
        window.open("tel:+60379673546", "_blank")
      } catch (error) {
        console.error("Error opening phone:", error)
        // Fallback: copy number to clipboard
        navigator.clipboard.writeText("+603-7967 3546")
        alert("Phone number copied to clipboard: +603-7967 3546")
      }
    },
  },
  {
    title: "Peer Support Groups",
    location: "Various campus locations",
    hours: "Weekly meetings",
    phone: "Contact counseling center",
    description: "Connect with other students facing similar challenges",
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
      } catch (error) {
        console.error("Error opening phone:", error)
        // Fallback: copy number to clipboard
        navigator.clipboard.writeText("+603-7967 3546")
        alert("Phone number copied to clipboard: +603-7967 3546")
      }
    },
  },
]

export function CounselingResources() {
  const handleSocialClick = (url: string, label: string) => {
    console.log(`Attempting to open: ${url}`)
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer")
      if (newWindow) {
        console.log(`Successfully opened ${label}`)
      } else {
        console.log(`Popup blocked for ${label}`)
        alert(`Popup was blocked. Please manually visit: ${url}`)
      }
    } catch (error) {
      console.error(`Error opening ${label}:`, error)
      alert(`Unable to open ${label}. Please visit: ${url}`)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">University Counseling</h2>

      <div className="space-y-4">
        {counselingServices.map((service) => (
          <Card key={service.title} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-foreground">{service.title}</h3>
              {service.onMapClick && (
                <Button size="sm" variant="outline" className="bg-transparent h-6 w-6 p-0" onClick={service.onMapClick}>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.description}</p>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{service.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{service.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Phone className="w-3 h-3" />
                <button onClick={service.onPhoneClick} className="hover:underline">
                  {service.phone}
                </button>
              </div>
            </div>

            {service.socialLinks && (
              <div className="flex gap-2 mb-3">
                {service.socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 bg-transparent"
                    onClick={() => handleSocialClick(social.url, social.label)}
                  >
                    <social.icon className="w-3 h-3 mr-1" />
                    {social.label}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}