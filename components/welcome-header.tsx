export function WelcomeHeader() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground mb-2">{greeting}, Alex</h1>
      <p className="text-muted-foreground leading-relaxed">
        How are you feeling today? Take a moment to check in with yourself.
      </p>
    </div>
  )
}
