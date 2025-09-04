"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DogPal } from "@/components/DogPal-animation"
import { ChatBubble } from "@/components/chat-bubble"
import { Button } from "@/components/ui/button"

export default function UnderstandUserBetterPage() {
  const messages = [
    "Hi there! I'm your WellPal 🐶",
    "I’ll be here to keep you company along the way ✨",
    "Please help me to understand you better 💬"
  ]

  const [step, setStep] = useState(0)
  const router = useRouter()

    const handleNext = () => {
    if (step < messages.length - 1) {
      setStep(step + 1)
    } else {
      router.push("/onboarding/mental-health") // Navigate to mental health questions
    }
  }

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative">
        {/* Chat bubble for messages */}
        <ChatBubble message={messages[step]}>
          <div className="flex justify-center mt-3">
            <Button
              onClick={handleNext}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg px-6 py-2"
            >
              {step < messages.length - 1 ? "Next" : "Continue"}
            </Button>
          </div>
        </ChatBubble>

        {/* Dog avatar positioned below bubble */}
        <div className="absolute -bottom-10 -left-12">
          <DogPal />
        </div>
      </div>
    </div>
  )
}