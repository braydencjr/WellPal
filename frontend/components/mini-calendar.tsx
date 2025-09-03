"use client"

import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ReminderItem } from "./reminder-dashboard"

interface MiniCalendarProps {
  reminders: ReminderItem[]
  setReminders: (reminders: ReminderItem[]) => void
}

export function MiniCalendar({ reminders, setReminders }: MiniCalendarProps) {
  const today = new Date()
  const router = useRouter()

  const handleToggle = (index: number) => {
    const updated = [...reminders]
    updated[index].checked = !updated[index].checked
    setReminders(updated)
  }

  const goToCalendar = () => {
    router.push("/calendar")
  }

  const goToTodaysPhotos = (e: React.MouseEvent) => {
    e.stopPropagation()
    const dateStr = today.toISOString().split("T")[0]
    router.push(`/photos/${dateStr}`)
  }

  return (
    <Card
      className="p-6 mb-6 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={goToCalendar}
    >
      <div className="flex h-24">
        {/* Left: date + button */}
        <div className="flex flex-col items-center justify-start pr-4 border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{today.getDate()}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            {today.toLocaleString("en-US", { month: "short" })} {today.getFullYear()}
          </p>
          <button
            onClick={goToTodaysPhotos}
            className="px-3 py-1 text-xs rounded bg-primary text-white hover:bg-primary/80 transition"
          >
            Today's Postcards
          </button>
        </div>

        {/* Right: reminders */}
        <div className="flex-1 flex flex-col overflow-y-auto pl-4">
          {reminders.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No reminders yet.</p>
          )}
          {reminders.map((reminder, index) => (
            <label
              key={index}
              className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                checked={reminder.checked || false}
                onChange={(e) => { e.stopPropagation(); handleToggle(index) }}
                className="mr-2"
              />
              <span className={reminder.checked ? "line-through text-gray-400" : ""}>
                {reminder.title}
              </span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  )
}
