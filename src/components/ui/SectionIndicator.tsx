'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { id: 'work',    label: '01' },
  { id: 'about',   label: '02' },
  { id: 'contact', label: '03' },
]

/**
 * Fixed right-side section indicator.
 * Each section collapses to a small dot and expands to a short line when active.
 * Only shown on the home page.
 */
export function SectionIndicator() {
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (pathname !== '/') return

    const observers: IntersectionObserver[] = []

    const setup = () => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return

        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(id)
          },
          { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
        )
        obs.observe(el)
        observers.push(obs)
      })
    }

    // Small delay to ensure sections are mounted after page transition
    const t = setTimeout(setup, 100)
    return () => { clearTimeout(t); observers.forEach((o) => o.disconnect()) }
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 pointer-events-none">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <div key={id} className="flex items-center gap-2.5 justify-end">
            {/* Label — fades in next to active dot */}
            <motion.span
              className="text-label font-sans text-text-tertiary tabular-nums"
              animate={{ opacity: isActive ? 0.5 : 0, x: isActive ? 0 : 4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {label}
            </motion.span>

            {/* Dot / line */}
            <motion.div
              className="bg-text-primary rounded-full"
              animate={{
                width:  isActive ? 16 : 4,
                height: isActive ? 1.5 : 4,
                borderRadius: isActive ? 1 : 9999,
                opacity: isActive ? 0.85 : 0.28,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )
      })}
    </div>
  )
}
