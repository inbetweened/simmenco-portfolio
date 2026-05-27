'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCursor } from '@/hooks/useCursor'
import { ITWebTile } from '@/components/ui/ITWebTile'
import { RiveProjectTile } from '@/components/rive/RiveProjectTile'
import type { Project } from '@/lib/constants'

interface ProjectTileProps {
  project: Project
}

export function ProjectTile({ project }: ProjectTileProps) {
  const { setCursorState } = useCursor()
  const { id, title, category, year, tagline, accent, image, video, imageFit = 'cover', noPage, tileRive } = project

  const className = "group relative overflow-hidden rounded-xl block w-full h-full"
  const events = {
    onMouseEnter: () => setCursorState(noPage ? 'default' : 'hover-card'),
    onMouseLeave: () => setCursorState('default'),
  }

  const content = (
    <>
      {/* ── Media layer ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full">
        {tileRive ? (
          <RiveProjectTile rive={tileRive} accent={accent} />
        ) : video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : id === 'it-support-web' ? (
          <ITWebTile />
        ) : (
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: accent }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}
      </div>

      {/* ── Hover overlay ────────────────────────────────────────────── */}
      <div
        className={`
          absolute inset-0 pointer-events-none
          bg-[#0e0d0c]/0 ${tileRive ? 'group-hover:bg-[#0e0d0c]/35' : 'group-hover:bg-[#0e0d0c]/60'}
          transition-colors duration-500
        `}
      />

      {/* ── Hover text ───────────────────────────────────────────────── */}
      <div
        className="
          absolute inset-x-0 bottom-0 p-5 sm:p-6 pointer-events-none
          translate-y-3 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-500 ease-out
        "
      >
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="text-label font-sans font-medium uppercase tracking-[0.14em] text-white/55">
            {category}
          </span>
          <span className="text-label font-sans font-light text-white/40 tabular-nums">
            {year}
          </span>
        </div>
        <h3 className="text-white font-sans font-bold leading-tight mb-1.5"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          {title}
        </h3>
        <p className="text-white/60 font-sans font-normal text-sm leading-relaxed line-clamp-2">
          {tagline}
        </p>

        {!noPage && (
          <div className="mt-4 flex items-center gap-1.5 text-white/70 text-xs font-medium tracking-wider uppercase">
            <span>Ansehen</span>
            <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </div>
        )}
      </div>
    </>
  )

  if (noPage) {
    return (
      <div className={className} {...events}>
        {content}
      </div>
    )
  }

  return (
    <Link href={`/projects/${id}`} className={className} {...events}>
      {content}
    </Link>
  )
}
