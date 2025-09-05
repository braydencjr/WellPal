"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Dumbbell, Headphones, Music, Play, Pause, Grid3x3, Zap, Box, Volume2, SkipBack, SkipForward } from "lucide-react"
import { FifteenPuzzle } from "@/components/fifteen-puzzle"
import { SnakeGame } from "@/components/snake-game"
import { TetrisGame } from "@/components/tetris-game"
import { CustomGameManager } from "@/components/custom-game-manager"
import { DeepBreathingExercise } from "@/components/deep-breathing-exercise"
import { ProgressiveMuscleRelaxation } from "@/components/progressive-muscle-relaxation"
import { AdvancedASMRPlayer } from "@/components/advanced-asmr-player"
import { LockWrapper } from "@/components/LockWrapper"


type TabType = "game" | "exercise" | "asmr" | "music"

const tabs = [
  { id: "game", label: "Games", icon: Gamepad2 },
  { id: "exercise", label: "Exercises", icon: Dumbbell },
  { id: "asmr", label: "ASMR", icon: Headphones },
  { id: "music", label: "Music", icon: Music },
]

const gameOptions = [
  {
    id: "fifteen-puzzle",
    title: "15 Puzzle",
    description: "Classic sliding number puzzle game",
    icon: Grid3x3,
  },
  {
    id: "snake",
    title: "Snake Game",
    description: "Navigate the snake to collect food",
    icon: Zap,
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Arrange falling blocks to clear lines",
    icon: Box,

  },
  {
    id: "custom",
    title: "Custom Games",
    description: "Additional mini-games and puzzles",
    icon: Gamepad2,

  }
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
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  
  // Add locked games state management
  const [lockedGames, setLockedGames] = useState<string[]>(["snake", "tetris", "custom"])
  const [masterVolume, setMasterVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState<{ [key: string]: number }>({})
  
  // Function to unlock a game
  const unlockGame = (gameId: string) => {
    setLockedGames(prev => prev.filter(id => id !== gameId))
  }

  // Simulate audio playback progression
  useEffect(() => {
    if (!playingAudio) return

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const current = prev[playingAudio] || 0
        const music = musicSuggestions.find(m => m.title === playingAudio)
        if (!music) return prev

        const totalSeconds = getDurationInSeconds(music.duration)
        const newTime = current + 1

        if (newTime >= totalSeconds) {
          setPlayingAudio(null) // Auto-stop when finished
          return { ...prev, [playingAudio]: 0 }
        }

        return { ...prev, [playingAudio]: newTime }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [playingAudio])
  const handleAudioToggle = (title: string) => {
    setPlayingAudio(playingAudio === title ? null : title)
    if (playingAudio !== title) {
      // Start playing from current position
      setCurrentTime(prev => ({ ...prev, [title]: prev[title] || 0 }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getDurationInSeconds = (duration: string) => {
    const [mins, secs] = duration.split(':').map(Number)
    return mins * 60 + secs
  }

  const getProgressPercentage = (title: string, duration: string) => {
    const currentSeconds = currentTime[title] || 0
    const totalSeconds = getDurationInSeconds(duration)
    return Math.min((currentSeconds / totalSeconds) * 100, 100)
  }

  const handleSeek = (title: string, duration: string, percentage: number) => {
    const totalSeconds = getDurationInSeconds(duration)
    const newTime = Math.floor(totalSeconds * percentage)
    setCurrentTime(prev => ({ ...prev, [title]: newTime }))
  }

  const renderGameContent = () => {
    switch (currentGame) {
      case "fifteen-puzzle":
        return (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setCurrentGame(null)}
              className="mb-4"
            >
              ← Back to Games
            </Button>
            <FifteenPuzzle />
          </div>
        )
      case "snake":
        return (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setCurrentGame(null)}
              className="mb-4"
            >
              ← Back to Games
            </Button>
            {lockedGames.includes("snake") ? (
              <LockWrapper isLocked={true}>
                <SnakeGame />
              </LockWrapper>
            ) : (
              <SnakeGame />
            )}
            {lockedGames.includes("snake") ? (
              <LockWrapper isLocked={true}>
                <SnakeGame />
              </LockWrapper>
            ) : (
              <SnakeGame />
            )}
          </div>
        )
      case "tetris":
        return (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setCurrentGame(null)}
              className="mb-4"
            >
              ← Back to Games
            </Button>
            {lockedGames.includes("tetris") ? (
              <LockWrapper isLocked={true}>
                <TetrisGame />
              </LockWrapper>
            ) : (
              <TetrisGame />
            )}
            {lockedGames.includes("tetris") ? (
              <LockWrapper isLocked={true}>
                <TetrisGame />
              </LockWrapper>
            ) : (
              <TetrisGame />
            )}
          </div>
        )
      case "custom":
        return (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setCurrentGame(null)}
              className="mb-4"
            >
              ← Back to Games
            </Button>
            {lockedGames.includes("custom") ? (
              <LockWrapper isLocked={true}>
                <CustomGameManager />
              </LockWrapper>
            ) : (
              <CustomGameManager />
            )}
            {lockedGames.includes("custom") ? (
              <LockWrapper isLocked={true}>
                <CustomGameManager />
              </LockWrapper>
            ) : (
              <CustomGameManager />
            )}
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            {gameOptions.map((game) => {
              const isLocked = lockedGames.includes(game.id)
              return (
                <Card key={game.id} className={`p-4 transition-shadow ${isLocked ? 'opacity-70 border-yellow-400 relative' : 'hover:shadow-md'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <game.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-foreground">{game.title}</h3>
                          {isLocked && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              🔒 Locked
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={isLocked ? "outline" : "secondary"}
                      className="ml-4"
                      disabled={isLocked}
                      onClick={() => !isLocked && setCurrentGame(game.id)}
                    >
                      {isLocked ? "🔒 Locked" : "Play"}
                    </Button>
                  </div>
                  
                  {/* Overlay for locked games */}
                  {isLocked && (
                    <div className="absolute inset-0 rounded-lg flex flex-col items-center justify-center space-y-3 z-10">
                      <p className="text-lg text-yellow-700 font-medium text-center px-4 bg-white/90 rounded-lg py-2">
                        {game.id === "snake" && "Unlock after 3 days login streak"}
                        {game.id === "tetris" && "Unlock after 7 days login streak"}
                        {game.id === "custom" && "Unlock after you purchase Pro version"}
                      </p>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 shadow-lg text-xl"
                        onClick={() => unlockGame(game.id)}
                      >
                        Unlock
                      </Button>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "game":
        return renderGameContent()

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
                      <Button
                        onClick={() => window.open("https://www.youtube.com/watch?v=1VYlOKUdylM", "_blank")}
                      >
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
            {/* Master Volume Control */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">Master Volume</h3>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {Math.round(masterVolume * 100)}%
                </span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${masterVolume * 100}%, #d1d5db ${masterVolume * 100}%, #d1d5db 100%)`
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the overall volume for all music tracks
                </p>
              </div>
            </Card>

            {/* Music Tracks */}
            {musicSuggestions.map((music) => (
              <Card key={music.title} className="p-4">
                <div className="flex items-center justify-between mb-4">
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

                {/* Progress Bar and Controls */}
                <div className="mt-4 p-3 bg-muted rounded-lg space-y-3">
                  {/* Time Display */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime[music.title] || 0)}</span>
                    <span>{music.duration}</span>
                  </div>
                  
                  {/* Seekable Progress Bar */}
                  <div 
                    className="w-full bg-secondary rounded-full h-3 cursor-pointer relative group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const percentage = clickX / rect.width
                      handleSeek(music.title, music.duration, percentage)
                    }}
                  >
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-300 relative"
                      style={{ width: `${getProgressPercentage(music.title, music.duration)}%` }}
                    >
                      {/* Playhead */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-foreground rounded-full border-2 border-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newTime = Math.max(0, (currentTime[music.title] || 0) - 10)
                        setCurrentTime(prev => ({ ...prev, [music.title]: newTime }))
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAudioToggle(music.title)}
                      className="h-10 w-10 p-0"
                    >
                      {playingAudio === music.title ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const totalSeconds = getDurationInSeconds(music.duration)
                        const newTime = Math.min(totalSeconds, (currentTime[music.title] || 0) + 10)
                        setCurrentTime(prev => ({ ...prev, [music.title]: newTime }))
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Status */}
                  {playingAudio === music.title && (
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        🎵 Playing at {Math.round(masterVolume * 100)}% volume
                      </p>
                    </div>
                  )}
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
            onClick={() => {
              setActiveTab(tab.id as TabType)
              setCurrentExercise(null)
              setCurrentGame(null) // Reset game view when switching tabs
            }}
            className={`flex-1 flex items-center justify-center space-x-1 py-2 px-1 text-xs font-medium transition-colors ${
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

