"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"

const settingsItems = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Manage reminder and wellness check-ins",
    action: "Configure",
    href: "/profile/notifications",
  },
  {
    icon: Shield,
    title: "Privacy & Data",
    description: "Control your data and privacy settings",
    action: "Manage",
    href: "/profile/privacy-data",
  },
  {
    icon: HelpCircle,
    title: "Help & Support",
    description: "Get help and contact support",
    action: "View",
    href: "/support",
  },
]

export function AppSettings() {
  const router = useRouter()

  const handleSignOut = () => {
    // In a real app, this would handle authentication logout
    if (confirm('Are you sure you want to sign out?')) {
      router.push('/auth/signin')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>

      <Card className="p-4 space-y-4">
        {settingsItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <button
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
          </Link>
        ))}
      </Card>

      <Button
        variant="outline"
        className="w-full bg-transparent text-destructive border-destructive/20 hover:bg-destructive/5"
        onClick={handleSignOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
