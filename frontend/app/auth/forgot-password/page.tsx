import { SignIn } from "@clerk/nextjs"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SignIn 
        routing="path" 
        path="/auth/forgot-password"
        signUpUrl="/auth/signup"
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            card: "shadow-lg",
            headerTitle: "text-2xl font-semibold",
            headerSubtitle: "text-muted-foreground",
          }
        }}
        initialValues={{
          emailAddress: "",
        }}
      />
    </div>
  )
}
