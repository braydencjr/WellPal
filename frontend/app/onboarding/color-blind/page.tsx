"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { QuestionLayout } from "@/components/onboarding/QuestionLayout"
import { loadConditions, saveConditions } from "@/lib/user-condition"

export default function ColorBlindTypePage() {
  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState<"red" | "green" | "blue" | "">("")
  const [selectedSeverity, setSelectedSeverity] = useState<"weak" | "blind" | "">("")

  const colors: ("red" | "green" | "blue")[] = ["red", "green", "blue"]
  const severities: ("weak" | "blind")[] = ["weak", "blind"]

  const handleNext = () => {
    if (!selectedColor || !selectedSeverity) return
    const conditions = loadConditions()

    conditions.colorBlindType = selectedColor
    conditions.colorBlindSeverity = selectedSeverity

    saveConditions(conditions)
    document.documentElement.setAttribute(
      "data-colorblind",
      `${selectedColor}-${selectedSeverity}`
    )

    router.push("/onboarding/dyslexia")
  }

  return (
    <QuestionLayout
      question="Which type of color blindness do you have?"
      onYes={handleNext}
      onNo={() => router.push("/onboarding/dyslexia")}
    >
      <div className="mt-4 space-y-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-full p-3 rounded-lg border transition-colors duration-200 text-left ${
              selectedColor === color ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
            onClick={() => {
              setSelectedColor(color)
              setSelectedSeverity("") // reset severity when changing color
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}

        {selectedColor && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {severities.map((sev) => (
              <button
                key={sev}
                className={`p-2 rounded-lg border w-full text-center ${
                  selectedSeverity === sev ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedSeverity(sev)}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </QuestionLayout>
  )
}
