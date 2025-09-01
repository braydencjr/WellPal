"use client"

import { useEffect, useMemo, useState } from "react"
import { loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PostcardFront } from "@/components/postcard/PostcardFront"
import { motion, AnimatePresence } from "framer-motion"

export default function PhotobookPage() {
  const [entries, setEntries] = useState<PostcardEntry[]>([])
  const [active, setActive] = useState<PostcardEntry | null>(null)

  useEffect(() => {
    setEntries(loadPhotobook())
  }, [])

  const grid = useMemo(() => entries, [entries])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card px-6 pt-8 pb-24">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-1">Photobook</h1>
        <p className="text-muted-foreground mb-4">Your collected postcards</p>

        {/* Photobook grid */}
        <div className="grid grid-cols-2 gap-3">
          {grid.length === 0 ? (
            <p className="col-span-2 text-center text-muted-foreground py-12">
              No postcards yet
            </p>
          ) : (
            grid.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="block rounded-lg overflow-hidden shadow-md"
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
                className="w-full max-w-sm bg-card rounded-xl p-4 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <PostcardFront
                  imageUrl={active.imageDataUrl}
                  mood={active.mood}
                  location={active.location}
                />
                <div className="rounded-xl p-4 bg-muted">
                  <div className="text-sm text-muted-foreground mb-2">Back</div>
                  <div className="whitespace-pre-wrap leading-7">
                    {active.note || "(No note)"}
                  </div>
                  {active.location && (
                    <div className="mt-2 text-right text-sm font-handwrite">
                      {active.location}
                    </div>
                  )}
                </div>
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
