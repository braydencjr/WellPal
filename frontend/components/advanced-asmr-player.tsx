"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"

interface SoundLayer {
  name: string
  volume: number
  audio?: HTMLAudioElement
  isLooping: boolean
}

interface ASMRPreset {
  name: string
  description: string
  layers: { [key: string]: number }
}

export function AdvancedASMRPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [masterVolume, setMasterVolume] = useState(70)
  const [selectedPreset, setSelectedPreset] = useState("coastal-winds")
  const masterAudioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [soundLayers, setSoundLayers] = useState<{ [key: string]: SoundLayer }>({
    "wind-rumble": { name: "Wind Rumble", volume: -50, isLooping: true },
    "waves-crash": { name: "Waves Crash", volume: -45, isLooping: true },
    "wind": { name: "Wind", volume: -40, isLooping: true },
    "shore-noise": { name: "Shore Noise", volume: -35, isLooping: true },
    "inland": { name: "Inland", volume: -50, isLooping: true },
    "seaside": { name: "Seaside", volume: -45, isLooping: true },
    "loch": { name: "Loch", volume: -55, isLooping: true },
    "pebble-shore": { name: "Pebble Shore", volume: -40, isLooping: true },
    "water": { name: "Water", volume: -50, isLooping: true },
    "rain": { name: "Rain", volume: -35, isLooping: true },
  })

  const presets: ASMRPreset[] = [
    {
      name: "coastal-winds",
      description: "Coastal Winds",
      layers: {
        "wind-rumble": -30,
        "waves-crash": -25,
        "wind": -20,
        "shore-noise": -35,
        "seaside": -25,
        "water": -40,
        "rain": -94,
        "inland": -94,
        "loch": -94,
        "pebble-shore": -94,
      }
    },
    {
      name: "cliff-view",
      description: "Cliff View",
      layers: {
        "wind-rumble": -20,
        "waves-crash": -30,
        "wind": -15,
        "shore-noise": -30,
        "seaside": -35,
        "water": -45,
        "rain": -94,
        "inland": -94,
        "loch": -94,
        "pebble-shore": -94,
      }
    },
    {
      name: "breaking-waves",
      description: "Breaking Waves",
      layers: {
        "wind-rumble": -45,
        "waves-crash": -15,
        "wind": -40,
        "shore-noise": -20,
        "seaside": -25,
        "pebble-shore": -30,
        "water": -25,
        "rain": -94,
        "inland": -94,
        "loch": -94,
      }
    },
    {
      name: "inner-loch",
      description: "Inner Loch",
      layers: {
        "loch": -20,
        "water": -25,
        "wind": -45,
        "inland": -30,
        "wind-rumble": -50,
        "waves-crash": -94,
        "shore-noise": -94,
        "seaside": -94,
        "pebble-shore": -94,
        "rain": -94,
      }
    },
    {
      name: "shore",
      description: "Shore",
      layers: {
        "shore-noise": -20,
        "waves-crash": -25,
        "water": -30,
        "seaside": -25,
        "pebble-shore": -35,
        "wind": -40,
        "wind-rumble": -45,
        "rain": -94,
        "inland": -94,
        "loch": -94,
      }
    },
    {
      name: "salty-air",
      description: "Salty Air",
      layers: {
        "seaside": -20,
        "wind": -25,
        "shore-noise": -30,
        "waves-crash": -35,
        "water": -40,
        "wind-rumble": -30,
        "pebble-shore": -50,
        "rain": -94,
        "inland": -94,
        "loch": -94,
      }
    },
    {
      name: "irish-summer",
      description: "Irish Summer",
      layers: {
        "wind": -30,
        "seaside": -25,
        "water": -35,
        "inland": -40,
        "rain": -50,
        "shore-noise": -45,
        "waves-crash": -94,
        "wind-rumble": -94,
        "loch": -94,
        "pebble-shore": -94,
      }
    },
    {
      name: "soaked",
      description: "Soaked",
      layers: {
        "rain": -20,
        "water": -30,
        "wind": -40,
        "inland": -35,
        "shore-noise": -94,
        "waves-crash": -94,
        "wind-rumble": -94,
        "seaside": -94,
        "loch": -94,
        "pebble-shore": -94,
      }
    }
  ]

  // Mock audio duration (in a real app, this would come from actual audio files)
  const mockDuration = 1800 // 30 minutes

  const handleVolumeChange = (layerKey: string, newVolume: number[]) => {
    setSoundLayers(prev => ({
      ...prev,
      [layerKey]: {
        ...prev[layerKey],
        volume: newVolume[0]
      }
    }))
  }

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName)
    const preset = presets.find(p => p.name === presetName)
    if (preset) {
      setSoundLayers(prev => {
        const updated = { ...prev }
        Object.entries(preset.layers).forEach(([layerKey, volume]) => {
          if (updated[layerKey]) {
            updated[layerKey] = { ...updated[layerKey], volume }
          }
        })
        return updated
      })
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    } else {
      setIsPlaying(true)
      setDuration(mockDuration)
      
      // Start progress counter
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= mockDuration) {
            setIsPlaying(false)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    setCurrentTime(Math.max(0, Math.min(newTime, duration)))
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const dbToPercent = (db: number): number => {
    // Convert dB (-94 to 0) to percentage (0 to 100)
    return Math.max(0, Math.min(100, ((db + 94) / 94) * 100))
  }

  const percentToDb = (percent: number): number => {
    // Convert percentage (0 to 100) to dB (-94 to 0)
    return (percent / 100) * 94 - 94
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Customizable ASMR Generator
            </h3>
            <p className="text-sm text-muted-foreground">
              Create your perfect ambient soundscape with adjustable sound layers
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handlePlayPause}
              className={isPlaying ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full h-2 bg-secondary rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ 
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
              }}
            />
          </div>
        </div>

        {/* Master Volume */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Label className="font-medium">Master Volume</Label>
            <span className="text-sm text-muted-foreground">{masterVolume}%</span>
          </div>
          <Slider
            value={[masterVolume]}
            onValueChange={(value) => setMasterVolume(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Presets */}
        <div className="mb-6">
          <Label className="font-medium mb-2 block">Presets</Label>
          <Select value={selectedPreset} onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset) => (
                <SelectItem key={preset.name} value={preset.name}>
                  {preset.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sound Layers */}
        <div>
          <Label className="font-medium mb-4 block">Sound Layers</Label>
          <div className="space-y-4">
            {Object.entries(soundLayers).map(([key, layer]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{layer.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {layer.volume} dB
                  </span>
                </div>
                <Slider
                  value={[layer.volume]}
                  onValueChange={(value) => handleVolumeChange(key, value)}
                  min={-94}
                  max={0}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">How to use:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Adjust each slider to control individual sound layers</li>
            <li>• -94 dB = completely silent, -20 dB = loudest</li>
            <li>• Try different presets for ready-made soundscapes</li>
            <li>• Create your own custom mix by adjusting multiple layers</li>
            <li>• Click on the progress bar to jump to different timestamps</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

function Label({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  )
}
