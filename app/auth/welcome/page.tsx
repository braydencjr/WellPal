import { Button } from "@/frontend/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <SignedIn>
          {/* If user is signed in, redirect to dashboard */}
          {redirect("/dashboard")}
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
                <CardTitle className="text-2xl font-semibold text-amber-900">
                  WellPal
                </CardTitle>
                <CardDescription className="text-amber-700 mt-2">
                  Your personal mental wellness companion for university life
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 text-center text-sm text-amber-700">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span>Track your daily mood and emotions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Access stress relief tools and techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Connect with support when you need it</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <SignUpButton mode="redirect" redirectUrl="/onboarding">
                  <Button className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white">Get Started</Button>
                </SignUpButton>

                <SignInButton mode="redirect" redirectUrl="/dashboard">
                  <Button variant="outline" className="w-full h-12 bg-transparent border-amber-600 text-amber-700 hover:bg-amber-50">
                    I already have an account
                  </Button>
                </SignInButton>
              </div>

              <p className="text-xs text-amber-600 text-center pt-4">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-amber-800 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-800 hover:underline">
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
