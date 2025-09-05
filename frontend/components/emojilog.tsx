// emojilog.ts
// Dog mood options with corresponding emoji
export const moodOptions = [
  { name: "Happy Dog", src: "/assets/happy.png", isPremium: false },
  { name: "Sad Dog", src: "/assets/sad.png", isPremium: false },
  { name: "Angry Dog", src: "/assets/angry.png", isPremium: false },
  { name: "Lovely Dog", src: "/assets/lovely.png", isPremium: true },
  { name: "Cool Dog", src: "/assets/cool.png", isPremium: true },
  { name: "Shock Dog", src: "/assets/shock.png", isPremium: true },
]

export const premiumMoodOptions = [
  { name: "Lovely Dog", src: "/assets/lovely.png" },
  { name: "Cool Dog", src: "/assets/cool.png" },
  { name: "Shock Dog", src: "/assets/shock.png" },
  { name: "Just Chill Dog", src: "/assets/justchill.png" },
  { name: "Crying Hard Dog", src: "/assets/cryinghard.png" },
  { name: "Phew Dog", src: "/assets/phew.png" },
  { name: "Boring Dog", src: "/assets/boring.png" },
  { name: "Tired Dog", src: "/assets/tired.png" },
  { name: "Scared Dog", src: "/assets/scared.png" },
]

// emojilog.ts
export function getMostFrequentMoodEmoji(date: string) {
  if (typeof window === "undefined") return ""  // ❌ SSR guard

  const moodCounter: Record<string, string[]> = JSON.parse(
    localStorage.getItem("wellpal_mood_counter") || "{}"
  )
  const moods = moodCounter[date] || []
  if (!moods.length) return ""

  const counts: Record<string, number> = {}
  moods.forEach(m => counts[m] = (counts[m] || 0) + 1)

  let maxCount = 0
  let frequentMood = moods[moods.length - 1] // fallback: most recent
  for (const m in counts) {
    if (counts[m] > maxCount) {
      maxCount = counts[m]
      frequentMood = m
    } else if (counts[m] === maxCount) {
      frequentMood = moods.lastIndexOf(m) > moods.lastIndexOf(frequentMood) ? m : frequentMood
    }
  }

  const moodObj = moodOptions.find(m => m.name === frequentMood)
  return moodObj?.src || ""
}
