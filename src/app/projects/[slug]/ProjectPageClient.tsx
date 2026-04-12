'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { PortfolioPlayground } from '@/components/ui/PortfolioPlayground'
import { heroLineVariants, heroStagger, fadeUpVariants } from '@/lib/motion'
import type { Project } from '@/lib/constants'

interface ProjectPageClientProps {
  project: Project
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const { title, category, year, description, accent, content, sections, tags, video, image, videos, youtubeId, gallery } = project
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen">

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt=""
                width={1600}
                height={1200}
                className="object-contain max-w-[90vw] max-h-[90vh] rounded-lg"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors text-white text-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero media area ─────────────────────────────────────────── */}
      {project.id === 'portfolio' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <PortfolioPlayground />
        </motion.div>
      ) : (
        <motion.div
          className="w-full h-[30vh] sm:h-[38vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: accent }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}

      {/* ── Video ───────────────────────────────────────────────────── */}
      {(video || youtubeId) && (
        <div className="max-w-container mx-auto px-6 lg:px-12 -mt-16 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            {youtubeId ? (
              <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : video ? (
              <VideoPlayer src={video} poster={image} />
            ) : null}
          </motion.div>
        </div>
      )}

      {/* ── Project info ────────────────────────────────────────────── */}
      <div className="max-w-container mx-auto px-6 lg:px-12 py-16">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={heroLineVariants} className="mb-6">
            <div className="flex items-center gap-4">
              <SectionLabel>{category}</SectionLabel>
              <span className="text-label font-sans font-light text-text-tertiary tabular-nums">{year}</span>
            </div>
          </motion.div>

          <motion.h1
            variants={heroLineVariants}
            className="text-display-lg font-sans font-bold text-text-primary mb-8 leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-body-lg font-sans font-normal text-text-secondary leading-relaxed mb-12"
          >
            {description}
          </motion.p>

          {/* Structured sections */}
          {sections ? (
            <motion.div variants={fadeUpVariants} className="mb-10 flex flex-col gap-8">
              {sections.map((section, i) => (
                <div key={i} className="flex flex-col gap-3">
                  {section.title && (
                    <p className="text-label font-sans font-semibold uppercase tracking-[0.12em] text-text-primary">
                      {section.title}
                    </p>
                  )}
                  {section.body && section.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-body-lg font-sans font-normal text-text-secondary leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="flex flex-col gap-2 mt-1">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex gap-3 text-body-lg font-sans font-normal text-text-secondary leading-relaxed">
                          <span className="mt-2.5 w-1 h-1 rounded-full bg-text-tertiary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </motion.div>
          ) : content ? (
            <motion.div variants={fadeUpVariants} className="mb-10 flex flex-col gap-5">
              {content.split('\n\n').map((para, i) => (
                <p key={i} className="text-body-lg font-sans font-normal text-text-secondary leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>
          ) : null}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2 mb-12">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-label font-sans font-medium uppercase tracking-[0.12em] text-text-tertiary px-3 py-1.5 rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Additional videos */}
          {videos && videos.length > 0 && (
            <motion.div variants={fadeUpVariants} className="mb-12">
              <div className={`grid gap-6 ${videos.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                {videos.map((v) => (
                  <div key={v.src}>
                    <p className="text-label font-sans font-medium uppercase tracking-[0.12em] text-text-tertiary mb-3">
                      {v.label}
                    </p>
                    <VideoPlayer src={v.src} poster={v.poster} aspectRatio={v.aspectRatio} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <motion.div variants={fadeUpVariants} className="mb-12">
              <div className={`grid gap-4 ${gallery.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                {gallery.map((g) => (
                  <div key={g.src} className="flex flex-col gap-2">
                    <button
                      onClick={() => setLightbox(g.src)}
                      className="relative w-full overflow-hidden rounded-lg border border-border cursor-zoom-in group"
                      style={{ aspectRatio: g.aspectRatio ?? '16/9' }}
                    >
                      <Image
                        src={g.src}
                        alt={g.label ?? ''}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </button>
                    {g.label && (
                      <p className="text-label font-sans font-medium uppercase tracking-[0.12em] text-text-tertiary">
                        {g.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={fadeUpVariants}>
            <MagneticButton href="/#work" variant="outline" intensity={0.4}>
              ← Zurück zum Portfolio
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
