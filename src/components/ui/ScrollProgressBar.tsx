'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin progress bar fixed to the top of the viewport.
 * Grows from left to right as the user scrolls.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px origin-left z-[60]"
      style={{
        scaleX,
        backgroundColor: 'rgba(24, 22, 20, 0.55)',
      }}
    />
  )
}
