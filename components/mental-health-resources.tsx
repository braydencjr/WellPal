"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Smartphone, Heart, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const resources = [
  {
    title: "Support Communities",
    description: "Connect with others who understand your experiences",
    icon: Users,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    items: [
      {
        name: "Student Support Forum",
        url: "https://www.mysuara.org.my/forum",
        description: "A safe space for Malaysian students to share experiences and support each other",
      },
      {
        name: "Anxiety Support Group",
        url: "https://www.mymind.org.my/anxiety-support",
        description: "Weekly virtual meetings for those dealing with anxiety disorders",
      },
      {
        name: "Depression Community",
        url: "https://www.befrienders.org.my/depression-community",
        description: "Peer support and resources for managing depression",
      },
    ],
    additionalItems: [
      {
        name: "LGBTQ+ Support Network",
        url: "https://www.ptfmalaysia.org/support",
        description: "Safe community for LGBTQ+ individuals seeking mental health support",
      },
      {
        name: "International Students Support",
        url: "https://www.um.edu.my/international-support",
        description: "Specialized support for international students facing cultural adjustment",
      },
      {
        name: "Grief Support Circle",
        url: "https://www.hospis.org.my/grief-support",
        description: "Support for those dealing with loss and bereavement",
      },
    ],
  },
  {
    title: "Wellness Apps",
    description: "Recommended apps for meditation and mindfulness",
    icon: Smartphone,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    items: [
      {
        name: "Headspace for Students",
        url: "https://www.headspace.com/studentplan",
        description: "Free meditation and mindfulness app with student discount",
      },
      {
        name: "Calm",
        url: "https://www.calm.com/",
        description: "Sleep stories, meditation, and relaxation techniques",
      },
      {
        name: "Insight Timer",
        url: "https://insighttimer.com/",
        description: "Free meditation app with guided sessions and timer",
      },
    ],
    additionalItems: [
      {
        name: "Sanvello",
        url: "https://www.sanvello.com/",
        description: "Anxiety and mood tracking with coping tools",
      },
      {
        name: "Youper",
        url: "https://www.youper.ai/",
        description: "AI-powered emotional health assistant",
      },
      {
        name: "MindShift",
        url: "https://www.anxietycanada.com/resources/mindshift-app/",
        description: "CBT-based app for managing anxiety and worry",
      },
    ],
  },
  {
    title: "Self-Care Guides",
    description: "Practical tips for maintaining your mental health",
    icon: Heart,
    color: "text-accent",
    bgColor: "bg-accent/10",
    items: [
      {
        name: "Daily Self-Care Routine",
        url: "https://www.myhealth.gov.my/en/daily-self-care-routine/",
        description: "Malaysian health ministry guide to daily wellness practices",
      },
      {
        name: "Stress Management",
        url: "https://www.who.int/news-room/feature-stories/detail/managing-stress-in-times-of-covid-19",
        description: "WHO guidelines for managing stress and maintaining mental health",
      },
      {
        name: "Coping with Loneliness",
        url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/loneliness/about-loneliness/",
        description: "Practical strategies for dealing with isolation and loneliness",
      },
    ],
    additionalItems: [
      {
        name: "Sleep Hygiene Guide",
        url: "https://www.sleepfoundation.org/sleep-hygiene",
        description: "Evidence-based tips for better sleep and mental health",
      },
      {
        name: "Mindful Eating Practices",
        url: "https://www.health.harvard.edu/blog/mindful-eating-may-help-with-weight-loss-201602039137",
        description: "Harvard guide to mindful eating for mental wellness",
      },
      {
        name: "Digital Detox Strategies",
        url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/digital-detox/art-20056508",
        description: "Mayo Clinic guide to managing screen time for better mental health",
      },
    ],
  },
]

export function MentalHealthResources() {
  const [expandedResources, setExpandedResources] = useState<{ [key: string]: boolean }>({})

  const toggleExpanded = (resourceTitle: string) => {
    setExpandedResources((prev) => ({
      ...prev,
      [resourceTitle]: !prev[resourceTitle],
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Mental Health Resources</h2>

      <div className="space-y-4">
        {resources.map((resource) => {
          const isExpanded = expandedResources[resource.title]
          const allItems = isExpanded ? [...resource.items, ...resource.additionalItems] : resource.items

          return (
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
                {allItems.map((item) => (
                  <div key={item.name} className="flex items-start justify-between py-2 px-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground block">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs ml-2"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => toggleExpanded(resource.title)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less Resources
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    View All Resources ({resource.additionalItems.length} more)
                  </>
                )}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
