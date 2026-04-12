'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursor } from '@/hooks/useCursor'
import { useMagnetic } from '@/hooks/useMagnetic'
import { fadeUpVariants } from '@/lib/motion'
import type { Project } from '@/lib/constants'

interface ProjectCardProps extends Project {
  index: number
  /** Alternate layout direction for visual rhythm */
  flip?: boolean
}

/**
 * Premium project card.
 * Activates the cursor's hover-card state on mouse enter.
 * Image area has a subtle scale-on-hover for quality signaling.
 * The card itself has a gentle magnetic pull at very low intensity.
 */
export function ProjectCard({ title, category, year, description, id, accent, index, flip = false }: ProjectCardProps) {
  const href = `/projects/${id}`
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { setCursorState } = useCursor()
  const { ref: magneticRef, x, y } = useMagnetic({ intensity: 0.08, radiusMultiplier: 1.2 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
    >
      <motion.a
        ref={magneticRef as React.Ref<HTMLAnchorElement>}
        href={href}
        style={{ x, y }}
        className={`group flex flex-col lg:flex-row ${flip ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-12 items-start py-12 border-t border-border`}
        onMouseEnter={() => setCursorState('hover-card')}
        onMouseLeave={() => setCursorState('default')}
      >
        {/* Image / placeholder area */}
        <div className="w-full lg:w-[45%] shrink-0 overflow-hidden rounded-lg">
          <motion.div
            className="w-full aspect-[4/3] rounded-lg"
            style={{ backgroundColor: accent }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-between py-2 flex-1 min-h-[180px]">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-label font-sans font-medium uppercase tracking-[0.15em] text-text-tertiary">
                {category}
              </span>
              <span className="text-label font-sans font-light text-text-tertiary tabular-nums">
                {year}
              </span>
            </div>

            <h3 className="text-display-md font-sans font-700 text-text-primary mb-4 leading-tight">
              {title}
            </h3>

            <p className="text-body-lg font-sans font-normal text-text-secondary max-w-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Animated view link */}
          <div className="mt-8 overflow-hidden">
            <motion.span
              className="inline-flex items-center gap-2 text-body-sm font-sans font-medium text-text-primary"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              View project
              <motion.span
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}
