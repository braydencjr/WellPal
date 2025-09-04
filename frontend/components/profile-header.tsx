"use client"

import { Card } from "@/components/ui/card"
import { User, Camera } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export function ProfileHeader() {
  const { user } = useUser()

  if (!user) return null

  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }) : 'Unknown'

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 overflow-hidden">
            {user.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-muted-foreground/50" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
          <p className="text-xs text-muted-foreground mt-1">ID: {user.id}</p>
        </div>
      </div>
    </Card>
  )
}
