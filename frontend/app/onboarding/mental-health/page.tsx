"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"
import { useOnboarding } from "@/contexts/onboarding-context"

export default function MentalHealthPage() {
  const router = useRouter()
  const { updateMentalHealth } = useOnboarding()
  const [selected, setSelected] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [otherText, setOtherText] = useState("")

  const handleYes = () => {
    if (!showOptions) {
      // First Yes → show the select
      setShowOptions(true)
    } else {
      // Second Yes → submit answer & navigate
      const conditions = []
      if (selected === "other" && otherText) {
        conditions.push(otherText)
      } else if (selected) {
        conditions.push(selected)
      }
      
      updateMentalHealth({
        hasMentalHealth: true,
        conditions: conditions
      })
      
      router.push("/onboarding/dyslexia")
    }
  }

  const handleNo = () => {
    updateMentalHealth({
      hasMentalHealth: false,
      conditions: []
    })
    router.push("/onboarding/dyslexia")
  }

  return (
    <QuestionLayout
      question="Do you have any mental health issues?"
      onYes={handleYes}
      onNo={handleNo}
    >
      {showOptions && (
        <div className="mt-4 space-y-3">
          <select
            className="p-2 border rounded-lg w-full"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="anxiety">Anxiety</option>
            <option value="depression">Depression</option>
            <option value="ocd">OCD</option>
            <option value="adhd">ADHD</option>
            <option value="other">Other</option>
          </select>

          {selected === "other" && (
            <input
              type="text"
              className="p-2 border rounded-lg w-full"
              placeholder="Please specify"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
        </div>
      )}
    </QuestionLayout>
  )
}
