'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlitchEffect from './GlitchEffect'
import ParticleExplosion from './ParticleExplosion'

export default function CTAFinal() {
  const [explosion, setExplosion] = useState<{ x: number; y: number } | null>(null)

  return (
    <section className="section-padding bg-gradient-to-br from-charcoal via-black-deep to-charcoal relative overflow-hidden crt-scanline digital-noise">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 overflow-hidden cyber-grid">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-neon rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 holographic" />
      </div>

      <div className="section-container relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-extrabold mb-5 sm:mb-6 md:mb-8 leading-tight tracking-tight px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Pronto para transformar sua empresa e{' '}
          <GlitchEffect intensity="medium">
            <span className="gradient-text block sm:inline holographic-text">dominar seu mercado?</span>
          </GlitchEffect>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-light-gray max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A NITRON FLOW é a ponte entre onde você está e onde você quer chegar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
          className="w-full sm:w-auto sm:inline-flex sm:justify-center"
        >
          <button
            className="btn-primary text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 lg:px-16 py-5 sm:py-6 md:py-7 lg:py-8 relative overflow-hidden group w-full sm:w-auto min-h-[60px] sm:min-h-[64px] md:min-h-[72px] transition-all duration-500 font-bold particle-glow"
            style={{
              boxShadow: 'var(--glow-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--glow-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--glow-primary)'
            }}
            onClick={(e) => {
              setExplosion({ x: e.clientX, y: e.clientY })
              setTimeout(() => setExplosion(null), 1000)
            }}
          >
            <span className="relative z-10 tracking-wide">Quero conversar com a NITRON FLOW agora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon to-blue-electric opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

