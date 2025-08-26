import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar, ExternalLink, Phone } from "lucide-react"

const counselingServices = [
  {
    title: "University Counseling Center",
    location: "Student Health Building, 2nd Floor",
    hours: "Mon-Fri: 8AM-5PM",
    phone: "(555) 123-4567",
    description: "Free confidential counseling for all students",
  },
  {
    title: "Peer Support Groups",
    location: "Various campus locations",
    hours: "Weekly meetings",
    phone: "Contact counseling center",
    description: "Connect with other students facing similar challenges",
  },
  {
    title: "Crisis Walk-in Hours",
    location: "Counseling Center",
    hours: "Daily: 9AM-4PM",
    phone: "No appointment needed",
    description: "Immediate support when you need it most",
  },
]

export function CounselingResources() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">University Counseling</h2>

      <div className="space-y-4">
        {counselingServices.map((service) => (
          <Card key={service.title} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-foreground">{service.title}</h3>
              <Button size="sm" variant="outline" className="bg-transparent">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.description}</p>

            <div className="space-y-2">
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
                <span>{service.phone}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full" size="lg">
        <Calendar className="w-4 h-4 mr-2" />
        Schedule Appointment
      </Button>
    </div>
  )
}
