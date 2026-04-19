"use client"

import { useEffect, useState } from "react"
import {
  Home,
  Cloud,
  ShieldAlert,
  MapPin,
  Hotel,
  Bus,
  Users,
  Sparkles,
} from "lucide-react"

const sections = [
  { id: "home",         label: "Home",            icon: Home },
  { id: "weather",      label: "Weather",          icon: Cloud },
  { id: "safety",       label: "Safety & News",    icon: ShieldAlert },
  { id: "top-places",   label: "Top Places",       icon: MapPin },
  { id: "hotels",       label: "Hotels",           icon: Hotel },
  { id: "transport",    label: "Transport",        icon: Bus },
  { id: "group",        label: "Group Planning",   icon: Users },
  { id: "premium",      label: "Premium Features", icon: Sparkles },
]

export default function SideNav() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* Desktop — fixed left-side vertical nav */}
      <nav
        aria-label="Page sections"
        className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <div key={id} className="relative group flex items-center">
              <button
                onClick={() => scrollTo(id)}
                aria-label={label}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300
                  ${isActive
                    ? "bg-[oklch(0.52_0.17_155/0.25)] border-[oklch(0.52_0.17_155/0.7)] shadow-[0_0_12px_oklch(0.52_0.17_155/0.5)]"
                    : "bg-white/5 border-white/15 hover:bg-white/10 hover:border-white/30"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isActive ? "text-[oklch(0.72_0.14_75)]" : "text-white/50 group-hover:text-white/80"
                  }`}
                />
              </button>
              {/* Tooltip */}
              <span className="
                pointer-events-none absolute left-11 whitespace-nowrap
                px-2.5 py-1 rounded-md text-xs font-semibold font-sans
                bg-[oklch(0.15_0.04_240/0.95)] text-white border border-white/10
                opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-200 backdrop-blur-sm shadow-lg
              ">
                {label}
              </span>
            </div>
          )
        })}
      </nav>

      {/* Mobile — bottom navigation bar */}
      <nav
        aria-label="Page sections"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around
          bg-[oklch(0.13_0.03_240/0.95)] border-t border-white/10 backdrop-blur-xl px-2 py-2"
      >
        {sections.slice(0, 6).map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={label}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-[oklch(0.72_0.14_75)]" : "text-white/40"
                }`}
              />
              <span className={`text-[9px] font-semibold transition-colors duration-200 ${
                isActive ? "text-[oklch(0.72_0.14_75)]" : "text-white/40"
              }`}>
                {label.split(" ")[0]}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
