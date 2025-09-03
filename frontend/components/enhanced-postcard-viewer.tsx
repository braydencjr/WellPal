"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostcardEntry } from "@/lib/photobook-store"
import { RotatablePostcard } from "@/components/rotatable-postcard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EnhancedPostcardViewerProps {
  isOpen: boolean
  onClose: () => void
  onDelete: (postcardId: string) => void
  postcard: PostcardEntry | null
}

export function EnhancedPostcardViewer({ 
  isOpen, 
  onClose, 
  onDelete, 
  postcard 
}: EnhancedPostcardViewerProps) {
  const [isBackVisible, setIsBackVisible] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [showArrowHint, setShowArrowHint] = useState(true)

  // Reset state when postcard changes or viewer closes
  useEffect(() => {
    if (!isOpen) {
      setIsBackVisible(false)
      setShowArrowHint(true)
    }
  }, [isOpen])

  const handleSideChange = (side: 'front' | 'back') => {
    setIsBackVisible(side === 'back')
  }

  const handleDelete = () => {
    if (postcard) {
      onDelete(postcard.id)
      setShowDeleteConfirm(false)
      onClose()
    }
  }

  if (!postcard) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-transparent"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Postcard Container */}
              <div 
                ref={containerRef}
                className="relative w-full aspect-[3/2] mb-6"
                style={{ perspective: "1200px" }}
              >
                {/* Floating Arrow Hint */}
                <AnimatePresence>
                  {showArrowHint && (
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rotatable Postcard */}
                <RotatablePostcard
                  imageUrl={postcard.imageDataUrl}
                  mood={postcard.mood}
                  location={postcard.location || ""}
                  note={postcard.note}
                  onNoteChange={() => {}} // Read-only in viewer
                  onMoodChange={() => {}} // Read-only in viewer
                  onLocationChange={() => {}} // Read-only in viewer
                  onSideChange={handleSideChange}
                  isReadOnly={true}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 py-3"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
                
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  className="flex-1 py-3"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Postcard</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this postcard? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
