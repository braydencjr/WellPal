"use client"

import { motion } from "framer-motion"

export function ChatBubble({ message, children }: { message: string, children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-xs p-4 bg-white rounded-2xl shadow-lg"
    >
      <p className="text-gray-800">{message}</p>
      {children}

      {/* Triangle pointer (left side) */}
      <div className="absolute bottom-0 -left-3 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-white"></div>
    </motion.div>
  )
}
