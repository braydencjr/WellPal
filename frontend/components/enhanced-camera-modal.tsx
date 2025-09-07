"use client"

import { useRef, useState, useEffect } from "react"
import { Camera, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface EnhancedCameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (imageDataUrl: string) => void
}

export function EnhancedCameraModal({ isOpen, onClose, onCapture }: EnhancedCameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isOpen])

  const startCamera = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      }

      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(newStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Unable to access camera. Please check permissions.")
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setError(null)
  }

  const switchCamera = async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(newFacingMode)
    
    // Restart camera with new facing mode
    if (isOpen) {
      await startCamera()
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && stream) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        const video = videoRef.current
        const { videoWidth, videoHeight } = video
        
        // Set canvas dimensions to match video
        canvasRef.current.width = videoWidth
        canvasRef.current.height = videoHeight
        
        // Draw the video frame to canvas
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
        
        // Convert to data URL and capture
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9)
        onCapture(imageDataUrl)
        onClose()
      }
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-gray-200/70 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-card rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Take Photo</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Camera View */}
            <div className="relative bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="flex flex-col items-center gap-3 text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-sm">Starting camera...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="text-center text-white p-4">
                    <p className="text-sm mb-3">{error}</p>
                    <Button onClick={startCamera} variant="secondary" size="sm">
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-[4/3] object-cover"
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)' }}
              />

              {/* Camera Controls Overlay */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={switchCamera}
                  className="h-10 w-10 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-3">
              <Button
                onClick={capturePhoto}
                disabled={!stream || isLoading}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <Camera className="h-5 w-5 mr-2" />
                Capture Photo
              </Button>
              
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full py-3"
              >
                Cancel
              </Button>
            </div>
          </motion.div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}