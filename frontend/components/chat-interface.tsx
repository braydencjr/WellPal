"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, AlertCircle, Crown } from "lucide-react";
import { useTheme } from "next-themes";
import { useCalmingTheme } from "@/components/theme-provider";
import { apiClient } from "@/lib/api-client";
import { canMakeRequest, incrementDailyUsage, getRemainingRequests } from "@/lib/daily-usage";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  companionAvatar?: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your wellness companion. I'm here to listen and provide support whenever you need it. How are you feeling today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

const suggestedPrompts = [
  "I'm feeling stressed about exams",
  "I'm having trouble sleeping", 
  "I feel overwhelmed lately",
  "I need some encouragement",
];

export function ChatInterface({ companionAvatar = "ai-companion-1.png" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyRequestsRemaining, setDailyRequestsRemaining] = useState(getRemainingRequests());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Theme hooks
  const { theme } = useTheme();
  const { calmingTheme } = useCalmingTheme();

  // Update remaining requests on component mount
  useEffect(() => {
    setDailyRequestsRemaining(getRemainingRequests());
  }, []);

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
          userBg: isDark ? 'from-green-600 to-emerald-600' : 'from-green-400 to-emerald-500',
          assistantBg: isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
          border: isDark ? 'border-green-600' : 'border-green-200',
          accent: isDark ? 'text-green-400' : 'text-green-600'
        };
      case 'calm-blue':
        return {
          gradient: isDark
            ? 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
            : 'from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600',
          userBg: isDark ? 'from-blue-600 to-cyan-600' : 'from-blue-400 to-cyan-500',
          assistantBg: isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
          border: isDark ? 'border-blue-600' : 'border-blue-200',
          accent: isDark ? 'text-blue-400' : 'text-blue-600'
        };
      case 'warm-beige':
        return {
          gradient: isDark
            ? 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
            : 'from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600',
          userBg: isDark ? 'from-amber-600 to-orange-600' : 'from-amber-400 to-orange-500',
          assistantBg: isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
          border: isDark ? 'border-amber-600' : 'border-amber-200',
          accent: isDark ? 'text-amber-400' : 'text-amber-600'
        };
      default:
        // Use soft yellow/orange for default theme (matching the button)
        return {
          gradient: isDark
            ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
            : 'from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500',
          userBg: isDark ? 'from-yellow-500 to-orange-500' : 'from-yellow-300 to-orange-400',
          assistantBg: isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
          border: isDark ? 'border-yellow-500' : 'border-orange-200',
          accent: isDark ? 'text-yellow-400' : 'text-orange-600'
        };
    }
  };

  const colors = getThemeColors();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Check if user has remaining requests
    if (!canMakeRequest()) {
      setError("You've reached your daily limit of 10 messages. Upgrade to Pro for unlimited requests!");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setError(null);

    // Increment usage counter
    const newUsage = incrementDailyUsage();
    setDailyRequestsRemaining(getRemainingRequests());

    try {
      // Call the real AI API
      const response: any = await apiClient.sendChatMessage(content.trim());
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response || "I'm here to listen. Could you tell me more?",
        sender: "assistant",
        timestamp: new Date(),
        suggestions: response.suggestions || [],
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error('Chat API error:', err);
      setError("I'm having trouble connecting right now. Please try again.");
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to listen and support you. Sometimes technology has hiccups, but I'm still here for you. Could you try sharing again?",
        sender: "assistant", 
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    // Check if user can make a request before handling suggested prompts
    if (!canMakeRequest()) {
      setError("You've reached your daily limit. Upgrade to Pro for unlimited requests!");
      return;
    }
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Daily Usage Indicator */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Daily chats: {10 - dailyRequestsRemaining}/10
            </span>
          </div>
          {dailyRequestsRemaining <= 3 && dailyRequestsRemaining > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push('/premium')}
              className="text-xs border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-600 dark:text-orange-300"
            >
              <Crown className="h-3 w-3 mr-1" />
              Upgrade
            </Button>
          )}
          {dailyRequestsRemaining === 0 && (
            <Button
              size="sm"
              onClick={() => router.push('/premium')}
              className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Crown className="h-3 w-3 mr-1" />
               👑 Upgrade to Pro
            </Button>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <div className="flex-1">
            <span className="text-sm text-red-700">{error}</span>
            {error.includes("daily limit") && (
              <Button
                size="sm"
                onClick={() => router.push('/premium')}
                className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                 👑 Upgrade to Pro
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar for AI messages */}
              {message.sender === "assistant" && (
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full overflow-hidden border ${colors.border}`}>
                    <Image
                      src={`/assets/${companionAvatar}`}
                      alt="AI Companion"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "user" 
                      ? `bg-gradient-to-r ${colors.userBg} text-white`
                      : colors.assistantBg
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {/* AI Suggestions */}
                {message.sender === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 ml-2">
                    <p className="text-xs text-gray-500 mb-2">💡 Try these suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.slice(0, 3).map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className={`text-xs ${
                            theme === 'dark' 
                              ? `bg-gray-800/80 hover:bg-gray-700 border-2 ${colors.border} ${colors.accent} hover:border-opacity-80`
                              : `bg-white/80 hover:bg-white border ${colors.border} ${colors.accent} hover:bg-opacity-90`
                          }`}
                          onClick={() => handleSuggestedPrompt(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              {/* AI Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full overflow-hidden border ${colors.border}`}>
                  <Image
                    src={`/assets/${companionAvatar}`}
                    alt="AI Companion"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Typing Animation */}
              <div className={`rounded-2xl px-4 py-3 ${colors.assistantBg}`}>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`w-4 h-4 ${colors.accent}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                className={`text-xs ${
                  theme === 'dark'
                    ? `bg-gray-800 hover:bg-gray-700 border-2 ${colors.border} ${colors.accent}`
                    : `bg-background hover:bg-accent/10 border-2 ${colors.border} ${colors.accent}`
                }`}
                onClick={() => handleSuggestedPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-background">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              dailyRequestsRemaining > 0 
                ? "Share what's on your mind..." 
                : "Upgrade to Pro for unlimited chats..."
            }
            className={`flex-1 border-gray-300 dark:border-gray-600 focus:border-2 focus:${colors.border} focus:ring-0`}
            onKeyPress={(e) => {
              if (e.key === "Enter" && canMakeRequest()) {
                handleSendMessage(inputValue);
              }
            }}
            disabled={isTyping || !canMakeRequest()}
          />
          <Button 
            size="sm" 
            onClick={() => handleSendMessage(inputValue)} 
            disabled={!inputValue.trim() || isTyping || !canMakeRequest()}
            className={`bg-gradient-to-r ${colors.gradient} text-white border-0`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is a supportive AI companion. For emergencies, please contact crisis support.
          </p>
          {dailyRequestsRemaining <= 5 && dailyRequestsRemaining > 0 && (
            <p className="text-xs text-orange-600 dark:text-orange-400">
              {dailyRequestsRemaining} requests left today
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
