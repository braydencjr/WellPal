"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Edit, Camera } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { ProfileEditModal } from "@/components/profile-edit-modal"

export function ProfileHeader() {
  const { user } = useUser()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!user) return null

  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }) : 'Unknown'

  return (
    <>
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
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-3 h-3 text-primary-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              {user.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
          </div>
          <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <ProfileEditModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  )
}
