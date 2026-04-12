'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Shape definitions ────────────────────────────────────────────────────────
const SHAPES = [
  { id: 0, bx: 10,  by: 14,  size: 200, type: 'ring',   rot: 0,   floatY: 18, dur: 9  },
  { id: 1, bx: 74,  by: 8,   size: 130, type: 'ring',   rot: 0,   floatY: 14, dur: 13 },
  { id: 2, bx: 80,  by: 62,  size: 240, type: 'ring',   rot: 0,   floatY: 22, dur: 15 },
  { id: 3, bx: 36,  by: 60,  size: 64,  type: 'square', rot: 22,  floatY: 10, dur: 7  },
  { id: 4, bx: 60,  by: 30,  size: 96,  type: 'square', rot: -14, floatY: 16, dur: 10 },
  { id: 5, bx: 22,  by: 75,  size: 28,  type: 'dot',    rot: 0,   floatY: 8,  dur: 5  },
  { id: 6, bx: 68,  by: 78,  size: 14,  type: 'dot',    rot: 0,   floatY: 12, dur: 6  },
  { id: 7, bx: 50,  by: 50,  size: 320, type: 'ring',   rot: 0,   floatY: 6,  dur: 20 },
]

const PALETTE = [
  { name: 'Background', hex: '#F7F4F0' },
  { name: 'Surface',    hex: '#F0EDE8' },
  { name: 'Border',     hex: '#E4DFD8' },
  { name: 'Tertiary',   hex: '#9E9890' },
  { name: 'Text',       hex: '#181614' },
]

// ─── Single reactive + floating shape ────────────────────────────────────────
function Shape({ shape, cursorX, cursorY, containerRef }: {
  shape: typeof SHAPES[number]
  cursorX: ReturnType<typeof useMotionValue<number>>
  cursorY: ReturnType<typeof useMotionValue<number>>
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const ox = useSpring(0, { stiffness: 70, damping: 22, mass: 0.6 })
  const oy = useSpring(0, { stiffness: 70, damping: 22, mass: 0.6 })

  useEffect(() => {
    const RADIUS = 200
    const FORCE  = 70

    const update = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const sx = rect.left + (shape.bx / 100) * rect.width
      const sy = rect.top  + (shape.by / 100) * rect.height
      const dx = cursorX.get() - sx
      const dy = cursorY.get() - sy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < RADIUS && dist > 0) {
        const f = (1 - dist / RADIUS) * FORCE
        ox.set(-(dx / dist) * f)
        oy.set(-(dy / dist) * f)
      } else {
        ox.set(0)
        oy.set(0)
      }
    }

    const unsubX = cursorX.on('change', update)
    const unsubY = cursorY.on('change', update)
    return () => { unsubX(); unsubY() }
  }, [shape, cursorX, cursorY, ox, oy, containerRef])

  const base = 'absolute pointer-events-none'

  return (
    <motion.div
      className={base}
      style={{ left: `${shape.bx}%`, top: `${shape.by}%`, translateX: '-50%', translateY: '-50%' }}
      animate={{ y: [-shape.floatY / 2, shape.floatY / 2] }}
      transition={{ duration: shape.dur, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      <motion.div style={{ x: ox, y: oy, rotate: shape.rot }}>
        {shape.type === 'ring' && (
          <div
            className="rounded-full"
            style={{ width: shape.size, height: shape.size, border: '1px solid rgba(24,22,20,0.12)' }}
          />
        )}
        {shape.type === 'square' && (
          <div
            style={{ width: shape.size, height: shape.size, border: '1px solid rgba(24,22,20,0.10)', borderRadius: 6 }}
          />
        )}
        {shape.type === 'dot' && (
          <div
            className="rounded-full"
            style={{ width: shape.size, height: shape.size, backgroundColor: 'rgba(24,22,20,0.18)' }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main playground ──────────────────────────────────────────────────────────
export function PortfolioPlayground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(-999)
  const cursorY = useMotionValue(-999)

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        height: '65vh',
        background: '#F7F4F0',
        backgroundImage: `radial-gradient(circle, rgba(24,22,20,0.12) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Floating reactive shapes */}
      {SHAPES.map((s) => (
        <Shape key={s.id} shape={s} cursorX={cursorX} cursorY={cursorY} containerRef={containerRef} />
      ))}

      {/* Central large Aa type specimen */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <span
          className="font-sans font-extrabold text-text-primary select-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1, opacity: 0.04, letterSpacing: '-0.04em' }}
        >
          Aa
        </span>
      </motion.div>

      {/* Palette strip */}
      <motion.div
        className="absolute bottom-0 inset-x-0 flex"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        {PALETTE.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex-1 group relative overflow-hidden cursor-default"
            style={{ height: 48, backgroundColor: c.hex }}
            whileHover={{ height: 72 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-x-0 bottom-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[9px] font-sans font-medium tracking-[0.12em] uppercase"
                style={{ color: i < 3 ? 'rgba(24,22,20,0.5)' : i === 3 ? 'rgba(24,22,20,0.6)' : 'rgba(247,244,240,0.7)' }}>
                {c.hex}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
