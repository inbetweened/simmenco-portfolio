'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import type { CursorContextValue, CursorState } from '@/types/cursor'
import { useIsTouchDevice } from '@/hooks/useMediaQuery'

export const CursorContext = createContext<CursorContextValue | null>(null)

interface CursorProviderProps {
  children: React.ReactNode
}

/**
 * Provides cursor state and raw mouse MotionValues to the entire tree.
 * Does not render any DOM elements — purely context + event tracking.
 */
export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorState, setCursorStateRaw] = useState<CursorState>('default')
  const isTouchDevice = useIsTouchDevice()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const setCursorState = useCallback((state: CursorState) => {
    setCursorStateRaw(state)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const TEXT_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'BLOCKQUOTE', 'LABEL', 'TIME', 'STRONG', 'EM'])

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as Element
      if (!el?.tagName) return

      // Interactive elements manage their own cursor state
      if (el.closest('a, button, [role="button"]')) return

      if (TEXT_TAGS.has(el.tagName)) {
        setCursorStateRaw('hover-text')
      } else {
        setCursorStateRaw('default')
      }
    }

    const handleMouseLeave = () => setCursorStateRaw('hidden')
    const handleMouseEnter = () => setCursorStateRaw('default')

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice, mouseX, mouseY])

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, mouseX, mouseY }}>
      {children}
    </CursorContext.Provider>
  )
}
