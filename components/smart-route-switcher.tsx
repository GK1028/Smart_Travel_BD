"use client"

import { useState } from "react"
import { Navigation, Clock, DollarSign, Camera } from "lucide-react"

const routes = [
  {
    id: 1,
    name: "Fastest Route",
    icon: Clock,
    color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    distance: "245 km",
    duration: "4 hours 15 mins",
    cost: "2,500 BDT",
    highlights: "Highway, major cities",
    recommended: false,
  },
  {
    id: 2,
    name: "Scenic Route",
    icon: Camera,
    color: "text-[oklch(0.72_0.14_75)] bg-[oklch(0.72_0.14_75/0.15)] border-[oklch(0.72_0.14_75/0.3)]",
    distance: "312 km",
    duration: "6 hours 30 mins",
    cost: "3,200 BDT",
    highlights: "Mountain views, waterfalls, tea gardens",
    recommended: true,
  },
  {
    id: 3,
    name: "Budget Route",
    icon: DollarSign,
    color: "text-green-400 bg-green-500/15 border-green-500/30",
    distance: "287 km",
    duration: "5 hours 45 mins",
    cost: "1,800 BDT",
    highlights: "Local roads, villages, stops for food",
    recommended: false,
  },
]

export default function SmartRouteSwitcher() {
  const [selectedRoute, setSelectedRoute] = useState(1)

  const selected = routes.find((r) => r.id === selectedRoute)

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Navigation className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Route Planning
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Smart Route <span className="text-[oklch(0.52_0.17_155)]">Optimizer</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Choose your ideal route based on speed, scenery, or budget
          </p>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {routes.map((route) => {
            const IconComponent = route.icon
            const isSelected = selectedRoute === route.id

            return (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`text-left rounded-2xl p-6 transition-all duration-500 border ${
                  isSelected
                    ? `${route.color} shadow-2xl shadow-[oklch(0.52_0.17_155/0.2)]`
                    : "bg-white/5 border-white/10 hover:border-[oklch(0.52_0.17_155/0.3)]"
                } ${route.recommended && !isSelected ? "ring-2 ring-[oklch(0.72_0.14_75)] ring-opacity-30" : ""}`}
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? route.color : "bg-white/10"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${isSelected ? "text-inherit" : "text-white/70"}`}
                    />
                  </div>
                  {route.recommended && (
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[oklch(0.72_0.14_75)] text-white">
                      Recommended
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className={`font-sans font-bold text-lg mb-4 ${isSelected ? "text-inherit" : "text-white"}`}>
                  {route.name}
                </h3>

                {/* Details */}
                <div className={`space-y-3 text-sm ${isSelected ? "text-inherit" : "text-white/70"}`}>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Distance</p>
                    <p className="font-semibold">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Duration</p>
                    <p className="font-semibold">{route.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Cost</p>
                    <p className="font-semibold">{route.cost}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Route Details */}
        {selected && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-500">
            <h3 className="font-sans font-bold text-white text-xl mb-6">Route Highlights</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-1">Travel Time</p>
                    <p className="text-white font-semibold">{selected.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Navigation className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-1">Distance</p>
                    <p className="text-white font-semibold">{selected.distance}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-1">Estimated Cost</p>
                    <p className="text-white font-semibold">{selected.cost}</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <p className="text-white/60 text-xs uppercase font-bold tracking-wider mb-4">Key Highlights</p>
                <div className="bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.2)] rounded-lg p-4">
                  <p className="text-white/80 text-sm font-body leading-relaxed">{selected.highlights}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full px-6 py-3 rounded-lg bg-[oklch(0.52_0.17_155)] text-white font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.4)] transition-all duration-300">
              Navigate with this route
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
