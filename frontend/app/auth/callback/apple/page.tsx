"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AppleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const error = searchParams.get("error")

      if (error) {
        setStatus("error")
        setMessage(`Authentication failed: ${error}`)
        setTimeout(() => router.push("/auth/signin"), 3000)
        return
      }

      if (!code) {
        setStatus("error")
        setMessage("No authorization code received")
        setTimeout(() => router.push("/auth/signin"), 3000)
        return
      }

      try {
        // In a real app, you would send the code to your backend
        // For demo purposes, we'll simulate success
        setStatus("success")
        setMessage("Authentication successful! Redirecting...")
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Redirect to dashboard
        router.push("/dashboard")
      } catch (err) {
        setStatus("error")
        setMessage("Failed to complete authentication")
        setTimeout(() => router.push("/auth/signin"), 3000)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Completing Apple Sign In</h2>
            <p className="text-muted-foreground">Please wait while we authenticate your account...</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-green-600">Success!</h2>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
        
        {status === "error" && (
          <>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-red-600">Authentication Failed</h2>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
      </Card>
    </div>
  )
}
