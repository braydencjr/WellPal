"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface OnboardingData {
  personalInfo?: {
    firstName?: string
    lastName?: string
    university?: string
    faculty?: string
    year?: string
    language?: string
    crisisHotlineCountry?: string
    emergencyContactName?: string
    emergencyContactPhone?: string
  }
  mentalHealth?: {
    hasMentalHealth?: boolean
    conditions?: string[]
  }
  accessibility?: {
    hasDyslexia?: boolean
    hasColorBlindness?: boolean
  }
  preferences?: {
    calmingTheme?: string
    theme?: string
    notificationPreferences?: string[]
    moodCheckInTime?: string
    calendarSync?: boolean
    healthDataSync?: boolean
    haptics?: boolean
    sounds?: boolean
  }
}

interface OnboardingContextType {
  data: OnboardingData
  updateData: (newData: Partial<OnboardingData>) => void
  updatePersonalInfo: (info: OnboardingData['personalInfo']) => void
  updateMentalHealth: (health: OnboardingData['mentalHealth']) => void
  updateAccessibility: (accessibility: OnboardingData['accessibility']) => void
  updatePreferences: (preferences: OnboardingData['preferences']) => void
  resetData: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({})

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }))
  }

  const updatePersonalInfo = (info: OnboardingData['personalInfo']) => {
    setData(prev => ({ ...prev, personalInfo: info }))
  }

  const updateMentalHealth = (health: OnboardingData['mentalHealth']) => {
    setData(prev => ({ ...prev, mentalHealth: health }))
  }

  const updateAccessibility = (accessibility: OnboardingData['accessibility']) => {
    setData(prev => ({ ...prev, accessibility: accessibility }))
  }

  const updatePreferences = (preferences: OnboardingData['preferences']) => {
    setData(prev => ({ ...prev, preferences: preferences }))
  }

  const resetData = () => {
    setData({})
  }

  return (
    <OnboardingContext.Provider value={{
      data,
      updateData,
      updatePersonalInfo,
      updateMentalHealth,
      updateAccessibility,
      updatePreferences,
      resetData
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
