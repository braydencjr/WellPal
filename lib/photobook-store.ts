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
    return raw ? (JSON.parse(raw) as PostcardEntry[]) : []
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


