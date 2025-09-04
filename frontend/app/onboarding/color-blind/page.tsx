"use client"

import { useRouter } from "next/navigation"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"
import { useOnboarding } from "@/contexts/onboarding-context"

export default function ColorBlindPage() {
  const router = useRouter()
  const { data, updateAccessibility } = useOnboarding()

  const handleYes = () => {
    updateAccessibility({ 
      ...data.accessibility,
      hasColorBlindness: true 
    })
    document.documentElement.style.setProperty("--dog-color", "#A52A2A")
    router.push("/onboarding/summary")
  }

  const handleNo = () => {
    updateAccessibility({ 
      ...data.accessibility,
      hasColorBlindness: false 
    })
    router.push("/onboarding/summary")
  }

  return (
    <QuestionLayout
      question="Do you have color blindness?"
      onYes={handleYes}
      onNo={handleNo}
    />
  )
}
