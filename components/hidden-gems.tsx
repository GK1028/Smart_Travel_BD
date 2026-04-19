"use client"

import Image from "next/image"
import { Sparkles, MapPin } from "lucide-react"

const gems = [
  {
    id: 1,
    image: "https://media.licdn.com/dms/image/v2/C5612AQEI3LEEe5uk2A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520043075905?e=2147483647&v=beta&t=7vgqQPm1Jxke0K5dPET1U8SEwVFUivGcVY1iIrQaOVY",
    name: "Inani Beach",
    location: "Cox's Bazar",
    description: "A pristine, less-crowded stretch of beach with turquoise waters and golden cliffs.",
  },
  {
    id: 2,
    image: "https://huntingworldbeauty.com/wp-content/uploads/2024/12/Khagrachari-1-1024x576.jpeg.webp",
    name: "Khagrachari Tribal Village",
    location: "Rangamati",
    description: "Experience authentic tribal culture and homestay with indigenous communities.",
  },
  {
    id: 3,
    image: "https://static.wixstatic.com/media/b9965b_f870463851e049dba796d9ea354cb29e~mv2.jpg/v1/fill/w_568,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b9965b_f870463851e049dba796d9ea354cb29e~mv2.jpg",
    name: "Ratargul Swamp Forest",
    location: "Sylhet",
    description: "Serene kayaking through ancient swamp forests and limestone caves.",
  },
  {
    id: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Kaptai_lake_beauty.jpg/1280px-Kaptai_lake_beauty.jpg",
    name: "Pablakhali Wildlife Sanctuary",
    location: "Rangamati",
    description: "Trek through pristine forests to hidden waterfalls and wildlife zones.",
  },
  {
    id: 5,
    image: "https://www.itsholidaysltd.com/_next/image?url=%2Fimages%2Ftour%2FBangladesh%2FTanguar%20Haor%2FBlog%2FWhatsApp-Image-2021-06-19-at-9.01.36-PM1.jpeg&w=3840&q=100",
    name: "Sunamganj Haor",
    location: "Sunamganj",
    description: "Vast wetlands with migratory birds and tranquil village life off the beaten path.",
  },
  {
    id: 6,
    image: "https://media-cdn.tripadvisor.com/media/photo-s/09/f1/c9/59/sonargaon.jpg",
    name: "Panam City Ghost Town",
    location: "Narayanganj",
    description: "Abandoned Victorian-era city with haunting architecture and rich history.",
  },
]

export default function HiddenGems() {
  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.72_0.14_75/0.15)] border border-[oklch(0.72_0.14_75/0.3)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
            <span className="text-[oklch(0.72_0.14_75)] text-xs font-semibold tracking-widest uppercase">
              Secret Spots
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Discover Hidden <span className="text-[oklch(0.72_0.14_75)]">Gems</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Off-the-beaten-path destinations that will make your journey unforgettable
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gems.map((gem) => (
            <div
              key={gem.id}
              className="group relative overflow-hidden rounded-2xl h-72 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={gem.image}
                alt={gem.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.04_240/0.9)] via-[oklch(0.15_0.04_240/0.3)] to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[oklch(0.72_0.14_75)] text-white font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-3 h-3" />
                Secret Spot
              </div>

              {/* Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-sans font-bold text-white text-lg mb-2">{gem.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-[oklch(0.52_0.17_155)]" />
                  <span className="text-[oklch(0.52_0.17_155)] text-sm font-medium">{gem.location}</span>
                </div>
                <p className="text-white/80 text-sm font-body leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {gem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
