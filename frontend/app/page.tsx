import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const { userId } = await auth()
  
  if (userId) {
    // User is signed in, redirect to dashboard
    redirect("/dashboard")
  } else {
    // User is not signed in, redirect to welcome page
    redirect("/auth/welcome")
  }
}
