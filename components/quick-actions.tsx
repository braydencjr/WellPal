import { Card } from "@/components/ui/card"
import { Heart, Headphones, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    icon: Heart,
    title: "Stress Relief",
    description: "Quick activities to help you relax",
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/relax",
  },
  {
    icon: Headphones,
    title: "ASMR Sounds",
    description: "Calming audio for focus",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    href: "/relax",
  },
  {
    icon: Calendar,
    title: "Reminders",
    description: "Manage your schedule",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    href: "/reminders",
  },
  {
    icon: MessageCircle,
    title: "AI Support",
    description: "Chat with your wellness companion",
    color: "text-accent",
    bgColor: "bg-accent/10",
    href: "/chat", // Updated href to point to chat page
  },
]

export function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200">
              <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mb-3`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{action.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
