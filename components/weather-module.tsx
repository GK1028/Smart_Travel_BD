"use client"

import { Cloud, Droplets, Wind, Thermometer, Sun, CloudRain, Eye } from "lucide-react"

const weatherData = [
  { city: "Dhaka", temp: 34, condition: "Partly Cloudy", rain: 20, wind: 12, humidity: 78, icon: Cloud },
  { city: "Cox's Bazar", temp: 31, condition: "Sunny", rain: 5, wind: 18, humidity: 72, icon: Sun },
  { city: "Sylhet", temp: 28, condition: "Light Rain", rain: 65, wind: 8, humidity: 88, icon: CloudRain },
  { city: "Rangamati", temp: 30, condition: "Cloudy", rain: 35, wind: 10, humidity: 82, icon: Cloud },
]

function WeatherCard({ city, temp, condition, rain, wind, humidity, icon: Icon }: typeof weatherData[number]) {
  const isSunny = condition === "Sunny"
  const isRainy = condition === "Light Rain"

  return (
    <div className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[oklch(0.72_0.14_75/0.3)] rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[oklch(0.52_0.17_155/0.15)]">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">{city}</p>
          <p className="text-white text-xs font-medium">{condition}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isSunny ? "bg-[oklch(0.72_0.14_75/0.2)]" : isRainy ? "bg-[oklch(0.52_0.17_155/0.2)]" : "bg-white/10"
        }`}>
          <Icon className={`w-5 h-5 ${
            isSunny ? "text-[oklch(0.72_0.14_75)]" : isRainy ? "text-[oklch(0.52_0.17_155)]" : "text-white/70"
          }`} />
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-1 mb-3">
        <span className="text-3xl font-bold text-white font-sans">{temp}</span>
        <span className="text-white/50 text-sm mb-1">°C</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
          <Droplets className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
          <span className="text-white text-xs font-semibold">{rain}%</span>
          <span className="text-white/40 text-[9px]">Rain</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
          <Wind className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
          <span className="text-white text-xs font-semibold">{wind}</span>
          <span className="text-white/40 text-[9px]">km/h</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
          <Eye className="w-3 h-3 text-white/60" />
          <span className="text-white text-xs font-semibold">{humidity}%</span>
          <span className="text-white/40 text-[9px]">Humid</span>
        </div>
      </div>
    </div>
  )
}

export default function WeatherModule() {
  return (
    <section id="explore" className="py-20 bg-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
              <Thermometer className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
              <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">Live Weather</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance">
              Real-Time Weather <span className="text-[oklch(0.72_0.14_75)]">Across Bangladesh</span>
            </h2>
          </div>
          <p className="text-white/50 font-body text-sm max-w-xs text-pretty leading-relaxed">
            Check current weather conditions before planning your adventure.
          </p>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {weatherData.map((w) => (
            <WeatherCard key={w.city} {...w} />
          ))}
        </div>
      </div>
    </section>
  )
}
