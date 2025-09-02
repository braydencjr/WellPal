"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Trophy } from "lucide-react"

interface SnakeGameState {
  snake: { x: number; y: number }[]
  apple: { x: number; y: number }
  direction: { x: number; y: number }
  score: number
  gameOver: boolean
  isPlaying: boolean
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const [gameState, setGameState] = useState<SnakeGameState>({
    snake: [{ x: 160, y: 160 }],
    apple: { x: 320, y: 320 },
    direction: { x: 16, y: 0 },
    score: 0,
    gameOver: false,
    isPlaying: false
  })

  const GRID_SIZE = 16
  const CANVAS_SIZE = 400

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const generateApple = useCallback((snake: { x: number; y: number }[]) => {
    let newApple: { x: number; y: number }
    do {
      newApple = {
        x: getRandomInt(0, CANVAS_SIZE / GRID_SIZE) * GRID_SIZE,
        y: getRandomInt(0, CANVAS_SIZE / GRID_SIZE) * GRID_SIZE
      }
    } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y))
    return newApple
  }, [])

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 160, y: 160 }]
    setGameState({
      snake: initialSnake,
      apple: generateApple(initialSnake),
      direction: { x: GRID_SIZE, y: 0 },
      score: 0,
      gameOver: false,
      isPlaying: false
    })
  }, [generateApple])

  const toggleGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }))
  }

  const gameLoop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.gameOver) {
        return prevState
      }

      const newSnake = [...prevState.snake]
      const head = { ...newSnake[0] }

      // Move head
      head.x += prevState.direction.x
      head.y += prevState.direction.y

      // Wrap around screen
      if (head.x < 0) head.x = CANVAS_SIZE - GRID_SIZE
      if (head.x >= CANVAS_SIZE) head.x = 0
      if (head.y < 0) head.y = CANVAS_SIZE - GRID_SIZE
      if (head.y >= CANVAS_SIZE) head.y = 0

      // Check collision with self
      const hasCollision = newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      if (hasCollision) {
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false
        }
      }

      newSnake.unshift(head)

      let newApple = prevState.apple
      let newScore = prevState.score

      // Check if apple is eaten
      if (head.x === prevState.apple.x && head.y === prevState.apple.y) {
        newScore += 10
        newApple = generateApple(newSnake)
      } else {
        newSnake.pop()
      }

      return {
        ...prevState,
        snake: newSnake,
        apple: newApple,
        score: newScore
      }
    })
  }, [generateApple])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState.gameOver) return

    setGameState(prevState => {
      const newDirection = { ...prevState.direction }

      switch (e.key) {
        case 'ArrowLeft':
          if (prevState.direction.x === 0) {
            newDirection.x = -GRID_SIZE
            newDirection.y = 0
          }
          break
        case 'ArrowRight':
          if (prevState.direction.x === 0) {
            newDirection.x = GRID_SIZE
            newDirection.y = 0
          }
          break
        case 'ArrowUp':
          if (prevState.direction.y === 0) {
            newDirection.x = 0
            newDirection.y = -GRID_SIZE
          }
          break
        case 'ArrowDown':
          if (prevState.direction.y === 0) {
            newDirection.x = 0
            newDirection.y = GRID_SIZE
          }
          break
        case ' ':
          e.preventDefault()
          return {
            ...prevState,
            isPlaying: !prevState.isPlaying
          }
      }

      return {
        ...prevState,
        direction: newDirection
      }
    })
  }, [gameState.gameOver])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw snake
    ctx.fillStyle = 'green'
    gameState.snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, GRID_SIZE - 1, GRID_SIZE - 1)
    })

    // Draw apple
    ctx.fillStyle = 'red'
    ctx.fillRect(gameState.apple.x, gameState.apple.y, GRID_SIZE - 1, GRID_SIZE - 1)

    // Draw score
    ctx.fillStyle = 'white'
    ctx.font = '16px monospace'
    ctx.fillText(`Score: ${gameState.score}`, 10, 20)

    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
      ctx.fillRect(0, CANVAS_SIZE / 2 - 30, CANVAS_SIZE, 60)

      ctx.fillStyle = 'white'
      ctx.font = '24px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER!', CANVAS_SIZE / 2, CANVAS_SIZE / 2)
      ctx.textAlign = 'left'
    }
  }, [gameState])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = setInterval(gameLoop, 150)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameState.isPlaying, gameState.gameOver, gameLoop])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-foreground">Snake Game</h3>
          <p className="text-sm text-muted-foreground">
            Use arrow keys to control the snake
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Score: {gameState.score}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border border-border rounded-lg bg-black"
          tabIndex={0}
        />
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        <Button 
          onClick={toggleGame} 
          disabled={gameState.gameOver}
          className={gameState.isPlaying ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          {gameState.isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              {gameState.score > 0 ? "Resume" : "Start"}
            </>
          )}
        </Button>
        
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Use arrow keys or WASD to move
        </div>
        <div className="text-sm text-muted-foreground">
          Press Space to pause/resume
        </div>
        {gameState.gameOver && (
          <div className="flex items-center justify-center text-sm text-destructive">
            <Trophy className="h-4 w-4 mr-1" />
            Final Score: {gameState.score}
          </div>
        )}
      </div>
    </Card>
  )
}
