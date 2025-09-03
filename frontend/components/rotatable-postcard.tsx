"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, PanInfo } from "framer-motion"
import { PostcardFront } from "@/components/postcard/PostcardFront"
import { PostcardBack } from "@/components/postcard/PostcardBack"

interface RotatablePostcardProps {
  imageUrl: string
  mood: string
  location: string
  note: string
  onNoteChange?: (note: string) => void
  onMoodChange?: (mood: string) => void
  onLocationChange?: (location: string) => void
  onSideChange?: (side: "front" | "back") => void
  isReadOnly?: boolean
  className?: string
}

export function RotatablePostcard({
  imageUrl,
  mood,
  location,
  note,
  onNoteChange,
  onMoodChange,
  onLocationChange,
  onSideChange,
  isReadOnly = false,
  className = "",
}: RotatablePostcardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const rotationY = useMotionValue(0)

  // Calculate which side is visible
  const getVisibleSide = (rotation: number) => {
    const normalizedRotation = ((rotation % 360) + 360) % 360
    return normalizedRotation >= 90 && normalizedRotation <= 270 ? "back" : "front"
  }

  // Snap to nearest 180° (front/back)
  const findClosestStablePosition = (rotation: number) => {
    return Math.round(rotation / 180) * 180
  }

  // Handle drag move
  const handleDrag = useCallback(
    (_: any, info: PanInfo) => {
      if (!isDragging) return
      const deltaX = info.delta.x
      const sensitivity = 1.0
      const newRotation = currentRotation + deltaX * sensitivity
      rotationY.set(newRotation)
      setCurrentRotation(newRotation)
    },
    [isDragging, currentRotation, rotationY]
  )

  // Handle drag start
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  // Handle drag end (snap to nearest side)
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    const closestPosition = findClosestStablePosition(currentRotation)
    setTargetRotation(closestPosition)

    const duration = 0.4
    const startTime = Date.now()
    const startRotation = currentRotation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const newRotation = startRotation + (closestPosition - startRotation) * easeOut

      rotationY.set(newRotation)
      setCurrentRotation(newRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        rotationY.set(closestPosition)
        setCurrentRotation(closestPosition)
      }
    }

    requestAnimationFrame(animate)
  }, [currentRotation, rotationY])

  // Reset when image changes
  useEffect(() => {
    setCurrentRotation(0)
    setTargetRotation(0)
    rotationY.set(0)
  }, [imageUrl, rotationY])

  const isBackVisible = getVisibleSide(currentRotation) === "back"

  // Notify parent when side changes
  useEffect(() => {
    if (onSideChange) {
      onSideChange(isBackVisible ? "back" : "front")
    }
  }, [isBackVisible, onSideChange])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none"
        style={{
          transformStyle: "preserve-3d",
          rotateY: rotationY,
        }}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: isDragging ? 1 : 1.02 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <PostcardFront imageUrl={imageUrl} mood={mood} location={location} />
        </div>
  
        {/* Back Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <PostcardBack
            note={note}
            onNoteChange={onNoteChange || (() => {})}
            mood={mood}
            onMoodChange={onMoodChange || (() => {})}
            location={location}
            onLocationChange={onLocationChange || (() => {})}
            isReadOnly={isReadOnly}
          />
        </div>
      </motion.div>
  
      {/* Rotation hint */}
      {!isDragging && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-xs">↔</span>
              <span>Swipe left or right to rotate</span>
            </div>
          </div>
        </div>
      )}
  
      {/* Rotation indicator */}
      {isDragging && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-sm border border-primary/20">
            <span>Rotating... {Math.round(currentRotation)}°</span>
          </div>
        </div>
      )}
    </div>
  )
}
