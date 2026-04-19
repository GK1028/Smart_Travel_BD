"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 hidden md:flex">
      {/* Track */}
      <div className="relative w-0.5 h-48 bg-white/10 rounded-full overflow-hidden">
        {/* Animated fill */}
        <div
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-150 ease-out"
          style={{
            height: `${progress}%`,
            background:
              "linear-gradient(to bottom, oklch(0.72 0.14 75), oklch(0.52 0.17 155))",
            boxShadow: "0 0 6px oklch(0.52 0.17 155 / 0.8)",
          }}
        />
        {/* Glowing dot at tip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-150 ease-out"
          style={{
            top: `calc(${progress}% - 3px)`,
            background: "oklch(0.72 0.14 75)",
            boxShadow: "0 0 8px oklch(0.72 0.14 75), 0 0 16px oklch(0.72 0.14 75 / 0.5)",
          }}
        />
      </div>
      {/* Percentage label */}
      <span
        className="text-[9px] font-bold tabular-nums transition-all duration-150"
        style={{ color: "oklch(0.72 0.14 75)" }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  )
}
