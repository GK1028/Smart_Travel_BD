"use client"

import Image from "next/image"
import { Star, MapPin, UtensilsCrossed } from "lucide-react"

const foodItems = [
  {
    name: "Hilsa Fish Curry",
    district: "Chandpur / Dhaka",
    desc: "The national fish of Bangladesh, cooked in traditional mustard gravy — a must-try delicacy.",
    image: "https://i.ytimg.com/vi/11T07QWOTUs/maxresdefault.jpg",
    rating: 4.9,
    reviews: 2840,
    tag: "Iconic",
    restaurants: ["Ruposhi Bangla Restaurant", "Dhaka Club Kitchen", "Nandan Restaurant"],
  },
  {
    name: "Kacchi Biryani",
    district: "Dhaka",
    desc: "Slow-cooked mutton biryani with saffron rice, fried onions — the pinnacle of Dhaka cuisine.",
    image: "https://media.licdn.com/dms/image/v2/D5622AQH2PrpvtMQNAA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1723486642788?e=2147483647&v=beta&t=qrXXVKtZi-mLRNXH-ThOBizAhqW_YlGAGqS438RUmv8",
    rating: 4.8,
    reviews: 5120,
    tag: "Most Popular",
    restaurants: ["Haji Biriyani Old Dhaka", "Star Kabab & Restaurant", "Al Razzaque"],
  },
  {
    name: "Rice Pitha",
    district: "All Divisions",
    desc: "Traditional rice flour cakes with date palm jaggery — the soul of Bangladeshi winter festivals.",
    image: "https://content.instructables.com/F2J/7XQ2/II5VSGDP/F2J7XQ2II5VSGDP.jpg?auto=webp",
    rating: 4.7,
    reviews: 1980,
    tag: "Traditional",
    restaurants: ["Pitha Ghar", "Banglar Rannaghar", "Morshedi Pitha House"],
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-[oklch(0.72_0.14_75)] fill-[oklch(0.72_0.14_75)]" : "text-white/20"}`}
        />
      ))}
    </div>
  )
}

export default function CulinaryCompass() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.72_0.14_75/0.1)] border border-[oklch(0.72_0.14_75/0.3)] mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
            <span className="text-[oklch(0.72_0.14_75)] text-xs font-semibold tracking-widest uppercase">Culinary Compass</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-3">
            Taste the <span className="text-[oklch(0.72_0.14_75)]">Flavors of Bangladesh</span>
          </h2>
          <p className="text-white/50 font-body text-sm max-w-xl mx-auto text-pretty leading-relaxed">
            Explore iconic local dishes and the best restaurants to experience authentic Bangladeshi cuisine.
          </p>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div
              key={item.name}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[oklch(0.72_0.14_75/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[oklch(0.72_0.14_75/0.1)]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.04_240/0.8)] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[oklch(0.72_0.14_75)] text-[oklch(0.12_0.02_220)]">
                  {item.tag}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={item.rating} />
                    <span className="text-white font-bold text-sm">{item.rating}</span>
                  </div>
                  <span className="text-white/60 text-xs">{item.reviews.toLocaleString()} reviews</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 text-[oklch(0.52_0.17_155)]" />
                  <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold">{item.district}</span>
                </div>
                <h3 className="font-sans font-bold text-white text-lg mb-2">{item.name}</h3>
                <p className="text-white/50 text-xs font-body leading-relaxed mb-4">{item.desc}</p>

                {/* Restaurants */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2">Top Restaurants</p>
                  <div className="flex flex-col gap-1.5">
                    {item.restaurants.map((r) => (
                      <div key={r} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.14_75)]" />
                        <span className="text-white/60 text-xs font-body hover:text-white cursor-pointer transition-colors duration-200">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
