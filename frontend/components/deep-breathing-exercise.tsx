"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest'

interface BreathingState {
  phase: BreathingPhase
  secondsLeft: number
  cycle: number
  isActive: boolean
  isPaused: boolean
}

export function DeepBreathingExercise() {
  const [breathingState, setBreathingState] = useState<BreathingState>({
    phase: 'inhale',
    secondsLeft: 4,
    cycle: 0,
    isActive: false,
    isPaused: false
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 4-7-8 breathing pattern
  const phaseTimings = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 1
  }

  const phaseInstructions = {
    inhale: "Breathe in slowly through your nose",
    hold: "Hold your breath gently",
    exhale: "Exhale slowly through your mouth",
    rest: "Rest and prepare for the next cycle"
  }

  const phaseColors = {
    inhale: "bg-blue-500",
    hold: "bg-amber-500", 
    exhale: "bg-green-500",
    rest: "bg-gray-400"
  }

  const playSound = (type: 'start' | 'phase-change' | 'complete') => {
    if (!soundEnabled) return
    
    // In a real app, you would load actual audio files
    // For now, we'll use the Web Audio API to create simple tones
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      
      switch (type) {
        case 'start':
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
          break
        case 'phase-change':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
          break
        case 'complete':
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime) // E5
          break
      }
      
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  const startExercise = () => {
    setBreathingState({
      phase: 'inhale',
      secondsLeft: phaseTimings.inhale,
      cycle: 1,
      isActive: true,
      isPaused: false
    })
    playSound('start')
  }

  const pauseExercise = () => {
    setBreathingState(prev => ({
      ...prev,
      isPaused: true
    }))
  }

  const resumeExercise = () => {
    setBreathingState(prev => ({
      ...prev,
      isPaused: false
    }))
  }

  const resetExercise = () => {
    setBreathingState({
      phase: 'inhale',
      secondsLeft: 4,
      cycle: 0,
      isActive: false,
      isPaused: false
    })
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const getNextPhase = (currentPhase: BreathingPhase): BreathingPhase => {
    const phases: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'rest']
    const currentIndex = phases.indexOf(currentPhase)
    return phases[(currentIndex + 1) % phases.length]
  }

  const getBubbleScale = (): number => {
    const { phase, secondsLeft } = breathingState
    const totalTime = phaseTimings[phase]
    const elapsed = totalTime - secondsLeft
    
    switch (phase) {
      case 'inhale':
        return 0.5 + (elapsed / totalTime) * 0.5 // Grows from 0.5 to 1
      case 'hold':
        return 1 // Stays at full size
      case 'exhale':
        return 1 - (elapsed / totalTime) * 0.5 // Shrinks from 1 to 0.5
      case 'rest':
        return 0.5 // Small size during rest
      default:
        return 0.5
    }
  }

  useEffect(() => {
    if (breathingState.isActive && !breathingState.isPaused) {
      intervalRef.current = setInterval(() => {
        setBreathingState(prev => {
          if (prev.secondsLeft <= 1) {
            const nextPhase = getNextPhase(prev.phase)
            const isNewCycle = prev.phase === 'rest'
            
            playSound(nextPhase === 'inhale' ? 'complete' : 'phase-change')
            
            return {
              phase: nextPhase,
              secondsLeft: phaseTimings[nextPhase],
              cycle: isNewCycle ? prev.cycle + 1 : prev.cycle,
              isActive: true,
              isPaused: false
            }
          } else {
            return {
              ...prev,
              secondsLeft: prev.secondsLeft - 1
            }
          }
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [breathingState.isActive, breathingState.isPaused])

  return (
    <Card className="p-6">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            4-7-8 Breathing Exercise
          </h3>
          <p className="text-sm text-muted-foreground">
            A calming breathing technique to reduce stress and anxiety
          </p>
        </div>

        {/* Breathing Visualization */}
        <div className="relative flex items-center justify-center" style={{ height: '300px' }}>
          <div 
            className={`
              relative rounded-full border-4 border-primary/20 transition-all duration-1000 ease-in-out
              ${phaseColors[breathingState.phase]} opacity-20
            `}
            style={{
              width: '200px',
              height: '200px',
              transform: `scale(${getBubbleScale()})`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {breathingState.secondsLeft}
                </div>
                <div className="text-sm font-medium text-foreground capitalize">
                  {breathingState.phase}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-lg text-foreground mb-2">
            {phaseInstructions[breathingState.phase]}
          </p>
          {breathingState.isActive && (
            <p className="text-sm text-muted-foreground">
              Cycle {breathingState.cycle} • {breathingState.phase.charAt(0).toUpperCase() + breathingState.phase.slice(1)} for {breathingState.secondsLeft} seconds
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!breathingState.isActive ? (
            <Button onClick={startExercise} className="px-8">
              <Play className="h-4 w-4 mr-2" />
              Start Exercise
            </Button>
          ) : (
            <>
              <Button 
                onClick={breathingState.isPaused ? resumeExercise : pauseExercise}
                variant="outline"
              >
                {breathingState.isPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
              <Button onClick={resetExercise} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-left bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">How to do the 4-7-8 breathing:</h4>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. <strong>Inhale</strong> slowly through your nose for 4 seconds</li>
            <li>2. <strong>Hold</strong> your breath gently for 7 seconds</li>
            <li>3. <strong>Exhale</strong> slowly through your mouth for 8 seconds</li>
            <li>4. <strong>Rest</strong> for 1 second before the next cycle</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-3">
            Follow the breathing bubble as it expands and contracts. Complete 4-8 cycles for best results.
          </p>
        </div>

        {/* Tips */}
        <div className="text-left bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-800">Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Find a comfortable seated position</li>
            <li>• Place one hand on your chest, one on your belly</li>
            <li>• Focus on breathing with your diaphragm</li>
            <li>• Don't worry if you feel lightheaded at first</li>
            <li>• Practice regularly for best results</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
