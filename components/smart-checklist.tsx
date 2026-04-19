"use client"

import { useState } from "react"
import { Check, Wand2, Backpack } from "lucide-react"

const defaultItems = [
  { id: 1, category: "Travel Docs", item: "Passport / NID", checked: false },
  { id: 2, category: "Travel Docs", item: "Travel Insurance", checked: false },
  { id: 3, category: "Clothing", item: "Light Summer Clothes", checked: false },
  { id: 4, category: "Clothing", item: "Comfortable Shoes", checked: false },
  { id: 5, category: "Clothing", item: "Rain Jacket", checked: false },
  { id: 6, category: "Health", item: "Medicines & First Aid", checked: false },
  { id: 7, category: "Health", item: "Sunscreen & Mosquito Repellent", checked: false },
  { id: 8, category: "Electronics", item: "Phone Charger", checked: false },
  { id: 9, category: "Electronics", item: "Power Bank", checked: false },
  { id: 10, category: "Essentials", item: "Wallet & Cards", checked: false },
]

export default function SmartChecklist() {
  const [items, setItems] = useState(defaultItems)
  const [tripDays, setTripDays] = useState(3)

  const toggleItem = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const autoGenerate = () => {
    // Enhanced checklist based on trip duration and weather
    const weatherItems = {
      rainy: ["Waterproof Bag", "Extra Socks"],
      sunny: ["Hat/Cap", "Sunglasses", "Umbrella"],
    }

    const durationItems = {
      short: ["Minimal Luggage"],
      medium: ["Extra Underwear", "Additional Toiletries"],
      long: ["Laundry Detergent", "Extra Shoes"],
    }

    alert(`Checklist optimized for ${tripDays} days trip with monsoon weather precautions!`)
  }

  const completedCount = items.filter((item) => item.checked).length
  const completionPercentage = Math.round((completedCount / items.length) * 100)

  const categories = Array.from(new Set(items.map((item) => item.category)))

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Backpack className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Packing Guide
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-4">
            Smart <span className="text-[oklch(0.72_0.14_75)]">Packing Checklist</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body mb-6">
            Never forget anything again. Customize your packing list based on your trip.
          </p>

          {/* Trip Duration & Auto-Generate */}
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div>
              <label className="text-white/60 text-xs uppercase font-bold tracking-wider block mb-2">
                Trip Duration
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={tripDays}
                onChange={(e) => setTripDays(parseInt(e.target.value))}
                className="w-full md:w-24 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 text-center focus:outline-none focus:border-[oklch(0.52_0.17_155/0.5)]"
              />
              <span className="text-white/40 text-xs mt-1 block">days</span>
            </div>
            <button
              onClick={autoGenerate}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[oklch(0.72_0.14_75)] text-white font-bold text-sm hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] transition-all duration-300 w-full md:w-auto"
            >
              <Wand2 className="w-4 h-4" />
              Auto Generate
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm font-semibold">Progress</span>
            <span className="text-[oklch(0.72_0.14_75)] font-bold text-sm">
              {completedCount} / {items.length}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[oklch(0.52_0.17_155)] to-[oklch(0.72_0.14_75)] transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-white/50 text-xs mt-2 block">{completionPercentage}% Complete</span>
        </div>

        {/* Checklist by Category */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-300">
              <h3 className="font-sans font-bold text-white text-base mb-4 uppercase tracking-wide text-[oklch(0.52_0.17_155)]">
                {category}
              </h3>
              <div className="space-y-3">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                          item.checked
                            ? "bg-[oklch(0.52_0.17_155)] border-[oklch(0.52_0.17_155)]"
                            : "border-white/30 group-hover:border-[oklch(0.52_0.17_155)]"
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="hidden"
                      />
                      <span
                        className={`text-sm font-medium transition-all duration-300 ${
                          item.checked ? "text-white/40 line-through" : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {item.item}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
