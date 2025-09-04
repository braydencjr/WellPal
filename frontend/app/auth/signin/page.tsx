import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "border-0 shadow-lg",
              headerTitle: "text-2xl font-semibold",
              headerSubtitle: "text-muted-foreground",
            }
          }}
          routing="path"
          path="/auth/signin"
          redirectUrl="/dashboard"
          signUpUrl="/auth/signup"
        />
      </div>
    </div>
  )
}
