"use client"

import { useState } from "react"
import Image from "next/image"

export function ProfileDogBanner() {
  const [imageError, setImageError] = useState(false)

  const speechBubbleMessages = [
    "Woof! This is your special place to make your profile pawsome! 🐾",
    "Tail-wagging time! Let's make your profile as amazing as you are! ✨",
    "Psst... this is where the magic happens! Edit away, buddy! 🌟"
  ]

  const randomMessage = speechBubbleMessages[Math.floor(Math.random() * speechBubbleMessages.length)]

  return (
    <div className="relative mb-6 flex flex-col items-center">
      {/* Speech Bubble on top with animations */}
      <div className="relative bg-card rounded-2xl p-4 shadow-lg border-2 border-primary/30 max-w-[280px] mb-4 animate-bob">
        {/* Speech bubble tail pointing down */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-wiggle-slow">
          {/* Primary color outline triangle */}
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary/30"></div>
        </div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 animate-wiggle-slow">
          {/* Card background inside triangle */}
          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-l-transparent border-r-transparent border-t-card"></div>
        </div>
        
        <p className="text-sm text-card-foreground leading-relaxed animate-fade-in text-center">
          {randomMessage}
        </p>
      </div>

      {/* Larger Dog Image at the bottom with animations */}
      <div className="relative flex-shrink-0 animate-float">
        {!imageError ? (
          <div className="relative">
            <Image
              src="/assets/2d-profile-dog.png"
              alt="Your WellPal Buddy"
              width={160}
              height={160}
              className="drop-shadow-lg transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-[160px] h-[160px] flex items-center justify-center drop-shadow-lg animate-bounce-gentle">
            <span className="text-8xl animate-wiggle">🐕</span>
          </div>
        )}
      </div>
    </div>
  )
}
