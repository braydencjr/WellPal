import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import WelcomePage from "./auth/welcome/page"

export default function HomePage() {
  return (
    <>
      <SignedIn>
        {redirect("/dashboard")}
      </SignedIn>
      
      <SignedOut>
        <WelcomePage />
      </SignedOut>
    </>
  )
}
