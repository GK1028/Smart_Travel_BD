"use client"

import { ShieldAlert, Newspaper, AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react"

const safetyAlerts = [
  {
    level: "info",
    title: "Road Conditions Update",
    desc: "Dhaka–Chittagong highway experiencing moderate traffic. Allow extra travel time.",
    time: "2 hours ago",
    icon: Info,
  },
  {
    level: "warning",
    title: "Monsoon Advisory — Sylhet",
    desc: "Flash flood warnings in low-lying areas of Sylhet division. Avoid riverside camping.",
    time: "5 hours ago",
    icon: AlertTriangle,
  },
  {
    level: "safe",
    title: "Cox's Bazar Beach Safe",
    desc: "Sea conditions calm and ideal for swimming. Lifeguards on duty at all major beach points.",
    time: "1 day ago",
    icon: CheckCircle,
  },
]

const newsItems = [
  {
    category: "Tourism",
    title: "Bangladesh Tourism Board Launches New Eco-Tour Packages for 2026",
    desc: "Sustainable travel options across Sundarbans and hill districts with certified local guides.",
    time: "Yesterday",
  },
  {
    category: "Infrastructure",
    title: "New Expressway to Reduce Dhaka–Cox's Bazar Travel Time by 40%",
    desc: "The 80km coastal expressway project is set for completion in late 2026.",
    time: "3 days ago",
  },
  {
    category: "Culture",
    title: "Sylhet Tea Festival 2026 Dates Announced",
    desc: "The annual festival celebrates Bangladesh's rich tea heritage with tours, tastings, and cultural performances.",
    time: "1 week ago",
  },
  {
    category: "Safety",
    title: "Tourist Police Strengthened at Major Destinations",
    desc: "Increased tourist police presence at Cox's Bazar, Sajek, and Sundarbans for enhanced visitor safety.",
    time: "2 weeks ago",
  },
]

const levelConfig = {
  info: { bg: "bg-blue-500/10", border: "border-blue-400/30", text: "text-blue-400", dot: "bg-blue-400" },
  warning: { bg: "bg-[oklch(0.72_0.14_75/0.1)]", border: "border-[oklch(0.72_0.14_75/0.3)]", text: "text-[oklch(0.72_0.14_75)]", dot: "bg-[oklch(0.72_0.14_75)]" },
  safe: { bg: "bg-[oklch(0.52_0.17_155/0.1)]", border: "border-[oklch(0.52_0.17_155/0.3)]", text: "text-[oklch(0.52_0.17_155)]", dot: "bg-[oklch(0.52_0.17_155)]" },
}

const categoryColors: Record<string, string> = {
  Tourism: "text-[oklch(0.52_0.17_155)] bg-[oklch(0.52_0.17_155/0.1)]",
  Infrastructure: "text-blue-400 bg-blue-400/10",
  Culture: "text-[oklch(0.72_0.14_75)] bg-[oklch(0.72_0.14_75/0.1)]",
  Safety: "text-purple-400 bg-purple-400/10",
}

export default function SafetyNewsModule() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Safety Alerts */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.14_75/0.15)] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-[oklch(0.72_0.14_75)]" />
              </div>
              <div>
                <h2 className="font-sans font-bold text-2xl text-white">Safety Alerts</h2>
                <p className="text-white/40 text-xs font-body">Live travel advisories</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {safetyAlerts.map((alert) => {
                const config = levelConfig[alert.level as keyof typeof levelConfig]
                const Icon = alert.icon
                return (
                  <div
                    key={alert.title}
                    className={`flex gap-4 p-4 rounded-xl border ${config.bg} ${config.border} transition-all duration-300 hover:scale-[1.01]`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg} border ${config.border}`}>
                      <Icon className={`w-4.5 h-4.5 ${config.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>{alert.level}</span>
                        <span className="text-white/30 text-xs ml-auto">{alert.time}</span>
                      </div>
                      <p className="text-white font-medium text-sm mb-1">{alert.title}</p>
                      <p className="text-white/50 text-xs font-body leading-relaxed">{alert.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Latest News */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.52_0.17_155/0.15)] flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
              </div>
              <div>
                <h2 className="font-sans font-bold text-2xl text-white">Travel News</h2>
                <p className="text-white/40 text-xs font-body">Bangladesh tourism updates</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {newsItems.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[oklch(0.52_0.17_155/0.3)] hover:bg-white/8 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${categoryColors[item.category] ?? "text-white/60 bg-white/10"}`}>
                        {item.category}
                      </span>
                      <span className="text-white/30 text-xs">{item.time}</span>
                    </div>
                    <p className="text-white font-semibold text-sm mb-1.5 leading-snug group-hover:text-[oklch(0.72_0.14_75)] transition-colors duration-300">
                      {item.title}
                    </p>
                    <p className="text-white/50 text-xs font-body leading-relaxed">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[oklch(0.72_0.14_75)] flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
