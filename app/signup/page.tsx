'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth } from '@/lib/auth'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // Create user
      await mockAuth.signup(email, password, name)

      // Send OTP to email
      const { verificationService } = await import('@/lib/auth')
      await verificationService.sendOTP(email, 'email')

      setSuccess(true)

      // Redirect to verification after 1.5 seconds
      setTimeout(() => {
        router.push('/verify')
      }, 1500)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.04_240)] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Welcome to Smart Travel BD!</h2>
            <p className="text-white/60 mb-6">Your account has been created successfully. Redirecting to home...</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.04_240)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-sans font-bold text-3xl text-white mb-2">
            Smart Travel <span className="text-[oklch(0.72_0.14_75)]">BD</span>
          </h1>
          <p className="text-white/60 text-sm">Create your account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-[oklch(0.52_0.17_155)]/50" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.6)] transition-colors duration-300"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[oklch(0.52_0.17_155)]/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.6)] transition-colors duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-white/80 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[oklch(0.52_0.17_155)]/50" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.6)] transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-white/60 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[oklch(0.52_0.17_155)]/50" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[oklch(0.52_0.17_155/0.6)] transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-white/60 hover:text-white/80 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-lg bg-[oklch(0.72_0.14_75)] text-white font-bold text-sm hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[oklch(0.15_0.04_240)] text-white/50">or</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-white/70 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.72_0.14_75/0.8)] font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-white/60 hover:text-white/80 text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
