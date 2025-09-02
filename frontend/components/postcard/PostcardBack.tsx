"use client"

import { motion } from "framer-motion"
import { ChangeEvent } from "react"

export interface PostcardBackProps {
  note: string
  onNoteChange: (value: string) => void
  mood: string
  onMoodChange: (value: string) => void
  location: string
  onLocationChange: (value: string) => void
  isReadOnly?: boolean
}

// Replace emojis with dog images
const moodOptions = [
  { name: "Happy Dog", src: "/assets/dog-happy.png" },
  { name: "Sleepy Dog", src: "/assets/dog-sleepy.png" },
  { name: "Excited Dog", src: "/assets/dog-excited.png" },
  { name: "Shy Dog", src: "/assets/dog-shy.png" },
  { name: "Curious Dog", src: "/assets/dog-curious.png" },
  { name: "Cool Dog", src: "/assets/dog-cool.png" },
]

export function PostcardBack({
  note,
  onNoteChange,
  mood,
  onMoodChange,
  location,
  onLocationChange,
  isReadOnly = false,
}: PostcardBackProps) {
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => onNoteChange(e.target.value)
  const handleLoc = (e: ChangeEvent<HTMLInputElement>) => onLocationChange(e.target.value)

  const selectedMood = moodOptions.find((m) => m.name === mood)

  return (
    <motion.div
      className="relative w-full aspect-[3/2] overflow-hidden rounded-xl bg-card lined-paper sparkle-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Lined paper background */}
      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 23px,
                rgba(0,0,0,0.1) 24px,
                rgba(0,0,0,0.1) 25px
              )
            `,
            backgroundSize: "100% 25px",
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      </div>

      <div className="absolute inset-0 p-4 flex flex-col gap-3">
        {/* Top-right dog stamp */}
        {selectedMood && (
          <div className="absolute top-4 right-4 stamp lines-animate w-10 h-10 flex items-center justify-center">
            <img src={selectedMood.src} alt={selectedMood.name} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Writing area */}
        <motion.textarea
          value={note}
          onChange={handleText}
          placeholder="Write your message here..."
          className="flex-1 bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 text-base leading-6 font-caveat"
          style={{ lineHeight: "25px", paddingTop: "2px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          readOnly={isReadOnly}
          disabled={isReadOnly}
        />

        {/* Bottom controls */}
        {!isReadOnly && (
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className="flex gap-2 overflow-x-auto py-1">
              {moodOptions.map((m) => (
                <button
                  key={m.name}
                  onClick={() => onMoodChange(m.name)}
                  className={`flex-none w-16 h-16 rounded-md border transition-colors ${
                    mood === m.name ? "border-primary" : "border-transparent"
                  } hover:border-primary flex items-center justify-center`}
                  aria-label={m.name}
                >
                  <img src={m.src} alt={m.name} className="w-12 h-12 object-contain" />
                </button>
              ))}
            </div>
            <input
              type="text"
              value={location}
              onChange={handleLoc}
              placeholder="Location (optional)"
              className="min-w-[40%] bg-transparent border border-border rounded-md px-3 py-1 text-sm font-caveat"
            />
          </div>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}
      />
    </motion.div>
  )
}
