"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api-client";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

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
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Error Banner */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700">{error}</span>
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
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200">
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
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
                      : "bg-gray-100 text-gray-900"
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
                          className="text-xs bg-white/80 hover:bg-white border-purple-200 text-purple-700 hover:text-purple-800"
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
                <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200">
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
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
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
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                className="text-xs bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => handleSuggestedPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(inputValue);
              }
            }}
            disabled={isTyping}
          />
          <Button 
            size="sm" 
            onClick={() => handleSendMessage(inputValue)} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a supportive AI companion. For emergencies, please contact crisis support.
        </p>
      </div>
    </div>
  );
}
