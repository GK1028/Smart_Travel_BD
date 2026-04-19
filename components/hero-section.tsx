"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, DollarSign, Calendar, Sparkles, ChevronDown } from "lucide-react"
import { format, differenceInDays, addDays } from "date-fns"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"

const divisions = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
]

const districtsByDivision: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Manikganj", "Munshiganj", "Narsingdi", "Tangail", "Kishoreganj", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachari", "Feni", "Comilla", "Lakshmipur", "Noakhali", "Chandpur", "Brahmanbaria"],
  Rajshahi: ["Rajshahi", "Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Sirajganj"],
  Khulna: ["Khulna", "Bagerhat", "Satkhira", "Jessore", "Chuadanga", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
}

export default function HeroSection() {
  const router = useRouter()
  const [selectedDivision, setSelectedDivision] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [budget, setBudget] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 10),
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const districts = selectedDivision ? districtsByDivision[selectedDivision] ?? [] : []

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(e.target.value)
    setSelectedDistrict("")
  }

  // Calculate duration from date range
  const duration = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 0

  const handlePlanTrip = () => {
    if (!selectedDivision || !selectedDistrict || !budget || duration < 1) {
      return
    }

    // Create URL params for the AI planner section
    const params = new URLSearchParams({
      division: selectedDivision,
      district: selectedDistrict,
      budget: budget,
      duration: duration.toString(),
      startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
      endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
      autoGenerate: "true"
    })

    // Navigate to the AI planner section with params
    router.push(`/?${params.toString()}#ai-planner`)
  }

  const isFormValid = selectedDivision && selectedDistrict && budget && duration >= 1

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30" />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.72_0.14_75)] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.52_0.17_155/0.2)] border border-[oklch(0.52_0.17_155/0.4)] backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
          <span className="text-[oklch(0.72_0.14_75)] text-xs font-semibold tracking-widest uppercase">
            Smart Experience
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-white text-balance leading-tight max-w-4xl">
          Smart Travel Planner for{" "}
          <span className="text-[oklch(0.72_0.14_75)]">Bangladesh</span>
        </h1>

        {/* Subheading */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl font-body leading-relaxed text-pretty">
          Discover the breathtaking beauty of Bangladesh — from Cox&apos;s Bazar&apos;s golden shores to Sajek&apos;s misty valleys. Let AI craft your perfect journey.
        </p>

        {/* Search Form */}
        <div className="w-full max-w-4xl mt-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl shadow-[oklch(0.15_0.04_240/0.5)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Division */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
                  Division
                </label>
                <div className="relative">
                  <select
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors duration-300"
                  >
                    <option value="" className="bg-[oklch(0.22_0.09_152)] text-white">Select Division</option>
                    {divisions.map((d) => (
                      <option key={d} value={d} className="bg-[oklch(0.22_0.09_152)] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              {/* District */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
                  District
                </label>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedDivision}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="" className="bg-[oklch(0.22_0.09_152)] text-white">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d} className="bg-[oklch(0.22_0.09_152)] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
                  Budget (BDT)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors duration-300"
                />
              </div>

              {/* Date Range Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
                  Travel Dates
                  {duration > 0 && (
                    <span className="text-[oklch(0.72_0.14_75)] font-bold ml-1">
                      ({duration} {duration === 1 ? "day" : "days"})
                    </span>
                  )}
                </label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium text-left focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors duration-300 hover:bg-white/15"
                    >
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <span className="flex items-center justify-between">
                            <span>{format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}</span>
                            <Calendar className="w-4 h-4 text-white/50" />
                          </span>
                        ) : (
                          format(dateRange.from, "MMM d, yyyy")
                        )
                      ) : (
                        <span className="text-white/30 flex items-center justify-between">
                          <span>Select dates</span>
                          <Calendar className="w-4 h-4 text-white/50" />
                        </span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[oklch(0.18_0.04_240)] border-white/20" align="start">
                    <CalendarUI
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => {
                        setDateRange(range)
                        if (range?.from && range?.to) {
                          setIsCalendarOpen(false)
                        }
                      }}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-5 flex justify-center">
              <button 
                onClick={handlePlanTrip}
                disabled={!isFormValid}
                className="flex items-center gap-3 px-10 py-4 rounded-xl bg-[oklch(0.52_0.17_155)] hover:bg-[oklch(0.45_0.17_155)] text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-[oklch(0.52_0.17_155/0.4)] hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5 text-[oklch(0.72_0.14_75)]" />
                Plan My Trip with AI
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {[
            { value: "64", label: "Districts" },
            { value: "500+", label: "Attractions" },
            { value: "8", label: "Divisions" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-[oklch(0.72_0.14_75)] font-sans">{stat.value}</span>
              <span className="text-white/50 text-xs font-medium tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  )
}
