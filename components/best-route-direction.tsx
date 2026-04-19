"use client"

import { MapPin, Navigation, Clock, Gauge, Zap, Eye } from "lucide-react"

const routeOptions = [
  {
    id: 1,
    from: "Dhaka City",
    to: "Cox's Bazar",
    distance: "480 km",
    time: "7–8 hours",
    type: "Highway",
    type_badge: "Fastest",
    badge_color: "text-blue-300 bg-blue-400/15 border-blue-400/30",
    description: "Direct highway route via Chittagong. Well-maintained roads, regular stops available.",
    highlights: ["Well-maintained roads", "Regular stops", "Gas stations every 30km"],
  },
  {
    id: 2,
    from: "Dhaka City",
    to: "Sajek Valley",
    distance: "520 km",
    time: "10–12 hours",
    type: "Scenic",
    type_badge: "Best View",
    badge_color: "text-[oklch(0.52_0.17_155)] bg-[oklch(0.52_0.17_155/0.15)] border-[oklch(0.52_0.17_155/0.3)]",
    description: "Picturesque mountain route via Rangamati. Lush landscapes, tribal villages, and waterfalls.",
    highlights: ["Mountain scenery", "Tribal villages", "Waterfall viewpoints"],
  },
  {
    id: 3,
    from: "Dhaka City",
    to: "Sundarbans",
    distance: "410 km",
    time: "6–7 hours",
    type: "Budget",
    type_badge: "Budget Friendly",
    badge_color: "text-[oklch(0.72_0.14_75)] bg-[oklch(0.72_0.14_75/0.1)] border-[oklch(0.72_0.14_75/0.3)]",
    description: "Economical route via Barisal. Most cost-effective option for budget travelers.",
    highlights: ["Affordable fuel", "Local markets", "River crossings"],
  },
]

export default function BestRouteDirection() {
  return (
    <section className="py-20 bg-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Navigation className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">Navigation</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Best Travel Routes & <span className="text-[oklch(0.72_0.14_75)]">Directions</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl font-body">
            Explore optimized routes with real-time distance, travel time, and road conditions. Choose the route that fits your travel style.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {routeOptions.map((route) => (
            <div
              key={route.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[oklch(0.52_0.17_155/0.4)] transition-all duration-500 hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.15)] hover:-translate-y-2"
            >
              {/* Route Header */}
              <div className="p-5 border-b border-white/10 bg-gradient-to-br from-[oklch(0.52_0.17_155/0.1)] to-transparent">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-1">Route</div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-body">{route.from}</span>
                      <Zap className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      <span className="text-white font-body">{route.to}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${route.badge_color}`}>
                    {route.type_badge}
                  </span>
                </div>
              </div>

              {/* Route Details */}
              <div className="p-5">
                {/* Map Preview Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-[oklch(0.52_0.17_155/0.15)] to-[oklch(0.42_0.14_152/0.1)] rounded-lg mb-4 flex items-center justify-center border border-[oklch(0.52_0.17_155/0.2)] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(82,185,152,0.1),transparent)]" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-6 h-6 text-[oklch(0.52_0.17_155)] mx-auto mb-1 opacity-50" />
                    <span className="text-white/40 text-xs">Map Preview</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.2)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
                      <span className="text-white/60 text-xs uppercase tracking-wider">Distance</span>
                    </div>
                    <span className="text-white font-sans font-bold text-lg">{route.distance}</span>
                  </div>
                  <div className="bg-[oklch(0.72_0.14_75/0.1)] border border-[oklch(0.72_0.14_75/0.2)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
                      <span className="text-white/60 text-xs uppercase tracking-wider">Time</span>
                    </div>
                    <span className="text-white font-sans font-bold text-lg">{route.time}</span>
                  </div>
                </div>

                {/* Type & Description */}
                <div className="mb-4">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
                    <span className="text-white/70 text-xs font-semibold">{route.type} Route</span>
                  </div>
                  <p className="text-white/60 text-sm font-body leading-relaxed">{route.description}</p>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Highlights</div>
                  <ul className="space-y-1">
                    {route.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/50 text-xs">
                        <Eye className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[oklch(0.52_0.17_155)] to-[oklch(0.42_0.14_152)] text-white font-sans font-semibold text-sm hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.3)] transition-all duration-300 hover:translate-y-0.5 active:scale-95">
                  View on Google Maps
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Route Info Banner */}
        <div className="bg-gradient-to-r from-[oklch(0.52_0.17_155/0.08)] to-[oklch(0.72_0.14_75/0.08)] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Navigation className="w-6 h-6 text-[oklch(0.52_0.17_155)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-sans font-bold text-white mb-2">Smart Route Selection Tips</h3>
              <p className="text-white/60 text-sm font-body mb-3">
                Choose <span className="text-[oklch(0.72_0.14_75)] font-semibold">Fastest</span> for quick travel, <span className="text-[oklch(0.52_0.17_155)] font-semibold">Scenic</span> for memorable journey, or <span className="text-[oklch(0.72_0.14_75)] font-semibold">Budget</span> to save on fuel.
              </p>
              <div className="text-white/50 text-xs">💡 Pro Tip: Travel early morning to avoid traffic and enjoy pleasant weather.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
