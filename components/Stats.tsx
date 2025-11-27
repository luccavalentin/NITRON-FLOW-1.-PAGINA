'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: string
  label: string
  suffix?: string
  prefix?: string
}

const stats: Stat[] = [
  { value: '150', suffix: '+', label: 'Projetos Entregues' },
  { value: '98', suffix: '%', label: 'Satisfação dos Clientes' },
  { value: 'R$ 2.5M', label: 'Economizados pelos Clientes' },
  { value: '24/7', label: 'Suporte Disponível' },
]

function AnimatedNumber({ value, suffix, prefix }: { value: string; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    // Check if value is a number
    const numValue = parseFloat(value.replace(/[^\d.]/g, ''))
    if (isNaN(numValue)) {
      setDisplayValue(value)
      return
    }

    const duration = 2000
    const steps = 60
    const increment = numValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        if (value.includes('M')) {
          setDisplayValue(`R$ ${(current / 1000000).toFixed(1)}M`)
        } else {
          setDisplayValue(Math.floor(current).toString())
        }
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-charcoal via-black-deep to-charcoal relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-neon rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 font-extrabold mb-3 md:mb-4">
            Números que <span className="gradient-text holographic-text">comprovam</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-light-gray max-w-2xl mx-auto leading-relaxed">
            Resultados reais de empresas que confiaram na NITRON FLOW para transformar seus negócios.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card-frost text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text neon-glow-text">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-light-gray font-medium">{stat.label}</p>
              <div className="mt-4 h-1 w-0 bg-gradient-primary group-hover:w-full transition-all duration-500 mx-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

