"use client"

import { Clock, Utensils, Hotel, Bus, MapPin, Camera, Coffee, Mountain, Trees, Waves, Building } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  time: string
  label: string
}

interface Day {
  day: string
  title: string
  activities: Activity[]
}

const getActivityIcon = (label: string) => {
  const lowerLabel = label.toLowerCase()
  if (lowerLabel.includes("breakfast") || lowerLabel.includes("coffee") || lowerLabel.includes("tea")) return Coffee
  if (lowerLabel.includes("lunch") || lowerLabel.includes("dinner") || lowerLabel.includes("food") || lowerLabel.includes("meal") || lowerLabel.includes("eat")) return Utensils
  if (lowerLabel.includes("hotel") || lowerLabel.includes("check-in") || lowerLabel.includes("checkout") || lowerLabel.includes("room") || lowerLabel.includes("stay") || lowerLabel.includes("rest")) return Hotel
  if (lowerLabel.includes("bus") || lowerLabel.includes("arrive") || lowerLabel.includes("departure") || lowerLabel.includes("leave") || lowerLabel.includes("return")) return Bus
  if (lowerLabel.includes("sunrise") || lowerLabel.includes("sunset") || lowerLabel.includes("beach") || lowerLabel.includes("sun")) return MapPin
  if (lowerLabel.includes("photo") || lowerLabel.includes("visit") || lowerLabel.includes("explore") || lowerLabel.includes("sightseeing") || lowerLabel.includes("temple") || lowerLabel.includes("mosque")) return Camera
  if (lowerLabel.includes("hill") || lowerLabel.includes("mountain") || lowerLabel.includes("trek")) return Mountain
  if (lowerLabel.includes("forest") || lowerLabel.includes("jungle") || lowerLabel.includes("tree") || lowerLabel.includes("garden")) return Trees
  if (lowerLabel.includes("haor") || lowerLabel.includes("river") || lowerLabel.includes("lake") || lowerLabel.includes("water")) return Waves
  if (lowerLabel.includes("museum") || lowerLabel.includes("palace") || lowerLabel.includes("fort") || lowerLabel.includes("building")) return Building
  return MapPin
}

export function TabbedItinerary({ itinerary }: { itinerary: Day[] }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-white/60">No itinerary available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Tabs defaultValue={`day-0`} className="w-full">
        {/* Horizontal Tab List with Pill Design */}
        <TabsList className="flex w-full gap-2 mb-6 bg-transparent p-0 border-none h-auto flex-wrap">
          {itinerary.map((day, index) => (
            <TabsTrigger
              key={`tab-${index}`}
              value={`day-${index}`}
              className="px-4 py-2.5 rounded-full border border-white/20 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40 data-[state=active]:bg-[oklch(0.52_0.17_155)] data-[state=active]:text-white data-[state=active]:border-[oklch(0.52_0.17_155)] data-[state=active]:shadow-lg data-[state=active]:shadow-[oklch(0.52_0.17_155/0.3)] whitespace-nowrap font-medium"
            >
              {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Contents with Smooth Transitions */}
        {itinerary.map((day, index) => (
          <TabsContent 
            key={`content-${index}`} 
            value={`day-${index}`} 
            className="animate-in fade-in-50 slide-in-from-top-4 duration-300"
          >
            <Card className="bg-white/5 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:shadow-[oklch(0.52_0.17_155/0.1)] transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">{day.title}</CardTitle>
                <CardDescription className="text-white/50 text-sm">{day.day}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {day.activities.map((activity, idx) => {
                    const IconComponent = getActivityIcon(activity.label)
                    return (
                      <div 
                        key={idx} 
                        className="flex gap-4 pb-4 last:pb-0 last:border-0 border-b border-white/10 group hover:bg-white/5 p-3 rounded-lg transition-all duration-200 -mx-3"
                      >
                        {/* Time */}
                        {activity.time && (
                          <div className="flex flex-col items-center gap-2 min-w-[100px]">
                            <div className="w-10 h-10 rounded-lg bg-[oklch(0.72_0.14_75/0.2)] flex items-center justify-center group-hover:bg-[oklch(0.72_0.14_75/0.3)] transition-colors duration-200">
                              <Clock className="w-5 h-5 text-[oklch(0.72_0.14_75)]" />
                            </div>
                            <span className="text-sm font-semibold text-white text-center">{activity.time}</span>
                          </div>
                        )}

                        {/* Activity Details */}
                        <div className="flex-1 flex gap-3 pt-1">
                          <div className="w-10 h-10 rounded-lg bg-[oklch(0.52_0.17_155/0.2)] flex items-center justify-center flex-shrink-0 group-hover:bg-[oklch(0.52_0.17_155/0.3)] transition-colors duration-200">
                            <IconComponent className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-200">{activity.label}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
