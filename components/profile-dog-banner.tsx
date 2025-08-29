"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function ProfileDogBanner() {
  const [imageError, setImageError] = useState(false)

  const speechBubbleMessages = [
    "Woof! This is your special place to make your profile pawsome! 🐾",
    "Hey friend! Ready to customize your profile? I'm here to help! 💫",
    "Tail-wagging time! Let's make your profile as amazing as you are! ✨",
    "Psst... this is where the magic happens! Edit away, buddy! 🌟"
  ]

  const randomMessage = speechBubbleMessages[Math.floor(Math.random() * speechBubbleMessages.length)]

  return (
    <div className="relative mb-6">
      {/* Main Card with cute background - responsive to theme */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20 shadow-lg">
        <div className="flex items-center gap-6">
          
          {/* Dog Image - made smaller for better text layout */}
          <div className="relative flex-shrink-0">
            {!imageError ? (
              <Image
                src="/assets/Profile dog.png"
                alt="Your WellPal Buddy"
                width={120}
                height={120}
                className="drop-shadow-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-[120px] h-[120px] flex items-center justify-center drop-shadow-lg">
                <span className="text-8xl">🐕</span>
              </div>
            )}
          </div>

          {/* Speech Bubble - responsive colors */}
          <div className="relative bg-card rounded-2xl p-4 shadow-lg border-2 border-primary/30 flex-1 max-w-[200px]">
            {/* Speech bubble tail - theme responsive */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              {/* Primary color outline triangle */}
              <div className="w-0 h-0 border-t-[16px] border-b-[16px] border-r-[16px] border-t-transparent border-b-transparent border-r-primary/30"></div>
            </div>
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              {/* Card background inside triangle */}
              <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-r-[14px] border-t-transparent border-b-transparent border-r-card"></div>
            </div>
            
            <p className="text-sm text-card-foreground leading-relaxed">
              {randomMessage}
            </p>
          </div>

        </div>
      </Card>
    </div>
  )
}
