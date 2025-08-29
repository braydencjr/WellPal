"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Edit } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">Alex Johnson</h2>
          <p className="text-sm text-muted-foreground mb-2">University Student</p>
          <p className="text-xs text-muted-foreground">Member since October 2024</p>
        </div>
        <Button size="sm" variant="outline" className="bg-transparent">
          <Edit className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
