'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SITE } from '@/lib/constants'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { useCursor } from '@/hooks/useCursor'

/**
 * Contact section — centered, generous, direct.
 * The email link is the hero element.
 * Social links sit below as quiet, magnetic buttons.
 */
export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { setCursorState } = useCursor()

  return (
    <section id="contact" className="px-6 lg:px-12 py-section max-w-container mx-auto">
      <div
        ref={ref}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          variants={staggerContainer(0.14, 0.0)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUpVariants} className="mb-8 flex justify-center">
            <SectionLabel index="03">Kontakt</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-display-lg font-sans font-bold text-text-primary mb-6 leading-tight"
          >
            Lass uns etwas schaffen.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-body-lg font-sans font-normal text-text-secondary mb-12 leading-relaxed"
            onMouseEnter={() => setCursorState('hover-text')}
            onMouseLeave={() => setCursorState('default')}
          >
            Ich bin offen für ausgewählte Projekte, Kooperationen und Gespräche. Meld dich einfach.
          </motion.p>

          {/* Primary email link — magnetic and prominent */}
          <motion.div variants={fadeUpVariants} className="mb-12">
            <MagneticButton
              href={`mailto:${SITE.email}`}
              intensity={0.55}
              variant="ghost"
              className="text-display-md font-bold px-0 py-0 rounded-none border-b border-text-primary hover:text-text-secondary transition-colors duration-300"
            >
              {SITE.email}
            </MagneticButton>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
