import { CameraButton } from "@/components/camera-button-dashboard"
import { MusicPlayerCard } from "@/components/music-player-card"

export function PlayerWithCamera() {
  return (
    <div className="flex flex-row items-center gap-3 p-4 w-full min-w-0">
      <CameraButton />
      <div className="flex-1 min-w-0">
        <MusicPlayerCard />
      </div>
    </div>
  )
}