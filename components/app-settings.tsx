"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"

const settingsItems = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Manage reminder and wellness check-ins",
    action: "Configure",
  },
  {
    icon: Shield,
    title: "Privacy & Data",
    description: "Control your data and privacy settings",
    action: "Manage",
  },
  {
    icon: HelpCircle,
    title: "Help & Support",
    description: "Get help and contact support",
    action: "View",
  },
]

export function AppSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>

      <Card className="p-4 space-y-4">
        {settingsItems.map((item) => (
          <button
            key={item.title}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </Card>

      <Button
        variant="outline"
        className="w-full bg-transparent text-destructive border-destructive/20 hover:bg-destructive/5"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
