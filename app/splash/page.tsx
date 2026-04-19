'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[oklch(0.13_0.03_240)] via-[oklch(0.15_0.035_245)] to-[oklch(0.12_0.025_235)] flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-20 w-72 h-72 bg-[oklch(0.52_0.17_155/0.15)] rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-[oklch(0.72_0.14_75/0.1)] rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Animated Logo */}
        <motion.div
          className="mb-8 inline-block"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[oklch(0.52_0.17_155)] to-[oklch(0.72_0.14_75)] rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="font-sans font-bold text-4xl text-white">BD</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="font-sans font-bold text-4xl md:text-5xl text-white mb-4 text-balance"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.52_0.17_155)] to-[oklch(0.72_0.14_75)]">Smart Travel Planner</span> for Bangladesh
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/70 text-lg md:text-xl mb-8 font-body"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover the beauty of Bangladesh with AI-powered travel planning
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[oklch(0.52_0.17_155)]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-[oklch(0.52_0.17_155)]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-[oklch(0.52_0.17_155)]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>

        {/* Features text */}
        <motion.p
          className="text-white/50 text-sm font-body"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          AI-Powered Plans • Local Guides • Real-Time Weather • Smart Budgeting
        </motion.p>
      </div>

      {/* Fade out transition */}
      <motion.div
        className="absolute inset-0 bg-[oklch(0.13_0.03_240)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      />
    </div>
  )
}
