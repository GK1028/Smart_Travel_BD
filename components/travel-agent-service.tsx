"use client"

import { Star, MapPin, Shield, Users, ArrowRight } from "lucide-react"
import Image from "next/image"

const agents = [
  {
    id: 1,
    name: "Karim Ahmed",
    division: "Chattogram",
    image: "/images/agent-1.jpg",
    rating: 4.9,
    reviews: 247,
    specialization: "Cox's Bazar Specialist",
    badge: "Verified Expert",
    experience: "12 years",
    description: "Local guide with deep knowledge of beaches, water sports, and coastal attractions.",
    price: 1000,
  },
  {
    id: 2,
    name: "Fatima Begum",
    division: "Chattogram",
    image: "/images/agent-2.jpg",
    rating: 4.8,
    reviews: 186,
    specialization: "Hill Tracts Guide",
    badge: "Cultural Expert",
    experience: "10 years",
    description: "Expert in tribal culture, trekking routes, and mountain adventures in Sajek & Rangamati.",
    price: 1000,
  },
  {
    id: 3,
    name: "Rajesh Chandra",
    division: "Khulna",
    image: "/images/agent-3.jpg",
    rating: 4.7,
    reviews: 312,
    specialization: "Wildlife & Nature",
    badge: "Eco Guide",
    experience: "15 years",
    description: "Specialized in Sundarbans tiger safaris, wildlife photography, and nature conservation.",
    price: 1000,
  },
  {
    id: 4,
    name: "Afia Rahman",
    division: "Dhaka",
    image: "/images/agent-4.jpg",
    rating: 4.9,
    reviews: 428,
    specialization: "Urban Explorer",
    badge: "City Expert",
    experience: "11 years",
    description: "Master guide for Old Dhaka, historic monuments, and cultural heritage tours with local insights.",
    price: 1000,
  },
  {
    id: 5,
    name: "Bijoy Das",
    division: "Sylhet",
    image: "/images/agent-5.jpg",
    rating: 4.8,
    reviews: 195,
    specialization: "Tea Garden Expert",
    badge: "Eco Tourism",
    experience: "14 years",
    description: "Specialist in tea gardens, waterfalls, and ethnic culture experiences in Sylhet region.",
    price: 1000,
  },
  {
    id: 6,
    name: "Sumaya Akhter",
    division: "Rajshahi",
    image: "/images/agent-6.jpg",
    rating: 4.7,
    reviews: 234,
    specialization: "Historical Sites",
    badge: "Heritage Guide",
    experience: "9 years",
    description: "Expert in ancient palaces, religious sites, and agricultural tourism in Rajshahi division.",
    price: 1000,
  },
  {
    id: 7,
    name: "Habibur Rahman",
    division: "Rangpur",
    image: "/images/agent-7.jpg",
    rating: 4.8,
    reviews: 267,
    specialization: "Northern Region Specialist",
    badge: "Adventure Guide",
    experience: "13 years",
    description: "Expert guide for rural experiences, adventure tours, and authentic village life in Rangpur.",
    price: 1000,
  },
  {
    id: 8,
    name: "Priya Sharma",
    division: "Barishal",
    image: "/images/agent-8.jpg",
    rating: 4.6,
    reviews: 156,
    specialization: "River & Island Tours",
    badge: "Waterway Expert",
    experience: "10 years",
    description: "Specialized in river delta exploration, island hopping, and boating adventures in Barishal.",
    price: 1000,
  },
]

export default function TravelAgentService() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Users className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">Expert Guides</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Hire a Local <span className="text-[oklch(0.72_0.14_75)]">Travel Agent</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl font-body">
            Get personalized guidance from vetted local experts across all divisions of Bangladesh. Enjoy pickup service, cultural insights, and worry-free travel with trusted professionals.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[oklch(0.52_0.17_155/0.4)] transition-all duration-500 hover:shadow-2xl hover:shadow-[oklch(0.52_0.17_155/0.15)] hover:-translate-y-2"
            >
              {/* Agent Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[oklch(0.52_0.17_155/0.2)] to-transparent">
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.03_240)] via-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[oklch(0.52_0.17_155/0.3)] to-[oklch(0.72_0.14_75/0.3)] flex items-center justify-center text-2xl font-bold text-[oklch(0.72_0.14_75)]">
                    {agent.name.charAt(0)}{agent.name.split(" ")[1].charAt(0)}
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.72_0.14_75/0.2)] border border-[oklch(0.72_0.14_75/0.4)] backdrop-blur-md">
                  <Shield className="w-3 h-3 text-[oklch(0.72_0.14_75)]" />
                  <span className="text-[oklch(0.72_0.14_75)] text-xs font-bold">{agent.badge}</span>
                </div>
                {/* Division Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.2)] border border-[oklch(0.52_0.17_155/0.4)] backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                  <span className="text-[oklch(0.52_0.17_155)] text-xs font-bold">{agent.division}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Name & Rating */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-sans font-bold text-white text-base">{agent.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-[oklch(0.72_0.14_75/0.1)] px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)] fill-[oklch(0.72_0.14_75)]" />
                    <span className="text-white text-xs font-bold">{agent.rating}</span>
                  </div>
                </div>

                {/* Reviews Count */}
                <p className="text-white/50 text-xs mb-2">({agent.reviews} reviews)</p>

                {/* Specialization */}
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                  <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold">{agent.specialization}</span>
                </div>

                {/* Experience */}
                <div className="mb-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-0.5">Experience</p>
                  <p className="text-white text-xs font-body">{agent.experience} of guiding</p>
                </div>

                {/* Description */}
                <p className="text-white/50 text-xs font-body leading-relaxed mb-3 line-clamp-2">{agent.description}</p>

                {/* Pricing & CTA */}
                <div className="bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.2)] rounded-xl p-2 mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/60 text-xs">From</span>
                    <span className="font-sans font-bold text-[oklch(0.72_0.14_75)] text-sm">{agent.price.toLocaleString()} BDT</span>
                    <span className="text-white/40 text-xs">/day</span>
                  </div>
                  <p className="text-white/50 text-xs mt-0.5">Includes pickup + guidance</p>
                </div>

                {/* Hire Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[oklch(0.52_0.17_155)] to-[oklch(0.42_0.14_152)] text-white font-sans font-semibold text-xs hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.3)] transition-all duration-300 hover:translate-y-0.5 active:scale-95">
                  Hire Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Trust Indicators */}
                <div className="flex items-center gap-1 justify-center mt-2 pt-2 border-t border-white/10">
                  <Shield className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                  <span className="text-white/50 text-[10px]">Verified & insured</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-gradient-to-r from-[oklch(0.52_0.17_155/0.08)] to-[oklch(0.72_0.14_75/0.08)] border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-10 h-10 text-[oklch(0.52_0.17_155)] mx-auto mb-3" />
              <h4 className="font-sans font-bold text-white mb-2">100% Safe & Secure</h4>
              <p className="text-white/60 text-sm font-body">All guides are verified and fully insured for your peace of mind.</p>
            </div>
            <div>
              <Users className="w-10 h-10 text-[oklch(0.72_0.14_75)] mx-auto mb-3" />
              <h4 className="font-sans font-bold text-white mb-2">8 Local Experts</h4>
              <p className="text-white/60 text-sm font-body">One specialist per division, deep knowledge of local gems and authentic experiences.</p>
            </div>
            <div>
              <Star className="w-10 h-10 text-[oklch(0.42_0.14_152)] mx-auto mb-3" />
              <h4 className="font-sans font-bold text-white mb-2">Highly Rated</h4>
              <p className="text-white/60 text-sm font-body">Average rating 4.8+ from thousands of happy travelers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
