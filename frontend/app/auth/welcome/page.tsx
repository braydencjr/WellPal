import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { CheckOnboarding } from "@/components/check-onboarding"
import Link from "next/link"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <SignedIn>
          {/* Check if user has completed onboarding */}
          <CheckOnboarding />
        </SignedIn>
        
        <SignedOut>
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="text-center space-y-4 pb-8 rounded-none overflow-visible">
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <Image
                  src="/logo.JPG"
                  alt="WellPal Logo"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  WellPal
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Your personal mental wellness companion for university life
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 text-center text-sm text-amber-800">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                  <span>Track your daily mood and emotions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                  <span>Access stress relief tools and techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                  <span>Connect with support when you need it</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <SignUpButton mode="redirect" redirectUrl="/onboarding">
                  <Button className="w-full h-12 bg-amber-800 hover:bg-amber-900 text-white">Get Started</Button>
                </SignUpButton>

                <SignInButton mode="redirect" redirectUrl="/auth/welcome">
                  <Button variant="outline" className="w-full h-12 bg-transparent border-black text-black hover:bg-gray-50">
                    I already have an account
                  </Button>
                </SignInButton>
              </div>

              <p className="text-xs text-gray-500 text-center pt-4">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-amber-700 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-700 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>
        </SignedOut>
      </div>
    </div>
  )
}
