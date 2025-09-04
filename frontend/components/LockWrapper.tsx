// components/LockWrapper.tsx
"use client"
import React from "react"

interface LockWrapperProps {
  children: React.ReactNode
  isLocked: boolean
}

export const LockWrapper = ({ children, isLocked }: LockWrapperProps) => {
  if (!isLocked) {
    return <>{children}</>
  }

  return (
    <div className="relative border-4 border-yellow-500 rounded-xl p-4 shadow-lg bg-gray-50/90">
      {/* Game Content - Dimmed when locked */}
      <div className="relative z-0 opacity-40 pointer-events-none">
        {children}
      </div>

      {/* Chain Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
          {/* Gradients */}
          <defs>
            <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            <radialGradient id="lockGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </radialGradient>
          </defs>

          {/* Chain Links - Top-Left to Bottom-Right */}
          <g stroke="url(#chainGradient)" strokeWidth="8" fill="none">
            {/* Main chain line */}
            <line x1="0" y1="0" x2="400" y2="300" strokeWidth="12"/>
            
            {/* Individual chain links */}
            <ellipse cx="50" cy="37.5" rx="20" ry="12" strokeWidth="6" transform="rotate(45 50 37.5)"/>
            <ellipse cx="100" cy="75" rx="20" ry="12" strokeWidth="6" transform="rotate(45 100 75)"/>
            <ellipse cx="150" cy="112.5" rx="20" ry="12" strokeWidth="6" transform="rotate(45 150 112.5)"/>
            <ellipse cx="200" cy="150" rx="20" ry="12" strokeWidth="6" transform="rotate(45 200 150)"/>
            <ellipse cx="250" cy="187.5" rx="20" ry="12" strokeWidth="6" transform="rotate(45 250 187.5)"/>
            <ellipse cx="300" cy="225" rx="20" ry="12" strokeWidth="6" transform="rotate(45 300 225)"/>
            <ellipse cx="350" cy="262.5" rx="20" ry="12" strokeWidth="6" transform="rotate(45 350 262.5)"/>
          </g>

          {/* Chain Links - Bottom-Left to Top-Right */}
          <g stroke="url(#chainGradient)" strokeWidth="8" fill="none">
            {/* Main chain line */}
            <line x1="0" y1="300" x2="400" y2="0" strokeWidth="12"/>
            
            {/* Individual chain links */}
            <ellipse cx="50" cy="262.5" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 50 262.5)"/>
            <ellipse cx="100" cy="225" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 100 225)"/>
            <ellipse cx="150" cy="187.5" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 150 187.5)"/>
            <ellipse cx="200" cy="150" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 200 150)"/>
            <ellipse cx="250" cy="112.5" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 250 112.5)"/>
            <ellipse cx="300" cy="75" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 300 75)"/>
            <ellipse cx="350" cy="37.5" rx="20" ry="12" strokeWidth="6" transform="rotate(-45 350 37.5)"/>
          </g>
        </svg>
      </div>

      {/* Central Padlock */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <svg width="80" height="100" viewBox="0 0 80 100">
          <defs>
            <radialGradient id="lockBodyGradient" cx="40%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#B8860B" />
            </radialGradient>
          </defs>
          
          {/* Lock Body */}
          <rect 
            x="20" 
            y="35" 
            width="40" 
            height="50" 
            rx="8" 
            ry="8" 
            fill="url(#lockBodyGradient)" 
            stroke="black" 
            strokeWidth="3"
          />
          
          {/* Lock Shackle */}
          <path 
            d="M30 35 Q40 15 50 35" 
            stroke="url(#lockBodyGradient)" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Keyhole */}
          <circle cx="40" cy="55" r="6" fill="black"/>
          <rect x="37" y="61" width="6" height="12" fill="black" rx="3"/>
          
          {/* Lock highlight */}
          <ellipse cx="32" cy="45" rx="6" ry="12" fill="rgba(255,255,255,0.4)"/>
        </svg>
      </div>

      {/* Lock Status Text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-yellow-100 border-2 border-yellow-500 rounded-full px-4 py-2 shadow-lg">
          <span className="text-yellow-800 font-bold text-sm">🔒 LOCKED</span>
        </div>
      </div>
    </div>
  )
}
