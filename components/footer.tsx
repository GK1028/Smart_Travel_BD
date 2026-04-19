"use client"

import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube, Sparkles } from "lucide-react"

const footerLinks = {
  Explore: ["Cox's Bazar", "Sajek Valley", "Sundarbans", "Sylhet", "Rangamati", "Bandarban"],
  Services: ["AI Trip Planner", "Weather Updates", "Travel Safety", "Culinary Guide", "Photo Gallery"],
  Company: ["About Us", "Blog", "Careers", "Press Kit", "Partnership"],
}

export default function Footer() {
  return (
    <footer id="about" className="bg-black/5 backdrop-blur-[2px] border-t border-white/10">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-white text-balance mb-2">
              Ready to Explore <span className="text-[oklch(0.72_0.14_75)]">Bangladesh?</span>
            </h3>
            <p className="text-white/50 font-body text-sm">Let our AI craft your perfect itinerary in seconds.</p>
          </div>
          <a
            href="#home"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[oklch(0.52_0.17_155)] hover:bg-[oklch(0.45_0.17_155)] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[oklch(0.52_0.17_155/0.3)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
            Start Planning for Free
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[oklch(0.52_0.17_155)] flex items-center justify-center shadow-lg shadow-[oklch(0.52_0.17_155/0.3)]">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-sans font-bold text-base tracking-tight">Smart Travel</span>
                <span className="text-[oklch(0.72_0.14_75)] font-sans font-semibold text-sm tracking-widest uppercase">BD</span>
              </div>
            </div>
            <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs mb-6 text-pretty">
              Bangladesh&apos;s first AI-powered travel intelligence platform. Discover, plan, and experience the beauty of Bangladesh like never before.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-2 mb-6">
              <a href="mailto:hello@smarttravelbd.com" className="flex items-center gap-2 text-white/40 hover:text-[oklch(0.72_0.14_75)] text-xs font-body transition-colors duration-300">
                <Mail className="w-3.5 h-3.5" />
                longday1007@gmail.com
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-2 text-white/40 hover:text-[oklch(0.72_0.14_75)] text-xs font-body transition-colors duration-300">
                <Phone className="w-3.5 h-3.5" />
                +880 1405-904600
              </a>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[oklch(0.72_0.14_75)] hover:bg-[oklch(0.72_0.14_75/0.1)] hover:border-[oklch(0.72_0.14_75/0.3)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-sans font-semibold text-white text-sm mb-4 tracking-wide">{heading}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-[oklch(0.72_0.14_75)] text-xs font-body transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-body">
            &copy; 2026 Smart Travel BD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs font-body transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
