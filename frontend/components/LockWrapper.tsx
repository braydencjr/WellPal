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

      {/* Enhanced Chain Overlay - Using user's detailed chain design */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          {/* Background */}
          <rect width="100%" height="100%" fill="transparent"/>
          
          {/* Chain Group */}
          <defs>
            {/* Gradient for chain links */}
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD54F"/>
              <stop offset="100%" stopColor="#FFA000"/>
            </linearGradient>
            
            {/* Single chain link shape */}
            <symbol id="chainLink" viewBox="0 0 100 40">
              <rect x="2" y="2" width="96" height="36" rx="10" fill="url(#linkGrad)" stroke="#B8860B" strokeWidth="2"/>
            </symbol>
            
            {/* Padlock Gradients */}
            <linearGradient id="padGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD740"/>
              <stop offset="100%" stopColor="#FF8F00"/>
            </linearGradient>
          </defs>
          
          {/* Draw two diagonal chains by repeating links */}
          {/* Top-left to bottom-right */}
          <g id="chainTLBR" stroke="none" fill="none">
            <use href="#chainLink" x="10" y="10"/>
            <use href="#chainLink" x="60" y="60" transform="rotate(45 110 90)"/>
            <use href="#chainLink" x="110" y="110" transform="rotate(45 160 140)"/>
            <use href="#chainLink" x="160" y="160" transform="rotate(45 210 190)"/>
            <use href="#chainLink" x="210" y="210" transform="rotate(45 260 240)"/>
          </g>
          
          {/* Bottom-left to top-right */}
          <g id="chainBLTR" stroke="none" fill="none">
            <use href="#chainLink" x="10" y="260" transform="rotate(-45 60 280)"/>
            <use href="#chainLink" x="60" y="210" transform="rotate(-45 110 230)"/>
            <use href="#chainLink" x="110" y="160" transform="rotate(-45 160 180)"/>
            <use href="#chainLink" x="160" y="110" transform="rotate(-45 210 130)"/>
            <use href="#chainLink" x="210" y="60" transform="rotate(-45 260 80)"/>
          </g>
          
          {/* Padlock Body */}
          <rect x="110" y="115" width="80" height="90" rx="15" fill="url(#padGrad)" stroke="#B8860B" strokeWidth="3"/>
          
          {/* Shackle */}
          <path d="M130 115 A30 30 0 0 1 230 115 L230 135 A10 10 0 0 0 120 135 Z" fill="none" stroke="#FFB300" strokeWidth="8"/>
          
          {/* Keyhole */}
          <rect x="148" y="155" width="10" height="25" rx="5" fill="#333"/>
          <circle cx="153" cy="155" r="5" fill="#333"/>
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
