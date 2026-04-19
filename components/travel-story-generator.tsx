"use client"

import { useState } from "react"
import { BookOpen, Sparkles, Download } from "lucide-react"

const storyPreview =
  "Our adventure through Bangladesh began in the early morning when we arrived at Cox's Bazar, where endless golden sands met turquoise waves. The first day felt like stepping into a postcard as we walked along the world's longest natural beach. We collected shells, watched the sunset paint the sky in shades of amber and rose, and shared stories with local vendors. By evening, we were exhausted but exhilarated, knowing we had only just begun..."

export default function TravelStoryGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [storyGenerated, setStoryGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setStoryGenerated(true)
    }, 2000)
  }

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.62_0.17_155/0.15)] border border-[oklch(0.62_0.17_155/0.3)] mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[oklch(0.62_0.17_155)]" />
            <span className="text-[oklch(0.62_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Your Story
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Capture Your <span className="text-[oklch(0.62_0.17_155)]">Travel Journey</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl mx-auto">
            Let AI craft a beautiful narrative of your Bangladesh adventure
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-8 hover:border-[oklch(0.62_0.17_155/0.3)] transition-all duration-500">
          {!storyGenerated ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[oklch(0.62_0.17_155/0.15)] border border-[oklch(0.62_0.17_155/0.3)] flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[oklch(0.62_0.17_155)]" />
              </div>
              <h3 className="font-sans font-bold text-white text-xl mb-2">Generate Your Story</h3>
              <p className="text-white/60 text-sm font-body mb-8 max-w-md mx-auto">
                Click below to let our AI writer create a personalized travel story based on your journey through Bangladesh
              </p>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 mx-auto ${
                  isGenerating
                    ? "bg-white/10 border border-white/20 cursor-not-allowed"
                    : "bg-[oklch(0.62_0.17_155)] hover:shadow-lg hover:shadow-[oklch(0.62_0.17_155/0.4)]"
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate My Story
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="font-sans font-bold text-white text-xl mb-1">Your Bangladesh Adventure</h3>
                <p className="text-white/50 text-sm">Generated story from your travels</p>
              </div>
              <div className="bg-[oklch(0.62_0.17_155/0.1)] border border-[oklch(0.62_0.17_155/0.2)] rounded-xl p-6 mb-6">
                <p className="text-white/80 text-base font-body leading-relaxed">{storyPreview}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/15 transition-all duration-300">
                  <BookOpen className="w-4 h-4" />
                  Read Full Story
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[oklch(0.62_0.17_155)] text-white font-bold text-sm hover:shadow-lg hover:shadow-[oklch(0.62_0.17_155/0.4)] transition-all duration-300">
                  <Download className="w-4 h-4" />
                  Download Story
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Features</p>
            <p className="text-white/80 text-sm font-body">Personalized narrative with your journey highlights</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Format</p>
            <p className="text-white/80 text-sm font-body">Blog-style story perfect for sharing</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Export</p>
            <p className="text-white/80 text-sm font-body">Download as PDF or share online</p>
          </div>
        </div>
      </div>
    </section>
  )
}
