'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
  result: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'CEO',
    company: 'TechCorp',
    text: 'A NITRON FLOW transformou nossa operação. Em 3 meses, reduzimos custos em 40% e aumentamos a produtividade em 60%. O sistema personalizado que criaram é exatamente o que precisávamos.',
    result: '+60% produtividade',
  },
  {
    id: '2',
    name: 'Ana Paula',
    role: 'Diretora',
    company: 'Inovação Digital',
    text: 'O funcionário de IA que implementaram trabalha 24/7 sem erros. Economizamos R$ 50k por mês em salários e melhoramos o atendimento. Resultado imediato.',
    result: 'R$ 50k/mês economizados',
  },
  {
    id: '3',
    name: 'Roberto Mendes',
    role: 'Fundador',
    company: 'StartupXYZ',
    text: 'Nossa marca não aparecia no Google. Com a estratégia de marketing da NITRON FLOW, passamos a ser referência no nicho. Leads qualificados aumentaram 300%.',
    result: '+300% leads qualificados',
  },
  {
    id: '4',
    name: 'Mariana Costa',
    role: 'CFO',
    company: 'Empresa ABC',
    text: 'A consultoria financeira organizou nosso caos. Cortamos desperdícios, otimizamos processos e aumentamos a margem de lucro em 35%. Profissionalismo total.',
    result: '+35% margem de lucro',
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="section-padding"
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12 md:mb-16 px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 font-extrabold mb-3 md:mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-light-gray leading-relaxed">
            Depoimentos estratégicos: foco em resultado, não em elogio.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="card-frost p-6 sm:p-8 md:p-10 lg:p-12 crt-scanline"
            >
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-1.5 mb-6 md:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 md:w-6 md:h-6 text-warning"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="relative mb-6 md:mb-8">
                  <svg
                    className="absolute -top-4 -left-4 w-12 h-12 text-cyan-neon/10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm md:text-base lg:text-body text-text-primary leading-relaxed relative z-10 italic">
                    "{testimonials[currentIndex].text}"
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 md:pt-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-base md:text-lg lg:text-xl mb-1 text-text-primary">{testimonials[currentIndex].name}</p>
                      <p className="text-light-gray text-xs md:text-sm opacity-80">
                        {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-cyan-neon font-bold text-base md:text-lg lg:text-xl tracking-tight">
                        {testimonials[currentIndex].result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10">
            <motion.button
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/10 hover:border-cyan-neon flex items-center justify-center transition-all duration-300 bg-charcoal/50 hover:bg-charcoal/80"
              aria-label="Depoimento anterior"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <div className="flex gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-cyan-neon w-8'
                      : 'bg-white/20 hover:bg-white/40 w-2'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    width: index === currentIndex ? 32 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
              }
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/10 hover:border-cyan-neon flex items-center justify-center transition-all duration-300 bg-charcoal/50 hover:bg-charcoal/80"
              aria-label="Próximo depoimento"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

