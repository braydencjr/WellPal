"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const postcards = [
  { frontText: "Beach 🌊", backText: "Wish you were here! 🏖️" },
  { frontText: "Mountains ⛰️", backText: "So peaceful up here 🌲" },
  { frontText: "City 🌆", backText: "Exploring the streets 🏙️" },
  { frontText: "Cafe ☕", backText: "Coffee and vibes 💌" },
]

export function PostCardList() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  return (
    <div className="flex items-center justify-center w-full">
  <Card className="w-full h-[400px] p-6 shadow-lg rounded-2xl">
    <CardHeader>
      <CardTitle>Today's Postcards</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-6 overflow-x-auto py-4">
          {postcards.map((p, i) => (
            <div
              key={i}
              className="w-80 h-52 perspective flex-shrink-0 cursor-pointer"
              onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-500 preserve-3d"
                animate={{ rotateY: flippedIndex === i ? 180 : 0 }}
              >
                {/* Front of postcard */}
                <div className="absolute w-full h-full bg-white rounded-xl shadow-lg backface-hidden flex items-center justify-center text-xl font-bold p-4">
                  {p.frontText}
                </div>

                {/* Back of postcard */}
                <div className="absolute w-full h-full bg-white rounded-xl shadow-lg rotate-y-180 backface-hidden flex items-center justify-center text-center p-4">
                  {p.backText}
                </div>
              </motion.div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
