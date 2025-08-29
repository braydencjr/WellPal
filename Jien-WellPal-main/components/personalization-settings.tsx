"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Palette, Moon, Sun, Smartphone } from "lucide-react"

const themes = [
  { id: "light", name: "Light", icon: Sun, description: "Bright and clean" },
  { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
  { id: "auto", name: "Auto", icon: Smartphone, description: "Follows system" },
]

const backgrounds = [
  { id: "default", name: "Default", color: "bg-background" },
  { id: "soft-green", name: "Soft Green", color: "bg-green-50" },
  { id: "calm-blue", name: "Calm Blue", color: "bg-blue-50" },
  { id: "warm-beige", name: "Warm Beige", color: "bg-amber-50" },
]

export function PersonalizationSettings() {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedBackground, setSelectedBackground] = useState("default")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Personalization</h2>

      {/* Theme Selection */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-foreground">Theme</h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedTheme === theme.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <theme.icon
                className={`w-5 h-5 mx-auto mb-2 ${
                  selectedTheme === theme.id ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-xs font-medium text-foreground">{theme.name}</p>
              <p className="text-xs text-muted-foreground">{theme.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Background Selection */}
      <Card className="p-4">
        <h3 className="font-medium text-foreground mb-4">Calming Background</h3>

        <div className="grid grid-cols-2 gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setSelectedBackground(bg.id)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedBackground === bg.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className={`w-full h-8 rounded ${bg.color} border mb-2`}></div>
              <p className="text-xs font-medium text-foreground">{bg.name}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
