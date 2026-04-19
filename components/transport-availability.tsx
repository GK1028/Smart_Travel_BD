"use client"

import { Bus, Train, Plane, Calendar, MapPin, CheckCircle, AlertCircle, XCircle } from "lucide-react"

const transportOptions = [
  {
    id: 1,
    type: "Bus",
    icon: Bus,
    color: "text-blue-300 bg-blue-400/15",
    borderColor: "border-blue-400/30",
    priceRange: "300–600 BDT",
    travelTime: "7–9 hours",
    status: "Available",
    statusColor: "text-green-300 bg-green-400/15 border-green-400/30",
    operators: ["Green Line", "S. Alam", "Hansraj"],
    departure: "Multiple times daily (6 AM - 11 PM)",
    comfort: "Standard to luxury coaches available",
    features: ["WiFi available", "Food service", "Reclining seats"],
  },
  {
    id: 2,
    type: "Train",
    icon: Train,
    color: "text-purple-300 bg-purple-400/15",
    borderColor: "border-purple-400/30",
    priceRange: "250–800 BDT",
    travelTime: "8–12 hours",
    status: "Limited",
    statusColor: "text-yellow-300 bg-yellow-400/15 border-yellow-400/30",
    operators: ["Sundarban Express", "Chittagong Express"],
    departure: "Specific time slots (1–2 times daily)",
    comfort: "Sleeper and first-class options",
    features: ["Dining car", "Sleeping berths", "Scenic views"],
  },
  {
    id: 3,
    type: "Flight",
    icon: Plane,
    color: "text-[oklch(0.72_0.14_75)] bg-[oklch(0.72_0.14_75/0.15)]",
    borderColor: "border-[oklch(0.72_0.14_75/0.3)]",
    priceRange: "2,500–4,500 BDT",
    travelTime: "1–1.5 hours",
    status: "Available",
    statusColor: "text-green-300 bg-green-400/15 border-green-400/30",
    operators: ["Biman Bangladesh", "Novoair", "US-Bangla"],
    departure: "Limited slots (2–3 times daily)",
    comfort: "Cabin service with meals included",
    features: ["Fastest option", "Luggage service", "Premium comfort"],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Available":
      return CheckCircle
    case "Limited":
      return AlertCircle
    default:
      return XCircle
  }
}

export default function TransportAvailability() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Bus className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">Transport Options</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Available <span className="text-[oklch(0.72_0.14_75)]">Transport Options</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl font-body">
            Compare bus, train, and flight options for your journey to Bangladesh. Check availability, pricing, and comfort levels.
          </p>
        </div>

        {/* Transport Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {transportOptions.map((transport) => {
            const IconComponent = transport.icon
            const StatusIcon = getStatusIcon(transport.status)

            return (
              <div
                key={transport.id}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[oklch(0.52_0.17_155/0.4)] transition-all duration-500 hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.15)] hover:-translate-y-2"
              >
                {/* Transport Header */}
                <div className={`p-5 border-b border-white/10 bg-gradient-to-r ${transport.color} from-opacity-10`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${transport.color} border ${transport.borderColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-white text-lg">{transport.type}</h3>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${transport.statusColor}`}>
                      <StatusIcon className="w-3 h-3" />
                      {transport.status}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Price Range</div>
                    <span className="font-sans font-bold text-[oklch(0.72_0.14_75)] text-lg">{transport.priceRange}</span>
                  </div>

                  {/* Travel Time */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Calendar className="w-4 h-4 text-[oklch(0.52_0.17_155)]" />
                    <div>
                      <div className="text-white/60 text-xs uppercase tracking-wider font-semibold">Travel Time</div>
                      <span className="text-white text-sm font-sans font-semibold">{transport.travelTime}</span>
                    </div>
                  </div>

                  {/* Operators */}
                  <div className="mb-4">
                    <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Operators</div>
                    <div className="flex flex-wrap gap-2">
                      {transport.operators.map((operator, idx) => (
                        <span key={idx} className="text-white/70 text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                          {operator}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Departure Info */}
                  <div className="mb-4 p-3 bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.2)] rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[oklch(0.52_0.17_155)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Departure</div>
                        <p className="text-white text-xs font-body">{transport.departure}</p>
                      </div>
                    </div>
                  </div>

                  {/* Comfort Level */}
                  <div className="mb-4">
                    <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Comfort</div>
                    <p className="text-white text-sm font-body">{transport.comfort}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Features</div>
                    <ul className="space-y-1">
                      {transport.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-white/70 text-xs">
                          <CheckCircle className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[oklch(0.52_0.17_155)] to-[oklch(0.42_0.14_152)] text-white font-sans font-semibold text-sm hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.3)] transition-all duration-300 hover:translate-y-0.5 active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
