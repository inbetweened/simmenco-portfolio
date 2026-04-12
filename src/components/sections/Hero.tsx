'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useCursor } from '@/hooks/useCursor'

const GREETINGS = ['hallo', 'hoi', 'sali', 'grüezi']
const ROTATION_INTERVAL = 3800
const NAME_CHARS = 'daniel.'.split('')

export function Hero() {
  const { setCursorState } = useCursor()
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!hasEntered) return
    const interval = setInterval(() => {
      setGreetingIndex((i) => (i + 1) % GREETINGS.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [hasEntered])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 max-w-container mx-auto pt-20 pb-24">

      <div
        className="max-w-2xl"
        onMouseEnter={() => setCursorState('hover-text')}
        onMouseLeave={() => setCursorState('default')}
      >
        <div className="text-display-xl font-sans font-extrabold text-text-primary leading-[0.95] tracking-[-0.03em] mb-10">

          {/* Line 1 — scrambling greeting */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="overflow-hidden"
            style={{ display: 'block' }}
          >
            <div className="flex items-baseline overflow-hidden" style={{ height: '1.2em' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetingIndex}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                  style={{ lineHeight: '1.05' }}
                >
                  {GREETINGS[greetingIndex]}.
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Line 2 — ich bi de */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            ich bi de
          </motion.div>

          {/* Line 3 — daniel. letter by letter */}
          <div className="flex" aria-label="daniel.">
            {NAME_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.34 + i * 0.055,
                }}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="text-body-lg font-sans font-normal text-text-secondary max-w-sm leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          Ich mache zurzeit meine Lehre als Mediamatiker bei der Messe Luzern.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
        >
          <MagneticButton href="#work" intensity={0.5} variant="outline">
            Ausgewählte Projekte →
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-6 lg:left-16 flex flex-col items-start gap-3">
        <motion.div
          className="w-px bg-text-tertiary"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 48, opacity: 0.35 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  )
}
