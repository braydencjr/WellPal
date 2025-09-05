"use client"

import { motion } from "framer-motion"
import { ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export interface PostcardBackProps {
  note: string
  onNoteChange: (value: string) => void
  mood: string
  onMoodChange: (value: string) => void
  location: string
  onLocationChange: (value: string) => void
  isReadOnly?: boolean
  onSave?: () => void
  
}

// Replace emojis with dog images - now with premium status
const moodOptions = [
  { name: "Happy Dog", src: "/assets/happy.png", isPremium: false },
  { name: "Sad Dog", src: "/assets/sad.png", isPremium: false },
  { name: "Angry Dog", src: "/assets/angry.png", isPremium: false },
  { name: "Lovely Dog", src: "/assets/lovely.png", isPremium: true },
  { name: "Cool Dog", src: "/assets/cool.png", isPremium: true },
  { name: "Shock Dog", src: "/assets/shock.png", isPremium: true },
]

export function PostcardBack({
  note,
  onNoteChange,
  mood,
  onMoodChange,
  onLocationChange,
  isReadOnly = false,
  onSave,
}: PostcardBackProps) {
  const router = useRouter()
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => onNoteChange(e.target.value)
  const handleLoc = (e: ChangeEvent<HTMLInputElement>) => onLocationChange(e.target.value)

  const selectedMood = moodOptions.find((m) => m.name === mood)

  const handleMoodClick = (moodOption: typeof moodOptions[0]) => {
    if (moodOption.isPremium) {
      // Redirect to premium page
      router.push('/premium')
    } else {
      onMoodChange(moodOption.name)
    }
  }

  return (
    <motion.div
      className="relative w-full aspect-[3/2] overflow-hidden bg-card lined-paper sparkle-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* paper background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      </div>

      <div className="absolute inset-0 p-4 flex flex-col gap-3">
       {/* Top-right dog stamp */}
{selectedMood && (
  <div className="absolute top-4 right-4 w-15 h-15 flex items-center justify-center bg-transparent z-10">
    <img src={selectedMood.src} alt={selectedMood.name} className="w-full h-full object-contain" />
  </div>
)}

{/* Writing area */}
<div className="flex-1 flex flex-col justify-center">
  <motion.textarea
    value={note}
    onChange={handleText}
    placeholder={!isReadOnly ? "Write your message here..." : ""}
    className="w-full bg-transparent resize-none outline-none placeholder:text-muted-foreground/60 text-base leading-6 font-caveat text-center"
    style={{ lineHeight: "25px", padding: "0" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.15 }}
    readOnly={isReadOnly}
    disabled={isReadOnly}
  />
</div>

        {/* Bottom controls */}
        {!isReadOnly && (
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className="flex gap-2 overflow-x-auto py-1">
              {moodOptions.map((m) => (
                <button
                  key={m.name}
                  onClick={() => handleMoodClick(m)}
                  className={`relative flex-none w-16 h-16 rounded-md border transition-colors ${
                    mood === m.name ? "border-primary" : "border-transparent"
                  } hover:border-primary flex items-center justify-center`}
                  aria-label={m.name}
                >
                  <img src={m.src} alt={m.name} className="w-12 h-12 object-contain" />
                  {/* Lock overlay for premium moods */}
                  {m.isPremium && (
                    <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                      <Image
                        src="/assets/cartoon-lock.png"
                        alt="Premium"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
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