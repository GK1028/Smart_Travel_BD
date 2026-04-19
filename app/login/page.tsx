'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth } from '@/lib/auth'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await mockAuth.login(email, password)
      router.push('/')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.04_240)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-sans font-bold text-3xl text-white mb-2">
            Smart Travel <span className="text-[oklch(0.72_0.14_75)]">BD</span>
          </h1>
          <p className="text-white/60 text-sm">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
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
                  Signing in...
                </>
              ) : (
                'Sign In'
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

            {/* Sign Up Link */}
            <p className="text-center text-white/70 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.72_0.14_75/0.8)] font-semibold transition-colors"
              >
                Sign up
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

        {/* Demo Credentials */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">Demo Account</p>
          <p className="text-white/50 text-xs leading-relaxed">
            Create a new account to get started, or use any email to sign up and explore Smart Travel BD.
          </p>
        </div>
      </div>
    </div>
  )
}
