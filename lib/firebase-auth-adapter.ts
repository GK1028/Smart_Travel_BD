/**
 * Firebase Authentication Adapter
 * 
 * This file demonstrates how to integrate Firebase Authentication
 * with the Smart Travel BD application.
 * 
 * To enable Firebase Auth:
 * 1. Set up Firebase project at https://console.firebase.google.com
 * 2. Add Firebase config to .env.local
 * 3. Uncomment the imports and switch the exports at the bottom
 * 4. Install Firebase: npm install firebase
 */

// Example Firebase Auth implementation (commented out)
/*
import { 
  initializeApp,
  getApps,
} from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  verifyEmail,
  Auth,
  User as FirebaseUser,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'

export interface AuthUser {
  uid: string
  email: string
  displayName: string
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export const db = getFirestore(app)

// Firebase Auth with custom claims for user profiles
export const firebaseAuth = {
  signup: async (email: string, password: string, displayName: string): Promise<AuthUser> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Create user profile document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        displayName,
        createdAt: new Date(),
        verified: false,
      })

      // Send verification email
      await sendEmailVerification(user)

      return {
        uid: user.uid,
        email: user.email || '',
        displayName: displayName,
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()

      return {
        uid: user.uid,
        email: user.email || '',
        displayName: userData?.displayName || user.displayName || '',
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  logout: async (): Promise<void> => {
    await signOut(auth)
  },

  getCurrentUser: (): AuthUser | null => {
    const user = auth.currentUser
    if (!user) return null

    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
    }
  },

  onAuthStateChanged: (callback: (user: AuthUser | null) => void): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
        })
      } else {
        callback(null)
      }
    })
    return unsubscribe
  },
}

export const verificationService = {
  sendOTP: async (emailOrPhone: string, method: 'email' | 'phone' = 'email'): Promise<string> => {
    // For production, implement custom OTP service
    // Options:
    // 1. Firebase Authentication with Email/SMS providers
    // 2. Twilio for SMS: https://www.twilio.com/
    // 3. SendGrid for Email: https://sendgrid.com/
    // 4. Custom backend endpoint that sends OTP
    
    throw new Error('OTP service not configured for Firebase')
  },

  verifyOTP: async (code: string): Promise<boolean> => {
    throw new Error('OTP service not configured for Firebase')
  },

  resendOTP: async (emailOrPhone: string, method: 'email' | 'phone' = 'email'): Promise<string> => {
    throw new Error('OTP service not configured for Firebase')
  },
}
*/

// Export mock auth by default (current implementation)
export { mockAuth, verificationService, firebaseConfig } from './auth'
