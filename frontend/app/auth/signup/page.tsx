import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "border-0 shadow-lg",
              headerTitle: "text-2xl font-semibold",
              headerSubtitle: "text-muted-foreground",
            }
          }}
          routing="path"
          path="/auth/signup"
          redirectUrl="/onboarding"
          signInUrl="/auth/signin"
        />
      </div>
    </div>
  )
}
