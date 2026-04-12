'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['IT', 'Web']
const INTERVAL = 2400

export function ITWebTile() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), INTERVAL)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: '#C9C4BE' }}
    >
      {/* Word */}
      <div className="relative flex items-center justify-center" style={{ height: 80, width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[index]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute font-sans font-extrabold text-text-primary tracking-[-0.04em] leading-none"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-3">
        {WORDS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-text-primary"
            animate={{ opacity: i === index ? 0.55 : 0.18, width: i === index ? 14 : 5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 3 }}
          />
        ))}
      </div>
    </div>
  )
}
