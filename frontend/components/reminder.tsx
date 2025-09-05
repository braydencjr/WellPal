"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Trash2, Check } from "lucide-react"

export interface ReminderItem {
  title: string
  description?: string
  dateISO: string
  checked?: boolean
}

interface ReminderProps {
  reminders?: ReminderItem[] // only reminders for the selected date
  setReminders: (reminders: ReminderItem[]) => void
  selectedDate: string
}

export function Reminder({
  reminders = [],
  setReminders,
  selectedDate,
}: ReminderProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showInput, setShowInput] = useState(false)

  const toggleInput = () => {
    setShowInput(!showInput)
    if (showInput) {
      setTitle("")
      setDescription("")
    }
  }

   // Unified sorting helper
  const sortReminders = (list: ReminderItem[]) => {
    const unchecked = list.filter(r => !r.checked)
    const checked = list.filter(r => r.checked)
    return [...unchecked, ...checked]
  }

  const addReminder = () => {
    if (!title.trim()) return
    const newReminder: ReminderItem = { title, description, dateISO: selectedDate }
    const updated = sortReminders([...reminders, newReminder])
    setReminders(updated)
    setTitle("")
    setDescription("")
    setShowInput(false)
  }

  const toggleChecked = (index: number) => {
    const updated = [...reminders]
    updated[index].checked = !updated[index].checked
    setReminders(sortReminders(updated))
  }

  const deleteReminder = (index: number) => {
    const updated = reminders.filter((_, i) => i !== index)
    setReminders(updated)
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-lg rounded-2xl h-[350px] flex flex-col">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">Reminders</CardTitle>
        <Button
          onClick={toggleInput}
          title={showInput ? "Cancel" : "Add Reminder"}
          className={`text-white rounded-full p-3 flex items-center justify-center ${
            showInput ? "bg-red-400 hover:bg-red-500" : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {showInput ? <Minus size={20} /> : <Plus size={20} />}
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 overflow-hidden space-y-4">
        {/* Input Section */}
        {showInput && (
          <div className="space-y-2">
            <Input
              placeholder="Reminder title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={addReminder} className="w-full flex items-center gap-2">
              <Plus size={16} /> Add Reminder
            </Button>
          </div>
        )}

        {/* List Section */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {reminders.length === 0 && (
            <p className="text-sm text-gray-500 text-center">No reminders for this date.</p>
          )}
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
            >
              <div className="flex flex-col">
                <p className={`font-medium ${reminder.checked ? "line-through text-gray-400" : ""}`}>
                  {reminder.title}
                </p>
                {reminder.description && (
                  <p className="text-sm text-gray-500">{reminder.description}</p>
                )}
                <p className="text-xs text-gray-400">{reminder.dateISO}</p>
              </div>
          <div className="flex items-center gap-2">
  <Button
    variant="ghost"
    size="icon"
    onClick={() => toggleChecked(index)} // use the Reminder component function
  >
    {reminder.checked && <Check className="text-blue-500 w-5 h-5" />}
  </Button>
  <Button
    variant="ghost"
    size="icon"
    onClick={() => deleteReminder(index)} // use Reminder's delete function
  >
    <Trash2 size={16} />
  </Button>
</div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}