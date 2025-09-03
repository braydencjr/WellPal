"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { PostcardBack } from "./postcard/PostcardBack"
import { PostcardFlip } from "./postcard/PostcardFlip"

export function PostCardList() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  const allPostcards: PostcardEntry[] = useMemo(() => loadPhotobook(), [])

  const todaysPostcards = useMemo(
    () =>
      allPostcards.filter(
        (p) => new Date(p.dateISO).toDateString() === new Date().toDateString()
      ),
    [allPostcards]
  )

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full h-[400px] p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Today's Postcards</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-6 overflow-x-auto py-4">
          {todaysPostcards.length === 0 && (
            <p className="text-gray-500 text-center w-full">No postcards for today.</p>
          )}

          {todaysPostcards.map((p, i) => (
            <div key={p.id} className="w-80 h-52 flex-shrink-0 cursor-pointer">
              <PostcardFlip
                isFlipped={flippedIndex === i}
                onToggle={() =>
                  setFlippedIndex(flippedIndex === i ? null : i)
                }
                front={
                  <img
                    src={p.imageDataUrl}
                    alt={p.note}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                }
                back={
                  <PostcardBack
                    note={p.note}
                    mood={p.mood}
                    location={p.location || ""}
                    onNoteChange={() => {}}
                    onMoodChange={() => {}}
                    onLocationChange={() => {}}
                    isReadOnly
                  />
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
