import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import FirstVisitGuard from '@/components/first-visit-guard'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Smart Travel BD — Smart Travel Planner for Bangladesh',
  description: 'Discover the beauty of Bangladesh with smart travel planning. Explore Cox\'s Bazar, Sajek Valley, Sylhet, and more. Get personalized itineraries, weather updates, and local insights.',
  keywords: 'Bangladesh travel, Cox\'s Bazar, Sajek Valley, Sylhet, AI travel planner, Bangladesh tourism',
  generator: 'v0.app',
  themeColor: '#0a3622',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased relative overflow-x-hidden`}>
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 -z-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black/65 via-[oklch(0.13_0.03_240/0.6)] to-black/65" />
        
        <AuthProvider>
          <FirstVisitGuard>
            {children}
            <Analytics />
          </FirstVisitGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
