"use client"

import { useRouter } from "next/navigation"
import { DogPal } from "@/components/DogPal-animation"
import { ChatBubble } from "@/components/chat-bubble"

interface DogChatReminderProps {
  onClose: () => void
}

export function DogChatReminder({ onClose }: DogChatReminderProps) {
  const router = useRouter()

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

            {/* Later -> just hide modal for testing or real use */}
            <button
              onClick={() => {
                router.push("/dashboard") // optional if you want to stay on the same page, just call onClose()
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
