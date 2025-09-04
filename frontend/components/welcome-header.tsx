"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WelcomeHeader() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If user is signed in, check onboarding status and redirect
    const checkUserStatus = async () => {
      if (isSignedIn && user) {
        const hasCompletedOnboarding = user.unsafeMetadata?.onboardingCompleted
        
        if (hasCompletedOnboarding) {
          // Returning user - go to dashboard
          router.push("/dashboard")
        } else {
          // New user - go to onboarding
          router.push("/onboarding")
        }
      }
    }

    // Add a small delay to prevent immediate redirect
    const timeout = setTimeout(checkUserStatus, 1000)
    return () => clearTimeout(timeout)
  }, [isSignedIn, user, router])

  const handleGetStarted = () => {
    setIsLoading(true)
    router.push("/auth/signup")
  }

  const handleSignIn = () => {
    setIsLoading(true)
    router.push("/auth/signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center shadow-lg">
            <Image
              src="/assets/logo.JPG"
              alt="WellPal Logo"
              width={60}
              height={60}
              className="rounded-full object-cover"
              onError={() => console.log("Logo failed to load")}
            />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            WellPal: click !
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your personal mental wellness companion for university life
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Track your daily mood and emotions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-gray-700">Access stress relief tools and techniques</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-700">Connect with support when you need it</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={handleGetStarted}
            className="w-full h-14 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Started"}
          </Button>
          
          <Button 
            onClick={handleSignIn}
            variant="outline"
            className="w-full h-14 rounded-xl text-gray-700 border-gray-300 hover:bg-gray-50 text-lg font-medium"
            disabled={isLoading}
          >
            I already have an account
          </Button>
        </div>

        {/* Terms */}
        <p className="text-sm text-gray-500 mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="text-orange-600 underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-orange-600 underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
