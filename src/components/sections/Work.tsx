'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectTile } from '@/components/ui/ProjectTile'
import { PROJECTS } from '@/lib/constants'
import { fadeUpVariants } from '@/lib/motion'
import type { TileSize } from '@/lib/constants'

/**
 * Selected Work — bento mosaic grid.
 *
 * Grid is 4 columns on desktop, 2 on tablet, 1 on mobile.
 * Row height is fixed so tiles with row-span-2 are exactly 2× taller.
 * Each tile's size (small/wide/tall/large) is defined in constants.ts.
 *
 * To add a project: push a new entry to PROJECTS in src/lib/constants.ts.
 * To adjust a tile size: change its `size` field.
 */
export function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="px-6 lg:px-12 py-section">
      <div ref={ref}>

        {/* Section header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <SectionLabel index="01" className="mb-3">Ausgewählte Arbeiten</SectionLabel>
          <h2 className="text-display-lg font-sans font-bold text-text-primary">
            Was bisher entstand.
          </h2>
        </motion.div>

        {/*
          Bento grid.
          Desktop (≥1024px): 4 columns, 280px rows
          Tablet  (≥640px):  2 columns, 220px rows
          Mobile  (<640px):  1 column,  56vw rows
        */}
        {PROJECTS.length > 0 ? (
          <div
            className="
              grid gap-2.5
              grid-cols-1
              [grid-auto-rows:56vw]
              sm:grid-cols-2
              sm:[grid-auto-rows:220px]
              lg:grid-cols-4
              lg:[grid-auto-rows:280px]
            "
          >
            {PROJECTS.map((project, i) => (
              <GridTile
                key={project.id}
                size={project.size}
                isInView={isInView}
                delay={i * 0.08}
              >
                <ProjectTile project={project} />
              </GridTile>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-border">
            <span className="text-label uppercase tracking-[0.15em] text-text-tertiary">
              Noch keine Projekte
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Responsive grid tile wrapper ─────────────────────────────────────────────

/**
 * A motion.div that IS the grid item.
 * Handles both col/row span AND the fade-up entrance animation.
 * Must NOT use display:contents — that breaks both grid and Framer Motion opacity.
 */

const tileClasses: Record<TileSize, string> = {
  //                mobile       tablet               desktop
  small: 'col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1',
  wide:  'col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1',
  tall:  'col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2',
  large: 'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2',
}

interface GridTileProps {
  size: TileSize
  isInView: boolean
  delay: number
  children: React.ReactNode
}

function GridTile({ size, isInView, delay, children }: GridTileProps) {
  return (
    <motion.div
      className={tileClasses[size]}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
