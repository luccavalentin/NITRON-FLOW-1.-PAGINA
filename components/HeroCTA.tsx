'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleExplosion from './ParticleExplosion'

export default function HeroCTA() {
  const [explosion, setExplosion] = useState<{ x: number; y: number } | null>(null)

  return (
    <section className="section-padding bg-black-deep relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-neon rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 digital-noise opacity-20" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {/* Primary Button - Conhecer Serviços */}
          <button
            className="relative overflow-hidden group w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-button font-bold text-base sm:text-lg md:text-xl text-black-deep min-h-[48px] sm:min-h-[52px] md:min-h-[56px] lg:min-h-[60px] transition-all duration-300 active:scale-95"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--glow-primary)',
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setExplosion({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
              setTimeout(() => setExplosion(null), 1000)
              // Scroll to portfolio
              if (typeof window !== 'undefined') {
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              Conhecer Serviços
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            />
          </button>

          {/* Secondary Button - Fale Conosco */}
          <button
            className="relative overflow-hidden group w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-button font-bold text-base sm:text-lg md:text-xl text-cyan-neon min-h-[48px] sm:min-h-[52px] md:min-h-[56px] lg:min-h-[60px] border-2 border-cyan-neon hover:border-cyan-neon/80 active:border-cyan-neon/60 transition-all duration-300 hover:bg-cyan-neon/10 active:bg-cyan-neon/20 active:scale-95"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setExplosion({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
              setTimeout(() => setExplosion(null), 1000)
              const whatsappUrl = 'https://wa.me/5519988300645?text=Ol%C3%A1%20NITRON%20FLOW!%20Quero%20falar%20sobre%20meu%20projeto.'
              if (typeof window !== 'undefined') {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
              }
            }}
          >
            <span className="relative z-10">Fale Conosco</span>
            <motion.div
              className="absolute inset-0 bg-cyan-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </button>
        </motion.div>
      </div>

      {/* Particle Explosion */}
      {explosion && (
        <ParticleExplosion
          x={explosion.x}
          y={explosion.y}
          onComplete={() => setExplosion(null)}
        />
      )}
    </section>
  )
}

