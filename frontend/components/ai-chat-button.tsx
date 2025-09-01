/*
 * AI Chat Companion floating action button
 */

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

interface AIChatButtonProps {
  className?: string;
}

export function AIChatButton({ className = "" }: AIChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleChatClick = () => {
    router.push('/chat');
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Button
        onClick={handleChatClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 p-0 overflow-hidden group"
        aria-label="AI Chat Companion"
      >
        {/* AI Companion Button Icon */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/assets/ai-companion-button.png"
            alt="AI Companion"
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 animate-pulse" />
      </Button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transform transition-all duration-200 animate-in slide-in-from-bottom-1">
          AI Wellness Companion
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

export default AIChatButton;
