import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <SignedIn>
          {/* If user is signed in, redirect to dashboard */}
          {redirect("/dashboard")}
        </SignedIn>
        
        <SignedOut>
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center space-y-4 pb-8 rounded-none overflow-visible">
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <Image
                  src="/assets/logo.JPG"
                  alt="WellPal Logo"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  WellPal: click !
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Your personal mental wellness companion for university life
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 text-center text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Track your daily mood and emotions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Access stress relief tools and techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Connect with support when you need it</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <SignUpButton mode="redirect" redirectUrl="/onboarding">
                  <Button className="w-full h-12">Get Started</Button>
                </SignUpButton>

                <SignInButton mode="redirect" redirectUrl="/dashboard">
                  <Button variant="outline" className="w-full h-12 bg-transparent">
                    I already have an account
                  </Button>
                </SignInButton>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-4">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
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
