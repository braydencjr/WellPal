"use client"

import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

type CameraButtonProps = {
  onClick?: () => void
}

export function CameraButton({ onClick }: CameraButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="p-4 rounded-full shadow-md"
      style={{ backgroundColor: "oklch(51.141% 0.10725 56.174)" }}
    >
      <Camera className="w-6 h-6 text-black translate-y-0.5" />
    </Button>
  )
}
