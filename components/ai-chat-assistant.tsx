"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const QUICK_QUESTIONS = [
  "Best places to visit in Bangladesh?",
  "Low budget trip ideas?",
  "Is this place safe to travel?",
  "What should I pack?",
  "Suggest a 2-day trip plan",
]

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Smart Travel Assistant. How can I help you plan your Bangladesh trip?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: "user", content: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const reply = getMockReply(text.toLowerCase())
    setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    setLoading(false)
  }

  const getMockReply = (question: string): string => {
    if (question.includes("best") || question.includes("visit"))
      return "Cox's Bazar, Sajek Valley, and Sylhet are must-visit destinations. Each offers unique experiences from pristine beaches to misty mountains."
    if (question.includes("budget"))
      return "A budget trip for 2-3 days costs around 3,000-5,000 BDT per person including transport, food, and basic accommodation."
    if (question.includes("safe"))
      return "Bangladesh is generally safe for travelers. Always check current travel advisories and follow local guidelines."
    if (question.includes("pack"))
      return "Pack light clothes, sunscreen, comfortable shoes, a light jacket for evenings, and a power bank. Don't forget your ID and travel documents!"
    if (question.includes("trip") || question.includes("plan") || question.includes("2-day"))
      return "Day 1: Arrive & explore local markets. Day 2: Visit nearby attractions (beach/hills). Evening: Return. This covers transport, meals, and activities."
    return "Great question! I can help with travel tips, itineraries, budgeting, safety info, and local recommendations for Bangladesh. What would you like to know?"
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`
          fixed z-50 transition-all duration-300 ease-in-out
          md:bottom-24 md:right-6 md:w-[360px] md:rounded-2xl md:shadow-2xl
          bottom-0 right-0 left-0 md:left-auto
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <div className="
          bg-[oklch(0.13_0.03_240/0.97)] border border-white/10 backdrop-blur-xl
          md:rounded-2xl rounded-t-2xl overflow-hidden
          flex flex-col
          md:h-[520px] h-[70vh]
        ">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[oklch(0.52_0.17_155/0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[oklch(0.52_0.17_155)] flex items-center justify-center shadow-lg shadow-[oklch(0.52_0.17_155/0.4)]">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-sans font-bold text-white text-sm leading-tight">Smart Travel Assistant</p>
                <p className="text-[oklch(0.52_0.17_155)] text-[10px] font-semibold uppercase tracking-wider">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`
                  w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5
                  ${msg.role === "assistant"
                    ? "bg-[oklch(0.52_0.17_155/0.2)] border border-[oklch(0.52_0.17_155/0.4)]"
                    : "bg-[oklch(0.72_0.14_75/0.2)] border border-[oklch(0.72_0.14_75/0.4)]"}
                `}>
                  {msg.role === "assistant"
                    ? <Bot className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
                    : <User className="w-3.5 h-3.5 text-[oklch(0.72_0.14_75)]" />
                  }
                </div>
                <div className={`
                  max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed
                  ${msg.role === "assistant"
                    ? "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                    : "bg-[oklch(0.52_0.17_155/0.2)] border border-[oklch(0.52_0.17_155/0.3)] text-white rounded-tr-sm"}
                `}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-[oklch(0.52_0.17_155/0.2)] border border-[oklch(0.52_0.17_155/0.4)]">
                  <Bot className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick questions — show only at start */}
            {messages.length === 1 && (
              <div className="space-y-1.5 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-body hover:bg-[oklch(0.52_0.17_155/0.15)] hover:border-[oklch(0.52_0.17_155/0.3)] hover:text-white transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input) }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Bangladesh travel..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.5)] transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-[oklch(0.52_0.17_155)] flex items-center justify-center disabled:opacity-40 hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.4)] transition-all duration-200 flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAB Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open travel assistant chat"}
        className={`
          fixed md:bottom-6 md:right-6 bottom-20 right-4 z-50
          w-13 h-13 rounded-full flex items-center justify-center
          shadow-xl transition-all duration-300
          ${open
            ? "bg-white/10 border border-white/20 shadow-none scale-90"
            : "bg-[oklch(0.52_0.17_155)] shadow-[0_4px_24px_oklch(0.52_0.17_155/0.5)] hover:scale-110 hover:shadow-[0_4px_32px_oklch(0.52_0.17_155/0.7)]"}
        `}
        style={{ width: 52, height: 52 }}
      >
        {open
          ? <X className="w-5 h-5 text-white/70" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[oklch(0.52_0.17_155/0.4)] animate-ping" />
        )}
      </button>
    </>
  )
}
