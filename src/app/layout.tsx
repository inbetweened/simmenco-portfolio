import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { CursorProvider } from '@/components/providers/CursorProvider'
import { CursorDot } from '@/components/cursor/CursorDot'
import { CursorTrail } from '@/components/cursor/CursorTrail'
import { HomeButton } from '@/components/layout/HomeButton'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { SectionIndicator } from '@/components/ui/SectionIndicator'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Daniel — Portfolio',
  description: 'Designer & Creative Developer aus Luzern, Schweiz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-background text-text-primary antialiased">
        <CursorProvider>
          {/* Cursor elements — rendered at root level, outside all overflow containers */}
          <ScrollProgressBar />
          <CursorTrail />
          <CursorDot />
          <HomeButton />
          <SectionIndicator />
          <main>{children}</main>
        </CursorProvider>
      </body>
    </html>
  )
}
