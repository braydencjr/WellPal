// Utility for managing daily AI chat request limits

const DAILY_LIMIT = 10
const STORAGE_KEY = 'wellpal_daily_chat_usage'

interface DailyUsage {
  date: string
  count: number
}

export function getTodayString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0] // YYYY-MM-DD format
}

export function getDailyUsage(): DailyUsage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { date: getTodayString(), count: 0 }
    }
    
    const usage: DailyUsage = JSON.parse(stored)
    
    // Reset count if it's a new day
    if (usage.date !== getTodayString()) {
      return { date: getTodayString(), count: 0 }
    }
    
    return usage
  } catch (error) {
    console.error('Error reading daily usage:', error)
    return { date: getTodayString(), count: 0 }
  }
}

export function incrementDailyUsage(): DailyUsage {
  const usage = getDailyUsage()
  const newUsage: DailyUsage = {
    date: usage.date,
    count: usage.count + 1
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage))
  } catch (error) {
    console.error('Error saving daily usage:', error)
  }
  
  return newUsage
}

export function canMakeRequest(): boolean {
  const usage = getDailyUsage()
  return usage.count < DAILY_LIMIT
}

export function getRemainingRequests(): number {
  const usage = getDailyUsage()
  return Math.max(0, DAILY_LIMIT - usage.count)
}

export function getDailyLimit(): number {
  return DAILY_LIMIT
}

export function resetDailyUsage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error resetting daily usage:', error)
  }
}
