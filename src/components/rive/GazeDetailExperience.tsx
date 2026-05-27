'use client'

import { motion } from 'framer-motion'
import { PlainRive } from '@/components/rive/PlainRive'

export function GazeDetailExperience() {
  return (
    <div className="w-full h-full max-w-container px-6 lg:px-12 py-8">
      <motion.div
        className="h-full w-full"
        initial={{ scale: 0.97, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlainRive
          src="/rive/cursor_gaze.riv"
          artboard="Main"
          stateMachine="State Machine 1"
          className="w-full h-full"
        />
      </motion.div>
    </div>
  )
}
