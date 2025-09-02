"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface EmergencyContact {
  name: string
  countryCode: string
  phoneNumber: string
}

export interface UserProfile {
  id: string
  name: string
  title: string
  avatar?: string
  email: string
  username: string
  memberSince: string
  university?: string
  emergencyContact?: EmergencyContact
  notifications: {
    reminders: boolean
    wellnessCheckins: boolean
    moodTracking: boolean
    emailNotifications: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends'
    dataSharing: boolean
    analytics: boolean
  }
}

interface UserContextType {
  user: UserProfile
  updateUser: (updates: Partial<UserProfile>) => void
  updateEmergencyContact: (contact: EmergencyContact) => void
  updateNotifications: (notifications: Partial<UserProfile['notifications']>) => void
  updatePrivacy: (privacy: Partial<UserProfile['privacy']>) => void
  resetPassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}

const defaultUser: UserProfile = {
  id: '1',
  name: 'Alex Johnson',
  title: 'University Student',
  email: 'alex.johnson@university.edu',
  username: 'alexj2024',
  memberSince: 'October 2024',
  university: 'University of Technology',
  notifications: {
    reminders: true,
    wellnessCheckins: true,
    moodTracking: true,
    emailNotifications: false
  },
  privacy: {
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser)

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const updateEmergencyContact = (contact: EmergencyContact) => {
    setUser(prev => ({ ...prev, emergencyContact: contact }))
  }

  const updateNotifications = (notifications: Partial<UserProfile['notifications']>) => {
    setUser(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications }
    }))
  }

  const updatePrivacy = (privacy: Partial<UserProfile['privacy']>) => {
    setUser(prev => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacy }
    }))
  }

  const resetPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, this would make an API call
        resolve(true)
      }, 1000)
    })
  }

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      updateEmergencyContact,
      updateNotifications,
      updatePrivacy,
      resetPassword
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
