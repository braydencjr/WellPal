"use client"

import { useEffect, useState } from "react"
import { useStreak } from "./use-streak"

export function useUnlocks() {
  const { streak } = useStreak()
  const [unlocks, setUnlocks] = useState<number[]>([])

  useEffect(() => {
    // Whenever streak changes, update unlocks
    setUnlocks(streak.unlockedGames)
  }, [streak])

  return {
    unlocks, // list of unlocked games
    currentStreak: streak.currentStreak, // current streak
  }
}

