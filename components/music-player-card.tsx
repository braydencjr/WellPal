"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Music, SkipBack, Play, Pause, SkipForward } from "lucide-react"

export function MusicPlayerCard() {
  const song = {
    title: "Sunset Lover",
    artist: "Petit Biscuit",
  }

  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="flex flex-row items-center justify-between p-3 w-72 h-14 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Album / Music Icon */}
      <div className="w-10 h-10 bg-primary/10 text-primary rounded-md flex items-center justify-center flex-shrink-0">
        <Music className="w-5 h-5" />
      </div>

      {/* Song Info */}
      <div className="flex-1 mx-3 flex flex-col justify-center min-w-0">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {song.title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {song.artist}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors">
          <SkipBack className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <Play className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        <button className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors">
          <SkipForward className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </Card>
  )
}