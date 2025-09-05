"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Crown, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { premiumMoodOptions } from "@/components/emojilog"

export default function PremiumPage() {
  const router = useRouter()
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null)

  // Arrange emojis in 3x3 grid
  const emojiGrid = []
  for (let i = 0; i < premiumMoodOptions.length; i += 3) {
    emojiGrid.push(premiumMoodOptions.slice(i, i + 3))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
      <div className="max-w-sm mx-auto bg-background/80 backdrop-blur-sm min-h-screen relative">
        {/* Header */}
        <div className="px-6 pt-10 pb-6 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="absolute left-4 top-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
            >
              <Crown className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Unlock Pro Version
            </h1>
            <p className="text-muted-foreground mt-2">for more emojis!</p>
          </div>
        </div>

        {/* Premium Features */}
        <div className="px-6 space-y-6">
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Premium Features</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>9 exclusive premium dog emojis</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Unlimited AI companion chat requests</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Allow custom games</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>New features early access</span>
              </li>
            </ul>
          </Card>

          {/* Premium Emojis Showcase */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Premium Dog Emojis</h3>
            <div className="space-y-4">
              {emojiGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-4">
                  {row.map((emoji, colIndex) => {
                    const emojiIndex = rowIndex * 3 + colIndex
                    return (
                      <motion.div
                        key={emoji.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: emojiIndex * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-20 h-20 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedEmoji === emojiIndex
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                        }`}
                        onClick={() => setSelectedEmoji(selectedEmoji === emojiIndex ? null : emojiIndex)}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={emoji.src}
                            alt={emoji.name}
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        </div>
                        
                        {/* Sparkle effect for selected */}
                        {selectedEmoji === emojiIndex && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                          >
                            <Sparkles className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>

            {selectedEmoji !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center"
              >
                <h4 className="font-medium text-purple-800 dark:text-purple-200">
                  {premiumMoodOptions[selectedEmoji]?.name}
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                  Perfect for expressing those special moments! 🐕✨
                </p>
              </motion.div>
            )}
          </Card>

          {/* Upgrade Button */}
          <div className="pb-8">
            <Button
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              onClick={() => {
                // TODO: Implement premium upgrade logic
                alert("Premium upgrade coming soon! 🚀")
              }}
            >
              <Crown className="h-5 w-5 mr-2" />
              Upgrade to Pro
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-3">
              Join thousands of happy users! 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
