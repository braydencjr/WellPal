"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Bell, Mail, ChevronLeft, ChevronRight } from "lucide-react"

export function Calendar() {
  const [today] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()

  return (
  <div className="max-w-lg mx-auto bg-card p-6 rounded-2xl shadow-lg h-80">
    {/* Header with month navigation */}
    <div className="flex justify-between items-center mb-2">
      <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <CalendarIcon className="w-5 h-5" />
        {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>

    {/* Calendar Grid */}
    <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 dark:text-gray-400 -mt-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d}>{d}</div>
      ))}
    </div>

    <div className="grid grid-cols-7 gap-1 text-center flex-1 -mt-1">
      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}
      {days.map((day) => (
        <div
          key={day}
          className={`p-1.5 mt-1 rounded-full cursor-pointer text-sm transition ${
            isToday(day)
              ? "bg-primary text-white font-bold"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  </div>
)
}