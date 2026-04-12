'use client'

import { useRef, useEffect } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'
import { useIsTouchDevice } from './useMediaQuery'

interface UseMagneticOptions {
  /** How strongly the element is attracted toward the cursor. Range: 0–1. Default: 0.4 */
  intensity?: number
  /** Multiplier for the activation radius relative to the element's largest dimension. Default: 1.5 */
  radiusMultiplier?: number
}

/**
 * Magnetic attraction hook.
 * Returns a ref to attach to your element and x/y MotionValues
 * that represent the magnetic offset to apply via `style={{ x, y }}`.
 *
 * The element subtly shifts toward the cursor when it enters the activation zone,
 * then springs back to its natural position on exit.
 */
export function useMagnetic({ intensity = 0.4, radiusMultiplier = 1.5 }: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const isTouchDevice = useIsTouchDevice()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 200, damping: 22, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 200, damping: 22, mass: 0.4 })

  useEffect(() => {
    // Do nothing on touch devices
    if (isTouchDevice || !ref.current) return

    const el = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const largestDimension = Math.max(rect.width, rect.height)
      const activationRadius = largestDimension * radiusMultiplier

      if (distance < activationRadius) {
        // Linear falloff: full pull at center, zero at boundary
        const falloff = 1 - distance / activationRadius
        // Max displacement scales with the element's smallest dimension
        const maxDisplacement = Math.min(rect.width, rect.height) * 0.35

        rawX.set(deltaX * falloff * intensity * (maxDisplacement / largestDimension))
        rawY.set(deltaY * falloff * intensity * (maxDisplacement / largestDimension))
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    }

    const handleMouseLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice, intensity, radiusMultiplier, rawX, rawY])

  return { ref, x, y }
}
