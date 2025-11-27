'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconAI, IconSystem, IconMarketing, IconFinance } from './Icons'
import GlitchEffect from './GlitchEffect'

interface FeatureBlockProps {
  id: string
  title: string
  subtitle: string
  description: string[]
  features?: string[]
  buttonText: string
  icon?: React.ReactNode
  reverse?: boolean
}

export default function FeatureBlock({
  id,
  title,
  subtitle,
  description,
  features,
  buttonText,
  icon,
  reverse = false,
}: FeatureBlockProps) {
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
      id={id}
      ref={ref}
      className="section-padding relative"
    >
      <div className="section-container">
        <div
          className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start lg:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20`}
        >
          {/* Content */}
          <motion.div
            className={`flex-1 w-full order-2 lg:order-1 ${reverse ? 'lg:text-right lg:pl-8' : 'lg:pr-8'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-h2 mb-4 md:mb-6 font-extrabold ${reverse ? 'lg:text-right' : 'lg:text-left'} text-left`}>
              <span className={`block text-cyan-neon mb-2 text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase binary-code ${reverse ? 'lg:text-right' : 'lg:text-left'} text-left`}>{subtitle}</span>
              <GlitchEffect intensity="low">
                <span className={`block text-xl sm:text-2xl md:text-3xl lg:text-h2 holographic-text ${reverse ? 'lg:text-right' : 'lg:text-left'} text-left`}>{title}</span>
              </GlitchEffect>
            </h2>

            <div className={`space-y-4 md:space-y-5 ${reverse ? 'lg:ml-auto' : ''}`} style={{ maxWidth: '100%', width: '100%' }}>
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-sm sm:text-base md:text-lg text-light-gray leading-relaxed ${reverse ? 'lg:text-right lg:ml-auto' : 'lg:text-left'} text-left`}
                  style={{ 
                    maxWidth: '100%',
                    width: '100%'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {features && (
              <ul className={`flex flex-col gap-3 md:gap-4 my-6 md:my-8 ${reverse ? 'lg:items-end lg:ml-auto' : 'lg:items-start'} items-start`} style={{ maxWidth: '100%', width: '100%' }}>
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className={`flex items-center gap-3 md:gap-4 text-sm md:text-base text-light-gray group/feature ${reverse ? 'flex-row-reverse lg:flex-row-reverse' : 'flex-row'}`}
                    initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="relative flex-shrink-0">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-success transition-transform group-hover/feature:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-success/20 blur-md opacity-0 group-hover/feature:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
              className={`mt-6 sm:mt-8 ${reverse ? 'lg:text-right lg:flex lg:justify-end' : 'lg:text-left lg:flex lg:justify-start'} text-left`}
            >
              <button
                className="btn-secondary text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 font-bold tracking-wide w-full sm:w-auto min-h-[48px] sm:min-h-[52px] md:min-h-[56px] transition-all duration-300 particle-glow active:scale-95"
                style={{
                  boxShadow: 'var(--glow-primary)',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.boxShadow = 'var(--glow-hover)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.boxShadow = 'var(--glow-primary)'
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)'
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }, 150)
                }}
                onClick={(e) => {
                  // Add subtle feedback
                  const button = e.currentTarget
                  button.classList.add('glass-break')
                  setTimeout(() => button.classList.remove('glass-break'), 500)
                }}
              >
                {buttonText}
              </button>
            </motion.div>
          </motion.div>

          {/* Visual/Icon */}
          <motion.div
            className={`flex-1 flex items-center justify-center relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] order-1 ${reverse ? 'lg:order-2' : 'lg:order-2'} w-full ${reverse ? 'lg:pr-8' : 'lg:pl-8'}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
          >
            {icon || (
              <div className="w-full max-w-md h-full relative group crt-scanline">
                <div className="absolute inset-0 bg-gradient-primary rounded-card opacity-10 flex items-center justify-center blur-3xl group-hover:opacity-20 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-electric/10 via-cyan-neon/10 to-blue-electric/10 rounded-card flex items-center justify-center backdrop-blur-md border border-cyan-neon/20 group-hover:border-cyan-neon/50 transition-all duration-500 p-8 cyber-grid">
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {id === 'ia-automacao' && <IconAI />}
                    {id === 'sistemas' && <IconSystem />}
                    {id === 'marketing' && <IconMarketing />}
                    {id === 'consultoria' && <IconFinance />}
                  </motion.div>
                </div>
                <div className="absolute inset-0 shimmer rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-cyan-neon/0 group-hover:border-cyan-neon/30 rounded-card transition-all duration-500 blur-sm" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

