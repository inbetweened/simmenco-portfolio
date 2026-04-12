'use client'

import { useContext } from 'react'
import { CursorContext } from '@/components/providers/CursorProvider'

/**
 * Consume the cursor context.
 * Provides cursorState, setCursorState, and raw mouse MotionValues.
 */
export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
