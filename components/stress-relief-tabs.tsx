"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Dumbbell, Headphones, Music, Play, Pause } from "lucide-react"

type TabType = "game" | "exercise" | "asmr" | "music"

const tabs = [
  { id: "game", label: "Game", icon: Gamepad2 },
  { id: "exercise", label: "Exercise", icon: Dumbbell },
  { id: "asmr", label: "ASMR", icon: Headphones },
  { id: "music", label: "Music", icon: Music },
]

const gameActivities = [
  { title: "Breathing Bubbles", description: "Pop bubbles in rhythm with your breath", duration: "5 min" },
  { title: "Zen Garden", description: "Create patterns in virtual sand", duration: "10 min" },
  { title: "Color Flow", description: "Watch colors blend and flow", duration: "3 min" },
]

const exerciseActivities = [
  { title: "Deep Breathing", description: "4-7-8 breathing technique", duration: "5 min" },
  { title: "Progressive Relaxation", description: "Tense and release muscle groups", duration: "15 min" },
  { title: "Gentle Stretches", description: "Simple desk stretches", duration: "8 min" },
]

const asmrSounds = [
  { title: "Rain on Leaves", description: "Gentle rainfall sounds", duration: "30 min" },
  { title: "Ocean Waves", description: "Peaceful beach ambiance", duration: "45 min" },
  { title: "Forest Birds", description: "Morning bird songs", duration: "20 min" },
]

const musicSuggestions = [
  { title: "Calm Focus", description: "For concentration and study", mood: "Focused" },
  { title: "Peaceful Mind", description: "For relaxation and sleep", mood: "Calm" },
  { title: "Uplifting Vibes", description: "For motivation and energy", mood: "Happy" },
]

export function StressReliefTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("game")
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const handleAudioToggle = (title: string) => {
    setPlayingAudio(playingAudio === title ? null : title)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "game":
        return (
          <div className="space-y-4">
            {gameActivities.map((activity) => (
              <Card key={activity.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    <span className="text-xs text-primary font-medium">{activity.duration}</span>
                  </div>
                  <Button size="sm" className="ml-4">
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )

      case "exercise":
        return (
          <div className="space-y-4">
            {exerciseActivities.map((activity) => (
              <Card key={activity.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    <span className="text-xs text-secondary font-medium">{activity.duration}</span>
                  </div>
                  <Button size="sm" variant="secondary" className="ml-4">
                    Begin
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )

      case "asmr":
        return (
          <div className="space-y-4">
            {asmrSounds.map((sound) => (
              <Card key={sound.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{sound.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{sound.description}</p>
                    <span className="text-xs text-chart-3 font-medium">{sound.duration}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-4 bg-transparent"
                    onClick={() => handleAudioToggle(sound.title)}
                  >
                    {playingAudio === sound.title ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )

      case "music":
        return (
          <div className="space-y-4">
            {musicSuggestions.map((playlist) => (
              <Card key={playlist.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{playlist.title}</h3>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{playlist.mood}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{playlist.description}</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-4 bg-transparent">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200 ${
              activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">{renderContent()}</div>
    </div>
  )
}
