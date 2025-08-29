"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export interface PostcardFlipProps {
  isFlipped: boolean
  onToggle: () => void
  front: ReactNode
  back: ReactNode
}

export function PostcardFlip({ isFlipped, onToggle, front, back }: PostcardFlipProps) {
  return (
    <div className="relative w-full" onClick={onToggle} aria-label="Flip postcard">
      <div className="[perspective:1200px]">
        <motion.div
          className="relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="[backface-visibility:hidden]">
            {front}
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {back}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
