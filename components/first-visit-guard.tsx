'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export default function FirstVisitGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    // Check if this is first visit
    const hasVisited = localStorage.getItem('smart-travel-visited')
    const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/splash'

    if (!hasVisited && !isAuthPage && !user) {
      // First time visitor without auth
      setIsFirstVisit(true)
      localStorage.setItem('smart-travel-visited', 'true')
      router.push('/splash')
    } else if (hasVisited) {
      // Mark as visited
      localStorage.setItem('smart-travel-visited', 'true')
    }

    setIsLoading(false)
  }, [pathname, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.13_0.03_240)] flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-[oklch(0.52_0.17_155/0.2)] border-t-[oklch(0.52_0.17_155)] rounded-full" />
        </div>
      </div>
    )
  }

  return children
}
