"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Calendar } from "lucide-react"

export function Reminder() {
  const [reminders, setReminders] = useState<{ title: string; description: string; date: string }[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showInput, setShowInput] = useState(false)

  const addReminder = () => {
    if (!title.trim()) return
    setReminders([...reminders, { title, description, date: new Date().toLocaleDateString() }])
    setTitle("")
    setDescription("")
    setShowInput(false)
  }

  const addTodayReminder = () => {
    setTitle("Today's Reminder")
    setDescription("")
    setShowInput(true)
  }

  const deleteReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-lg rounded-2xl h-[350px] flex flex-col">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">Reminders</CardTitle>
        <Button
          onClick={addTodayReminder}
          title="Add Reminder for Today"
           className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-3 flex items-center justify-center"
        >
          <Plus size={20} />
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
