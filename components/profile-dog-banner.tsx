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
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20 shadow-lg animate-pulse-slow">
        <div className="flex items-center gap-6">
          
          {/* Dog Image with animations */}
          <div className="relative flex-shrink-0 animate-float">
            {!imageError ? (
              <div className="relative">
                <Image
                  src="/assets/profile-dog-smile.png"
                  alt="Your WellPal Buddy"
                  width={120}
                  height={120}
                  className="drop-shadow-lg transition-transform duration-300 hover:scale-105"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-[120px] h-[120px] flex items-center justify-center drop-shadow-lg animate-bounce-gentle">
                <span className="text-8xl animate-wiggle">🐕</span>
              </div>
            )}
          </div>

          {/* Speech Bubble with animations */}
          <div className="relative bg-card rounded-2xl p-4 shadow-lg border-2 border-primary/30 flex-1 max-w-[200px] animate-bob">
            {/* Speech bubble tail - theme responsive with animation */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 animate-wiggle-slow">
              {/* Primary color outline triangle */}
              <div className="w-0 h-0 border-t-[16px] border-b-[16px] border-r-[16px] border-t-transparent border-b-transparent border-r-primary/30"></div>
            </div>
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 animate-wiggle-slow">
              {/* Card background inside triangle */}
              <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-r-[14px] border-t-transparent border-b-transparent border-r-card"></div>
            </div>
            
            <p className="text-sm text-card-foreground leading-relaxed animate-fade-in">
              {randomMessage}
            </p>
          </div>

        </div>
      </Card>
    </div>
  )
}
