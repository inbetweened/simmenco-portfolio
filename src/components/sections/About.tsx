'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { useCursor } from '@/hooks/useCursor'
import { WORK_EXPERIENCE } from '@/lib/constants'

/**
 * About section — editorial two-column layout.
 * Text left, slowly-rotating abstract SVG right.
 * Personal but sharp. Not a timeline or carousel.
 */
export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { setCursorState } = useCursor()

  return (
    <section id="about" className="px-6 lg:px-12 py-section max-w-container mx-auto">
      <div
        ref={ref}
        className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start"
      >
        {/* Text column */}
        <motion.div
          className="flex-1 lg:max-w-[55%]"
          variants={staggerContainer(0.14, 0.0)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUpVariants} className="mb-8">
            <SectionLabel index="02">Über mich</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="font-sans font-bold text-text-primary mb-8"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            onMouseEnter={() => setCursorState('hover-text')}
            onMouseLeave={() => setCursorState('default')}
          >
            Ich arbeite gerne dort,<br />wo Dinge zusammenkommen.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-body-lg font-sans font-normal text-text-secondary mb-6 leading-relaxed"
            onMouseEnter={() => setCursorState('hover-text')}
            onMouseLeave={() => setCursorState('default')}
          >
            In meinem Alltag bewege ich mich zwischen IT, Design und Medienproduktion. Ich arbeite viel im technischen Support, löse Probleme direkt vor Ort und sorge dafür, dass Systeme zuverlässig laufen.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="text-body-lg font-sans font-normal text-text-secondary mb-6 leading-relaxed"
            onMouseEnter={() => setCursorState('hover-text')}
            onMouseLeave={() => setCursorState('default')}
          >
            Gleichzeitig entwickle ich digitale Lösungen – von Webprojekten (Ticketshop oder Homepage) über Motion Design bis hin zu kleinen Tools und Automationen, die Abläufe einfacher machen.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="text-body-lg font-sans font-normal text-text-secondary leading-relaxed"
            onMouseEnter={() => setCursorState('hover-text')}
            onMouseLeave={() => setCursorState('default')}
          >
            Am meisten interessiert mich, wie man Probleme strukturiert löst und daraus funktionierende Systeme baut.
          </motion.p>

        </motion.div>

        {/* Visual element — abstract rotating geometry */}
        <div className="lg:flex-1 flex items-center justify-center w-full lg:w-auto py-8">
          <AbstractGeometry isInView={isInView} />
        </div>
      </div>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer(0.12, 0.15)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-20 pt-10 border-t border-border"
      >
        <motion.div variants={fadeUpVariants} className="mb-10">
          <SectionLabel>Erfahrung</SectionLabel>
        </motion.div>

        {WORK_EXPERIENCE.map((job) => (
          <motion.div
            key={job.company}
            variants={fadeUpVariants}
            className="flex flex-col lg:flex-row lg:gap-24 gap-6 pb-10"
          >
            {/* Left — company + meta */}
            <div className="lg:w-64 shrink-0">
              <p className="text-body-lg font-sans font-semibold text-text-primary leading-snug mb-1">
                {job.company}
              </p>
              <p className="text-label font-sans uppercase tracking-[0.12em] text-text-tertiary mb-1">
                {job.role}
              </p>
              <p className="text-label font-sans text-text-tertiary tracking-wide">
                {job.period} · {job.location}
              </p>
            </div>

            {/* Right — description + skills */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col gap-4">
                {job.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-body-lg font-sans font-normal text-text-secondary leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-label font-sans font-medium uppercase tracking-[0.12em] text-text-tertiary px-3 py-1.5 rounded-full border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── Abstract geometric visual ────────────────────────────────────────────────

function AbstractGeometry({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative w-64 h-64 lg:w-80 lg:h-80"
    >
      {/* Outer ring — slowly rotates */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: '1.5px solid rgba(24,22,20,0.35)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle ring with gap — counter-rotates */}
      <motion.div
        className="absolute inset-6 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          borderStyle: 'dashed',
          borderWidth: 1.5,
          borderColor: 'rgba(24,22,20,0.28)',
        }}
      />

      {/* Inner filled circle — stationary, centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(24,22,20,0.08)', border: '1.5px solid rgba(24,22,20,0.25)' }} />
      </div>

      {/* Orbital dot */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: 'rgba(24,22,20,0.55)', top: 0, left: '50%', marginLeft: -4, marginTop: -4 }}
        />
      </motion.div>
    </motion.div>
  )
}
