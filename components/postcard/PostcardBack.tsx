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
}

const moodOptions = ["🙂","😊","😌","🥲","😔","😤","😴","🤗","🤍"]

export function PostcardBack({ note, onNoteChange, mood, onMoodChange, location, onLocationChange }: PostcardBackProps) {
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => onNoteChange(e.target.value)
  const handleLoc = (e: ChangeEvent<HTMLInputElement>) => onLocationChange(e.target.value)

  return (
    <motion.div
      className="relative w-full aspect-[3/2] overflow-hidden rounded-xl bg-card lined-paper sparkle-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 p-4 flex flex-col gap-3">
        <div className="absolute top-4 right-4 stamp lines-animate flex items-center justify-center text-xl select-none">
          {mood}
        </div>
        <motion.textarea
          value={note}
          onChange={handleText}
          placeholder="Write a short message or reflection..."
          className="flex-1 bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 text-base leading-7 font-handwrite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {moodOptions.map((m) => (
              <button
                key={m}
                onClick={() => onMoodChange(m)}
                className={`text-xl px-2 py-1 rounded-md transition-colors ${mood === m ? "bg-secondary" : "hover:bg-muted"}`}
                aria-label={`Select mood ${m}`}
              >
                {m}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={location}
            onChange={handleLoc}
            placeholder="Location (optional)"
            className="min-w-[40%] bg-transparent border border-border rounded-md px-3 py-1 text-sm font-handwrite"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }} />
    </motion.div>
  )
}


