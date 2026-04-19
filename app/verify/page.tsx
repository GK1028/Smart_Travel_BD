'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const contactInfo = typeof window !== 'undefined' ? localStorage.getItem('signup-contact-info') : null
  const displayValue = contactInfo || (verificationMethod === 'email' ? '****@example.com' : '+880****')

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = otp.split('')
    newOtp[index] = value
    setOtp(newOtp.join(''))

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (otp.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    setLoading(true)
    
    try {
      // Simulate OTP verification
      // In real implementation, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock verification - accept any 6-digit code for demo
      if (otp && otp.length === 6) {
        setSuccess(true)
        localStorage.removeItem('signup-contact-info')
        
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    
    setIsResending(true)
    
    try {
      // Simulate resend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset timer for 60 seconds
      setResendTimer(60)
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } finally {
      setIsResending(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.04_240)] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="font-sans font-bold text-2xl text-white mb-2">Verification Successful!</h2>
            <p className="text-white/60 mb-6">Your account has been verified. Redirecting to home...</p>
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-sans font-bold text-3xl text-white mb-2">
            Verify Your <span className="text-[oklch(0.72_0.14_75)]">Account</span>
          </h1>
          <p className="text-white/60 text-sm">We&apos;ve sent a verification code to your {verificationMethod}</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          {/* Display Contact Info */}
          <div className="bg-[oklch(0.52_0.17_155/0.1)] border border-[oklch(0.52_0.17_155/0.2)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              {verificationMethod === 'email' ? (
                <Mail className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
              ) : (
                <Phone className="w-5 h-5 text-[oklch(0.52_0.17_155)]" />
              )}
              <div>
                <p className="text-white/60 text-xs uppercase font-semibold">Verification via {verificationMethod}</p>
                <p className="text-white font-medium">{displayValue}</p>
              </div>
            </div>
          </div>

          {/* Verification Method Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setVerificationMethod('email')}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                verificationMethod === 'email'
                  ? 'bg-[oklch(0.52_0.17_155)] text-white'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setVerificationMethod('phone')}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                verificationMethod === 'phone'
                  ? 'bg-[oklch(0.52_0.17_155)] text-white'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              SMS
            </button>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-3">
                Enter 6-Digit Code
              </label>
              <div className="flex gap-2 justify-between">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 rounded-lg bg-white/10 border border-white/20 text-white text-2xl font-bold text-center focus:outline-none focus:border-[oklch(0.52_0.17_155)] transition-colors"
                    placeholder="—"
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full px-6 py-2.5 rounded-lg bg-[oklch(0.72_0.14_75)] text-white font-bold text-sm hover:shadow-lg hover:shadow-[oklch(0.72_0.14_75/0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Verify Code
                </>
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm text-center mb-3">Didn&apos;t receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={isResending || resendTimer > 0}
              className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-[oklch(0.52_0.17_155)] font-semibold text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isResending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resending...
                </span>
              ) : resendTimer > 0 ? (
                `Resend in ${resendTimer}s`
              ) : (
                'Resend Code'
              )}
            </button>
          </div>

          {/* Change Contact */}
          <button
            type="button"
            className="w-full mt-4 py-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Use different {verificationMethod === 'email' ? 'phone number' : 'email'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Already verified?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-[oklch(0.72_0.14_75)] hover:text-[oklch(0.72_0.14_75/0.8)] font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
