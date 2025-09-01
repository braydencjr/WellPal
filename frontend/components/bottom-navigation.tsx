import { Home, Heart, Phone, User, Image } from "lucide-react"
import Link from "next/link"

interface BottomNavigationProps {
  activeTab: "home" | "memories" | "relax" | "support" | "settings"
}

const tabs = [ 
  { id: "home", icon: Home, label: "Home", href: "/dashboard" },
  { id: "memories", icon: Image, label: "Memories", href: "/memories" },
  { id: "relax", icon: Heart, label: "Relax", href: "/relax" },
  { id: "support", icon: Phone, label: "Support", href: "/support" },
  { id: "settings", icon: User, label: "Settings", href: "/settings" },
]

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <button
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
