"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useCalmingTheme } from "@/components/theme-provider"
import { Card } from "@/components/ui/card"
import { Palette, Moon, Sun, Smartphone } from "lucide-react"

const themes = [
  { id: "light", name: "Light", icon: Sun, description: "Bright and clean" },
  { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
  { id: "system", name: "Auto", icon: Smartphone, description: "Follows system" },
]

const backgrounds = [
  { 
    id: "default", 
    name: "Default", 
    color: "bg-background",
    preview: "bg-gray-100 dark:bg-gray-800"
  },
  { 
    id: "soft-green", 
    name: "Soft Green", 
    color: "bg-green-50 dark:bg-green-950",
    preview: "bg-green-100"
  },
  { 
    id: "calm-blue", 
    name: "Calm Blue", 
    color: "bg-blue-50 dark:bg-blue-950",
    preview: "bg-blue-100"
  },
  { 
    id: "warm-beige", 
    name: "Warm Beige", 
    color: "bg-amber-50 dark:bg-amber-950",
    preview: "bg-amber-100"
  },
]

export function PersonalizationSettings() {
  const { theme, setTheme } = useTheme()
  const { calmingTheme, setCalmingTheme } = useCalmingTheme()

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
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                theme === themeOption.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <themeOption.icon
                className={`w-5 h-5 mx-auto mb-2 ${
                  theme === themeOption.id ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-xs font-medium text-foreground">{themeOption.name}</p>
              <p className="text-xs text-muted-foreground">{themeOption.description}</p>
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
              onClick={() => setCalmingTheme(bg.id as any)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                calmingTheme === bg.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className={`w-full h-8 rounded ${bg.preview} border mb-2`}></div>
              <p className="text-xs font-medium text-foreground">{bg.name}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
