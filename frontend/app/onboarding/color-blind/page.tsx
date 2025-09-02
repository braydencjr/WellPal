"use client"

import { useRouter } from "next/navigation"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"

export default function ColorBlindPage() {
  const router = useRouter()

  return (
    <QuestionLayout
      question="Do you have color blindness?"
      onYes={() => {
        document.documentElement.style.setProperty("--dog-color", "#A52A2A")
        router.push("/onboarding/dyslexia")
      }}
      onNo={() => router.push("/onboarding/dyslexia")}
    />
  )
}
