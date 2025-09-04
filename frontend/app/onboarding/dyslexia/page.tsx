"use client"

import { useRouter } from "next/navigation"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"
import { useOnboarding } from "@/contexts/onboarding-context"

export default function DyslexiaPage() {
  const router = useRouter()
  const { updateAccessibility } = useOnboarding()

  const handleYes = () => {
    updateAccessibility({ hasDyslexia: true })
    document.body.style.fontSize = "1.25rem"
    document.body.style.color = "black"
    router.push("/onboarding/color-blind")
  }

  const handleNo = () => {
    updateAccessibility({ hasDyslexia: false })
    router.push("/onboarding/color-blind")
  }

  return (
    <QuestionLayout
      question="Do you have dyslexia?"
      onYes={handleYes}
      onNo={handleNo}
    />
  )
}
