"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation" 
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostcardEntry } from "@/lib/photobook-store"
import { format, parseISO } from "date-fns"

interface EnhancedPhotobookProps {

  entries: PostcardEntry[]
  onPostcardClick: (postcard: PostcardEntry) => void
}

interface MonthGroup {
  month: string
  year: number
  monthName: string
  entries: PostcardEntry[]
}

export function EnhancedPhotobook({ entries, onPostcardClick }: EnhancedPhotobookProps) {
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set())
  const [showAllMonths, setShowAllMonths] = useState(false)
    const router = useRouter() 

         const navigateToPhotobook = () => {
    router.push("/photobook")
  }


  const monthGroups = useMemo(() => {
    const groups: MonthGroup[] = []
    const monthMap = new Map<string, PostcardEntry[]>()


    // Group entries by month
    entries.forEach(entry => {
      const date = parseISO(entry.dateISO)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, [])
      }
      monthMap.get(monthKey)!.push(entry)
    })

    // Convert to array and sort by date (newest first)
    monthMap.forEach((monthEntries, monthKey) => {
      const [year, month] = monthKey.split('-').map(Number)
      const date = new Date(year, month)
      
      groups.push({
        month: monthKey,
        year,
        monthName: format(date, 'MMMM'),
        entries: monthEntries.sort((a, b) => 
          new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
        )
      })
    })

    // Sort groups by date (newest first)
    return groups.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return Number(b.month) - Number(a.month)
    })
  }, [entries])

  const visibleGroups = showAllMonths ? monthGroups : monthGroups.slice(0, 1)

  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths)
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey)
    } else {
      newExpanded.add(monthKey)
    }
    setExpandedMonths(newExpanded)
  }

  const toggleShowAll = () => {
    setShowAllMonths(!showAllMonths)
    // Auto-expand current month when showing all
    if (!showAllMonths && monthGroups.length > 0) {
      setExpandedMonths(new Set([monthGroups[0].month]))
    }
  }

  if (entries.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-muted/60 text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-muted flex items-center justify-center">
          <span className="text-2xl">📸</span>
        </div>
        <div>
          <h3 className="font-medium text-foreground">No memories yet</h3>
          <p className="text-sm text-muted-foreground">
            Take your first photo to start building your photobook
          </p>
        </div>
      </div>
    )
  }

  return (
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Your Photobook</h2>
        {monthGroups.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateToPhotobook}   // <-- navigate instead of toggle
            className="text-sm"
          >
            {/* You can keep your icon */}
            <ChevronDown className="h-4 w-4 mr-1" />
            Show All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {visibleGroups.map((group) => (
          <motion.div
            key={group.month}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Month Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">
                {group.monthName} {group.year}
              </h3>
              {group.entries.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMonth(group.month)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {expandedMonths.has(group.month) ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show All ({group.entries.length})
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Postcards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {group.entries
                .slice(0, expandedMonths.has(group.month) ? undefined : 3)
                .map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => onPostcardClick(entry)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Postcard Thumbnail */}
                    <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                      <img
                        src={entry.imageDataUrl}
                        alt="Postcard"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay with mood and date */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="text-white text-sm font-medium">
                          {format(parseISO(entry.dateISO), 'MMM d')}
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="text-2xl">{entry.mood}</div>
                      </div>
                    </div>

                    
                  </motion.div>
                ))}
            </div>

            {/* Show More Button for This Month */}
            {!expandedMonths.has(group.month) && group.entries.length > 3 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMonth(group.month)}
                  className="text-sm"
                >
                  Show {group.entries.length - 3} More
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
