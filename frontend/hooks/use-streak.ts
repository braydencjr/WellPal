"use client"

import { useState, useEffect } from "react"

const STREAK_KEY = "wellpal_streak_v1"

type StreakData = {
  currentStreak: number
  lastDate: string | null
  unlockedGames: number[]
}

function loadStreak(): StreakData {
  if (typeof window === "undefined") return { currentStreak: 0, lastDate: null, unlockedGames: [] }
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    return raw ? JSON.parse(raw) as StreakData : { currentStreak: 0, lastDate: null, unlockedGames: [] }
  } catch {
    return { currentStreak: 0, lastDate: null, unlockedGames: [] }
  }
}

function saveStreak(data: StreakData) {
  if (typeof window === "undefined") return
  localStorage.setItem(STREAK_KEY, JSON.stringify(data))
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(loadStreak())

  useEffect(() => {
    saveStreak(streak)
  }, [streak])

  function updateStreak() {
    const today = new Date().toDateString()
    if (streak.lastDate === today) return // already counted today

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    let newStreak = streak.currentStreak
    if (streak.lastDate === yesterday.toDateString()) {
      newStreak += 1
    } else {
      newStreak = 1
    }

    const newUnlocked = [...streak.unlockedGames]
    if (newStreak === 3 && !newUnlocked.includes(2)) newUnlocked.push(2)
    if (newStreak === 7 && !newUnlocked.includes(3)) newUnlocked.push(3)

    const updated = { currentStreak: newStreak, lastDate: today, unlockedGames: newUnlocked }
    setStreak(updated)
    saveStreak(updated)
  }

  return { streak, updateStreak }
}
