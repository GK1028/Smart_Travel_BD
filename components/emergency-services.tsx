"use client"

import { AlertCircle, MapPin, Phone, Clock, Heart, Shield, Pill } from "lucide-react"

const services = [
  {
    id: 1,
    icon: Heart,
    name: "Hospital",
    distance: "2.5 km away",
    contact: "+880-31-2650100",
    status: "24h",
    locations: ["Cox's Bazar Medical Centre", "Dhaka General Hospital", "Sylhet Osmani Hospital"],
  },
  {
    id: 2,
    icon: Shield,
    name: "Police Station",
    distance: "1.2 km away",
    contact: "+880-31-2640999",
    status: "Open",
    locations: ["Cox's Bazar Police", "Dhaka Central Police", "Rangamati Police"],
  },
  {
    id: 3,
    icon: Pill,
    name: "Pharmacy",
    distance: "0.8 km away",
    contact: "+880-31-2651000",
    status: "24h",
    locations: ["City Pharmacy", "Health Plus Pharmacy", "Emergency Pharmacy"],
  },
]

export default function EmergencyServices() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-400 text-xs font-semibold tracking-widest uppercase">
              Essential Services
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Nearby <span className="text-red-400">Emergency Services</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Quick access to hospitals, police, and pharmacies in your destination
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-red-400" />
                </div>

                {/* Title & Status */}
                <div className="mb-4">
                  <h3 className="font-sans font-bold text-white text-lg mb-2">{service.name}</h3>
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/15 border border-green-500/30">
                    <Clock className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs font-bold">{service.status}</span>
                  </div>
                </div>

                {/* Distance & Contact */}
                <div className="space-y-2 mb-5 pb-5 border-b border-white/10">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[oklch(0.52_0.17_155)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{service.distance}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[oklch(0.72_0.14_75)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{service.contact}</span>
                  </div>
                </div>

                {/* Nearby Locations */}
                <div className="space-y-2">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Nearby Options</p>
                  {service.locations.map((location) => (
                    <div key={location} className="text-white/50 text-xs px-2 py-1 bg-white/5 rounded border border-white/10">
                      • {location}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Emergency Info */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-sans font-bold text-red-400 mb-1">Emergency Helpline</h3>
              <p className="text-white/70 text-sm">
                National Emergency: <span className="text-red-400 font-bold">999</span> | Police: <span className="text-red-400 font-bold">100</span> | Ambulance: <span className="text-red-400 font-bold">102</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
