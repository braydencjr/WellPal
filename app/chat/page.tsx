import { ChatInterface } from "@/components/chat-interface"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-card">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Wellness Companion</h1>
              <p className="text-sm text-muted-foreground">Here to listen and support you</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface />

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />
      </div>
    </div>
  )
}
