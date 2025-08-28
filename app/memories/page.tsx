"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PostcardFront } from "@/components/postcard/PostcardFront"
import { PostcardBack } from "@/components/postcard/PostcardBack"
import { PostcardFlip } from "@/components/postcard/PostcardFlip"
import { addPostcard, loadPhotobook, PostcardEntry } from "@/lib/photobook-store"
import { AnimatePresence, motion } from "framer-motion"

export default function MemoriesPage() {
  const [entries, setEntries] = useState<PostcardEntry[]>([])
  const [step, setStep] = useState<"choose" | "transform" | "edit">("choose")
  const [imageUrl, setImageUrl] = useState("")
  const [note, setNote] = useState("")
  const [mood, setMood] = useState("🙂")
  const [location, setLocation] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)
  const [detail, setDetail] = useState<PostcardEntry | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => { setEntries(loadPhotobook()) }, [])
  useEffect(() => {
    if (step === "transform") {
      const t = setTimeout(() => setStep("edit"), 900)
      return () => clearTimeout(t)
    }
  }, [step])

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
      setStream(s)
      setShowCamera(true)
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = s
      })
    } catch (e) {
      fileInputRef.current?.click()
    }
  }

  const takeSnapshot = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(video, 0, 0)
    const data = canvas.toDataURL("image/jpeg", 0.92)
    setImageUrl(data)
    stopCamera()
    setStep("transform")
    setTimeout(() => setIsFlipped(true), 1100)
  }

  const stopCamera = () => {
    setShowCamera(false)
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
    }
  }

  const handleFile = (file?: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(String(reader.result))
      setStep("transform")
      setTimeout(() => setIsFlipped(true), 1100)
    }
    reader.readAsDataURL(file)
  }

  const onSave = () => {
    if (!imageUrl) return
    const saved = addPostcard({ imageDataUrl: imageUrl, note, mood, location })
    setEntries(prev => [saved, ...prev])
    setStep("choose"); setImageUrl(""); setNote(""); setLocation(""); setMood("🙂"); setIsFlipped(false)
  }

  const grid = useMemo(() => entries, [entries])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card pb-24">
        <div className="px-6 pt-10 pb-4">
          <h1 className="text-2xl font-semibold">Memories</h1>
          <p className="text-muted-foreground">Create and revisit your Dear Moments</p>
        </div>

        <div className="px-6 space-y-6">
          <AnimatePresence mode="wait">
            {step === "choose" && (
              <motion.div key="choose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-xl bg-muted/60 postcard-texture text-center space-y-4">
                <p className="text-muted-foreground">Start by choosing a photo</p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={startCamera} className="rounded-lg py-4 bg-card glow-border transition hover:opacity-90">Take Photo</button>
                  <button onClick={() => fileInputRef.current?.click()} className="rounded-lg py-4 bg-card glow-border transition hover:opacity-90">Select from Gallery</button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              </motion.div>
            )}

            {step !== "choose" && (
              <motion.div key="canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="mb-3" initial={step === "transform" ? { filter: "brightness(0.95)", y: 8 } : false} animate={step === "transform" ? { filter: ["brightness(0.95)", "brightness(1.05)", "brightness(1)"], y: [8, -2, 0] } : undefined} transition={{ duration: 0.9, ease: "easeOut" }}>
                  <PostcardFlip
                    isFlipped={isFlipped}
                    onToggle={() => setIsFlipped((v) => !v)}
                    front={<PostcardFront imageUrl={imageUrl} mood={mood} location={location} />}
                    back={<div onClick={(e) => e.stopPropagation()}><PostcardBack note={note} onNoteChange={setNote} mood={mood} onMoodChange={setMood} location={location} onLocationChange={setLocation} /></div>}
                  />
                </motion.div>
                {step === "edit" && (
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsFlipped((v) => !v)} className="flex-1 rounded-lg py-3 bg-secondary">Flip</button>
                    <button onClick={onSave} className="flex-1 rounded-lg py-3 bg-primary text-primary-foreground">Save</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-base font-semibold mb-2">Your Photobook</h2>
          <button onClick={() => setDetail({ id: "__album__", dateISO: new Date().toISOString(), imageDataUrl: "", note: "", mood: "", location: "" })} className="block">
            <div className="relative w-24 h-24 group">
              <img src="/assets/closebook.PNG" alt="Album closed" className="absolute inset-0 w-full h-full object-contain transition-all duration-200 group-hover:opacity-0" />
              <img src="/assets/openbook.PNG" alt="Album open" className="absolute inset-0 w-full h-full object-contain opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110" />
            </div>
          </button>
        </div>

        {/* Insights below album */}
        <div className="px-6 pt-6">
          <InsightsSection />
        </div>

        <AnimatePresence>
          {showCamera && (
            <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={stopCamera}>
              <motion.div className="w-full max-w-sm bg-card rounded-xl p-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
                <div className="flex gap-3 mt-3">
                  <button onClick={takeSnapshot} className="flex-1 rounded-lg py-3 bg-primary text-primary-foreground">Capture</button>
                  <button onClick={stopCamera} className="flex-1 rounded-lg py-3 bg-secondary">Cancel</button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {detail && (
            <motion.div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetail(null)}>
              <motion.div className="w-full max-w-sm bg-card rounded-xl p-4 space-y-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                {detail.id === "__album__" ? (
                  <div>
                    <div className="text-sm text-muted-foreground mb-3">Album</div>
                    <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                      {grid.map((p) => (
                        <button key={p.id} onClick={() => setDetail(p)} className="block">
                          <PostcardFront imageUrl={p.imageDataUrl} mood={p.mood} location={p.location} />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <PostcardFront imageUrl={detail.imageDataUrl} mood={detail.mood} location={detail.location} />
                    <div className="rounded-xl p-4 bg-muted">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-muted-foreground">Back</div>
                        <button 
                          onClick={() => {
                            const updatedEntries = entries.filter(e => e.id !== detail.id)
                            setEntries(updatedEntries)
                            localStorage.setItem('wellpal_photobook_v1', JSON.stringify(updatedEntries))
                            setDetail(null)
                          }}
                          className="text-xs text-destructive hover:text-destructive/80"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="rounded-xl bg-card lined-paper p-4 min-h-[120px]">
                        <div className="whitespace-pre-wrap leading-7 font-handwrite">{detail.note || "(No note)"}</div>
                        {detail.location ? (
                          <div className="mt-2 text-right text-sm font-handwrite">{detail.location}</div>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNavigation activeTab="memories" />
    </div>
  )
}

// Inline Insights component per request
function InsightsSection() {
  const insights = [
    {
      icon: (props: any) => (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M3 3h2v14H3zM7 13h2v4H7zM11 9h2v8h-2zM15 5h2v12h-2zM19 11h2v6h-2z"/></svg>),
      title: "Weekly Trend",
      value: "Improving",
      description: "Your mood has been trending upward this week",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: (props: any) => (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>),
      title: "Check-in Streak",
      value: "7 days",
      description: "Great job staying consistent with daily check-ins",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: (props: any) => (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor"/></svg>),
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


