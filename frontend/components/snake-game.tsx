"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface SnakeGameState {
  snake: { x: number; y: number }[]
  apple: { x: number; y: number }
  direction: { x: number; y: number }
  score: number
  highScore: number
  gameOver: boolean
  isPlaying: boolean
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  
  // Get high score from localStorage
  const getHighScore = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('snakeHighScore')
      return stored ? parseInt(stored, 10) : 0
    }
    return 0
  }

  // Save high score to localStorage
  const saveHighScore = (score: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('snakeHighScore', score.toString())
    }
  }

  const [gameState, setGameState] = useState<SnakeGameState>({
    snake: [{ x: 80, y: 80 }],
    apple: { x: 160, y: 160 },
    direction: { x: 16, y: 0 },
    score: 0,
    highScore: getHighScore(),
    gameOver: false,
    isPlaying: false
  })

  const GRID_SIZE = 16
  const CANVAS_SIZE = 320

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
    const initialSnake = [{ x: 80, y: 80 }]
    setGameState(prev => ({
      snake: initialSnake,
      apple: generateApple(initialSnake),
      direction: { x: GRID_SIZE, y: 0 },
      score: 0,
      highScore: prev.highScore, // Keep the existing high score
      gameOver: false,
      isPlaying: false
    }))
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

      head.x += prevState.direction.x
      head.y += prevState.direction.y

      // Wall collision detection (instead of wrapping around)
      if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
        // Update high score if current score is higher
        let newHighScore = prevState.highScore
        if (prevState.score > prevState.highScore) {
          newHighScore = prevState.score
          saveHighScore(prevState.score)
        }
        return { 
          ...prevState, 
          gameOver: true, 
          isPlaying: false,
          highScore: newHighScore
        }
      }

      // Collision with self
      const hasCollision = newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      if (hasCollision) {
        // Update high score if current score is higher
        let newHighScore = prevState.highScore
        if (prevState.score > prevState.highScore) {
          newHighScore = prevState.score
          saveHighScore(prevState.score)
        }
        return { 
          ...prevState, 
          gameOver: true, 
          isPlaying: false,
          highScore: newHighScore
        }
      }

      newSnake.unshift(head)

      let newApple = prevState.apple
      let newScore = prevState.score

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

  const updateDirection = (newDir: { x: number; y: number }) => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState
      return { ...prevState, direction: newDir }
    })
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault()
    }
    if (gameState.gameOver) return

    switch (e.key) {
      case 'ArrowLeft':
        if (gameState.direction.x === 0) updateDirection({ x: -GRID_SIZE, y: 0 })
        break
      case 'ArrowRight':
        if (gameState.direction.x === 0) updateDirection({ x: GRID_SIZE, y: 0 })
        break
      case 'ArrowUp':
        if (gameState.direction.y === 0) updateDirection({ x: 0, y: -GRID_SIZE })
        break
      case 'ArrowDown':
        if (gameState.direction.y === 0) updateDirection({ x: 0, y: GRID_SIZE })
        break
      case ' ':
        toggleGame()
        break
    }
  }, [gameState.direction, gameState.gameOver])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#F5F5DC'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    ctx.fillStyle = '#8B4513'
    gameState.snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, GRID_SIZE - 1, GRID_SIZE - 1)
    })

    ctx.save()
    ctx.shadowColor = '#4ADE80'
    ctx.shadowBlur = 4
    ctx.fillStyle = '#6FC276'
    ctx.fillRect(gameState.apple.x, gameState.apple.y, GRID_SIZE - 1, GRID_SIZE - 1)
    ctx.restore()

    ctx.fillStyle = '#654321'
    ctx.font = '16px monospace'
    ctx.fillText(`Score: ${gameState.score}`, 10, 20)
    ctx.fillText(`High: ${gameState.highScore}`, 10, 40)

    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)'
      ctx.fillRect(0, CANVAS_SIZE / 2 - 40, CANVAS_SIZE, 80)
      ctx.fillStyle = 'white'
      ctx.font = '24px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER!', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 10)
      ctx.font = '16px monospace'
      ctx.fillText(`Final Score: ${gameState.score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10)
      
      // Show if new high score achieved
      if (gameState.score === gameState.highScore && gameState.score > 0) {
        ctx.fillStyle = '#FFD700'
        ctx.fillText('🎉 NEW HIGH SCORE! 🎉', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30)
      }
      
      ctx.textAlign = 'left'
    }
  }, [gameState])

  useEffect(() => { draw() }, [draw])

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

  useEffect(() => { resetGame() }, [resetGame])

  return (
    <Card className="p-4 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-foreground">Snake Game</h3>
          <p className="text-sm text-muted-foreground">
            Hit walls = Game Over! Use arrow keys or buttons.
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm font-medium">Score: {gameState.score}</span>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded border border-yellow-300">
              High: {gameState.highScore}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border-2 border-amber-200 rounded-lg"
          style={{ backgroundColor: '#F5F5DC' }}
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
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> {gameState.score > 0 ? "Resume" : "Start"}
            </>
          )}
        </Button>
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      {/* ✅ Mobile Touch Control Pad (Left & Right closer) */}
      <div className="grid grid-cols-3 gap-0 justify-items-center mb-2">
        {/* Up button centered */}
        <div className="col-span-3 flex justify-center">
          <Button onClick={() => updateDirection({ x: 0, y: -GRID_SIZE })} className="p-4">
            <ArrowUp />
          </Button>
        </div>

        {/* Left + Right without space between */}
        <div className="col-span-3 gap-10 flex justify-center">
          <Button onClick={() => updateDirection({ x: -GRID_SIZE, y: 0 })} className="p-4 ">
            <ArrowLeft />
          </Button>
          <Button onClick={() => updateDirection({ x: GRID_SIZE, y: 0 })} className="p-4 ">
            <ArrowRight />
          </Button>
        </div>

        {/* Down button centered */}
        <div className="col-span-3 flex justify-center">
          <Button onClick={() => updateDirection({ x: 0, y: GRID_SIZE })} className="p-4">
            <ArrowDown />
          </Button>
        </div>
      </div>


    </Card>
  )
}