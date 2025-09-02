"use client"

import { useRouter } from "next/navigation"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"

export default function DyslexiaPage() {
  const router = useRouter()

  return (
    <QuestionLayout
      question="Do you have dyslexia?"
      onYes={() => {
        document.body.style.fontSize = "1.25rem"
        document.body.style.color = "black"
        router.push("/onboarding/mental-health")
      }}
      onNo={() => router.push("/onboarding/mental-health")}
    />
  )
}
