'use client'

import { motion } from 'framer-motion'
import { RiveCanvas } from '@/components/rive/RiveCanvas'
import type { RiveMedia } from '@/lib/constants'

interface RiveProjectTileProps {
  rive: RiveMedia
  accent: string
}

export function RiveProjectTile({ rive, accent }: RiveProjectTileProps) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: rive.background ?? accent }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.035 }}
        transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.45 }}
      >
        <RiveCanvas
          src={rive.src}
          artboard={rive.artboard}
          animation={rive.animation}
          stateMachine={rive.stateMachine}
          hoverInput={rive.hoverInput}
          className="w-full h-full p-6"
        />
      </motion.div>
    </div>
  )
}
