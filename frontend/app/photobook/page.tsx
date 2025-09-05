"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { loadPhotobook, PostcardEntry, deletePostcard } from "@/lib/photobook-store"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PostcardFront } from "@/components/postcard/PostcardFront"
import { motion, AnimatePresence } from "framer-motion"
import { PostcardBack } from "@/components/postcard/PostcardBack"
import { Button } from "@/components/ui/button"
import { X, Trash2 } from "lucide-react"

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
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null) // YYYY-MM

  useEffect(() => {
    setEntries(loadPhotobook())
  }, [])

  // Handle deleting a postcard
  const handleDeletePostcard = (postcardId: string) => {
    deletePostcard(postcardId)
    setEntries(loadPhotobook()) // Reload the photobook
    setActive(null) // Close the modal
  }

  // Group postcards by month/year
  const months = useMemo(() => {
    const groups: Record<string, PostcardEntry[]> = {}
    entries.forEach((entry) => {
      const month = new Date(entry.dateISO).toISOString().slice(0, 7) // YYYY-MM
      if (!groups[month]) groups[month] = []
      groups[month].push(entry)
    })
    // Sort months descending
    return Object.keys(groups)
      .sort((a, b) => (a < b ? 1 : -1))
      .map((month) => ({ month, entries: groups[month] }))
  }, [entries])

  const displayEntries = useMemo(() => {
    if (!selectedMonth) return []
    const monthGroup = months.find((m) => m.month === selectedMonth)
    return monthGroup?.entries || []
  }, [selectedMonth, months])

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

        {/* Month folders */}
{!selectedMonth && (
  <div className="grid grid-cols-2 gap-4 mb-4">
    {months.map(({ month, entries: monthEntries }) => {
      const dateObj = new Date(month + "-01")
      const monthLabel = dateObj.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })

      const cover = monthEntries[0]?.imageDataUrl // most recent postcard in this month

      return (
        <button
          key={month}
          onClick={() => setSelectedMonth(month)}
          className="p-2 rounded-lg bg-card border border-border hover:shadow-md flex flex-col items-start"
        >
          {cover && (
            <img
              src={cover}
              alt={`Cover for ${monthLabel}`}
              className="w-full h-24 object-cover rounded-md mb-2"
            />
          )}
          <span className="font-medium">{monthLabel}</span>
          <span className="text-xs text-muted-foreground">
            {monthEntries.length} postcard{monthEntries.length > 1 ? "s" : ""}
          </span>
        </button>
      )
    })}
  </div>
)}

        {/* Display postcards for selected month */}
        {selectedMonth && (
          <div className="flex flex-col flex-1 overflow-y-auto">
            <button
              onClick={() => setSelectedMonth(null)}
              className="mb-2 text-sm text-primary font-medium hover:underline"
            >
              ← Back to Months
            </button>

            <div className="grid grid-cols-2 gap-2">
              {displayEntries.length === 0 ? (
                <p className="col-span-2 text-center text-muted-foreground py-12">
                  No postcards this month
                </p>
              ) : (
                displayEntries.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActive(p)
                      setIsFlipped(false)
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
          </div>
        )}

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
                
                {/* Close and Delete buttons */}
                <div className="flex gap-3 justify-center mt-4">
                  <Button
                    onClick={() => setActive(null)}
                    variant="outline"
                    className="flex-1 py-3"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                  
                  <Button
                    onClick={() => handleDeletePostcard(active.id)}
                    variant="destructive"
                    className="flex-1 py-3"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
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
