'use client'

import { motion } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/hooks/useCursor'

/**
 * Minimal home icon — fixed top-left.
 * A simple house SVG, magnetic, no nav clutter.
 */
export function HomeButton() {
  const { ref, x, y } = useMagnetic({ intensity: 0.5 })
  const { setCursorState } = useCursor()

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="/"
      style={{ x, y }}
      className="fixed top-6 left-6 lg:top-8 lg:left-10 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-200 hover:border-text-primary"
      onMouseEnter={() => setCursorState('hover-button')}
      onMouseLeave={() => setCursorState('default')}
      aria-label="Home"
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-secondary"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* House outline */}
        <path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5h-4V10H6.5v4.5h-4A.5.5 0 012 14V6.5z" />
      </motion.svg>
    </motion.a>
  )
}
