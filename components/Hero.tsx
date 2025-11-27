'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from './Particles'
import HologramEffect from './HologramEffect'
import TypingEffect from './TypingEffect'
import GlitchEffect from './GlitchEffect'
import ParticleExplosion from './ParticleExplosion'
import HologramCube from './HologramCube'
import Controller, { ControllerRef } from './Controller'
import Logo from './Logo'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<ControllerRef>(null)
  const [explosion, setExplosion] = useState<{ x: number; y: number } | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Detectar desktop apenas no cliente para evitar hydration error
    setIsDesktop(typeof window !== 'undefined' && window.innerWidth > 768)
    
    // Só aplicar efeitos de mouse em desktop
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30

      heroRef.current.style.setProperty('--mouse-x', `${x}px`)
      heroRef.current.style.setProperty('--mouse-y', `${y}px`)
    }

    // Animated orb - reduzir em mobile e usar throttling
    let angle = 0
    let lastTime = 0
    const targetFPS = 30 // Reduzir FPS do orb
    const frameInterval = 1000 / targetFPS
    
    const animateOrb = (currentTime: number) => {
      if (!orbRef.current) return
      
      if (currentTime - lastTime >= frameInterval) {
        angle += 0.005
        const radius = 200
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        orbRef.current.style.transform = `translate(calc(50% + ${x}px), calc(50% + ${y}px))`
        lastTime = currentTime
      }
      requestAnimationFrame(animateOrb)
    }
    requestAnimationFrame(animateOrb)

    // Throttle mouse move para melhor performance
    let mouseMoveTimeout: NodeJS.Timeout
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = setTimeout(() => handleMouseMove(e), 16) // ~60fps
    }
    
    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      clearTimeout(mouseMoveTimeout)
    }
  }, [isDesktop])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden crt-scanline digital-noise"
      style={{
        background: 'linear-gradient(180deg, #0A0A0D 0%, #121217 100%)',
      }}
    >
      {/* Hologram Grid */}
      <HologramEffect />

      {/* Particles Background */}
      <Particles />

      {/* Animated Orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 w-96 h-96 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--matrix-green) 40%, transparent) 0%, color-mix(in srgb, var(--blue-electric) 20%, transparent) 40%, transparent 70%)`,
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      {/* Multiple Holographic Layers */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--matrix-green) 20%, transparent) 0%, transparent 50%)`,
          transform: 'translate(calc(var(--mouse-x, 0px) * 0.3), calc(var(--mouse-y, 0px) * 0.3))',
          transition: 'transform 0.15s ease-out',
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--blue-electric) 20%, transparent) 0%, transparent 50%)`,
          transform: 'translate(calc(var(--mouse-x, 0px) * -0.2), calc(var(--mouse-y, 0px) * -0.2))',
          transition: 'transform 0.2s ease-out',
          zIndex: 0,
        }}
      />

            {/* Content - Estrutura exata do original */}
            <div
              className="section-container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 hero-content-grid"
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                paddingTop: '120px',
              }}
            >
        {/* Hero Text - Lado esquerdo */}
        <div className="hero-text" style={{ textAlign: 'left' }}>
          <div className="flex flex-col items-start md:items-start items-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 sm:mb-4 w-full"
              initial={{ opacity: 1 }}
            >
              <div className="name-container" style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
                <div className="typewriter-container" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Logo size="lg" showText={false} />
                    <TypingEffect 
                      text="Nitron Flow" 
                      speed={80}
                      className=""
                      controllerRef={controllerRef}
                      onComplete={() => {
                      // Mostrar elementos após digitação terminar - usando requestAnimationFrame para melhor performance
                      if (typeof window === 'undefined') return
                      
                      requestAnimationFrame(() => {
                        const tagline = document.getElementById('tagline-text')
                        const gradientText = document.getElementById('gradient-text')
                        const heroParagraph = document.querySelector('.hero-text p')
                        const heroBtns = document.querySelector('.hero-btns')
                        
                        // Mostrar tagline primeiro
                        if (tagline) {
                          tagline.style.transition = 'opacity 0.8s ease-in'
                          tagline.style.opacity = '1'
                        }
                        
                        setTimeout(() => {
                          if (gradientText) {
                            gradientText.style.transition = 'opacity 0.8s ease-in'
                            gradientText.style.opacity = '1'
                          }
                          setTimeout(() => {
                            if (heroParagraph) {
                              heroParagraph.style.transition = 'opacity 0.8s ease-in'
                              heroParagraph.style.opacity = '1'
                            }
                            setTimeout(() => {
                              if (heroBtns) {
                                heroBtns.style.transition = 'opacity 0.8s ease-in'
                                heroBtns.style.opacity = '1'
                              }
                            }, 300)
                          }, 300)
                        }, 300)
                      })
                    }}
                  />
                  </div>
                </div>
                <Controller ref={controllerRef} />
              </div>
            </motion.h1>

            {/* Tagline - Centralizado abaixo do nome */}
            <motion.div
              id="tagline-text"
              className="mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full"
              style={{ opacity: 0 }}
            >
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-cyan-neon" />
              <span className="text-cyan-neon text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase neon-glow">
                CRESÇA, AUTOMATIZE, PROSPERE
              </span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-neon" />
            </motion.div>
          </div>

          <motion.h2
            id="gradient-text"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 sm:mb-6 text-cyan-neon neon-glow-text w-full text-center md:text-left"
            style={{ opacity: 0 }}
          >
            TRANSFORME SEU NEGÓCIO<br />COM TECNOLOGIA DE PONTA
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-light-gray mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 text-center md:text-left"
            style={{ opacity: 0 }}
          >
            Soluções inovadoras em desenvolvimento web, automatização inteligente e marketing digital para empresas que querem estar à frente do mercado.
          </motion.p>

          <motion.div
            className="hero-btns flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto justify-center md:justify-start"
            style={{ opacity: 0 }}
          >
            {/* Primary Button - Conhecer Serviços */}
            <button
              className="relative overflow-hidden group px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base text-black-deep transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] active:scale-95"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--glow-primary)',
              }}
              onClick={(e) => {
                if (typeof window !== 'undefined') {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <span className="relative z-10">Conhecer Serviços</span>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
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
              className="relative overflow-hidden group px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base text-cyan-neon border-2 border-cyan-neon hover:border-cyan-neon/80 active:border-cyan-neon/60 transition-all duration-300 hover:bg-cyan-neon/10 active:bg-cyan-neon/20 w-full sm:w-auto min-h-[48px] active:scale-95"
              onClick={() => {
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

        {/* Hero Visual - Cubo Holográfico - Lado direito */}
        <motion.div
          className="hero-visual w-full flex justify-center md:justify-start"
          style={{
            position: 'relative',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
        >
          <HologramCube />
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <svg
          className="w-6 h-6 text-cyan-neon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}



