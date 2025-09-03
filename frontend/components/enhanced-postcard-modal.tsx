"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RotatablePostcard } from "@/components/rotatable-postcard"

interface EnhancedPostcardModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (note: string, mood: string, location: string) => void
  imageUrl: string
}

export function EnhancedPostcardModal({ isOpen, onClose, onSave, imageUrl }: EnhancedPostcardModalProps) {
  const [note, setNote] = useState("")
  const [mood, setMood] = useState("")
  const [location, setLocation] = useState("")
  const [isBackVisible, setIsBackVisible] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [showArrowHint, setShowArrowHint] = useState(true)

  // Reset fields whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setNote("")
      setMood("")
      setLocation("")
      setIsBackVisible(false)
      setShowArrowHint(true)
    }
  }, [isOpen])

  // Hide arrow hint after 3 seconds
  useEffect(() => {
    if (isOpen && showArrowHint) {
      const timer = setTimeout(() => setShowArrowHint(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, showArrowHint])

  const handleSideChange = (side: 'front' | 'back') => {
    setIsBackVisible(side === 'back')
  }

  const handleSave = () => {
  // 1️⃣ Call parent save function
  onSave(note, mood, location)

  // 2️⃣ Update localStorage for calendar emojis
  if (mood) {
    const now = new Date()
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

    const moodCounter: Record<string, string[]> = JSON.parse(
      localStorage.getItem("wellpal_mood_counter") || "{}"
    )

    if (!moodCounter[todayStr]) moodCounter[todayStr] = []
    moodCounter[todayStr].push(mood)

    localStorage.setItem("wellpal_mood_counter", JSON.stringify(moodCounter))
  }

  // 3️⃣ Close modal
  onClose()
}


  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-transparent"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Postcard Container */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[3/2] mb-6"
              style={{ perspective: "1200px" }}
            >
              {/* Floating Arrow Hint */}
              <AnimatePresence>
                {showArrowHint && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-2 text-sm shadow-lg">
                      
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rotatable Postcard */}
              <RotatablePostcard
                imageUrl={imageUrl}
                mood={mood}
                location={location}
                note={note}
                onNoteChange={setNote}
                onMoodChange={setMood}
                onLocationChange={setLocation}
                onSideChange={handleSideChange}
              />
            </div>

            {/* Control Buttons - Only show on back side */}
            <AnimatePresence>
              {isBackVisible && (
                <motion.div
                  className="flex gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 py-3"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 py-3 bg-primary hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
