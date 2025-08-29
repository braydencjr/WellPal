"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Smartphone, Monitor, CheckCircle } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
    }
  }

  if (isStandalone || isInstalled) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            PWA Installed Successfully!
          </CardTitle>
          <CardDescription className="text-green-700">
            WellPal is now installed as a Progressive Web App on your device.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Install WellPal App
        </CardTitle>
        <CardDescription>Install WellPal as a Progressive Web App for the best experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {deferredPrompt ? (
            <Button onClick={handleInstallClick} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Install WellPal App
            </Button>
          ) : (
            <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg text-center">
              <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium mb-1">Ready to Install!</p>
              <p className="text-sm text-muted-foreground">
                Look for the install icon in your browser's address bar, or use your browser's menu to "Add to Home
                Screen"
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <Smartphone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Mobile Installation</p>
              <p className="text-sm text-muted-foreground">Add to home screen from browser menu</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <Monitor className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Desktop Installation</p>
              <p className="text-sm text-muted-foreground">Install from address bar or menu</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">PWA Features:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Works offline</li>
            <li>Fast loading</li>
            <li>Native app-like experience</li>
            <li>Push notifications (coming soon)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
