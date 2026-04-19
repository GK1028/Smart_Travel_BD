"use client"

import { Bus, Train, Plane, Star, TrendingUp, Zap } from "lucide-react"

const comparisonMetrics = [
  { metric: "Cost", bus: "300–600 BDT", train: "250–800 BDT", flight: "2,500–4,500 BDT" },
  { metric: "Travel Time", bus: "7–9 hours", train: "8–12 hours", flight: "1–1.5 hours" },
  { metric: "Comfort Level", bus: "Standard", train: "High", flight: "Premium" },
  { metric: "Availability", bus: "Very High", train: "Moderate", flight: "Limited" },
  { metric: "Scenic Value", bus: "Good", train: "Excellent", flight: "None" },
  { metric: "Luggage Space", bus: "Good", train: "Excellent", flight: "Standard" },
  { metric: "Food Service", bus: "Limited", train: "Available", flight: "Included" },
  { metric: "Best For", bus: "Budget travelers", train: "Experience seekers", flight: "Time-conscious" },
]

const recommendations = [
  { type: "Bus", icon: Bus, color: "blue", recommendation: "Best for budget-conscious travelers and scenic route lovers" },
  { type: "Train", icon: Train, color: "purple", recommendation: "Ideal for sleeper comfort and immersive travel experience" },
  { type: "Flight", icon: Plane, color: "amber", recommendation: "Perfect when time is valuable and budget allows" },
]

export default function TransportComparison() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">Comparison</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Transport <span className="text-[oklch(0.72_0.14_75)]">Comparison Guide</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl font-body">
            Compare all transport options side-by-side to find the best fit for your travel needs, budget, and preferences.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-12 overflow-x-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-gradient-to-r from-[oklch(0.52_0.17_155/0.1)] to-transparent">
                  <th className="px-6 py-4 text-left">
                    <span className="text-white/60 text-xs uppercase tracking-widest font-semibold">Metric</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Bus className="w-4 h-4 text-blue-300" />
                      <span className="text-white font-sans font-bold">Bus</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Train className="w-4 h-4 text-purple-300" />
                      <span className="text-white font-sans font-bold">Train</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Plane className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      <span className="text-white font-sans font-bold">Flight</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300">
                    <td className="px-6 py-4">
                      <span className="text-white font-sans font-semibold text-sm">{row.metric}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70 text-sm font-body text-center block">{row.bus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70 text-sm font-body text-center block">{row.train}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70 text-sm font-body text-center block">{row.flight}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="mb-12">
          <h3 className="font-sans font-bold text-xl text-white mb-6">Recommended For:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => {
              const IconComponent = rec.icon
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                blue: { bg: "bg-blue-400/15", border: "border-blue-400/30", text: "text-blue-300" },
                purple: { bg: "bg-purple-400/15", border: "border-purple-400/30", text: "text-purple-300" },
                amber: { bg: "bg-[oklch(0.72_0.14_75/0.15)]", border: "border-[oklch(0.72_0.14_75/0.3)]", text: "text-[oklch(0.72_0.14_75)]" },
              }
              const colors = colorMap[rec.color]

              return (
                <div key={idx} className={`${colors.bg} border ${colors.border} rounded-2xl p-6 hover:shadow-lg hover:shadow-${rec.color}-400/10 transition-all duration-300`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-white mb-1">{rec.type} Travelers</h4>
                      <p className="text-white/60 text-sm font-body">{rec.recommendation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Decision Helper */}
        <div className="bg-gradient-to-r from-[oklch(0.52_0.17_155/0.08)] to-[oklch(0.72_0.14_75/0.08)] border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-[oklch(0.72_0.14_75)]" />
                <h4 className="font-sans font-bold text-white">Choose Bus If:</h4>
              </div>
              <ul className="space-y-2 text-white/60 text-sm font-body">
                <li>✓ Budget is your priority</li>
                <li>✓ You want flexibility in timing</li>
                <li>✓ You enjoy scenic routes</li>
                <li>✓ You have extra time</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-purple-300" />
                <h4 className="font-sans font-bold text-white">Choose Train If:</h4>
              </div>
              <ul className="space-y-2 text-white/60 text-sm font-body">
                <li>✓ Comfort is important</li>
                <li>✓ You want to sleep during travel</li>
                <li>✓ You value scenic views</li>
                <li>✓ You want a unique experience</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Plane className="w-6 h-6 text-blue-300" />
                <h4 className="font-sans font-bold text-white">Choose Flight If:</h4>
              </div>
              <ul className="space-y-2 text-white/60 text-sm font-body">
                <li>✓ Time is your constraint</li>
                <li>✓ You want maximum comfort</li>
                <li>✓ You're on a tight schedule</li>
                <li>✓ You prefer shortest route</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
