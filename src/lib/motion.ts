import type { Transition, Variants } from 'framer-motion'

// ─── Easing curves ───────────────────────────────────────────────────────────

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeOutQuart = [0.25, 0.46, 0.45, 0.94] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

// ─── Spring configs ──────────────────────────────────────────────────────────

/** Tight, snappy — for button press feedback and quick UI responses */
export const springFast: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.5,
}

/** Medium — for magnetic element attraction */
export const springMedium: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 22,
  mass: 0.4,
}

/** Soft, slightly elastic — for cursor ring morphing */
export const cursorMorphSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.4,
}

// ─── Shared transitions ───────────────────────────────────────────────────────

export const sectionEntrance: Transition = {
  duration: 0.9,
  ease: easeOutExpo,
}

export const elementReveal: Transition = {
  duration: 0.7,
  ease: easeOutQuart,
}

// ─── Variant sets ────────────────────────────────────────────────────────────

/** Fade up — used for most scroll-reveal elements */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

/** Simple fade — for elements that shouldn't move */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
}

/** Hero line reveal — deliberate, editorial, with a subtle skew that straightens on entry */
export const heroLineVariants: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 1 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 1.1, ease: easeOutExpo },
  },
}

/** Stagger container — parent wrapper that cascades children */
export const staggerContainer = (
  staggerAmount = 0.12,
  delayChildren = 0.1
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
})

/** Hero stagger — slower, more deliberate than regular stagger */
export const heroStagger: Variants = staggerContainer(0.18, 0.3)

/** Card image hover — premium, almost imperceptible scale */
export const cardImageHover = {
  scale: 1.04,
  transition: { duration: 0.6, ease: easeOutQuart },
}

/** Nav underline — scaleX reveal from left, collapse to right */
export const underlineVariants: Variants = {
  initial: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
}
