"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Trophy } from "lucide-react"

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

interface Tetromino {
  name: TetrominoType
  matrix: number[][]
  row: number
  col: number
}

interface TetrisGameState {
  playfield: (TetrominoType | 0)[][]
  currentPiece: Tetromino | null
  score: number
  lines: number
  level: number
  gameOver: boolean
  isPlaying: boolean
}

export function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const dropCounterRef = useRef(0)
  const [gameState, setGameState] = useState<TetrisGameState>({
    playfield: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentPiece: null,
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    isPlaying: false
  })

  const GRID_SIZE = 30
  const CANVAS_WIDTH = 300
  const CANVAS_HEIGHT = 600

  const tetrominos: { [key in TetrominoType]: number[][] } = {
    'I': [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    'J': [[1,0,0],[1,1,1],[0,0,0]],
    'L': [[0,0,1],[1,1,1],[0,0,0]],
    'O': [[1,1],[1,1]],
    'S': [[0,1,1],[1,1,0],[0,0,0]],
    'Z': [[1,1,0],[0,1,1],[0,0,0]],
    'T': [[0,1,0],[1,1,1],[0,0,0]]
  }

  const colors: { [key in TetrominoType]: string } = {
    'I': '#00f0f0',
    'O': '#f0f000',
    'T': '#a000f0',
    'S': '#00f000',
    'Z': '#f00000',
    'J': '#0000f0',
    'L': '#f0a000'
  }

  const getRandomPiece = useCallback((): TetrominoType => {
    const pieces: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    return pieces[Math.floor(Math.random() * pieces.length)]
  }, [])

  const createPiece = useCallback((type: TetrominoType): Tetromino => {
    const matrix = tetrominos[type]
    const col = Math.floor(10 / 2) - Math.ceil(matrix[0].length / 2)
    const row = type === 'I' ? -1 : -2
    return { name: type, matrix, row, col }
  }, [])

  const rotate = (matrix: number[][]): number[][] => {
    const N = matrix.length - 1
    return matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]))
  }

  const isValidMove = useCallback((piece: Tetromino, playfield: (TetrominoType | 0)[][]): boolean => {
    for (let row = 0; row < piece.matrix.length; row++) {
      for (let col = 0; col < piece.matrix[row].length; col++) {
        if (piece.matrix[row][col] && (
          piece.col + col < 0 ||
          piece.col + col >= 10 ||
          piece.row + row >= 20 ||
          (piece.row + row >= 0 && playfield[piece.row + row][piece.col + col])
        )) {
          return false
        }
      }
    }
    return true
  }, [])

  const placePiece = useCallback((piece: Tetromino, playfield: (TetrominoType | 0)[][]) => {
    const newPlayfield = playfield.map(row => [...row])
    for (let row = 0; row < piece.matrix.length; row++) {
      for (let col = 0; col < piece.matrix[row].length; col++) {
        if (piece.matrix[row][col]) {
          if (piece.row + row < 0) {
            return { newPlayfield: playfield, gameOver: true, linesCleared: 0 }
          }
          newPlayfield[piece.row + row][piece.col + col] = piece.name
        }
      }
    }
    let linesCleared = 0
    for (let row = 19; row >= 0; ) {
      if (newPlayfield[row].every(cell => !!cell)) {
        newPlayfield.splice(row, 1)
        newPlayfield.unshift(Array(10).fill(0))
        linesCleared++
      } else row--
    }
    return { newPlayfield, gameOver: false, linesCleared }
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      playfield: Array(20).fill(null).map(() => Array(10).fill(0)),
      currentPiece: createPiece(getRandomPiece()),
      score: 0,
      lines: 0,
      level: 1,
      gameOver: false,
      isPlaying: false
    })
    dropCounterRef.current = 0
  }, [createPiece, getRandomPiece])

  const toggleGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const gameLoop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.gameOver || !prevState.currentPiece) return prevState
      const dropTime = Math.max(50, 500 - (prevState.level - 1) * 50)
      dropCounterRef.current += 16.67
      if (dropCounterRef.current > dropTime) {
        const movedPiece = { ...prevState.currentPiece, row: prevState.currentPiece.row + 1 }
        if (isValidMove(movedPiece, prevState.playfield)) {
          dropCounterRef.current = 0
          return { ...prevState, currentPiece: movedPiece }
        } else {
          const { newPlayfield, gameOver, linesCleared } = placePiece(prevState.currentPiece, prevState.playfield)
          if (gameOver) return { ...prevState, gameOver: true, isPlaying: false }
          const newScore = prevState.score + (linesCleared * 100 * prevState.level)
          const newLines = prevState.lines + linesCleared
          const newLevel = Math.floor(newLines / 10) + 1
          dropCounterRef.current = 0
          return {
            ...prevState,
            playfield: newPlayfield,
            currentPiece: createPiece(getRandomPiece()),
            score: newScore,
            lines: newLines,
            level: newLevel
          }
        }
      }
      return prevState
    })
  }, [isValidMove, placePiece, createPiece, getRandomPiece])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState.gameOver || !gameState.currentPiece || !gameState.isPlaying) return
    if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) e.preventDefault()

    setGameState(prevState => {
      if (!prevState.currentPiece) return prevState
      let newPiece = { ...prevState.currentPiece }
      switch (e.key) {
        case 'ArrowLeft':
          newPiece.col--
          if (!isValidMove(newPiece, prevState.playfield)) newPiece.col++
          break
        case 'ArrowRight':
          newPiece.col++
          if (!isValidMove(newPiece, prevState.playfield)) newPiece.col--
          break
        case 'ArrowDown':
          newPiece.row++
          if (!isValidMove(newPiece, prevState.playfield)) newPiece.row--
          break
        case 'ArrowUp':
          const rotatedMatrix = rotate(newPiece.matrix)
          const rotatedPiece = { ...newPiece, matrix: rotatedMatrix }
          if (isValidMove(rotatedPiece, prevState.playfield)) newPiece = rotatedPiece
          break
        case ' ':
          return { ...prevState, isPlaying: !prevState.isPlaying }
      }
      return { ...prevState, currentPiece: newPiece }
    })
  }, [gameState.gameOver, gameState.currentPiece, gameState.isPlaying, isValidMove])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#FFFBF1'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (gameState.playfield[row][col]) {
          ctx.fillStyle = colors[gameState.playfield[row][col] as TetrominoType]
          ctx.fillRect(col * GRID_SIZE, row * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1)
        }
      }
    }
    if (gameState.currentPiece) {
      ctx.fillStyle = colors[gameState.currentPiece.name]
      for (let row = 0; row < gameState.currentPiece.matrix.length; row++) {
        for (let col = 0; col < gameState.currentPiece.matrix[row].length; col++) {
          if (gameState.currentPiece.matrix[row][col]) {
            const x = (gameState.currentPiece.col + col) * GRID_SIZE
            const y = (gameState.currentPiece.row + row) * GRID_SIZE
            if (y >= 0) ctx.fillRect(x, y, GRID_SIZE - 1, GRID_SIZE - 1)
          }
        }
      }
    }
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
      ctx.fillRect(0, CANVAS_HEIGHT / 2 - 30, CANVAS_WIDTH, 60)
      ctx.fillStyle = 'white'
      ctx.font = '24px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      ctx.textAlign = 'left'
    }
  }, [gameState])

  useEffect(() => { draw() }, [draw])
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = setInterval(gameLoop, 16.67)
    } else {
      if (gameLoopRef.current) { clearInterval(gameLoopRef.current); gameLoopRef.current = null }
    }
    return () => { if (gameLoopRef.current) { clearInterval(gameLoopRef.current); gameLoopRef.current = null } }
  }, [gameState.isPlaying, gameState.gameOver, gameLoop])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
  useEffect(() => { resetGame() }, [resetGame])

  // helper to simulate key press from buttons
  const triggerKey = (key: string) => {
    handleKeyPress(new KeyboardEvent("keydown", { key }))
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-foreground">Tetris</h3>
          <p className="text-sm text-muted-foreground">Classic block-stacking puzzle game</p>
        </div>
        <div className="text-right text-sm">
          <div>Score: {gameState.score}</div>
          <div>Lines: {gameState.lines}</div>
          <div>Level: {gameState.level}</div>
        </div>
      </div>

      <div className="flex justify-center mb-2">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-border rounded-lg"
          style={{ backgroundColor: '#F5F5DC' }}
          tabIndex={0}
        />
      </div>

      {/* ✅ Mobile Touch Control Pad */}
      <div className="grid grid-cols-3 gap-0 justify-items-center mb-4">
        {/* Up = Rotate */}
        <div className="col-span-3 flex justify-center">
          <Button onClick={() => triggerKey("ArrowUp")} className="p-4">▲</Button>
        </div>
        {/* Left + Right */}
        <div className="col-span-3 flex justify-center space-x-10">
          <Button onClick={() => triggerKey("ArrowLeft")} className="p-4">◀️</Button>
          <Button onClick={() => triggerKey("ArrowRight")} className="p-4">▶️</Button>
        </div>
        {/* Down = Drop */}
        <div className="col-span-3 flex justify-center">
          <Button onClick={() => triggerKey("ArrowDown")} className="p-4">▼</Button>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        <Button 
          onClick={toggleGame} 
          disabled={gameState.gameOver}
          className={gameState.isPlaying ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          {gameState.isPlaying ? (<><Pause className="h-4 w-4 mr-2" /> Pause</>) : (<><Play className="h-4 w-4 mr-2" /> {gameState.score > 0 ? "Resume" : "Start"}</>)}
        </Button>
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">Arrow keys / buttons: Move</div>
        <div className="text-sm text-muted-foreground">Up: Rotate • Down: Drop</div>
        <div className="text-sm text-muted-foreground">Space: Pause/Resume</div>
        {gameState.gameOver && (
          <div className="flex items-center justify-center text-sm text-destructive">
            <Trophy className="h-4 w-4 mr-1" /> Final Score: {gameState.score}
          </div>
        )}
      </div>
    </Card>
  )
}