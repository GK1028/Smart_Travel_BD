// Simple mock authentication using localStorage
// Firebase ready - environment variables for Firebase config are defined
// Replace mockAuth functions with Firebase Auth when ready

export interface AuthUser {
  uid: string
  email: string
  displayName: string
}

const STORAGE_KEY = "smart-travel-user"
const VERIFICATION_STORAGE_KEY = "smart-travel-verification"

// Firebase configuration placeholders
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

// OTP/Verification functions
export const verificationService = {
  // Send OTP code via email or SMS
  sendOTP: async (emailOrPhone: string, method: 'email' | 'phone' = 'email'): Promise<string> => {
    // In production, this would call your backend API
    // Backend would integrate with Twilio (SMS), Firebase Auth Email, or your email service
    
    // Mock implementation - generate a random 6-digit code
    const code = Math.random().toString().slice(2, 8).padEnd(6, '0')
    
    // Store for verification (in production, send via actual service)
    localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify({
      code,
      emailOrPhone,
      method,
      timestamp: Date.now(),
      attempts: 0,
    }))

    console.log(`[Mock OTP] ${method.toUpperCase()} to ${emailOrPhone}: ${code}`)
    return code
  },

  // Verify the OTP code
  verifyOTP: async (code: string): Promise<boolean> => {
    // In production, this would validate with your backend
    
    const stored = localStorage.getItem(VERIFICATION_STORAGE_KEY)
    if (!stored) return false

    const { code: storedCode, timestamp, attempts } = JSON.parse(stored)
    
    // Check if code expired (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      localStorage.removeItem(VERIFICATION_STORAGE_KEY)
      return false
    }

    // Check max attempts
    if (attempts > 5) {
      localStorage.removeItem(VERIFICATION_STORAGE_KEY)
      return false
    }

    // Verify code
    if (code === storedCode) {
      localStorage.removeItem(VERIFICATION_STORAGE_KEY)
      return true
    }

    // Update attempts
    const data = JSON.parse(stored)
    data.attempts = attempts + 1
    localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify(data))
    
    return false
  },

  // Resend OTP code
  resendOTP: async (emailOrPhone: string, method: 'email' | 'phone' = 'email'): Promise<string> => {
    return verificationService.sendOTP(emailOrPhone, method)
  },
}

export const mockAuth = {
  signup: async (email: string, password: string, displayName: string): Promise<AuthUser> => {
    if (!email || !password || password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}")
    if (users[email]) {
      throw new Error("User already exists")
    }

    // Store contact info for verification
    localStorage.setItem('signup-contact-info', email)

    const user: AuthUser = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: displayName || email.split("@")[0],
    }

    // Store user temporarily (not confirmed until OTP verified)
    users[email] = { password, displayName: user.displayName, verified: false }
    localStorage.setItem("users", JSON.stringify(users))
    
    return user
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    const userData = users[email]

    if (!userData || userData.password !== password) {
      throw new Error("Invalid email or password")
    }

    const user: AuthUser = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: userData.displayName,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY)
  },

  getCurrentUser: (): AuthUser | null => {
    const user = localStorage.getItem(STORAGE_KEY)
    return user ? JSON.parse(user) : null
  },

  onAuthStateChanged: (callback: (user: AuthUser | null) => void): (() => void) => {
    const user = mockAuth.getCurrentUser()
    callback(user)

    const handleStorageChange = () => {
      const updatedUser = mockAuth.getCurrentUser()
      callback(updatedUser)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  },
}

