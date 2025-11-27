'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section
      id="sobre"
      ref={ref}
      className="section-padding bg-black-deep relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 cyber-grid" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 font-extrabold mb-4 md:mb-6">
              <span className="block text-cyan-neon mb-2 text-sm md:text-base font-semibold tracking-wider uppercase binary-code">
                SOBRE A NITRON FLOW
              </span>
              <span className="block gradient-text holographic-text">
                Transformamos empresas através da tecnologia
              </span>
            </h2>

            <div className="space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg text-light-gray leading-relaxed">
              <p>
                A NITRON FLOW nasceu da necessidade de criar soluções tecnológicas que realmente transformam negócios. Não vendemos apenas serviços — criamos resultados mensuráveis.
              </p>
              <p>
                Nossa missão é fazer com que empresas de todos os tamanhos tenham acesso a tecnologia de ponta, automação inteligente e estratégias que geram crescimento real.
              </p>
              <p className="text-cyan-neon font-medium">
                Cresça. Automatize. Prospere. Essa é a nossa promessa.
              </p>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Foco em Resultados</h3>
                  <p className="text-xs sm:text-sm text-light-gray">Cada projeto é pensado para gerar impacto real no seu negócio.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Tecnologia de Ponta</h3>
                  <p className="text-xs sm:text-sm text-light-gray">Utilizamos as melhores ferramentas e metodologias do mercado.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Suporte Dedicado</h3>
                  <p className="text-xs sm:text-sm text-light-gray">Equipe sempre disponível para garantir o sucesso do seu projeto.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Soluções Personalizadas</h3>
                  <p className="text-xs sm:text-sm text-light-gray">Cada empresa recebe uma solução única, feita sob medida.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-electric/20 via-cyan-neon/15 to-blue-electric/20 rounded-card backdrop-blur-md border border-cyan-neon/20 p-8 md:p-12 crt-scanline">
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
                      style={{
                        boxShadow: 'var(--glow-matrix)',
                      }}
                    >
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-cyan-neon font-bold text-lg md:text-xl mb-2">Inovação Constante</p>
                    <p className="text-light-gray text-sm md:text-base">Tecnologia que transforma</p>
                  </div>
                </motion.div>
                <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-card" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

