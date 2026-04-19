"use client"

import { useState } from "react"
import { Download, CheckCircle, Smartphone, MapPin, FileText } from "lucide-react"

interface OfflineContent {
  id: number
  name: string
  icon: React.ReactNode
  size: string
  description: string
  downloaded: boolean
}

export default function OfflineMode() {
  const [downloadedItems, setDownloadedItems] = useState<number[]>([3])

  const offlineContent: OfflineContent[] = [
    {
      id: 1,
      name: "Complete Travel Map",
      icon: <MapPin className="w-5 h-5" />,
      size: "2.3 MB",
      description: "Offline maps of all major destinations in Bangladesh",
      downloaded: downloadedItems.includes(1),
    },
    {
      id: 2,
      name: "Hotel Directory",
      icon: <FileText className="w-5 h-5" />,
      size: "1.8 MB",
      description: "Complete listings with photos and contact information",
      downloaded: downloadedItems.includes(2),
    },
    {
      id: 3,
      name: "Travel Guide PDF",
      icon: <FileText className="w-5 h-5" />,
      size: "3.4 MB",
      description: "Comprehensive travel guide with tips and recommendations",
      downloaded: downloadedItems.includes(3),
    },
    {
      id: 4,
      name: "Emergency Contacts",
      icon: <Smartphone className="w-5 h-5" />,
      size: "0.5 MB",
      description: "Important numbers and embassy information",
      downloaded: downloadedItems.includes(4),
    },
  ]

  const toggleDownload = (id: number) => {
    setDownloadedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const totalSize = offlineContent.reduce((sum, item) => {
    const sizeNum = parseFloat(item.size)
    return sum + sizeNum
  }, 0)

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4">
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase">
              Offline Access
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Download for <span className="text-purple-400">Offline Use</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Stay connected even in areas with limited internet connectivity
          </p>
        </div>

        {/* Storage Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2">Total Download Size</p>
              <p className="text-white font-sans font-bold text-2xl">{totalSize.toFixed(1)} MB</p>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2">Items Downloaded</p>
              <p className="text-[oklch(0.52_0.17_155)] font-sans font-bold text-2xl">
                {downloadedItems.length} / {offlineContent.length}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2">Storage Status</p>
              <p className="text-green-400 font-sans font-bold text-2xl">✓ Available</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2">Download Progress</p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${(downloadedItems.length / offlineContent.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Items */}
        <div className="space-y-4 mb-8">
          {offlineContent.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 flex items-start justify-between md:flex-row flex-col gap-4"
            >
              {/* Left */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-white text-base mb-1">{item.name}</h3>
                  <p className="text-white/60 text-sm font-body mb-2">{item.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs">Size: {item.size}</span>
                    {item.downloaded && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/15 border border-green-500/30">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-bold">Downloaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right */}
              <button
                onClick={() => toggleDownload(item.id)}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  item.downloaded
                    ? "bg-white/10 border border-white/20 text-white/70 hover:bg-white/15"
                    : "bg-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/40"
                }`}
              >
                {item.downloaded ? "Remove" : "Download"}
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
          <h3 className="font-sans font-bold text-purple-400 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Offline Features Available
          </h3>
          <ul className="text-white/70 text-sm font-body space-y-1">
            <li>✓ View downloaded maps and guides</li>
            <li>✓ Access hotel information and contacts</li>
            <li>✓ Emergency numbers and services</li>
            <li>✓ Saved itineraries and plans</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
