'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
  src: string
  poster?: string
  aspectRatio?: string
}

/**
 * Custom video player — clean, minimal controls overlay.
 * Plays with sound on the project page.
 */
export function VideoPlayer({ src, poster, aspectRatio = '16/9' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-black cursor-pointer group ${aspectRatio === '9/16' ? 'max-w-sm' : 'w-full'}`}
      style={{ aspectRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        onEnded={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />

      {/* Play/pause overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <polygon points="5,3 17,10 5,17" />
          </svg>
        </div>
      </motion.div>

      {/* Pause icon shown briefly when pausing */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={playing ? { opacity: 0, scale: 0.85 } : {}}
        transition={{ duration: 0.15 }}
      />

      {/* Bottom controls */}
      <div
        className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
      >
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-colors"
          aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
