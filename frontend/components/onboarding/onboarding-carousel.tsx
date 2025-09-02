"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const onboardingSteps = [
  {
    title: "Track Your Mood",
    description: "Monitor your daily emotions and identify patterns to better understand your mental wellness journey.",
    icon: "📊",
    color: "bg-primary/10",
    features: ["Daily mood check-ins", "Emotion tracking", "Progress insights", "Pattern recognition"],
  },
  {
    title: "Reduce Stress",
    description:
      "Access guided breathing exercises, meditation sessions, and relaxation techniques designed for students.",
    icon: "🧘",
    color: "bg-secondary/10",
    features: ["Breathing exercises", "Meditation guides", "Stress relief tools", "Relaxation techniques"],
  },
  {
    title: "Get Support",
    description: "Connect with mental health resources, crisis support, and wellness tools when you need them most.",
    icon: "🤝",
    color: "bg-accent/10",
    features: ["24/7 crisis support", "Resource library", "Emergency contacts", "Professional help"],
  },
]

export function OnboardingCarousel() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/onboarding/personal-info")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    router.push("/onboarding/personal-info")
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${index === currentStep ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <Button variant="ghost" onClick={skipOnboarding} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              {/* Icon */}
              <div
                className={`mx-auto w-20 h-20 ${currentStepData.color} rounded-full flex items-center justify-center`}
              >
                <span className="text-3xl">{currentStepData.icon}</span>
              </div>

              {/* Title and Description */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">{currentStepData.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{currentStepData.description}</p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                {currentStepData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button onClick={nextStep} className="flex items-center gap-2">
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            {currentStep < onboardingSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>
        </div>
      </div>
    </div>
  )
}
