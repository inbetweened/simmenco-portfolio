'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'checking' | 'entering' | 'holding' | 'exiting' | 'done'

/**
 * One-time intro overlay — only shown on first session visit.
 * "daniel." slides up, holds, slides out, overlay fades away.
 * SSR-safe: sessionStorage is only read inside useEffect.
 */
export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>('checking')

  const play = () => {
    setPhase('entering')
    const t1 = setTimeout(() => setPhase('holding'),  700)
    const t2 = setTimeout(() => setPhase('exiting'),  1800)
    const t3 = setTimeout(() => setPhase('done'),     2450)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }

  useEffect(() => {
    if (sessionStorage.getItem('intro-seen')) {
      setPhase('done')
    } else {
      sessionStorage.setItem('intro-seen', '1')
      play()
    }
  }, [])

  // Shift+I replays the animation at any time
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'I') {
        sessionStorage.removeItem('intro-seen')
        play()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (phase === 'checking' || phase === 'done') return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9990] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden py-2">
            <motion.span
              className="block text-display-xl font-sans font-extrabold text-text-primary tracking-[-0.03em] leading-none"
              initial={{ y: '110%' }}
              animate={
                phase === 'entering' || phase === 'holding'
                  ? { y: 0 }
                  : { y: '-110%' }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              daniel.
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
