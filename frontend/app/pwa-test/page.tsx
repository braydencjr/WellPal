import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Wifi, Smartphone } from "lucide-react"

export default function PWATestPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">PWA Installation & Testing</h1>
          <p className="text-muted-foreground">Test and install WellPal as a Progressive Web App</p>
        </div>

        <PWAInstallPrompt />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                PWA Features Enabled
              </CardTitle>
              <CardDescription>Your app now includes all essential PWA capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Web App Manifest</span>
                <Badge variant="secondary">✓ Configured</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Service Worker</span>
                <Badge variant="secondary">✓ Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Offline Support</span>
                <Badge variant="secondary">✓ Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>App Icons</span>
                <Badge variant="secondary">✓ Generated</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                Installation Instructions
              </CardTitle>
              <CardDescription>How to install on different platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Chrome/Edge (Desktop)</h4>
                <p className="text-sm text-muted-foreground">
                  Look for the install icon in the address bar or use the "Install WellPal" button above
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Safari (iOS)</h4>
                <p className="text-sm text-muted-foreground">Tap the share button and select "Add to Home Screen"</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Chrome (Android)</h4>
                <p className="text-sm text-muted-foreground">
                  Tap the menu and select "Add to Home screen" or use the install prompt
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-purple-600" />
              Test Offline Functionality
            </CardTitle>
            <CardDescription>Try these steps to test your PWA offline capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Install the app using the prompt above</li>
              <li>Open the installed app from your home screen or app drawer</li>
              <li>Turn off your internet connection or enable airplane mode</li>
              <li>Navigate through the app - it should still work offline</li>
              <li>Check browser DevTools → Application → Service Workers to see the active worker</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
