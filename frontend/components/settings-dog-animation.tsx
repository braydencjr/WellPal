"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SettingsDogAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/chat');
  };

  return (
    <div className="relative z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="focus:outline-none transition-transform duration-300 hover:scale-110"
      >
        <img
          src="/assets/settings_animation.gif"
          alt="WellPal Settings Companion"
          width={60}
          height={60}
          className="cursor-pointer"
        />
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg transform transition-all duration-200 z-[60] w-40">
          <div className="text-center leading-relaxed">
            Hi! I'm your WellPal Companion!
            <br />
            Do you want to talk with me?
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </div>
      )}
    </div>
  );
}
