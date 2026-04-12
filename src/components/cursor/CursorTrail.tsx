'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice } from '@/hooks/useMediaQuery'

const DOTS = [
  { stiffness: 160, damping: 20, size: 5,   opacity: 0.22 },
  { stiffness: 100, damping: 18, size: 4.5, opacity: 0.17 },
  { stiffness: 65,  damping: 16, size: 4,   opacity: 0.13 },
  { stiffness: 40,  damping: 14, size: 3.5, opacity: 0.09 },
  { stiffness: 22,  damping: 12, size: 3,   opacity: 0.06 },
]

function TrailDot({ config, sourceX, sourceY }: {
  config: typeof DOTS[number]
  sourceX: ReturnType<typeof useMotionValue>
  sourceY: ReturnType<typeof useMotionValue>
}) {
  const x = useSpring(sourceX, { stiffness: config.stiffness, damping: config.damping, mass: 0.5 })
  const y = useSpring(sourceY, { stiffness: config.stiffness, damping: config.damping, mass: 0.5 })

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full bg-text-primary"
      style={{
        x, y,
        translateX: '-50%',
        translateY: '-50%',
        width: config.size,
        height: config.size,
        opacity: config.opacity,
      }}
    />
  )
}

/**
 * 5 spring-chained ghost dots trailing behind the cursor.
 * Each dot has lower stiffness than the previous → natural lag cascade.
 */
export function CursorTrail() {
  const isTouchDevice = useIsTouchDevice()
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  if (isTouchDevice) return null

  return (
    <>
      {DOTS.map((config, i) => (
        <TrailDot key={i} config={config} sourceX={mouseX} sourceY={mouseY} />
      ))}
    </>
  )
}
