"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, Shuffle, RotateCcw, Trophy } from "lucide-react"

interface PuzzleState {
  tiles: number[]
  emptyIndex: number
  size: number
  isComplete: boolean
  moves: number
}

export function FifteenPuzzle() {
  const [isOpen, setIsOpen] = useState(false)
  const [puzzleSize, setPuzzleSize] = useState("3x3")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [puzzleState, setPuzzleState] = useState<PuzzleState | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalImageRef = useRef<HTMLImageElement>(null)

  const initializePuzzle = (size: number) => {
    const totalTiles = size * size
    const tiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1)
    tiles.push(0) // 0 represents empty space
    return {
      tiles,
      emptyIndex: totalTiles - 1,
      size,
      isComplete: false,
      moves: 0,
    }
  }

  const shufflePuzzle = (state: PuzzleState, moves: number = 300) => {
    let currentState = { ...state }
    const directions = [-1, 1, -state.size, state.size]

    for (let i = 0; i < moves; i++) {
      const validMoves = directions.filter((dir) => {
        const newIndex = currentState.emptyIndex + dir
        if (newIndex < 0 || newIndex >= state.size * state.size) return false
        if (dir === -1 && currentState.emptyIndex % state.size === 0) return false
        if (dir === 1 && currentState.emptyIndex % state.size === state.size - 1) return false
        return true
      })

      if (validMoves.length > 0) {
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
        const newEmptyIndex = currentState.emptyIndex + randomMove
        const newTiles = [...currentState.tiles]
        newTiles[currentState.emptyIndex] = newTiles[newEmptyIndex]
        newTiles[newEmptyIndex] = 0
        currentState = {
          ...currentState,
          tiles: newTiles,
          emptyIndex: newEmptyIndex,
        }
      }
    }

    currentState.moves = 0
    return currentState
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select a PNG, JPG, or JPEG image")
    }
  }

  const startGame = () => {
    if (!selectedImage) {
      alert("Please select an image first")
      return
    }
    const sizeMap: { [key: string]: number } = {
      "3x3": 3,
      "4x4": 4,
      "5x5": 5,
      "6x6": 6,
      "7x7": 7,
      "8x8": 8,
    }
    const size = sizeMap[puzzleSize]
    const initialState = initializePuzzle(size)
    const shuffledState = shufflePuzzle(initialState)
    setPuzzleState(shuffledState)
    setIsOpen(false)
  }

  const moveTile = (clickedIndex: number) => {
    if (!puzzleState || puzzleState.isComplete) return
    const { tiles, emptyIndex, size } = puzzleState
    const diff = clickedIndex - emptyIndex
    const isAdjacent =
      (Math.abs(diff) === 1 && Math.floor(clickedIndex / size) === Math.floor(emptyIndex / size)) ||
      Math.abs(diff) === size
    if (!isAdjacent) return
    const newTiles = [...tiles]
    newTiles[emptyIndex] = newTiles[clickedIndex]
    newTiles[clickedIndex] = 0
    const isComplete = newTiles.slice(0, -1).every((tile, index) => tile === index + 1)
    setPuzzleState({
      ...puzzleState,
      tiles: newTiles,
      emptyIndex: clickedIndex,
      moves: puzzleState.moves + 1,
      isComplete,
    })
  }

  const drawPuzzle = () => {
    const canvas = canvasRef.current
    const img = originalImageRef.current
  
    if (!canvas || !img || !puzzleState) return
  
    const ctx = canvas.getContext("2d")
    if (!ctx) return
  
    const { tiles, size } = puzzleState
    const tileSize = 300 / size
  
    canvas.width = 300
    canvas.height = 300
  
    ctx.clearRect(0, 0, 300, 300)
  
    tiles.forEach((tileNumber, index) => {
      if (tileNumber === 0) return // Skip empty space
  
      const col = index % size
      const row = Math.floor(index / size)
  
      const srcCol = (tileNumber - 1) % size
      const srcRow = Math.floor((tileNumber - 1) / size)
  
      ctx.drawImage(
        img,
        (srcCol * img.width) / size,
        (srcRow * img.height) / size,
        img.width / size,
        img.height / size,
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      )
  
      // Draw border
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 2
      ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize)
  
      // Draw tile number (smaller, top-left)
      ctx.fillStyle = "rgba(0,0,0,0.6)"
      ctx.font = "${Math.floor(tileSize / 4)}px Arial"
      ctx.textAlign = "left" // align left
      ctx.textBaseline = "top" // align top
      ctx.fillText(
        tileNumber.toString(),
        col * tileSize + 4, // small padding from left
        row * tileSize + 4  // small padding from top
      )
    })
  }
  
  

  useEffect(() => {
    if (puzzleState && selectedImage) {
      drawPuzzle()
    }
  }, [puzzleState, selectedImage])

  const resetPuzzle = () => {
    if (puzzleState) {
      const reshuffled = shufflePuzzle({ ...puzzleState, moves: 0 })
      setPuzzleState(reshuffled)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-foreground">Fifteen Sliding Puzzle</h3>
            <p className="text-sm text-muted-foreground">Upload an image and solve the sliding puzzle</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Create Puzzle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {selectedImage && (
                    <div className="mt-2">
                      <img src={selectedImage} alt="Preview" className="w-20 h-20 object-cover rounded" />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Puzzle Size</Label>
                  <Select value={puzzleSize} onValueChange={setPuzzleSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3x3">3×3 (8 pieces)</SelectItem>
                      <SelectItem value="4x4">4×4 (15 pieces)</SelectItem>
                      <SelectItem value="5x5">5×5 (24 pieces)</SelectItem>
                      <SelectItem value="6x6">6×6 (35 pieces)</SelectItem>
                      <SelectItem value="7x7">7×7 (48 pieces)</SelectItem>
                      <SelectItem value="8x8">8×8 (63 pieces)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={startGame} className="w-full">
                  Start Game
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {puzzleState ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Moves: {puzzleState.moves}</div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={resetPuzzle}>
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border border-border rounded-lg cursor-pointer"
                  onClick={(e) => {
                    const rect = canvasRef.current?.getBoundingClientRect()
                    if (!rect || !puzzleState) return
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const tileSize = 300 / puzzleState.size
                    const col = Math.floor(x / tileSize)
                    const row = Math.floor(y / tileSize)
                    const index = row * puzzleState.size + col
                    moveTile(index)
                  }}
                />
                {puzzleState.isComplete && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Trophy className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-bold">Puzzle Complete!</div>
                      <div className="text-sm">Moves: {puzzleState.moves}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Click on tiles adjacent to the empty space to move them
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No puzzle loaded</p>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Create Your First Puzzle
            </Button>
          </div>
        )}
      </Card>
      {/* hidden original image element bound to selectedImage */}
      <img ref={originalImageRef} src={selectedImage || ""} alt="original" style={{ display: "none" }} />
    </div>
  )
}