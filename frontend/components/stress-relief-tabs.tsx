"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Dumbbell, Headphones, Music, Play, Pause } from "lucide-react"
import { FifteenPuzzle } from "@/components/fifteen-puzzle"
import { SnakeGame } from "@/components/snake-game"
import { TetrisGame } from "@/components/tetris-game"
import { CustomGameManager } from "@/components/custom-game-manager"
import { DeepBreathingExercise } from "@/components/deep-breathing-exercise"
import { ProgressiveMuscleRelaxation } from "@/components/progressive-muscle-relaxation"
import { AdvancedASMRPlayer } from "@/components/advanced-asmr-player"

type TabType = "game" | "exercise" | "asmr" | "music"

const tabs = [
  { id: "game", label: "Games", icon: Gamepad2 },
  { id: "exercise", label: "Exercises", icon: Dumbbell },
  { id: "asmr", label: "ASMR", icon: Headphones },
  { id: "music", label: "Music", icon: Music },
]

const exerciseActivities = [
  { 
    title: "Deep Breathing", 
    description: "4-7-8 breathing technique with guided visualization", 
    duration: "5 min",
    component: "breathing"
  },
  { 
    title: "Progressive Relaxation", 
    description: "Step-by-step muscle tension release guide", 
    duration: "15 min",
    component: "progressive" 
  },
  { 
    title: "Gentle Stretches", 
    description: "Simple desk and neck stretches", 
    duration: "8 min",
    component: "stretches"
  },
]

const musicSuggestions = [
  { 
    title: "Calm Focus", 
    description: "Instrumental music for concentration and study", 
    mood: "Focused",
    duration: "25:00"
  },
  { 
    title: "Peaceful Mind", 
    description: "Ambient sounds for relaxation and sleep", 
    mood: "Calm",
    duration: "30:00"
  },
  { 
    title: "Uplifting Vibes", 
    description: "Gentle melodies for motivation and energy", 
    mood: "Happy",
    duration: "20:00"
  },
]

export function StressReliefTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("game")
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [currentExercise, setCurrentExercise] = useState<string | null>(null)

  const handleAudioToggle = (title: string) => {
    setPlayingAudio(playingAudio === title ? null : title)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "game":
        return (
          <div className="space-y-6">
            <FifteenPuzzle />
            <SnakeGame />
            <TetrisGame />
            <CustomGameManager />
          </div>
        )

      case "exercise":
        if (currentExercise === "breathing") {
          return (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentExercise(null)}
                className="mb-4"
              >
                ← Back to Exercises
              </Button>
              <DeepBreathingExercise />
            </div>
          )
        }
        
        if (currentExercise === "progressive") {
          return (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentExercise(null)}
                className="mb-4"
              >
                ← Back to Exercises
              </Button>
              <ProgressiveMuscleRelaxation />
            </div>
          )
        }
        
        if (currentExercise === "stretches") {
          return (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentExercise(null)}
                className="mb-4"
              >
                ← Back to Exercises
              </Button>
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">Gentle Stretches</h3>
                  <p className="text-muted-foreground">
                    Follow along with this gentle stretching routine
                  </p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Embedded stretching video would appear here
                      </p>
                      <Button onClick={() => window.open("https://www.youtube.com/watch?v=1VYlOKUdylM", "_blank")}>
                        Watch on YouTube
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        }
        
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
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="ml-4"
                    onClick={() => setCurrentExercise(activity.component)}
                  >
                    Begin
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )

      case "asmr":
        return <AdvancedASMRPlayer />

      case "music":
        return (
          <div className="space-y-4">
            {musicSuggestions.map((music) => (
              <Card key={music.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">{music.title}</h3>
                      <span className="text-xs text-muted-foreground">{music.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{music.description}</p>
                    <span className="text-xs bg-chart-4/20 text-chart-4 px-2 py-1 rounded-full">
                      {music.mood}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={playingAudio === music.title ? "default" : "outline"}
                    className="ml-4"
                    onClick={() => handleAudioToggle(music.title)}
                  >
                    {playingAudio === music.title ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                </div>
                
                {playingAudio === music.title && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>00:00</span>
                      <span>{music.duration}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-0 transition-all duration-1000" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      🎵 Playing {music.title}...
                    </p>
                  </div>
                )}
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
            onClick={() => {
              setActiveTab(tab.id as TabType)
              setCurrentExercise(null) // Reset exercise view when switching tabs
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  )
}
