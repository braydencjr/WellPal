"use client"

import { useState } from "react"

export function DogPal() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={() => alert("DogPal clicked!")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="focus:outline-none relative"
    >
      <img
        src="/assets/petdog.gif"
        alt="DogPal animation"
        width={80}
        height={80}
        className="cursor-pointer transition-transform duration-200 hover:scale-110"
      />

      {isHovered && (
        <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
          AI Wellness Companion
        </div>
      )}
    </button>
  )
}
