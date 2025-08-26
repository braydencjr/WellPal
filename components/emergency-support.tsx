import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, AlertTriangle } from "lucide-react"

const emergencyContacts = [
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741",
    action: "Text Now",
    icon: MessageSquare,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "National Suicide Prevention Lifeline",
    description: "Call 988 - Available 24/7",
    action: "Call Now",
    icon: Phone,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
]

export function EmergencySupport() {
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
              <Button size="sm" variant="destructive">
                {contact.action}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
