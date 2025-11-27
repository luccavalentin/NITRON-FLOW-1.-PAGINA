'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlitchEffectProps {
  children: ReactNode
  intensity?: 'low' | 'medium' | 'high'
}

export default function GlitchEffect({ children, intensity = 'medium' }: GlitchEffectProps) {
  const intensityMap = {
    low: { duration: 3, offset: 1 },
    medium: { duration: 2, offset: 2 },
    high: { duration: 1, offset: 3 },
  }

  const config = intensityMap[intensity]

  return (
    <motion.div
      className="relative inline-block"
      animate={{
        x: [0, config.offset, -config.offset, 0],
        opacity: [1, 0.8, 1, 0.8, 1],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        repeatDelay: 5,
        ease: 'easeInOut',
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 48%, rgba(0, 102, 255, 0.3) 49%, rgba(0, 102, 255, 0.3) 51%, transparent 52%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}

