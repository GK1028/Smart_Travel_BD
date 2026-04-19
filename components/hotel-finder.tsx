"use client"

import Image from "next/image"
import { Star, MapPin, ChevronRight, Tag } from "lucide-react"
import { useState } from "react"

const hotels = [
  {
    id: 1,
    image: "https://pix10.agoda.net/hotelImages/119/1196495/1196495_17122303270060592537.jpg?ca=6&ce=1&s=1024x768",
    name: "Cox's Bazar Resort & Spa",
    location: "Cox's Bazar",
    price: 8500,
    rating: 4.8,
    tag: "Premium",
    amenities: ["WiFi", "Pool", "Restaurant"],
  },
  {
    id: 2,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/61/da/67/sajek-resort.jpg?w=900&h=500&s=1",
    name: "Sajek Hill View Hotel",
    location: "Rangamati",
    price: 4200,
    rating: 4.5,
    tag: "Budget",
    amenities: ["WiFi", "Hot Water"],
  },
  {
    id: 3,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/49/b8/5a/caption.jpg?w=1200&h=-1&s=1",
    name: "Sylhet Heritage Stay",
    location: "Sylhet",
    price: 6500,
    rating: 4.7,
    tag: "Best Value",
    amenities: ["WiFi", "Breakfast", "Garden"],
  },
  {
    id: 4,
    image: "https://www.hotelscombined.com/rimg/himg/bc/27/56/expedia_group-467437-22076116-496207.jpg?width=968&height=607&crop=true",
    name: "Lake View Resort",
    location: "Rangamati",
    price: 5800,
    rating: 4.6,
    tag: "Premium",
    amenities: ["WiFi", "Spa", "Restaurant"],
  },
  {
    id: 5,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/23/ea/dd/luxury-suites.jpg?w=900&h=-1&s=1",
    name: "Budget Guest House",
    location: "Khulna",
    price: 2500,
    rating: 4.2,
    tag: "Budget",
    amenities: ["WiFi", "Basic"],
  },
  {
    id: 6,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/67/radisson-blu-dhaka-water.jpg?w=1200&h=-1&s=1",
    name: "Dhaka Luxury Hotel",
    location: "Dhaka",
    price: 12000,
    rating: 4.9,
    tag: "Premium",
    amenities: ["WiFi", "Gym", "Restaurant"],
  },
]

const tagColors = {
  Premium: "bg-[oklch(0.72_0.14_75/0.2)] text-[oklch(0.72_0.14_75)] border-[oklch(0.72_0.14_75/0.4)]",
  Budget: "bg-green-500/15 text-green-400 border-green-500/30",
  "Best Value": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
}

export default function HotelFinder() {
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null)

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Tag className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Accommodation
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Find Your Perfect <span className="text-[oklch(0.72_0.14_75)]">Stay</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Curated hotels and stays for every budget and preference
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              onMouseEnter={() => setHoveredHotel(hotel.id)}
              onMouseLeave={() => setHoveredHotel(null)}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[oklch(0.52_0.17_155/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.15)] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.04_240/0.7)] via-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border backdrop-blur-sm ${tagColors[hotel.tag as keyof typeof tagColors]}`}>
                    {hotel.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-sans font-bold text-white text-base leading-tight">{hotel.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                      <span className="text-[oklch(0.52_0.17_155)] text-xs">{hotel.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[oklch(0.72_0.14_75/0.1)] px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-[oklch(0.72_0.14_75)] fill-[oklch(0.72_0.14_75)]" />
                    <span className="text-white text-xs font-bold">{hotel.rating}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3 pb-3 border-b border-white/10">
                  <span className="text-[oklch(0.72_0.14_75)] font-sans font-bold text-lg">{hotel.price}</span>
                  <span className="text-white/40 text-xs ml-1">BDT/night</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity) => (
                    <span key={amenity} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded border border-white/10">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className={`grid grid-cols-2 gap-2 transition-all duration-500 ${hoveredHotel === hotel.id ? "opacity-100" : "opacity-90"}`}>
                  <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    View Details
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-[oklch(0.72_0.14_75)] hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
