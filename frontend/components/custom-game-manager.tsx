"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, ExternalLink, Trash2 } from "lucide-react"

interface CustomGame {
  id: string
  title: string
  description: string
  url: string
  dateAdded: string
}

export function CustomGameManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [customGames, setCustomGames] = useState<CustomGame[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: ""
  })

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.url.trim()) {
      alert("Please fill in all fields")
      return
    }

    if (!isValidUrl(formData.url)) {
      alert("Please enter a valid URL")
      return
    }

    const newGame: CustomGame = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      url: formData.url.trim(),
      dateAdded: new Date().toLocaleDateString()
    }

    setCustomGames(prev => [...prev, newGame])
    setFormData({ title: "", description: "", url: "" })
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this game?")) {
      setCustomGames(prev => prev.filter(game => game.id !== id))
    }
  }

  const handlePlayGame = (url: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Error opening game:", error)
      alert("Could not open the game. Please check the URL.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Custom Games</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Add Custom Game</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Game Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter game title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the game..."
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="url">Game URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/game"
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  Add Game
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {customGames.length === 0 ? (
        <Card className="p-6">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">No custom games added yet</p>
            <p className="text-sm">Add your favorite online games to play them here</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {customGames.map((game) => (
            <Card key={game.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1 truncate">
                    {game.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Added: {game.dateAdded}</span>
                    <span className="truncate max-w-32">{game.url}</span>
                  </div>
                </div>
                <div className="flex space-x-1 ml-3">
                  <Button
                    size="sm"
                    onClick={() => handlePlayGame(game.url)}
                    className="shrink-0"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(game.id)}
                    className="shrink-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
