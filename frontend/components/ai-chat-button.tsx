/*
 * AI Chat Companion floating action button
 */

"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCalmingTheme } from '@/components/theme-provider';

interface AIChatButtonProps {
  className?: string;
}

export function AIChatButton({ className = "" }: AIChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { calmingTheme } = useCalmingTheme();

  // Don't show the button on auth/onboarding pages
  const hideOnPages = ['/auth/welcome', '/auth/signin', '/auth/signup', '/onboarding'];
  const shouldHide = hideOnPages.some(page => pathname?.startsWith(page));

  if (shouldHide) {
    return null;
  }

  const handleChatClick = () => {
    router.push('/chat');
  };

  // Get theme-based colors with fallback
  const getThemeColors = () => {
    const isDark = theme === 'dark';
    const currentTheme = calmingTheme || 'default';
    
    switch (currentTheme) {
      case 'soft-green':
        return {
          gradient: isDark 
            ? 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            : 'from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600',
          pulse: isDark ? 'from-green-600 to-emerald-600' : 'from-green-400 to-emerald-500'
        };
      case 'calm-blue':
        return {
          gradient: isDark
            ? 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
            : 'from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600',
          pulse: isDark ? 'from-blue-600 to-cyan-600' : 'from-blue-400 to-cyan-500'
        };
      case 'warm-beige':
        return {
          gradient: isDark
            ? 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
            : 'from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600',
          pulse: isDark ? 'from-amber-600 to-orange-600' : 'from-amber-400 to-orange-500'
        };
      default:
        // Use lighter, softer default colors (soft yellow/orange)
        return {
          gradient: isDark
            ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
            : 'from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500',
          pulse: isDark ? 'from-yellow-500 to-orange-500' : 'from-yellow-300 to-orange-400'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className={`fixed bottom-[4.2rem] right-3 z-50 ${className}`}>
      <Button
        onClick={handleChatClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r ${colors.gradient} shadow-lg hover:shadow-xl transition-all duration-300 p-0 overflow-hidden group border-0`}
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
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.pulse} opacity-30 animate-pulse`} />
      </Button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap transform transition-all duration-200 animate-in slide-in-from-bottom-1">
          AI Wellness Companion
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </div>
      )}
    </div>
  );
}

export default AIChatButton;
