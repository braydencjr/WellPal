"use client"

import { useTheme } from "next-themes"
import { useCalmingTheme } from "@/components/theme-provider"
import { Card } from "@/components/ui/card"
import { Palette, Moon, Sun, Smartphone } from "lucide-react"
import { CalmingTheme, getAccessibleTheme, loadConditions } from "@/lib/user-condition"

type BackgroundOption = {
  id: CalmingTheme
  name: string
  color: string
  preview: string
}

// Light/Dark/System themes
const themes = [
  { id: "light", name: "Light", icon: Sun, description: "Bright and clean" },
  { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
  { id: "system", name: "Auto", icon: Smartphone, description: "Follows system" },
]

// Normal backgrounds
const normalBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Default", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "soft-green", name: "Soft Green", color: "bg-green-50 dark:bg-green-950", preview: "bg-green-100" },
  { id: "calm-blue", name: "Calm Blue", color: "bg-blue-50 dark:bg-blue-950", preview: "bg-blue-100" },
  { id: "warm-beige", name: "Warm Beige", color: "bg-amber-50 dark:bg-amber-950", preview: "bg-amber-100" },
]

// ---------------- Red ----------------
const redWeakBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Soft Pink", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "red-weak-1", name: "Soft Purple", color: "bg-[#fdd835] dark:bg-[#fdd835]", preview: "bg-[#fdd835]" },
  { id: "red-weak-2", name: "Light Yellow", color: "bg-[#ffee58] dark:bg-[#ffee58]", preview: "bg-[#ffee58]" },
  { id: "red-weak-3", name: "Peach", color: "bg-[#ffd54f] dark:bg-[#ffd54f]", preview: "bg-[#ffd54f]" },
]

const redBlindBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Soft Pink", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "red-blind-1", name: "Blue",  color: "bg-[#9381fa] dark:bg-[#3949ab]", preview: "bg-[#9381fa]",},
  { id: "red-blind-2", name: "Light Yellow", color: "bg-[#fdd835] dark:bg-[#fdd835]", preview: "bg-[#fdd835]" },
  { id: "red-blind-3", name: "Soft Purple", color: "bg-[#e3f2fd] dark:bg-[#2196f3]", preview: "bg-[#e3f2fd]"  },
]

// ---------------- Green ----------------
const greenWeakBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Default", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "green-weak-1", name: "Purple", color: "bg-[#ba68c8] dark:bg-[#ba68c8]", preview: "bg-[#ba68c8]" },
  { id: "green-weak-2", name: "Light Purple", color: "bg-[#dce775] dark:bg-[#dce775]", preview: "bg-[#dce775]" },
  { id: "green-weak-3", name: "Soft Orange", color: "bg-[#8B4513] dark:bg-[#8B4513]", preview: "bg-[#8B4513]" },
]

const greenBlindBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Default", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "green-blind-1", name: "Soft Orange", color: "bg-[#ffb74d] dark:bg-[#ffb74d]", preview: "bg-[#ffb74d]" },
  { id: "green-blind-2", name: "Light Purple", color: "bg-[#f06292] dark:bg-[#f06292]", preview: "bg-[#f06292]" },
  { id: "green-blind-3", name: "Pink", color: "bg-[#8B4513] dark:bg-[#8B4513]", preview: "bg-[#8B4513]" },
]

// ---------------- Blue ----------------
const blueWeakBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Default", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "blue-weak-1", name: "Cyan", color: "bg-[#00bfa5] dark:bg-[#00bfa5]", preview: "bg-[#00bfa5]" },
  { id: "blue-weak-2", name: "Light Orange", color: "bg-[#ffd54f] dark:bg-[#ffd54f]", preview: "bg-[#ffd54f]" },
  { id: "blue-weak-3", name: "Light Grey", color: "bg-[#aed581] dark:bg-[#aed581]", preview: "bg-[#aed581]" },
]

const blueBlindBackgrounds: BackgroundOption[] = [
  { id: "default", name: "Default", color: "bg-background", preview: "bg-gray-100 dark:bg-gray-800" },
  { id: "blue-blind-1", name: "Pink", color: "bg-[#f48fb1] dark:bg-[#f48fb1]", preview: "bg-[#f48fb1]" },
  { id: "blue-blind-2", name: "Light Purple", color: "bg-[#aed581] dark:bg-[#aed581]", preview: "bg-[#aed581]" },
  { id: "blue-blind-3", name: "Sky Blue", color: "bg-[#26a69a] dark:bg-[#26a69a]", preview: "bg-[#26a69a]" },
]


interface Props {
  colorblind?: boolean
}

export function PersonalizationSettings({ colorblind = false }: Props) {
  const { theme, setTheme } = useTheme()
  const { calmingTheme, setCalmingTheme } = useCalmingTheme()

  // Load user condition
  const cond = loadConditions()

  // Decide which backgrounds to show
  let backgrounds: BackgroundOption[] = normalBackgrounds
  if (cond.colorBlind) {
    switch (cond.colorBlindType) {
      case "red":
        backgrounds = cond.colorBlindSeverity === "weak" ? redWeakBackgrounds : redBlindBackgrounds
        break
      case "green":
        backgrounds = cond.colorBlindSeverity === "weak" ? greenWeakBackgrounds : greenBlindBackgrounds
        break
      case "blue":
        backgrounds = cond.colorBlindSeverity === "weak" ? blueWeakBackgrounds : blueBlindBackgrounds
        break
      default:
        backgrounds = normalBackgrounds
    }
  }

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

      {/* Calming Background Selection */}
      <Card className="p-4">
        <h3 className="font-medium text-foreground mb-4">Calming Background</h3>
        <div className="grid grid-cols-2 gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setCalmingTheme(bg.id)}
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
