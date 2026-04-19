"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { format, addDays, differenceInDays } from "date-fns"
import {
  Sparkles, Calendar, Wallet, ShoppingBag, MapPin, Clock,
  Sun, Coffee, Camera, Utensils, Hotel, Bus, Loader2, Train,
  Ship, Car, Mountain, Trees, Waves, Building, Shirt, Droplets,
  Umbrella, BatteryCharging, Pill, CreditCard, CheckCircle2,
  Cloud, CloudRain, Wind, Thermometer, UtensilsCrossed
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { LoadingAnimation, LoadingSkeleton, WeatherCardSkeleton } from "@/components/loading-animation"
import { TabbedItinerary } from "@/components/tabbed-itinerary"
import { getFamousFoods, type FamousFood } from "@/lib/famous-foods"
import type { DateRange } from "react-day-picker"

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Rangpur",
  "Barishal",
  "Mymensingh",
]

const districtsByDivision: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Narsingdi", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachhari", "Comilla", "Chandpur", "Lakshmipur", "Noakhali", "Feni", "Brahmanbaria"],
  Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Narail", "Kushtia", "Meherpur", "Chuadanga", "Jhenaidah", "Magura"],
  Rajshahi: ["Rajshahi", "Natore", "Nawabganj", "Naogaon", "Bogra", "Joypurhat", "Pabna", "Sirajganj"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon", "Panchagarh", "Nilphamari", "Lalmonirhat", "Kurigram", "Gaibandha"],
  Barishal: ["Barishal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati"],
  Mymensingh: ["Mymensingh", "Netrokona", "Jamalpur", "Sherpur"],
}

// Also support alternate spellings
const divisionAliases: Record<string, string> = {
  "Chittagong": "Chattogram",
  "Barisal": "Barishal",
}

// Icon mapping for activities
const getActivityIcon = (label: string) => {
  const lowerLabel = label.toLowerCase()
  if (lowerLabel.includes("breakfast") || lowerLabel.includes("coffee") || lowerLabel.includes("tea")) return Coffee
  if (lowerLabel.includes("lunch") || lowerLabel.includes("dinner") || lowerLabel.includes("food") || lowerLabel.includes("meal") || lowerLabel.includes("eat")) return Utensils
  if (lowerLabel.includes("hotel") || lowerLabel.includes("check-in") || lowerLabel.includes("checkout") || lowerLabel.includes("room") || lowerLabel.includes("stay") || lowerLabel.includes("rest")) return Hotel
  if (lowerLabel.includes("bus") || lowerLabel.includes("arrive") || lowerLabel.includes("departure") || lowerLabel.includes("leave") || lowerLabel.includes("return")) return Bus
  if (lowerLabel.includes("train")) return Train
  if (lowerLabel.includes("boat") || lowerLabel.includes("ship") || lowerLabel.includes("ferry")) return Ship
  if (lowerLabel.includes("cng") || lowerLabel.includes("rickshaw") || lowerLabel.includes("auto")) return Car
  if (lowerLabel.includes("sunrise") || lowerLabel.includes("sunset") || lowerLabel.includes("beach") || lowerLabel.includes("sun")) return Sun
  if (lowerLabel.includes("photo") || lowerLabel.includes("visit") || lowerLabel.includes("explore") || lowerLabel.includes("sightseeing") || lowerLabel.includes("temple") || lowerLabel.includes("mosque")) return Camera
  if (lowerLabel.includes("shop") || lowerLabel.includes("market") || lowerLabel.includes("buy")) return ShoppingBag
  if (lowerLabel.includes("hill") || lowerLabel.includes("mountain") || lowerLabel.includes("trek")) return Mountain
  if (lowerLabel.includes("forest") || lowerLabel.includes("jungle") || lowerLabel.includes("tree") || lowerLabel.includes("garden")) return Trees
  if (lowerLabel.includes("haor") || lowerLabel.includes("river") || lowerLabel.includes("lake") || lowerLabel.includes("water")) return Waves
  if (lowerLabel.includes("museum") || lowerLabel.includes("palace") || lowerLabel.includes("fort") || lowerLabel.includes("building")) return Building
  return MapPin
}

// Parse AI response into structured data
interface ParsedDay {
  day: string
  title: string
  activities: { time: string; label: string }[]
}

interface ParsedBudget {
  label: string
  amount: number
  percent: number
  color: string
}

interface ParsedPlan {
  itinerary: ParsedDay[]
  budget: ParsedBudget[]
  totalBudget: number
  packingList: string[]
  travelTips: string[]
  moneySavingTips: string[]
}

interface WeatherData {
  district: string
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    condition: string
    icon: string
  }
  forecast: Array<{
    date: string
    tempMax: number
    tempMin: number
    rainProbability: number
    condition: string
    icon: string
  }>
  safetySuggestion: string
}

function parseAIPlan(plan: string, totalBudgetInput: number): ParsedPlan {
  const lines = plan.split("\n")
  const itinerary: ParsedDay[] = []
  const packingList: string[] = []
  const travelTips: string[] = []
  const moneySavingTips: string[] = []
  
  let currentDay: ParsedDay | null = null
  let currentSection = "itinerary"
  
  const budgetCategories: Record<string, { amount: number; color: string }> = {
    "Transport": { amount: 0, color: "bg-[oklch(0.72_0.14_75)]" },
    "Food & Dining": { amount: 0, color: "bg-blue-400" },
    "Accommodation": { amount: 0, color: "bg-[oklch(0.52_0.17_155)]" },
    "Activities & Entry": { amount: 0, color: "bg-purple-400" },
    "Shopping & Misc": { amount: 0, color: "bg-orange-400" },
  }

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    
    const dayMatch = trimmedLine.match(/^#{1,4}\s*(Day\s*\d+|দিন\s*\d+)/i) || 
                     trimmedLine.match(/^\*{1,2}\s*(Day\s*\d+|দিন\s*\d+)/i) ||
                     trimmedLine.match(/^(Day\s*\d+|দিন\s*\d+)/i) ||
                     trimmedLine.match(/\*\*(Day\s*\d+)/i)
    
    if (dayMatch) {
      if (currentDay && currentDay.activities.length > 0) {
        itinerary.push(currentDay)
      }
      const dayNum = trimmedLine.match(/\d+/)?.[0] || (itinerary.length + 1).toString()
      const titlePart = trimmedLine.replace(/^#+\s*/, "").replace(/^\*+\s*/, "").replace(/\*+$/g, "").replace(/\*\*/g, "")
      const titleMatch = titlePart.match(/[:\-–]\s*(.+)/) || titlePart.match(/Day\s*\d+\s*(.+)/i)
      currentDay = {
        day: `Day ${dayNum}`,
        title: titleMatch ? titleMatch[1].trim().replace(/^\s*[-:–]\s*/, "") : `Day ${dayNum} Exploration`,
        activities: []
      }
      currentSection = "itinerary"
      continue
    }

    if (trimmedLine.match(/packing|what to carry|জিনিসপত্র|things to bring/i)) {
      currentSection = "packing"
      continue
    }
    if (trimmedLine.match(/travel tip|safety|সতর্কতা|best time|important note/i)) {
      currentSection = "tips"
      continue
    }
    if (trimmedLine.match(/money.?saving|সাশ্রয়|budget tip|save money/i)) {
      currentSection = "savings"
      continue
    }
    if (trimmedLine.match(/cost breakdown|budget breakdown|খরচের হিসাব|total cost|expense/i)) {
      currentSection = "budget"
      continue
    }

    const timePatterns = [
      /^[-*•]\s*\*{0,2}(\d{1,2}[:\.]?\d{0,2}\s*(?:AM|PM|am|pm)?)\*{0,2}\s*[:\-–]?\s*(.+)/i,
      /^\*{0,2}(\d{1,2}[:\.]?\d{0,2}\s*(?:AM|PM|am|pm))\*{0,2}\s*[:\-–]\s*(.+)/i,
      /^[-*•]\s*((?:সকাল|দুপুর|বিকাল|রাত|Morning|Noon|Afternoon|Evening|Night))\s*[:\-–]?\s*(.+)/i,
      /^[-*•]\s*\*{0,2}((?:Early\s+)?Morning|Noon|Afternoon|Evening|Night|Late\s+Night)\*{0,2}[:\-–]?\s*(.+)/i,
      /^\*{0,2}(Morning|Noon|Afternoon|Evening|Night)\*{0,2}[:\s\-–]+(.+)/i,
    ]
    
    let timeMatch = null
    for (const pattern of timePatterns) {
      timeMatch = trimmedLine.match(pattern)
      if (timeMatch) break
    }
    
    if (timeMatch && currentDay) {
      let time = timeMatch[1].trim().replace(/\*\*/g, "")
      const activity = timeMatch[2].replace(/\*\*/g, "").replace(/^\s*[-:–]\s*/, "").trim()
      
      if (time.match(/সকাল|morning/i)) time = "Morning"
      else if (time.match(/দুপুর|noon/i)) time = "Noon"
      else if (time.match(/বিকাল|afternoon/i)) time = "Afternoon"
      else if (time.match(/রাত|evening|night/i)) time = "Night"
      
      if (activity.length > 3) {
        currentDay.activities.push({ time, label: activity })
      }
      continue
    }

    if (currentSection === "itinerary" && currentDay) {
      const bulletMatch = trimmedLine.match(/^[-*•]\s*(.+)/)
      if (bulletMatch) {
        const content = bulletMatch[1].replace(/\*\*/g, "").trim()
        if (content.length > 5 && content.length < 150 && !content.match(/^(day|cost|budget|total|packing|tip)/i)) {
          currentDay.activities.push({ time: "", label: content })
          continue
        }
      }
    }

    const bulletMatch = trimmedLine.match(/^[-*•✓✔]\s*(.+)/)
    if (bulletMatch) {
      const content = bulletMatch[1].replace(/\*\*/g, "").trim()
      if (currentSection === "packing" && content.length > 2) {
        packingList.push(content)
      } else if (currentSection === "tips" && content.length > 5) {
        travelTips.push(content)
      } else if (currentSection === "savings" && content.length > 5) {
        moneySavingTips.push(content)
      }
    }

    const budgetPatterns = [
      /(transport|bus|travel|যাতায়াত)[^\d]*(\d{1,5})/i,
      /(food|meal|খাবার|eat|dining)[^\d]*(\d{1,5})/i,
      /(hotel|accommodation|stay|থাকা|room|lodge)[^\d]*(\d{1,5})/i,
      /(activities|entry|ticket|টিকেট|admission)[^\d]*(\d{1,5})/i,
      /(shop|misc|other|অন্যান্য)[^\d]*(\d{1,5})/i,
    ]
    
    for (const pattern of budgetPatterns) {
      const match = trimmedLine.match(pattern)
      if (match) {
        const category = match[1].toLowerCase()
        const amount = parseInt(match[2])
        if (category.match(/transport|bus|যাতায়াত|travel/i)) {
          budgetCategories["Transport"].amount += amount
        } else if (category.match(/food|meal|খাবার|eat|dining/i)) {
          budgetCategories["Food & Dining"].amount += amount
        } else if (category.match(/hotel|accommodation|stay|থাকা|room|lodge/i)) {
          budgetCategories["Accommodation"].amount += amount
        } else if (category.match(/activities|entry|ticket|টিকেট|admission/i)) {
          budgetCategories["Activities & Entry"].amount += amount
        } else if (category.match(/shop|misc|other|অন্যান্য/i)) {
          budgetCategories["Shopping & Misc"].amount += amount
        }
        break
      }
    }
  }

  if (currentDay && currentDay.activities.length > 0) {
    itinerary.push(currentDay)
  }

  let totalFromPlan = Object.values(budgetCategories).reduce((sum, cat) => sum + cat.amount, 0)
  
  if (totalFromPlan === 0) {
    totalFromPlan = totalBudgetInput
    budgetCategories["Accommodation"].amount = Math.round(totalBudgetInput * 0.35)
    budgetCategories["Transport"].amount = Math.round(totalBudgetInput * 0.25)
    budgetCategories["Food & Dining"].amount = Math.round(totalBudgetInput * 0.25)
    budgetCategories["Activities & Entry"].amount = Math.round(totalBudgetInput * 0.10)
    budgetCategories["Shopping & Misc"].amount = Math.round(totalBudgetInput * 0.05)
  }

  const budget: ParsedBudget[] = Object.entries(budgetCategories)
    .filter(([_, data]) => data.amount > 0)
    .map(([label, data]) => ({
      label,
      amount: data.amount,
      percent: Math.round((data.amount / totalFromPlan) * 100),
      color: data.color
    }))

  if (packingList.length === 0) {
    packingList.push(
      "Light cotton clothing (3-4 sets)",
      "Sunscreen SPF 50+",
      "Waterproof sandals",
      "Rain jacket / poncho",
      "Insect repellent",
      "Power bank & chargers",
      "First aid kit",
      "Valid ID & travel documents",
      "BDT cash (local areas)"
    )
  }

  return {
    itinerary,
    budget,
    totalBudget: totalFromPlan || totalBudgetInput,
    packingList: packingList.slice(0, 12),
    travelTips: travelTips.slice(0, 6),
    moneySavingTips: moneySavingTips.slice(0, 5)
  }
}

const defaultItinerary = [
  {
    day: "Day 1",
    title: "Arrival & Coastal Exploration",
    activities: [
      { time: "09:00 AM", label: "Arrive at Cox's Bazar" },
      { time: "11:00 AM", label: "Check-in at beachfront hotel" },
      { time: "01:00 PM", label: "Lunch: Local seafood at Kolatoli" },
      { time: "03:00 PM", label: "Explore Laboni Beach" },
      { time: "06:00 PM", label: "Sunset at Inani Beach" },
    ],
  },
  {
    day: "Day 2",
    title: "Island & Adventure",
    activities: [
      { time: "07:00 AM", label: "Sunrise walk on the beach" },
      { time: "09:00 AM", label: "Breakfast at hotel" },
      { time: "10:30 AM", label: "Boat trip to Saint Martin Island" },
      { time: "01:00 PM", label: "Snorkeling & coral exploration" },
      { time: "07:00 PM", label: "Seafood BBQ dinner" },
    ],
  },
  {
    day: "Day 3",
    title: "Culture & Departure",
    activities: [
      { time: "08:00 AM", label: "Breakfast & checkout" },
      { time: "10:00 AM", label: "Visit Ramu Buddhist Temple" },
      { time: "12:00 PM", label: "Local market shopping" },
      { time: "02:00 PM", label: "Departure" },
    ],
  },
]

const defaultBudgetBreakdown = [
  { label: "Accommodation", amount: 6000, percent: 40, color: "bg-[oklch(0.52_0.17_155)]" },
  { label: "Transport", amount: 3000, percent: 20, color: "bg-[oklch(0.72_0.14_75)]" },
  { label: "Food & Dining", amount: 3750, percent: 25, color: "bg-blue-400" },
  { label: "Activities & Entry", amount: 1500, percent: 10, color: "bg-purple-400" },
  { label: "Shopping & Misc", amount: 750, percent: 5, color: "bg-orange-400" },
]

const defaultPackingList = [
  "Light cotton clothing (3-4 sets)",
  "Sunscreen SPF 50+",
  "Waterproof sandals",
  "Rain jacket / poncho",
  "Insect repellent",
  "Power bank & chargers",
  "First aid kit",
  "Valid ID & travel documents",
  "BDT cash (local areas)",
]

const getPackingIcon = (item: string) => {
  const lowerItem = item.toLowerCase()
  if (lowerItem.includes("cloth") || lowerItem.includes("shirt") || lowerItem.includes("dress")) return Shirt
  if (lowerItem.includes("sun") || lowerItem.includes("lotion")) return Sun
  if (lowerItem.includes("sandal") || lowerItem.includes("shoe") || lowerItem.includes("water")) return Droplets
  if (lowerItem.includes("rain") || lowerItem.includes("umbrella") || lowerItem.includes("poncho")) return Umbrella
  if (lowerItem.includes("power") || lowerItem.includes("charger") || lowerItem.includes("battery")) return BatteryCharging
  if (lowerItem.includes("first aid") || lowerItem.includes("medicine") || lowerItem.includes("pill")) return Pill
  if (lowerItem.includes("cash") || lowerItem.includes("money") || lowerItem.includes("bdt") || lowerItem.includes("card")) return CreditCard
  if (lowerItem.includes("id") || lowerItem.includes("document") || lowerItem.includes("passport")) return CreditCard
  return CheckCircle2
}

const getWeatherIcon = (icon: string) => {
  if (icon === "sun") return Sun
  if (icon === "cloud-rain") return CloudRain
  return Cloud
}

function AITravelPlanContent() {
  const searchParams = useSearchParams()
  
  const [division, setDivision] = useState("")
  const [district, setDistrict] = useState("")
  const [budget, setBudget] = useState(5000)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 10),
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [parsedPlan, setParsedPlan] = useState<ParsedPlan | null>(null)
  const [planMeta, setPlanMeta] = useState<{ division: string; district: string; budget: number; duration: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [famousFoods, setFamousFoods] = useState<FamousFood[]>([])
  const [hasAutoGenerated, setHasAutoGenerated] = useState(false)

  const duration = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 3

  const availableDistricts = division ? districtsByDivision[division] || [] : []

  // Fetch weather data
  const fetchWeather = useCallback(async (districtName: string) => {
    setIsLoadingWeather(true)
    try {
      const response = await fetch(`/api/weather?district=${encodeURIComponent(districtName)}`)
      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      }
    } catch (err) {
      console.error("Failed to fetch weather:", err)
    } finally {
      setIsLoadingWeather(false)
    }
  }, [])

  // Handle URL params for auto-generation
  useEffect(() => {
    const urlDivision = searchParams.get("division")
    const urlDistrict = searchParams.get("district")
    const urlBudget = searchParams.get("budget")
    const urlDuration = searchParams.get("duration")
    const urlStartDate = searchParams.get("startDate")
    const urlEndDate = searchParams.get("endDate")
    const autoGenerate = searchParams.get("autoGenerate")

    if (urlDivision && urlDistrict && urlBudget && !hasAutoGenerated) {
      // Normalize division name
      const normalizedDivision = divisionAliases[urlDivision] || urlDivision
      
      setDivision(normalizedDivision)
      setDistrict(urlDistrict)
      setBudget(parseInt(urlBudget))
      
      if (urlStartDate && urlEndDate) {
        setDateRange({
          from: new Date(urlStartDate),
          to: new Date(urlEndDate)
        })
      }

      // Fetch weather for the district
      fetchWeather(urlDistrict)
      
      // Set famous foods
      setFamousFoods(getFamousFoods(urlDistrict))

      if (autoGenerate === "true") {
        setHasAutoGenerated(true)
        // Auto-generate plan after a short delay
        setTimeout(() => {
          handleGeneratePlanWithParams(normalizedDivision, urlDistrict, parseInt(urlBudget), parseInt(urlDuration || "3"))
        }, 500)
      }
    }
  }, [searchParams, hasAutoGenerated, fetchWeather])

  const handleGeneratePlanWithParams = async (div: string, dist: string, bud: number, dur: number) => {
    setIsGenerating(true)
    setError(null)
    setParsedPlan(null)
    setCheckedItems({})

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          division: div,
          district: dist,
          budget: bud,
          duration: dur,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate plan")
      }

      if (!data.plan) {
        throw new Error("No plan received from AI")
      }

      const parsed = parseAIPlan(data.plan, bud)
      
      if (parsed.itinerary.length === 0) {
        const rawLines = data.plan.split('\n').filter((l: string) => l.trim())
        const basicDay: ParsedDay = {
          day: "Day 1",
          title: `${data.meta.district} Travel Plan`,
          activities: []
        }
        
        let activityCount = 0
        for (const line of rawLines) {
          if (activityCount >= 20) break
          const trimmed = line.trim().replace(/^[-*•#]+\s*/, '').replace(/\*\*/g, '')
          if (trimmed.length > 10 && trimmed.length < 100) {
            basicDay.activities.push({
              time: "",
              label: trimmed
            })
            activityCount++
          }
        }
        
        if (basicDay.activities.length > 0) {
          parsed.itinerary = [basicDay]
        }
      }
      
      setParsedPlan(parsed)
      setPlanMeta(data.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (!division || !district) {
      setError("Please select both division and district")
      return
    }

    // Fetch weather and foods
    fetchWeather(district)
    setFamousFoods(getFamousFoods(district))

    await handleGeneratePlanWithParams(division, district, budget, duration)
  }

  const togglePackingItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const hasGeneratedPlan = parsedPlan !== null
  const displayItinerary = hasGeneratedPlan ? (parsedPlan.itinerary.length > 0 ? parsedPlan.itinerary : defaultItinerary) : defaultItinerary
  const displayBudget = hasGeneratedPlan ? (parsedPlan.budget.length > 0 ? parsedPlan.budget : defaultBudgetBreakdown) : defaultBudgetBreakdown
  const displayPackingList = hasGeneratedPlan ? (parsedPlan.packingList.length > 0 ? parsedPlan.packingList : defaultPackingList) : defaultPackingList
  const displayTotalBudget = hasGeneratedPlan ? parsedPlan.totalBudget : 15000
  const isGenerated = hasGeneratedPlan

  return (
    <>
      {isGenerating && <LoadingAnimation />}
      <section id="ai-planner" className="py-20 bg-black/75">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">AI Travel Plan</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Generate Your <span className="text-[oklch(0.72_0.14_75)]">Personalized Itinerary</span>
          </h2>
          <p className="text-white/50 font-body text-sm max-w-xl mx-auto text-pretty leading-relaxed">
            Select your destination and budget, and let AI create a detailed travel plan just for you
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Division Select */}
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-xs font-medium flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Division
              </label>
              <Select value={division} onValueChange={(val) => { setDivision(val); setDistrict("") }}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((div) => (
                    <SelectItem key={div} value={div}>{div}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Select */}
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-xs font-medium flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                District
              </label>
              <Select value={district} onValueChange={setDistrict} disabled={!division}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue placeholder={division ? "Select District" : "Select Division First"} />
                </SelectTrigger>
                <SelectContent>
                  {availableDistricts.map((dist) => (
                    <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget Input */}
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-xs font-medium flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5" />
                Budget (BDT)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || value === '-') {
                    setBudget(0)
                  } else {
                    const parsed = parseInt(value)
                    if (!isNaN(parsed)) {
                      setBudget(Math.max(0, parsed))
                    }
                  }
                }}
                onBlur={() => {
                  if (budget < 2000 && budget > 0) {
                    setBudget(2000)
                  } else if (budget === 0) {
                    setBudget(5000)
                  }
                }}
                min={2000}
                max={100000}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white h-11 focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors"
                placeholder="e.g. 15000"
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

          {/* Generate Button */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button
              onClick={handleGeneratePlan}
              disabled={isGenerating || !division || !district}
              className="bg-[oklch(0.52_0.17_155)] hover:bg-[oklch(0.52_0.17_155/0.9)] text-white px-8 py-3 h-auto font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Travel Plan
                </>
              )}
            </Button>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LoadingSkeleton />
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Skeleton className="h-8 w-40 bg-white/10 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-3 w-full bg-white/10 mb-2" />
                      <Skeleton className="h-1.5 w-full bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid - 70% Itinerary / 30% Weather + Budget + Packing */}
        {!isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Itinerary (70%) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Itinerary Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[oklch(0.52_0.17_155/0.2)] flex items-center justify-center">
                    <Calendar className="w-4.5 h-4.5 text-[oklch(0.52_0.17_155)]" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-lg">
                    {isGenerated ? "Your Itinerary" : "Sample Itinerary"}
                  </h3>
                </div>
                <p className="text-white/40 text-xs mb-6">
                  {isGenerated && planMeta 
                    ? `${planMeta.district} - ${planMeta.duration} Days / ${planMeta.budget.toLocaleString()} BDT`
                    : "Cox's Bazar - 3 Days / 15,000 BDT"
                  }
                </p>

                <TabbedItinerary itinerary={displayItinerary} />

                {/* Travel Tips Section */}
                {isGenerated && parsedPlan?.travelTips && parsedPlan.travelTips.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      Travel Tips
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {parsedPlan.travelTips.map((tip, i) => (
                        <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                          <span className="text-[oklch(0.52_0.17_155)]">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Money Saving Tips */}
                {isGenerated && parsedPlan?.moneySavingTips && parsedPlan.moneySavingTips.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      Money-Saving Tips
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {parsedPlan.travelTips.map((tip, i) => (
                        <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                          <span className="text-[oklch(0.52_0.17_155)]">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Money Saving Tips */}
                {isGenerated && parsedPlan?.moneySavingTips && parsedPlan.moneySavingTips.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      Money-Saving Tips
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {parsedPlan.moneySavingTips.map((tip, i) => (
                        <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                          <span className="text-[oklch(0.72_0.14_75)]">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Famous Food Section */}
              {famousFoods.length > 0 && isGenerated && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-orange-400/15 flex items-center justify-center">
                      <UtensilsCrossed className="w-4.5 h-4.5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-white text-lg">Famous Food</h3>
                      <p className="text-white/40 text-xs">Must-try local delicacies in {planMeta?.district || district}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {famousFoods.map((food, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-400/30 transition-colors group">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                          <img 
                            src={food.image} 
                            alt={food.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm mb-0.5">{food.name}</h4>
                          <p className="text-[oklch(0.72_0.14_75)] text-xs mb-1">{food.nameBangla}</p>
                          <p className="text-white/50 text-xs line-clamp-2">{food.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Weather + Budget + Packing (30%) */}
            <div className="flex flex-col gap-6">
              {/* Weather Card - Compact Version */}
              {weatherData && isGenerated && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-400/15 flex items-center justify-center">
                      <Thermometer className="w-4.5 h-4.5 text-blue-400" />
                    </div>
                    <h3 className="font-sans font-bold text-white text-base">
                      Weather
                    </h3>
                  </div>
                  
                  {/* Current Weather - Compact */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = getWeatherIcon(weatherData.current.icon)
                        return <Icon className="w-8 h-8 text-[oklch(0.72_0.14_75)]" />
                      })()}
                      <div>
                        <p className="text-2xl font-bold text-white">{Math.round(weatherData.current.temperature)}°C</p>
                        <p className="text-white/50 text-xs">{weatherData.current.condition}</p>
                      </div>
                    </div>
                  </div>

                  {/* Weather Stats - Compact Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <Droplets className="w-3.5 h-3.5 text-blue-400 mx-auto mb-0.5" />
                      <p className="text-white text-xs font-semibold">{weatherData.current.humidity}%</p>
                      <p className="text-white/40 text-[9px]">Humidity</p>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <Wind className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)] mx-auto mb-0.5" />
                      <p className="text-white text-xs font-semibold">{Math.round(weatherData.current.windSpeed)}</p>
                      <p className="text-white/40 text-[9px]">km/h</p>
                    </div>
                  </div>

                  {/* Compact Forecast */}
                  <div className="grid grid-cols-4 gap-1 mt-4">
                    {weatherData.forecast.slice(0, 4).map((day, i) => {
                      const Icon = getWeatherIcon(day.icon)
                      return (
                        <div key={i} className="text-center p-1.5 rounded-lg bg-white/5">
                          <p className="text-white/40 text-[8px] mb-0.5">
                            {format(new Date(day.date), "EEE")}
                          </p>
                          <Icon className="w-4 h-4 mx-auto text-white/60 mb-0.5" />
                          <p className="text-white text-xs font-semibold">{Math.round(day.tempMax)}°</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Budget */}
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[oklch(0.72_0.14_75/0.15)] flex items-center justify-center">
                    <Wallet className="w-4.5 h-4.5 text-[oklch(0.72_0.14_75)]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-white text-base">
                      {isGenerated ? "Budget Breakdown" : "Sample Budget"}
                    </h3>
                    <p className="text-white/40 text-xs">Total: {displayTotalBudget.toLocaleString()} BDT</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {displayBudget.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-white/70 text-xs font-body">{item.label}</span>
                        <span className="text-white font-semibold text-xs">{item.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-700`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packing List */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-purple-400/15 flex items-center justify-center">
                    <ShoppingBag className="w-4.5 h-4.5 text-purple-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-base">Packing List</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {displayPackingList.map((item) => (
                    <div 
                      key={item} 
                      className="flex items-start gap-2.5 cursor-pointer group"
                      onClick={() => togglePackingItem(item)}
                    >
                      <Checkbox 
                        checked={checkedItems[item] || false}
                        className="mt-0.5 border-[oklch(0.52_0.17_155/0.5)] data-[state=checked]:bg-[oklch(0.52_0.17_155)] data-[state=checked]:border-[oklch(0.52_0.17_155)]"
                      />
                      <span className={`text-xs font-body leading-relaxed transition-all duration-200 ${
                        checkedItems[item] 
                          ? "text-white/30 line-through" 
                          : "text-white/60 group-hover:text-white/80"
                      }`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  )
}

// Wrapper with Suspense for useSearchParams hook
export default function AITravelPlanWrapper() {
  return (
    <Suspense fallback={
      <section id="ai-planner" className="py-20 bg-[oklch(0.13_0.03_240)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
              <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">AI Travel Plan</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
              Generate Your <span className="text-[oklch(0.72_0.14_75)]">Personalized Itinerary</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.52_0.17_155)]" />
          </div>
        </div>
      </section>
    }>
      <AITravelPlanContent />
    </Suspense>
  )
}
