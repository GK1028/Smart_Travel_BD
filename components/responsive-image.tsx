"use client"

import { useState } from "react"
import Image from "next/image"

interface ResponsiveImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "scale-down"
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"

export function ResponsiveImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  objectFit = "cover",
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        crossOrigin="anonymous"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
      )}
    </div>
  )
}
