"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, MapPin, Sparkles, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "AI Planner", href: "#ai-planner" },
  { label: "About", href: "#about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.15_0.04_240/0.95)] backdrop-blur-xl shadow-2xl shadow-[oklch(0.22_0.09_152/0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-[oklch(0.52_0.17_155)] flex items-center justify-center shadow-lg shadow-[oklch(0.52_0.17_155/0.4)] group-hover:scale-105 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-sans font-700 text-base tracking-tight">
              Smart Travel
            </span>
            <span className="text-[oklch(0.72_0.14_75)] font-sans font-600 text-sm tracking-widest uppercase">
              BD
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-white/80 hover:text-[oklch(0.72_0.14_75)] font-sans text-sm font-medium tracking-wide transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.72_0.14_75)] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            </li>
          ))}
          
          {/* Premium Button */}
          <li>
            <Link
              href="/premium"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.62_0.17_155)] text-white font-sans text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] transition-all duration-300 animate-pulse hover:animate-none"
            >
              Premium ✨
            </Link>
          </li>

          {/* Theme Toggle */}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Auth Button - Desktop */}
        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <p className="text-white/80 text-sm">{user.displayName || user.email}</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 font-semibold text-sm transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[oklch(0.72_0.14_75)] text-[oklch(0.72_0.14_75)] font-semibold text-sm hover:bg-[oklch(0.72_0.14_75/0.1)] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Login
          </Link>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[oklch(0.15_0.04_240/0.97)] backdrop-blur-xl px-4 py-6 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.isPremium
                  ? "px-4 py-3 rounded-full bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.62_0.17_155)] text-white font-sans text-sm font-bold tracking-wide text-center transition-all duration-300"
                  : "text-white/80 hover:text-[oklch(0.72_0.14_75)] font-sans text-base font-medium py-2 transition-colors duration-300"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {/* Premium Button - Mobile */}
          <Link
            href="/premium"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.62_0.17_155)] text-white text-sm font-bold mt-2"
            onClick={() => setIsOpen(false)}
          >
            Premium ✨
          </Link>

          {user ? (
            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-white/80 text-sm mb-3 px-4">{user.displayName || user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-red-500/10 text-red-400 font-semibold text-sm border border-red-500/30 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[oklch(0.72_0.14_75)] text-[oklch(0.72_0.14_75)] text-sm font-semibold mt-2 hover:bg-[oklch(0.72_0.14_75/0.1)] transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
