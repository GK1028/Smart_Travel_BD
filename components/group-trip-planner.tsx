"use client"

import { useState } from "react"
import { Users, Plus, Trash2, DollarSign, MapPin, Calendar, TrendingUp, CheckCircle2 } from "lucide-react"

interface Member {
  id: number
  name: string
  spent: number
}

const destinations = [
  { name: "Cox's Bazar", emoji: "🏖️" },
  { name: "Sajek Valley", emoji: "⛰️" },
  { name: "Sylhet", emoji: "🌿" },
  { name: "Rangamati", emoji: "🏞️" },
  { name: "Sundarbans", emoji: "🐅" },
]

export default function GroupTripPlanner() {
  const [destination, setDestination] = useState("Sajek Valley")
  const [duration, setDuration] = useState(2)
  const [perPersonBudget, setPerPersonBudget] = useState(4000)
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "You", spent: 3200 },
    { id: 2, name: "Rahim", spent: 2800 },
    { id: 3, name: "Nisha", spent: 3500 },
    { id: 4, name: "Karim", spent: 4100 },
  ])
  const [newMember, setNewMember] = useState("")
  const [spendInput, setSpendInput] = useState<Record<number, string>>({})

  const addMember = () => {
    if (newMember.trim()) {
      setMembers([...members, { id: Date.now(), name: newMember, spent: 0 }])
      setNewMember("")
    }
  }

  const removeMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  const updateMemberSpend = (id: number, amount: string) => {
    const numAmount = parseFloat(amount) || 0
    setMembers(members.map((m) => (m.id === id ? { ...m, spent: numAmount } : m)))
    setSpendInput({ ...spendInput, [id]: amount })
  }

  const totalBudget = perPersonBudget * members.length
  const totalSpent = members.reduce((sum, member) => sum + member.spent, 0)
  const remainingBudget = totalBudget - totalSpent
  const perPersonExpense = members.length > 0 ? totalSpent / members.length : 0

  // Calculate settlements
  const settlements = members
    .map((member) => ({
      ...member,
      difference: member.spent - perPersonExpense,
    }))
    .sort((a, b) => b.difference - a.difference)

  const owes = settlements.filter((m) => m.difference < 0)
  const toReceive = settlements.filter((m) => m.difference > 0)

  return (
    <section className="py-20 bg-black/5 backdrop-blur-[2px]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.52_0.17_155/0.15)] border border-[oklch(0.52_0.17_155/0.3)] mb-4">
            <Users className="w-3.5 h-3.5 text-[oklch(0.52_0.17_155)]" />
            <span className="text-[oklch(0.52_0.17_155)] text-xs font-semibold tracking-widest uppercase">
              Group Planning
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance mb-2">
            Plan Your Group <span className="text-[oklch(0.72_0.14_75)]">Trip Together</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-body max-w-2xl">
            Organize Bangladesh trips with friends and manage budgets effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Details */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-sans font-bold text-white text-lg mb-6">Trip Details</h3>
              
              <div className="space-y-4">
                {/* Destination */}
                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[oklch(0.52_0.17_155)]" />
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[oklch(0.52_0.17_155/0.5)] text-sm"
                  >
                    {destinations.map((dest) => (
                      <option key={dest.name} value={dest.name}>
                        {dest.emoji} {dest.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[oklch(0.52_0.17_155)]" />
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[oklch(0.52_0.17_155/0.5)] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                      Per Person Budget
                    </label>
                    <input
                      type="number"
                      value={perPersonBudget}
                      onChange={(e) => setPerPersonBudget(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[oklch(0.72_0.14_75/0.5)] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-300">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Total Budget</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-sans font-bold text-2xl">{totalBudget.toLocaleString()}</span>
                  <span className="text-white/40 text-xs">BDT</span>
                </div>
                <p className="text-white/40 text-xs mt-2">{members.length} members × {perPersonBudget.toLocaleString()} BDT</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[oklch(0.72_0.14_75/0.3)] transition-all duration-300">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Total Spent</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[oklch(0.72_0.14_75)] font-sans font-bold text-2xl">{totalSpent.toLocaleString()}</span>
                  <span className="text-white/40 text-xs">BDT</span>
                </div>
                <p className="text-white/40 text-xs mt-2">{((totalSpent / totalBudget) * 100).toFixed(0)}% of budget used</p>
              </div>
              <div className={`bg-white/5 border rounded-xl p-5 transition-all duration-300 ${remainingBudget >= 0 ? "border-green-500/30 hover:border-green-500/50" : "border-red-500/30 hover:border-red-500/50"}`}>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Remaining</p>
                <div className="flex items-baseline gap-1">
                  <span className={`font-sans font-bold text-2xl ${remainingBudget >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {Math.abs(remainingBudget).toLocaleString()}
                  </span>
                  <span className="text-white/40 text-xs">BDT</span>
                </div>
                <p className={`text-xs mt-2 ${remainingBudget >= 0 ? "text-green-400/70" : "text-red-400/70"}`}>
                  {remainingBudget >= 0 ? "Under budget" : "Over budget"}
                </p>
              </div>
            </div>

            {/* Members Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-sans font-bold text-white text-lg mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
                Trip Members ({members.length})
              </h3>

              {/* Members List */}
              <div className="space-y-3 mb-6">
                {members.map((member) => (
                  <div key={member.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-[oklch(0.52_0.17_155/0.3)] transition-all duration-300">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-40">
                        <p className="font-sans font-semibold text-white">{member.name}</p>
                        <p className="text-white/50 text-xs mt-1">Budget: {perPersonBudget.toLocaleString()} BDT</p>
                      </div>
                      <div className="flex-1 min-w-40">
                        <label className="text-white/60 text-xs font-semibold mb-1 block">Spent (BDT)</label>
                        <input
                          type="number"
                          value={spendInput[member.id] !== undefined ? spendInput[member.id] : member.spent}
                          onChange={(e) => updateMemberSpend(member.id, e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[oklch(0.72_0.14_75/0.5)] text-sm"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-[oklch(0.72_0.14_75)] font-bold text-sm">{member.spent.toLocaleString()}</p>
                        <p className={`text-xs mt-1 font-semibold ${member.spent > perPersonBudget ? "text-red-400" : member.spent < perPersonBudget ? "text-green-400" : "text-white/60"}`}>
                          {member.spent > perPersonBudget ? `+${(member.spent - perPersonBudget).toLocaleString()}` : member.spent < perPersonBudget ? `-${(perPersonBudget - member.spent).toLocaleString()}` : "Even"}
                        </p>
                      </div>
                      {member.id !== 1 && (
                        <button
                          onClick={() => removeMember(member.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Member */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addMember()}
                  placeholder="Enter friend's name..."
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.5)] text-sm"
                />
                <button
                  onClick={addMember}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[oklch(0.52_0.17_155)] text-white font-bold text-sm hover:shadow-lg hover:shadow-[oklch(0.52_0.17_155/0.4)] transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Settlement */}
          <div className="space-y-6">
            {/* Settlement Card */}
            <div className="bg-[oklch(0.72_0.14_75/0.1)] border border-[oklch(0.72_0.14_75/0.3)] rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-sans font-bold text-[oklch(0.72_0.14_75)] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Settlement Summary
              </h3>
              
              <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                <p className="text-white/70 text-sm mb-2">Per Person Fair Share:</p>
                <p className="text-[oklch(0.72_0.14_75)] font-sans font-bold text-2xl">
                  {Math.round(perPersonExpense).toLocaleString()}
                </p>
                <p className="text-white/40 text-xs mt-2">BDT (Total Spent ÷ Members)</p>
              </div>

              <div className="space-y-3">
                {toReceive.length > 0 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-400 text-xs font-bold uppercase mb-2">To Receive</p>
                    {toReceive.map((member) => (
                      <p key={member.id} className="text-green-300 text-sm font-semibold">
                        {member.name}: +{Math.round(member.difference).toLocaleString()} BDT
                      </p>
                    ))}
                  </div>
                )}
                
                {owes.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-xs font-bold uppercase mb-2">Should Pay</p>
                    {owes.map((member) => (
                      <p key={member.id} className="text-red-300 text-sm font-semibold">
                        {member.name}: -{Math.round(Math.abs(member.difference)).toLocaleString()} BDT
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Settlement Action */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[oklch(0.72_0.14_75)] text-white font-bold hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] transition-all duration-300">
              <CheckCircle2 className="w-4 h-4" />
              Settle Now
            </button>

            {/* Info Box */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/70 text-xs leading-relaxed">
                Each member should contribute <span className="font-bold text-white">{Math.round(perPersonExpense).toLocaleString()} BDT</span> for equal distribution. Adjust spent amounts above to see live settlement calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
