"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { PostcardBack } from "./postcard/PostcardBack"
import { PostcardFront } from "./postcard/PostcardFront"
import { PostcardFlip } from "./postcard/PostcardFlip"

export function PostCardList({ selectedDate }: { selectedDate: string }) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  const allPostcards: PostcardEntry[] = useMemo(() => loadPhotobook(), [])

  const selectedPostcards = useMemo(
    () =>
      allPostcards.filter(
        (p) => p.dateISO.split("T")[0] === selectedDate
      ),
    [allPostcards, selectedDate]
  )

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-sm p-2 shadow-lg rounded-2xl inline-block">
  <CardHeader className="p-2 pb-0">
    <CardTitle className="text-base">
      {selectedDate === new Date().toISOString().split("T")[0]
        ? "Today's Postcards"
        : `Postcards on ${selectedDate}`}
    </CardTitle>
  </CardHeader>

  <CardContent className="flex gap-4 overflow-x-auto py-2">
    {selectedPostcards.length === 0 && (
      <p className="text-gray-500 text-center w-full">
        No postcards for this day.
      </p>
    )}

    {selectedPostcards.map((p, i) => (
      <div
  key={p.id}
  className="w-70 aspect-[3/2] flex-shrink-0 cursor-pointer" // 🔥 match postcard back
>
  <PostcardFlip
    isFlipped={flippedIndex === i}
    onToggle={() => setFlippedIndex(flippedIndex === i ? null : i)}
    front={
      <PostcardFront
        imageUrl={p.imageDataUrl}
        location={p.location}
        mood={p.mood}
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
