"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChatInterface } from "@/components/chat-interface";
import { BottomNavigation } from "@/components/bottom-navigation";
import { apiClient } from "@/lib/api-client";

export default function ChatPage() {
  const [companionAvatar, setCompanionAvatar] = useState("ai-companion-1.png");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-sm mx-auto bg-card min-h-screen">
        {/* Header with AI Companion Avatar */}
        <div className="px-6 pt-8 pb-4 border-b border-border/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <div className="flex items-center gap-4">
            {/* AI Companion Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 shadow-lg">
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
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" />
            </div>
            
            {/* Companion Info */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Wellness Companion</h1>
              <p className="text-sm text-gray-600">Here to listen and support you</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">Online now</span>
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
