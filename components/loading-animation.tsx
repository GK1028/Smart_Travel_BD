"use client"

import { Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/50 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[oklch(0.52_0.17_155/0.3)] to-[oklch(0.72_0.14_75/0.3)] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative flex flex-col items-center gap-6">
          {/* Animated Spinner */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[oklch(0.52_0.17_155)] border-r-[oklch(0.72_0.14_75)] animate-spin" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[oklch(0.52_0.17_155/0.2)] to-[oklch(0.72_0.14_75/0.2)] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[oklch(0.72_0.14_75)]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-2">Generating your smart travel plan...</h2>
            <p className="text-white/60 text-sm">AI is crafting the perfect itinerary for you</p>
          </div>

          {/* Animated Dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.52_0.17_155)] animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.14_75)] animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-[oklch(0.52_0.17_155)] animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          {/* Progress Text */}
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Please wait...</p>
        </div>
      </div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="w-9 h-9 rounded-xl bg-white/10" />
          <div>
            <Skeleton className="h-5 w-32 bg-white/10 mb-2" />
            <Skeleton className="h-3 w-48 bg-white/10" />
          </div>
        </div>
        {[1, 2, 3].map((day) => (
          <div key={day} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-4 w-40 bg-white/10" />
            </div>
            <div className="flex flex-col gap-3 pl-5 border-l border-white/10">
              {[1, 2, 3, 4].map((act) => (
                <div key={act} className="flex items-center gap-3">
                  <Skeleton className="w-7 h-7 rounded-lg bg-white/10" />
                  <Skeleton className="h-3 w-16 bg-white/10" />
                  <Skeleton className="h-3 w-48 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WeatherCardSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Skeleton className="h-3 w-16 bg-white/10 mb-2" />
          <Skeleton className="h-4 w-24 bg-white/10" />
        </div>
        <Skeleton className="w-12 h-12 rounded-xl bg-white/10" />
      </div>
      <Skeleton className="h-10 w-20 bg-white/10 mb-5" />
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1 bg-white/5 rounded-xl p-2">
            <Skeleton className="w-3 h-3 rounded bg-white/10" />
            <Skeleton className="h-3 w-8 bg-white/10 mt-1" />
            <Skeleton className="h-2 w-10 bg-white/10 mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
