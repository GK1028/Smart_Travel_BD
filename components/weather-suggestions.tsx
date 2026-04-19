"use client"

import { Cloud, Sun, CloudRain, Zap } from "lucide-react"
import { useState } from "react"

const weatherRecommendations = {
  rainy: {
    icon: CloudRain,
    color: "text-blue-400 bg-blue-500/15",
    borderColor: "border-blue-500/30",
    title: "Rainy Weather",
    suggestions: [
      {
        icon: "🏛️",
        name: "Museums & Cultural Centers",
        description: "Explore Bangladesh's rich heritage indoors",
      },
      {
        icon: "🏪",
        name: "Shopping Malls & Markets",
        description: "Traditional bazaars with covered areas",
      },
      {
        icon: "🍜",
        name: "Food Tours",
        description: "Try authentic Bangladeshi cuisine",
      },
      {
        icon: "🎭",
        name: "Local Cafes & Tea Houses",
        description: "Relax with local beverages",
      },
    ],
  },
  sunny: {
    icon: Sun,
    color: "text-yellow-400 bg-yellow-500/15",
    borderColor: "border-yellow-500/30",
    title: "Sunny Weather",
    suggestions: [
      {
        icon: "🏖️",
        name: "Beach Activities",
        description: "Swimming, surfing, beach walks",
      },
      {
        icon: "🥾",
        name: "Hiking & Trekking",
        description: "Explore nature trails and hills",
      },
      {
        icon: "📸",
        name: "Photography Tours",
        description: "Capture stunning landscapes",
      },
      {
        icon: "🚣",
        name: "Water Sports",
        description: "Kayaking and boating adventures",
      },
    ],
  },
  cloudy: {
    icon: Cloud,
    color: "text-gray-400 bg-gray-500/15",
    borderColor: "border-gray-500/30",
    title: "Cloudy Weather",
    suggestions: [
      {
        icon: "🌳",
        name: "Nature Walks",
        description: "Perfect for forest and garden exploration",
      },
      {
        icon: "🎨",
        name: "Art & Craft Workshops",
        description: "Local artisan experiences",
      },
      {
        icon: "📖",
        name: "Library & Bookstores",
        description: "Quiet spaces to relax and read",
      },
      {
        icon: "🏃",
        name: "Adventure Sports",
        description: "Moderate weather for outdoor activities",
      },
    ],
  },
}

export default function WeatherSuggestions() {
  const [selectedWeather, setSelectedWeather] = useState<"rainy" | "sunny" | "cloudy">("sunny")
  const current = weatherRecommendations[selectedWeather]
  const IconComponent = current.icon

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Zap className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Smart Suggestions
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Weather-Based <span className="text-[oklch(0.52_0.17_155)]">Activity Suggestions</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Smart recommendations tailored to the current weather conditions
          </p>
        </div>

        {/* Weather Toggle */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {(["sunny", "rainy", "cloudy"] as const).map((weather) => {
            const rec = weatherRecommendations[weather]
            const WeatherIcon = rec.icon
            return (
              <button
                key={weather}
                onClick={() => setSelectedWeather(weather)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedWeather === weather
                    ? `${rec.color} border ${rec.borderColor}`
                    : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <WeatherIcon className="w-4 h-4" />
                {rec.title}
              </button>
            )
          })}
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {current.suggestions.map((suggestion) => (
            <div
              key={suggestion.name}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.1)] cursor-pointer"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {suggestion.icon}
              </div>

              {/* Content */}
              <h3 className="font-sans font-bold text-white text-base mb-2">{suggestion.name}</h3>
              <p className="text-white/60 text-sm font-body leading-relaxed">{suggestion.description}</p>

              {/* CTA */}
              <button className="mt-4 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Alert Banner */}
        <div className="mt-10 bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.3)] rounded-xl p-6">
          <p className="text-white/80 text-sm font-body">
            <span className="font-bold text-[oklch(0.52_0.17_155)]">Pro Tip:</span> Check the updated weather forecast
            before your activities. Pack accordingly and always have backup indoor plans.
          </p>
        </div>
      </div>
    </section>
  )
}
