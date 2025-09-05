"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DogPal } from "@/components/DogPal-animation"
import { ChatBubble } from "@/components/chat-bubble"
import { loadPhotobook, PostcardEntry } from "@/lib/photobook-store"

interface DogChatReminderProps {
  onClose: () => void
}

export function DogChatReminder({ onClose }: DogChatReminderProps) {
  const router = useRouter()
  const [showReminder, setShowReminder] = useState(false)

  useEffect(() => {
    const entries: PostcardEntry[] = loadPhotobook()

    // Get today's date string in YYYY-MM-DD
    const today = new Date()
    const todayStr = today.toISOString().slice(0, 10)

    // Check if there’s already a postcard for today
    const hasToday = entries.some(entry => entry.dateISO.slice(0, 10) === todayStr)

    if (!hasToday) {
      setShowReminder(true)
    }
  }, [])

  if (!showReminder) return null

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative">
        <ChatBubble message="Hey! You haven’t created your postcard for today! 🐶">
          <div className="flex gap-2 mt-3">
            {/* Create Now -> navigate and hide modal */}
            <button
              onClick={() => {
                router.push("/memories")
                onClose()
              }}
              className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg"
            >
              Create Now
            </button>

            {/* Later -> just hide modal */}
            <button
              onClick={() => {
                onClose()
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Later
            </button>
          </div>
        </ChatBubble>

        {/* Dog at the triangle */}
        <div className="absolute -bottom-10 -left-12">
          <DogPal />
        </div>
      </div>
    </div>
  )
}
