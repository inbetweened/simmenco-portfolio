'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariants } from '@/lib/motion'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface RevealTextProps {
  children: React.ReactNode
  as?: HeadingTag
  className?: string
  delay?: number
}

/**
 * Scroll-triggered reveal wrapper.
 * Animates from y:40 opacity:0 to natural position once in viewport.
 * Respects accessibility — does NOT split text into individual characters.
 */
export function RevealText({ children, as: Tag = 'div', className = '', delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    ...fadeUpVariants,
    visible: {
      ...fadeUpVariants.visible,
      transition: {
        ...(fadeUpVariants.visible as { transition: object }).transition,
        delay,
      },
    },
  }

  return (
    <div ref={ref}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}
