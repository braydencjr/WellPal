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
  const todayStr = new Date().toISOString().split("T")[0]

  const todayReminders = reminders.filter((r) => {
    const reminderLocalDay = new Date(r.dateISO).toLocaleDateString("en-CA")
    return reminderLocalDay === todayStr
  })

  const handleToggle = (index: number) => {
  // Copy current reminders for today
  const updated = [...todayReminders];
  updated[index].checked = !updated[index].checked;

  // Sort: unchecked first, checked last
  updated.sort((a, b) => {
    if (a.checked === b.checked) return 0;
    return a.checked ? 1 : -1;
  });

  // Merge back with other days
  const others = reminders.filter(r => {
    const reminderLocalDay = new Date(r.dateISO).toLocaleDateString("en-CA");
    return reminderLocalDay !== todayStr;
  });

  setReminders([...others, ...updated]);
};


  const goToCalendar = () => {
    router.push("/calendar")
  }

  const goToTodaysPhotos = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/photos/${todayStr}`)
  }

  return (
    <Card
      className="p-6 mb-6 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={goToCalendar}
    >
      <div className="flex h-24">
        {/* Left: date + button */}
        <div className="flex flex-col items-center justify-start pr-4 border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {today.getDate()}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            {today.toLocaleString("en-US", { month: "short" })} {today.getFullYear()}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline italic text-center">
             <span className="block">Click to</span>
             <span className="block">Today's Full View</span>
          </p>
        </div>

        {/* Right: only today's reminders */}
        <div className="flex-1 flex flex-col overflow-y-auto pl-4">
          {todayReminders.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No reminders for today.</p>
          )}
         {todayReminders.map((reminder, index) => (
  <div
    key={index}
    className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 text-gray-700 dark:text-gray-200"
  >
    <input
      type="checkbox"
      checked={reminder.checked || false}
      onChange={() => handleToggle(index)}
      className="mr-2"
      onClick={(e) => e.stopPropagation()} // stop Card click
    />
    <span
      className={reminder.checked ? "line-through text-gray-400" : ""}
      onClick={(e) => e.stopPropagation()} // stop Card click if text clicked
    >
      {reminder.title}
    </span>
  </div>
))}

        </div>
      </div>
    </Card>
  )
}