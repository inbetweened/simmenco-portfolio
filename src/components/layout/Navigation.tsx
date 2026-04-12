'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useCursor } from '@/hooks/useCursor'
import { NAV_LINKS, SITE } from '@/lib/constants'

/**
 * Fixed top navigation.
 * Logo left, nav links right.
 * Background fades in on scroll via Framer Motion scroll tracking.
 * Each nav link has an animated underline reveal on hover.
 */
export function Navigation() {
  const { setCursorState } = useCursor()
  const { scrollY } = useScroll()

  const navBg = useTransform(scrollY, [0, 80], ['rgba(247,244,240,0)', 'rgba(247,244,240,0.92)'])
  const navBorder = useTransform(scrollY, [0, 80], ['rgba(226,223,219,0)', 'rgba(226,223,219,1)'])
  const navBlur = useTransform(scrollY, [0, 80], [0, 12])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBg,
        borderBottomColor: navBorder,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <MagneticButton
          href="#"
          variant="ghost"
          intensity={0.25}
          className="px-0 py-0 rounded-none text-body-sm font-semibold tracking-[-0.02em] text-text-primary hover:text-text-secondary"
        >
          {SITE.name}
        </MagneticButton>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onEnter={() => setCursorState('hover-button')}
              onLeave={() => setCursorState('default')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

// ─── Individual nav link with animated underline ─────────────────────────────

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onEnter: () => void
  onLeave: () => void
}

function NavLink({ href, children, onEnter, onLeave }: NavLinkProps) {
  const lineRef = useRef<HTMLSpanElement>(null)

  return (
    <motion.a
      href={href}
      className="relative text-body-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 py-1"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial="initial"
      whileHover="hover"
    >
      {children}
      <motion.span
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-text-primary"
        variants={{
          initial: { scaleX: 0, originX: '0%' },
          hover: {
            scaleX: 1,
            originX: '0%',
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
    </motion.a>
  )
}
