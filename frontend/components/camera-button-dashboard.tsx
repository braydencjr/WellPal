"use client"

import { useRef, useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function CameraButton() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(s)
      setShowCamera(true)
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = s
      })
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0)
        setCapturedImage(canvasRef.current.toDataURL("image/png"))
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Camera Button */}
      <Button
        onClick={startCamera}
        className="p-4 rounded-full shadow-md"
        style={{ backgroundColor: "oklch(51.141% 0.10725 56.174)" }}
      >
        {/* icon slightly lower */}
        <Camera className="w-6 h-6 text-black translate-y-0.5" />
      </Button>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={stopCamera}
          >
            <motion.div
              className="w-full max-w-sm bg-card rounded-xl p-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
              />
              <div className="flex gap-3 mt-3">
                <Button
                  onClick={capturePhoto}
                  className="flex-1 py-3"
                >
                  Capture
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="secondary"
                  className="flex-1 py-3"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Show captured photo */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-64 h-48 rounded-lg shadow-md object-cover"
        />
      )}
    </div>
  )
}
