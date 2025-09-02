"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChatInterface } from "@/components/chat-interface";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useTheme } from "next-themes";
import { useCalmingTheme } from "@/components/theme-provider";
import { apiClient } from "@/lib/api-client";

export default function ChatPage() {
  const [companionAvatar, setCompanionAvatar] = useState("ai-companion-1.png");
  const { theme } = useTheme();
  const { calmingTheme } = useCalmingTheme();

  // Get theme-based background with fallback
  const getThemeBackground = () => {
    const isDark = theme === 'dark';
    const currentTheme = calmingTheme || 'default';
    
    switch (currentTheme) {
      case 'soft-green':
        return isDark 
          ? 'bg-gradient-to-br from-green-900 to-emerald-900'
          : 'bg-gradient-to-br from-green-50 to-emerald-50';
      case 'calm-blue':
        return isDark
          ? 'bg-gradient-to-br from-blue-900 to-cyan-900'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50';
      case 'warm-beige':
        return isDark
          ? 'bg-gradient-to-br from-amber-900 to-orange-900'
          : 'bg-gradient-to-br from-amber-50 to-orange-50';
      default:
        // Use soft yellow/orange background for default theme
        return isDark
          ? 'bg-gradient-to-br from-yellow-900 to-orange-900'
          : 'bg-gradient-to-br from-yellow-50 to-orange-50';
    }
  };

  // Get header theme with fallback
  const getHeaderTheme = () => {
    const isDark = theme === 'dark';
    const currentTheme = calmingTheme || 'default';
    
    switch (currentTheme) {
      case 'soft-green':
        return isDark
          ? 'from-green-800/20 to-emerald-800/20 border-green-700/20'
          : 'from-green-500/10 to-emerald-500/10 border-green-200/20';
      case 'calm-blue':
        return isDark
          ? 'from-blue-800/20 to-cyan-800/20 border-blue-700/20'
          : 'from-blue-500/10 to-cyan-500/10 border-blue-200/20';
      case 'warm-beige':
        return isDark
          ? 'from-amber-800/20 to-orange-800/20 border-amber-700/20'
          : 'from-amber-500/10 to-orange-500/10 border-amber-200/20';
      default:
        // Use soft yellow/orange header for default theme
        return isDark
          ? 'from-yellow-800/20 to-orange-800/20 border-yellow-700/20'
          : 'from-yellow-500/10 to-orange-500/10 border-orange-200/20';
    }
  };

  useEffect(() => {
    // Get a random companion avatar on page load
    const getRandomAvatar = async () => {
      try {
        const response: any = await apiClient.getCompanionAvatar();
        if (response?.avatar) {
          setCompanionAvatar(response.avatar);
        }
      } catch (error) {
        console.error('Failed to get companion avatar:', error);
        // Fallback to random selection
        const avatars = ["ai-companion-1.png", "ai-companion-2.png", "ai-companion-3.png"];
        setCompanionAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
      }
    };

    getRandomAvatar();
  }, []);

  return (
    <div className={`min-h-screen ${getThemeBackground()}`}>
      <div className="max-w-sm mx-auto bg-card min-h-screen">
        {/* Header with AI Companion Avatar */}
        <div className={`px-6 pt-8 pb-4 border-b bg-gradient-to-r ${getHeaderTheme()}`}>
          <div className="flex items-center gap-4">
            {/* AI Companion Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-200 dark:border-gray-600 shadow-lg">
                <Image
                  src={`/assets/${companionAvatar}`}
                  alt="AI Wellness Companion"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={() => {
                    // Fallback if image fails to load
                    setCompanionAvatar("ai-companion-1.png");
                  }}
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
            </div>
            
            {/* Companion Info */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Wellness Companion</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Here to listen and support you</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Online now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="pb-20">
          <ChatInterface companionAvatar={companionAvatar} />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />
      </div>
    </div>
  );
}
