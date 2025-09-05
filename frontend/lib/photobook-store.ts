"use client"

export type PostcardEntry = {
  id: string
  dateISO: string
  imageDataUrl: string
  note: string
  mood: string
  location?: string
}

const STORAGE_KEY = "wellpal_photobook_v1"

export function loadPhotobook(): PostcardEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as PostcardEntry[]) : []
    // 🔥 ensure most recent first
    return parsed.sort(
      (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    )
  } catch {
    return []
  }
}


export function savePhotobook(entries: PostcardEntry[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function addPostcard(entry: Omit<PostcardEntry, "id" | "dateISO">): PostcardEntry {
  const entries = loadPhotobook()
  const newEntry: PostcardEntry = {
    id: crypto.randomUUID(),
    dateISO: new Date().toISOString(),
    ...entry,
  }
  const updated = [newEntry, ...entries]
  savePhotobook(updated)
  return newEntry
}

export function deletePostcard(postcardId: string): void {
  const entries = loadPhotobook()
  const updated = entries.filter(entry => entry.id !== postcardId)
  savePhotobook(updated)
}


