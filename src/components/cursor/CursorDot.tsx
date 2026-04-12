'use client'

import { useSpring, useMotionValue, useTransform, animate, motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useCursor } from '@/hooks/useCursor'
import { useIsTouchDevice } from '@/hooks/useMediaQuery'
import { cursorMorphSpring } from '@/lib/motion'

/**
 * Two-element cursor: a tight dot + a morphing ring.
 *
 * hover-text: collapses into a tall thin black caret line.
 * The ring spring tightens in hover-text so it "docks" — follows
 * the text closely instead of lagging behind.
 */
export function CursorDot() {
  const { mouseX, mouseY, cursorState } = useCursor()
  const isTouchDevice = useIsTouchDevice()

  // Dot: always tight
  const dotX = useSpring(mouseX, { stiffness: 700, damping: 35, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 35, mass: 0.3 })

  // Ring has two spring modes: loose (default lag) and tight (docked to text)
  const looseRingX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.6 })
  const looseRingY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.6 })
  const tightRingX = useSpring(mouseX, { stiffness: 680, damping: 34, mass: 0.25 })
  const tightRingY = useSpring(mouseY, { stiffness: 680, damping: 34, mass: 0.25 })

  // blend: 0 = loose, 1 = tight — animates smoothly between modes
  const blend = useMotionValue(0)

  const ringX = useTransform(
    [looseRingX, tightRingX, blend],
    ([loose, tight, b]: number[]) => loose + (tight - loose) * b
  )
  const ringY = useTransform(
    [looseRingY, tightRingY, blend],
    ([loose, tight, b]: number[]) => loose + (tight - loose) * b
  )

  // Tighten the ring spring when hovering text, release on exit
  useEffect(() => {
    animate(blend, cursorState === 'hover-text' ? 1 : 0, {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    })
  }, [cursorState, blend])

  if (isTouchDevice) return null

  const isMarker = cursorState === 'hover-text'

  return (
    <>
      {/* ── Dot ───────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity:
            cursorState === 'hidden' ? 0
            : cursorState === 'hover-button' ? 0
            : cursorState === 'hover-text' ? 0
            : 1,
          scale: cursorState === 'hover-card' ? 1.5 : 1,
        }}
        transition={cursorMorphSpring}
      >
        <div className="rounded-full bg-text-primary" style={{ width: 6, height: 6 }} />
      </motion.div>

      {/* ── Ring / Caret ──────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={ringStateMap[cursorState]}
        transition={isMarker ? caretSnapSpring : cursorMorphSpring}
      >
        <AnimatePresence>
          {cursorState === 'hover-card' && (
            <motion.span
              key="view-label"
              className="text-text-primary font-sans text-[10px] tracking-[0.12em] uppercase select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
            >
              view
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

// ─── Caret snap spring ────────────────────────────────────────────────────────
// Snaps into the tall line shape quickly with minimal overshoot.
const caretSnapSpring = {
  type: 'spring' as const,
  stiffness: 520,
  damping: 28,
  mass: 0.25,
}

// ─── Ring state map ───────────────────────────────────────────────────────────
const ringStateMap = {
  default: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    opacity: 0.45,
    border: '1.5px solid #181614',
    backgroundColor: 'transparent',
  },
  'hover-button': {
    width: 56,
    height: 56,
    borderRadius: '50%',
    opacity: 0.12,
    border: '1.5px solid #181614',
    backgroundColor: 'transparent',
  },
  // Tall thin caret — width collapses, height expands, snaps black
  'hover-text': {
    width: 2,
    height: 24,
    borderRadius: 1,
    opacity: 0.75,
    border: 'none',
    backgroundColor: '#181614',
  },
  'hover-card': {
    width: 72,
    height: 72,
    borderRadius: '50%',
    opacity: 0.9,
    border: '1.5px solid #181614',
    backgroundColor: 'transparent',
  },
  hidden: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    opacity: 0,
    border: '1.5px solid #181614',
    backgroundColor: 'transparent',
  },
} as const
