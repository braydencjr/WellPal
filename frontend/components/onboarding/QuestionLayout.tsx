"use client"

import { ReactNode } from "react"
import { DogPal } from "@/components/DogPal-animation"
import { ChatBubble } from "@/components/chat-bubble"

type Props = {
  question: string
  children?: ReactNode
  onYes?: () => void
  onNo?: () => void
}

export function QuestionLayout({ question, children, onYes, onNo }: Props) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative">
        <ChatBubble message={question}>
          {children && <div className="mb-3">{children}</div>}

          <div className="flex gap-2 mt-3">
            {onYes && (
              <button
                onClick={onYes}
                className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg"
              >
                Yes
              </button>
            )}
            {onNo && (
              <button
                onClick={onNo}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                No
              </button>
            )}
          </div>
        </ChatBubble>

        {/* Dog avatar positioned below */}
        <div className="absolute -bottom-10 -left-12">
          <DogPal />
        </div>
      </div>
    </div>
  )
}
