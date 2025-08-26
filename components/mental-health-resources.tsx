import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Smartphone, Heart } from "lucide-react"

const resources = [
  {
    title: "Mental Health Articles",
    description: "Evidence-based articles on stress, anxiety, and wellness",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
    items: ["Managing Test Anxiety", "Sleep and Mental Health", "Building Resilience"],
  },
  {
    title: "Support Communities",
    description: "Connect with others who understand your experiences",
    icon: Users,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    items: ["Student Support Forum", "Anxiety Support Group", "Depression Community"],
  },
  {
    title: "Wellness Apps",
    description: "Recommended apps for meditation and mindfulness",
    icon: Smartphone,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    items: ["Headspace for Students", "Calm", "Insight Timer"],
  },
  {
    title: "Self-Care Guides",
    description: "Practical tips for maintaining your mental health",
    icon: Heart,
    color: "text-accent",
    bgColor: "bg-accent/10",
    items: ["Daily Self-Care Routine", "Stress Management", "Healthy Boundaries"],
  },
]

export function MentalHealthResources() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Mental Health Resources</h2>

      <div className="space-y-4">
        {resources.map((resource) => (
          <Card key={resource.title} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${resource.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <resource.icon className={`w-5 h-5 ${resource.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {resource.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                  <span className="text-sm text-foreground">{item}</span>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    View
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View All Resources
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
