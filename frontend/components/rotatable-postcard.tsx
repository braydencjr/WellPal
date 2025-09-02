"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
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
  onSideChange?: (side: 'front' | 'back') => void
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
  className = ""
}: RotatablePostcardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationX = useMotionValue(0)
  const rotationY = useMotionValue(0)
  
  // Transform rotation values to degrees
  const rotateY = useTransform(rotationY, [-1, 1], [-180, 180])
  
  // Calculate which side should be visible based on rotation
  const getVisibleSide = (rotation: number) => {
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((rotation % 360) + 360) % 360
    // Front side is visible when rotation is between -90 and 90 degrees
    // Back side is visible when rotation is between 90 and 270 degrees
    // Also handle full rotations (360°, -360°, etc.)
    if (normalizedRotation >= 90 && normalizedRotation <= 270) {
      return 'back'
    } else {
      return 'front'
    }
  }
  
  // Helper function to find the closest stable rotation position
  const findClosestStablePosition = (rotation: number) => {
    // Find the closest multiple of 180 degrees
    // This allows for natural rotation in both directions without forcing snap-back
    
    // Calculate all possible stable positions
    const positions = []
    
    // Add positions in both positive and negative directions
    for (let i = -4; i <= 4; i++) {
      positions.push(i * 180)        // Front positions: 0°, ±180°, ±360°, ±540°, ±720°
      positions.push(i * 180 + 180)  // Back positions: 180°, ±360°+180°, ±540°+180°, ±720°+180°
    }
    
    // Find the closest position
    let closestPosition = 0
    let minDistance = Math.abs(rotation - 0)
    
    positions.forEach(pos => {
      const distance = Math.abs(rotation - pos)
      if (distance < minDistance) {
        minDistance = distance
        closestPosition = pos
      }
    })
    
    return closestPosition
  }
  
  // Handle pan gesture
  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!isDragging) return
    
    // Only allow horizontal movement (Y-axis rotation)
    const deltaX = info.delta.x
    const sensitivity = 1.0 // Increased sensitivity for more responsive rotation
    
    // Update rotation based on horizontal movement
    const newRotation = currentRotation + (deltaX * sensitivity)
    
    // Allow unlimited rotation in both directions
    rotationY.set(newRotation / 180) // Normalize to -1 to 1 range
    setCurrentRotation(newRotation)
  }, [isDragging, currentRotation, rotationY])
  
  // Handle pan start
  const handlePanStart = useCallback(() => {
    setIsDragging(true)
  }, [])
  
  // Handle pan end
  const handlePanEnd = useCallback(() => {
    setIsDragging(false)
    
    // Use the helper function to find the closest stable position
    const closestPosition = findClosestStablePosition(currentRotation)
    
    setTargetRotation(closestPosition)
    
    // Smooth animation to target rotation
    const animateToTarget = () => {
      const duration = 0.4
      const startTime = Date.now()
      const startRotation = currentRotation
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const newRotation = startRotation + (closestPosition - startRotation) * easeOut
        rotationY.set(newRotation / 180)
        setCurrentRotation(newRotation)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Ensure we end up exactly at the target rotation
          rotationY.set(closestPosition / 180)
          setCurrentRotation(closestPosition)
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    animateToTarget()
  }, [currentRotation, rotationY])
  
  // Reset rotation when props change
  useEffect(() => {
    setCurrentRotation(0)
    setTargetRotation(0)
    rotationY.set(0)
  }, [imageUrl, rotationY])
  
  const isBackVisible = getVisibleSide(currentRotation) === 'back'
  
  // Notify parent component when side changes
  useEffect(() => {
    if (onSideChange) {
      onSideChange(isBackVisible ? 'back' : 'front')
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
          rotateY: rotateY
        }}
        onPan={handlePan}
        onPanStart={handlePanStart}
        onPanEnd={handlePanEnd}
        whileHover={{ scale: isDragging ? 1 : 1.02 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <PostcardFront 
            imageUrl={imageUrl} 
            mood={mood} 
            location={location} 
          />
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
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
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
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-sm border border-primary/20">
            <span>Rotating... {Math.round(currentRotation)}°</span>
          </div>
        </div>
      )}
      
      {/* Debug info - remove this in production */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
          {Math.round(currentRotation)}° - {isBackVisible ? 'Back' : 'Front'}
        </div>
      </div>
      
      {/* Additional debug info */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
          Target: {Math.round(targetRotation)}° | Closest: {Math.round(findClosestStablePosition(currentRotation))}°
        </div>
      </div>
    </div>
  )
}
