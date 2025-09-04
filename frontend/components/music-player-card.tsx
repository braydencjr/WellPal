"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { SkipBack, Play, Pause, SkipForward } from "lucide-react"
import { motion } from "framer-motion"

export function MusicPlayerCard() {
  const song = {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "/assets/perfect.mp3", // path to your audio file
    cover: "/assets/perfect-cover.jpg", // album cover in public/assets/
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="flex flex-row items-center justify-between p-3 w-72 h-14 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Album Cover (spins when playing) */}
      <motion.div
        className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          duration: 5, // rotation speed (seconds per full spin)
        }}
      >
        <Image
          src={song.cover}
          alt={"${song.title} cover"}
          width={40}
          height={40}
          className="object-cover"
        />
      </motion.div>

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
          onClick={togglePlay}
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

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={song.src} />
    </Card>
  )
}