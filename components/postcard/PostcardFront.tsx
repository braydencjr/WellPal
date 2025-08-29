"use client"

import { motion } from "framer-motion"

export interface PostcardFrontProps {
  imageUrl: string
  mood?: string
  location?: string
}

export function PostcardFront({ imageUrl, mood, location }: PostcardFrontProps) {
  return (
    <motion.div
      className="relative w-full aspect-[3/2] overflow-hidden sparkle-shadow bg-muted"
      initial={{ opacity: 0, y: 10, borderRadius: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, borderRadius: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <img
        src={imageUrl}
        alt="Postcard"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.div
        className="absolute inset-0 postcard-frame"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="absolute inset-0 scan-shimmer" />
      </motion.div>
      {location ? (
        <div className="absolute bottom-2 right-3 text-base text-foreground/90 font-handwrite drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          {location}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }} />
    </motion.div>
  )
}
