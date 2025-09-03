"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Trash2 } from "lucide-react"

export interface ReminderItem {
  title: string
  description?: string
  date: string
}

interface ReminderProps {
  reminders?: ReminderItem[] // optional, defaults to []
  setReminders: (reminders: ReminderItem[]) => void
}

export function Reminder({ reminders = [], setReminders }: ReminderProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showInput, setShowInput] = useState(false)

  // 🔹 Load reminders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("reminders")
    if (saved) {
      setReminders(JSON.parse(saved))
    }
  }, [setReminders])

  // 🔹 Save reminders whenever they change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  const toggleInput = () => {
    setShowInput(!showInput)
    if (showInput) {
      setTitle("")
      setDescription("")
    }
  }

  const addReminder = () => {
    if (!title.trim()) return
    const newReminder: ReminderItem = {
      title,
      description,
      date: new Date().toLocaleDateString(),
    }
    setReminders([...reminders, newReminder])
    setTitle("")
    setDescription("")
    setShowInput(false)
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
            <p className="text-sm text-gray-500 text-center">No reminders yet.</p>
          )}
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{reminder.title}</p>
                {reminder.description && (
                  <p className="text-sm text-gray-500">{reminder.description}</p>
                )}
                <p className="text-xs text-gray-400">{reminder.date}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteReminder(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
