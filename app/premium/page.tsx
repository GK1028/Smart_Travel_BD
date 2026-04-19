'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Sparkles, MapPin, Download, BookOpen, Users, Navigation2, Cloud } from 'lucide-react'

const premiumFeatures = [
  { icon: Cloud, title: 'OFFLINE MODE', description: 'Download maps and guides to use anywhere without internet' },
  { icon: MapPin, title: 'HIDDEN GEMS FINDER', description: 'Discover secret spots and lesser-known attractions' },
  { icon: BookOpen, title: 'TRAVEL STORY GENERATOR', description: 'Create and share beautiful travel stories with AI' },
  { icon: Users, title: 'GROUP TRIP PLANNER', description: 'Plan trips with friends and manage shared budgets' },
  { icon: Navigation2, title: 'SMART ROUTE SWITCHER', description: 'Compare and switch between optimal routes in real-time' },
  { icon: Sparkles, title: 'WEATHER-BASED SUGGESTIONS', description: 'Get activity recommendations based on weather conditions' },
]

export default function PremiumPage() {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      alert('Thank you for upgrading to Premium! You now have access to all exclusive features.')
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[oklch(0.13_0.03_240)]">
      {/* Back Button */}
      <div className="sticky top-0 z-40 bg-[oklch(0.15_0.04_240/0.95)] backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4">
        <Link href="/" className="text-white/70 hover:text-white text-sm font-semibold transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.72_0.14_75/0.15)] border border-[oklch(0.72_0.14_75/0.3)] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
            <span className="text-[oklch(0.72_0.14_75)] text-xs font-semibold tracking-widest uppercase">
              Premium Features
            </span>
          </div>

          <h1 className="font-sans font-bold text-4xl md:text-5xl text-white text-balance mb-4">
            Unlock Premium Travel{" "}
            <span className="text-[oklch(0.72_0.14_75)]">Superpowers</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg font-body max-w-xl mx-auto mb-8">
            Get exclusive access to advanced travel planning tools designed to elevate your Bangladesh journey
          </p>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-[oklch(0.52_0.17_155/0.1)] to-[oklch(0.72_0.14_75/0.05)] border border-[oklch(0.72_0.14_75/0.3)] rounded-3xl p-8 md:p-12 max-w-md mx-auto mb-12">
            <div className="mb-6">
              <span className="text-white/60 text-sm font-semibold">ONE-TIME PAYMENT</span>
              <div className="flex items-baseline justify-center gap-1 mt-3">
                <span className="text-[oklch(0.72_0.14_75)] font-sans font-bold text-5xl">199</span>
                <span className="text-white/60 text-xl">BDT</span>
              </div>
              <p className="text-white/50 text-xs mt-3">Lifetime access to all premium features</p>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.62_0.17_155)] text-white font-bold text-lg hover:shadow-xl hover:shadow-[oklch(0.72_0.14_75/0.4)] disabled:opacity-50 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Upgrade Now'}
            </button>

            <p className="text-white/40 text-xs mt-4">Secure payment • Instant activation</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-center mb-16 text-balance">
            What You Get with Premium
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-300 hover:bg-white/8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[oklch(0.52_0.17_155/0.2)] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[oklch(0.52_0.17_155)]" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-sans font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/60 text-sm font-body">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans font-bold text-3xl text-white mb-12 text-center">
            Why Go Premium?
          </h2>

          <div className="space-y-4">
            {[
              'Access all premium features for life with a one-time payment',
              'No ads or limitations on downloads and trip planning',
              'Priority support and updates for new features',
              'Exclusive travel guides and insider tips',
              'Offline access to maps and travel information',
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.52_0.17_155)] flex-shrink-0 mt-0.5" />
                <p className="text-white/80 font-body">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white mb-6">
            Ready to Level Up Your Travel?
          </h2>

          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.62_0.17_155)] text-white font-bold text-lg hover:shadow-xl hover:shadow-[oklch(0.72_0.14_75/0.4)] disabled:opacity-50 transition-all duration-300 mb-4"
          >
            <Sparkles className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Get Premium for 199 BDT'}
          </button>

          <p className="text-white/50 text-sm font-body">
            Or continue with{' '}
            <Link href="/" className="text-[oklch(0.52_0.17_155)] hover:underline">
              free features
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
