import { useStreak } from "@/hooks/use-streak"
import { addPostcard, type PostcardEntry } from "@/lib/photobook-store"

export function usePostcardWithStreak() {
  const { updateStreak } = useStreak()

  function addPostcardAndStreak(entry: Omit<PostcardEntry, "id" | "dateISO">) {
    const newEntry = addPostcard(entry)
    updateStreak()
    return newEntry
  }

  return { addPostcardAndStreak }
}
