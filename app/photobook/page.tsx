"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PostcardFront } from "@/components/postcard/PostcardFront"
import { motion, AnimatePresence } from "framer-motion"
import { PostcardBack } from "@/components/postcard/PostcardBack"

interface PostcardFlipProps {
  isFlipped: boolean
  onToggle: () => void
  front: React.ReactNode
  back: React.ReactNode
}

function PostcardFlip({ isFlipped, onToggle, front, back }: PostcardFlipProps) {
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
          <div className="[backface-visibility:hidden]">{front}</div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {back}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PhotobookPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<PostcardEntry[]>([])
  const [active, setActive] = useState<PostcardEntry | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setEntries(loadPhotobook())
  }, [])

  const grid = useMemo(() => entries, [entries])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card px-6 pt-8 pb-24 min-h-screen flex flex-col">
        {/* Back button */}
        <button
          onClick={() => router.push("/memories")}
          className="mb-4 text-sm text-primary font-medium hover:underline"
        >
          ← Back to Memories
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-1">Photobook</h1>
        <p className="text-muted-foreground mb-4">Your collected postcards</p>

        {/* Photobook grid */}
        <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
          {grid.length === 0 ? (
            <p className="col-span-2 text-center text-muted-foreground py-12">
              No postcards yet
            </p>
          ) : (
            grid.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActive(p)
                  setIsFlipped(false) // reset flip when opening modal
                }}
                className="block"
              >
                <PostcardFront
                  imageUrl={p.imageDataUrl}
                  mood={p.mood}
                  location={p.location}
                />
              </button>
            ))
          )}
        </div>

        {/* Pop-up modal for active postcard */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                className="w-full max-w-sm bg-card rounded-xl p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <PostcardFlip
  isFlipped={isFlipped}
  onToggle={() => setIsFlipped((prev) => !prev)}
  front={
    <PostcardFront
      imageUrl={active.imageDataUrl}
      mood={active.mood}
      location={active.location}
    />
  }
  back={
    <PostcardBack
      note={active.note || ""}
      mood={active.mood}
      location={active.location || ""}
      onNoteChange={(val) => {}}
      onMoodChange={(val) => {}}
      onLocationChange={(val) => {}}
    />
  }
/>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation activeTab="memories" />
    </div>
  )
}
