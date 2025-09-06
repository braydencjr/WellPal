// src/lib/userConditions.ts
export type UserCondition = {
  colorBlind: boolean
  colorBlindType?: "red" | "green" | "blue"
  colorBlindSeverity?: "weak" | "blind"
  dyslexia?: boolean
  mentalHealth?: "depression" | "adhd" | "anxiety" | "other" | null
}


const CONDITION_KEY = "wellpal_user_conditions_v1"

export const defaultConditions: UserCondition = {
  colorBlind: false,
  dyslexia: false,
  mentalHealth: null,
}

export function loadConditions(): UserCondition {
  if (typeof window === "undefined") return defaultConditions
  try {
    const raw = localStorage.getItem(CONDITION_KEY)
    return raw ? (JSON.parse(raw) as UserCondition) : defaultConditions
  } catch {
    return defaultConditions
  }
}

export function saveConditions(conditions: UserCondition) {
  if (typeof window === "undefined") return
  localStorage.setItem(CONDITION_KEY, JSON.stringify(conditions))
}

/**
 * CalmingTheme includes both normal and color-blind variants.
 * Keep this in sync with the themes you define in CSS.
 */
export type CalmingTheme =
  | "default"
  | "soft-green"
  | "calm-blue"
  | "warm-beige"
  | "red-blind-1" | "red-blind-2" | "red-blind-3"
  | "red-weak-1" | "red-weak-2" | "red-weak-3"   // new weak variants
  | "green-blind-1" | "green-blind-2" | "green-blind-3"
  | "green-weak-1" | "green-weak-2" | "green-weak-3" // new weak variants
  | "blue-blind-1" | "blue-blind-2" | "blue-blind-3"
  | "blue-weak-1" | "blue-weak-2" | "blue-weak-3" // new weak variants


/**
 * Map a saved theme to an accessible theme when colorBlind === true.
 * - If colorBlind is false, returns theme (with 'default' mapped to 'warm-beige').
 * - If colorBlind is true, returns a color-blind friendly theme (mapping applied).
 */
export function getAccessibleTheme(theme: CalmingTheme): CalmingTheme {
  // Always return default theme first, regardless of color-blind settings
  if (theme === "default") return "default"
  // Otherwise, just return the theme itself
  return theme
}
