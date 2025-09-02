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

const moodOptions = ["🙂","😊","😌","🥲","😔","😤","😴","🤗","🤍"]

export function PostcardBack({ note, onNoteChange, mood, onMoodChange, location, onLocationChange, isReadOnly = false }: PostcardBackProps) {
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => onNoteChange(e.target.value)
  const handleLoc = (e: ChangeEvent<HTMLInputElement>) => onLocationChange(e.target.value)

  return (
    <motion.div
      className="relative w-full aspect-[3/2] overflow-hidden bg-card sparkle-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Lined Paper Background */}
      <div className="absolute inset-0 bg-white">
        {/* Horizontal lines for writing */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 23px,
              rgba(0, 0, 0, 0.1) 24px,
              rgba(0, 0, 0, 0.1) 25px
            )
          `,
          backgroundSize: '100% 25px'
        }} />
        
        {/* Left margin line */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      </div>

      <div className="absolute inset-0 p-4 flex flex-col gap-3">
        {/* Stamp Section - Top Right */}
        <div className="absolute top-4 right-4 stamp-enhanced lines-animate select-none">
          {mood}
        </div>
        
        {/* Writing Area - Avoids stamp section */}
        <div className="flex-1 mt-8 mr-20">
          <motion.textarea
            value={note}
            onChange={handleText}
            placeholder="Write your message here..."
            className="w-full h-full bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 text-base leading-6 font-caveat"
            style={{ 
              lineHeight: '25px',
              paddingTop: '2px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            readOnly={isReadOnly}
            disabled={isReadOnly}
          />
        </div>

        {/* Bottom Controls - Only show when not read-only */}
        {!isReadOnly && (
          <div className="flex items-center justify-between gap-3 mt-auto">
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
              className="min-w-[40%] bg-transparent border border-border rounded-md px-3 py-1 text-sm font-caveat"
            />
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }} />
    </motion.div>
  )
}


