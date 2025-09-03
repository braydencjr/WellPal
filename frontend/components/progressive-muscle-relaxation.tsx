"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, CheckCircle } from "lucide-react"

interface PMRStep {
  id: number
  title: string
  instruction: string
  duration: string
  muscleGroup: string
  details: string[]
}

export function ProgressiveMuscleRelaxation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isStarted, setIsStarted] = useState(false)

  const pmrSteps: PMRStep[] = [
    {
      id: 0,
      title: "Getting Started",
      instruction: "Find a comfortable position and prepare for relaxation",
      duration: "2 minutes",
      muscleGroup: "Preparation",
      details: [
        "Find a quiet, comfortable space where you won't be interrupted",
        "Sit in a comfortable chair or lie down on your back",
        "Close your eyes or soften your gaze",
        "Take a few deep breaths to settle in",
        "Allow yourself to begin noticing any tension in your body"
      ]
    },
    {
      id: 1,
      title: "Feet and Calves",
      instruction: "Tense your feet and calf muscles, then release",
      duration: "1 minute",
      muscleGroup: "Lower Legs",
      details: [
        "Curl your toes tightly and flex your feet upward",
        "Tighten your calf muscles by pointing your toes",
        "Hold this tension for 5-7 seconds",
        "Feel the tightness in your feet and calves",
        "Now release suddenly and completely",
        "Let your feet go completely limp",
        "Notice the contrast between tension and relaxation",
        "Feel the warmth and heaviness as your muscles relax"
      ]
    },
    {
      id: 2,
      title: "Thighs and Buttocks",
      instruction: "Tense your upper leg muscles, then release",
      duration: "1 minute",
      muscleGroup: "Upper Legs",
      details: [
        "Tighten your thigh muscles by pressing your knees together",
        "Squeeze your buttock muscles firmly",
        "Hold this tension for 5-7 seconds",
        "Feel the tightness throughout your upper legs",
        "Now release suddenly and completely",
        "Let your legs become heavy and relaxed",
        "Notice how different relaxation feels from tension",
        "Allow the relaxation to spread through your lower body"
      ]
    },
    {
      id: 3,
      title: "Abdomen",
      instruction: "Tense your stomach muscles, then release",
      duration: "1 minute",
      muscleGroup: "Core",
      details: [
        "Tighten your abdominal muscles as if preparing for a punch",
        "Pull your belly button toward your spine",
        "Hold this tension for 5-7 seconds",
        "Feel the tightness in your core",
        "Now release and let your belly soften",
        "Allow your breathing to return to natural rhythm",
        "Notice the gentle rise and fall of your abdomen",
        "Feel the relaxation spreading through your midsection"
      ]
    },
    {
      id: 4,
      title: "Hands and Arms",
      instruction: "Make fists and tense your arms, then release",
      duration: "1 minute",
      muscleGroup: "Upper Body",
      details: [
        "Make tight fists with both hands",
        "Bend your arms and bring your fists to your shoulders",
        "Tense your entire arms - biceps, triceps, and forearms",
        "Hold this tension for 5-7 seconds",
        "Feel the strength and tightness in your arms",
        "Now release and let your arms drop to your sides",
        "Let your hands open and rest naturally",
        "Notice the heavy, relaxed feeling in your arms"
      ]
    },
    {
      id: 5,
      title: "Shoulders and Neck",
      instruction: "Raise your shoulders and tense your neck, then release",
      duration: "1 minute",
      muscleGroup: "Neck and Shoulders",
      details: [
        "Raise your shoulders up toward your ears",
        "Tense the muscles in your neck and shoulders",
        "Hold this tension for 5-7 seconds",
        "Feel the tightness across your upper back and neck",
        "Now let your shoulders drop down",
        "Allow your neck to lengthen and soften",
        "Feel the release of tension from these commonly tight areas",
        "Notice how much lighter your shoulders feel"
      ]
    },
    {
      id: 6,
      title: "Face",
      instruction: "Scrunch your facial muscles, then release",
      duration: "1 minute",
      muscleGroup: "Face and Head",
      details: [
        "Squeeze your eyes tightly shut",
        "Scrunch up your nose and cheeks",
        "Clench your jaw and press your lips together",
        "Tense your forehead by raising your eyebrows",
        "Hold all facial tension for 5-7 seconds",
        "Now release all the muscles in your face",
        "Let your jaw drop slightly open",
        "Allow your face to become completely smooth and relaxed"
      ]
    },
    {
      id: 7,
      title: "Whole Body",
      instruction: "Tense your entire body, then release completely",
      duration: "2 minutes",
      muscleGroup: "Full Body",
      details: [
        "Tense every muscle in your body simultaneously",
        "Feet, legs, abdomen, arms, shoulders, and face",
        "Hold this full-body tension for 5-7 seconds",
        "Feel the tension throughout your entire body",
        "Now release everything at once",
        "Let your whole body become completely limp and heavy",
        "Take several deep breaths",
        "Enjoy this feeling of complete relaxation"
      ]
    },
    {
      id: 8,
      title: "Final Relaxation",
      instruction: "Rest in complete relaxation and mindfulness",
      duration: "3 minutes",
      muscleGroup: "Integration",
      details: [
        "Remain in this deeply relaxed state",
        "Notice how your body feels now compared to when you started",
        "Scan through each muscle group you've relaxed",
        "If you notice any remaining tension, gently release it",
        "Focus on your breathing - slow and natural",
        "Allow yourself to enjoy this peaceful state",
        "When ready, slowly wiggle your fingers and toes",
        "Gently open your eyes and return to alertness"
      ]
    }
  ]

  const nextStep = () => {
    if (currentStep < pmrSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < pmrSteps.length - 1) {
      nextStep()
    }
  }

  const resetExercise = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setIsStarted(false)
  }

  const startExercise = () => {
    setIsStarted(true)
    setCurrentStep(0)
  }

  const progress = (completedSteps.length / pmrSteps.length) * 100

  if (!isStarted) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Progressive Muscle Relaxation
            </h3>
            <p className="text-sm text-muted-foreground">
              A step-by-step guide to release tension throughout your body
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-left">
            <h4 className="font-medium mb-3 text-green-800">What you'll learn:</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• How to systematically relax each muscle group</li>
              <li>• The difference between tension and relaxation</li>
              <li>• Techniques to release physical stress</li>
              <li>• How to achieve deep, full-body relaxation</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h4 className="font-medium mb-3 text-blue-800">Before you begin:</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Find a quiet, comfortable space</li>
              <li>• Allow 15-20 minutes without interruption</li>
              <li>• Wear comfortable, loose clothing</li>
              <li>• Sit or lie down in a relaxed position</li>
            </ul>
          </div>

          <Button onClick={startExercise} className="w-full">
            <BookOpen className="h-4 w-4 mr-2" />
            Begin Progressive Relaxation
          </Button>
        </div>
      </Card>
    )
  }

  const currentStepData = pmrSteps[currentStep]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Progressive Muscle Relaxation
            </h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {pmrSteps.length}
            </p>
          </div>
          <Button onClick={resetExercise} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-muted rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-foreground">
                {currentStepData.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentStepData.muscleGroup} • {currentStepData.duration}
              </p>
            </div>
            {completedSteps.includes(currentStep) && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          <p className="text-foreground mb-4 font-medium">
            {currentStepData.instruction}
          </p>

          <div className="space-y-2">
            {currentStepData.details.map((detail, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {detail}
              </p>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={prevStep} 
            variant="outline"
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {!completedSteps.includes(currentStep) && (
              <Button onClick={markStepComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Step
              </Button>
            )}
            
            {currentStep < pmrSteps.length - 1 && (
              <Button onClick={nextStep} variant="outline">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {currentStep === pmrSteps.length - 1 && completedSteps.includes(currentStep) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium text-green-800 mb-1">
              Congratulations!
            </h4>
            <p className="text-sm text-green-700">
              You've completed the full Progressive Muscle Relaxation sequence. 
              Take a moment to enjoy this feeling of deep relaxation.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
