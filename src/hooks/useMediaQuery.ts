'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe media query hook.
 * Returns false on the server and during initial hydration,
 * then the actual match result after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/** Convenience: true when the device has no fine pointer (touch devices) */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none)')
}
