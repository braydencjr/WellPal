"use client"

import { useEffect, useState, useRef } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { addPostcard, loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { EnhancedCameraModal } from "@/components/enhanced-camera-modal"
import { EnhancedPostcardModal } from "@/components/enhanced-postcard-modal"
import { EnhancedPhotobook } from "@/components/enhanced-photobook"
import { EnhancedPostcardViewer } from "@/components/enhanced-postcard-viewer"
import { MemoriesDogAnimation } from "@/components/memories-dog-animation"
import { useStreak } from "@/hooks/use-streak" // adjust path if needed

export default function MemoriesPage() {
  const { streak, updateStreak } = useStreak() // get hook
  const [entries, setEntries] = useState<PostcardEntry[]>([])
  const [showCamera, setShowCamera] = useState(false)
  const [showPostcardCreation, setShowPostcardCreation] = useState(false)
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardEntry | null>(null)
  const [capturedImage, setCapturedImage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEntries(loadPhotobook())
  }, [])

  // Open camera modal
  const startCamera = () => {
    setShowCamera(true)
  }

  // Handle file selection fallback
  const handleFile = (file?: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCapturedImage(String(reader.result))
      setShowPostcardCreation(true)
    }
    reader.readAsDataURL(file)
  }

  // Handle snapshot from camera modal
  const handlePhotoCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl)
    setShowPostcardCreation(true)
  }

  // Save postcard
  const handlePostcardSave = (note: string, mood: string, location: string) => {
    const saved = addPostcard({ imageDataUrl: capturedImage, note, mood, location })
    setEntries(prev => [saved, ...prev])
    setCapturedImage("")
    setShowPostcardCreation(false)

    updateStreak()
    console.log("Streak updated:", streak)
  }

  // Open postcard viewer
  const handlePostcardClick = (postcard: PostcardEntry) => {
    setSelectedPostcard(postcard)
  }

  // Delete postcard
  const handlePostcardDelete = (postcardId: string) => {
    const updatedEntries = entries.filter(e => e.id !== postcardId)
    setEntries(updatedEntries)
    localStorage.setItem('wellpal_photobook_v1', JSON.stringify(updatedEntries))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card relative pb-24">
        <div className="px-6 pt-10 pb-4">
          <h1 className="text-2xl font-semibold">Memories</h1>
          <p className="text-muted-foreground">Create and revisit your Dear Moments</p>
        </div>

        {/* Photo Creation Section */}
        <div className="px-6 space-y-6">
          <div className="p-6 rounded-xl bg-muted/60 postcard-texture text-center space-y-4">
            <p className="text-muted-foreground">Start by choosing a photo</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startCamera}
                className="rounded-lg py-4 bg-card glow-border transition hover:opacity-90"
              >
                Take Photo
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg py-4 bg-card glow-border transition hover:opacity-90"
              >
                Select from Gallery
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {/* Photobook */}
          <EnhancedPhotobook entries={entries} onPostcardClick={handlePostcardClick} />

          {/* Insights Section */}
          <div className="pt-6">
            <InsightsSection />
          </div>
        </div>

        {/* Camera Modal */}
        <EnhancedCameraModal
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          onCapture={handlePhotoCapture}
        />

        {/* Postcard Creation Modal */}
        <EnhancedPostcardModal
          isOpen={showPostcardCreation}
          onClose={() => setShowPostcardCreation(false)}
          onSave={handlePostcardSave}
          imageUrl={capturedImage}
        />

        {/* Postcard Viewer Modal */}
        <EnhancedPostcardViewer
          isOpen={!!selectedPostcard}
          onClose={() => setSelectedPostcard(null)}
          onDelete={handlePostcardDelete}
          postcard={selectedPostcard}
        />
      </div>

      <BottomNavigation activeTab="memories" />
      
      {/* Memories Dog Animation fixed in bottom-right corner of app container */}
      <div 
        className="fixed bottom-16 z-50"
        style={{
          right: `max(1rem, calc(50vw - 192px + 1rem))`
        }}
      >
        <MemoriesDogAnimation />
      </div>
    </div>
  )
}

// Insights Section
function InsightsSection() {
  const { streak } = useStreak()
  const insights = [
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <path fill="currentColor" d="M3 3h2v14H3zM7 13h2v4H7zM11 9h2v8h-2zM15 5h2v12h-2zM19 11h2v6h-2z"/>
        </svg>
      ),
      title: "Weekly Trend",
      value: "Improving",
      description: "Your mood has been trending upward this week",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <path fill="currentColor" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
        </svg>
      ),
      title: "Check-in Streak",
      value: `${streak.currentStreak} day${streak.currentStreak !== 1 ? "s" : ""}`,
      description: "Great job staying consistent with daily check-ins",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/>
          <path d="M8 12h8M12 8v8" stroke="currentColor"/>
        </svg>
      ),
      title: "Most Common",
      value: "Good",
      description: "Your most frequent mood this month",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Insights</h2>
      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight) => (
          <div key={insight.title} className="p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center`}>
                <insight.icon className={`${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">{insight.title}</h3>
                  <span className={`text-sm font-semibold ${insight.color}`}>{insight.value}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
