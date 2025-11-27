'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconPortfolioSystem, IconPortfolioAuto, IconPortfolioMarketing, IconPortfolioFinance } from './Icons'
import { isValidUrl, getSafeIframeSandbox } from '@/utils/security'

interface PortfolioItem {
  id: string
  title: string
  problem: string
  result: string
  improvement: string
  thumbnail: string
  category: 'sistema' | 'automacao' | 'marketing' | 'consultoria'
  demo?: string
  description?: string
  tech?: string[]
}

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Sistema de Gestão Personalizado',
    problem: 'Sistema lento e cheio de limitações',
    result: '+42% conversão em 3 meses',
    improvement: 'Redução de 60% no tempo de processamento',
    thumbnail: '/portfolio/sistema-1.jpg',
    category: 'sistema',
    demo: '#',
    description: 'Sistema completo de gestão desenvolvido para otimizar processos internos e aumentar a produtividade.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Automação de Atendimento IA',
    problem: 'Atendimento sobrecarregado e custos altos',
    result: 'Economia de R$ 45k/mês',
    improvement: 'Atendimento 24/7 sem aumento de equipe',
    thumbnail: '/portfolio/automacao-1.jpg',
    category: 'automacao',
    demo: '#',
    description: 'Solução de automação inteligente que reduz custos e melhora a experiência do cliente.',
    tech: ['Python', 'OpenAI', 'WhatsApp API', 'Node.js'],
  },
  {
    id: '3',
    title: 'Estratégia de Growth Digital',
    problem: 'Baixa visibilidade no mercado',
    result: '+280% leads qualificados',
    improvement: 'ROI de 8:1 em 6 meses',
    thumbnail: '/portfolio/marketing-1.jpg',
    category: 'marketing',
    demo: '#',
    description: 'Campanha completa de marketing digital com foco em crescimento e conversão.',
    tech: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO'],
  },
  {
    id: '4',
    title: 'Reestruturação Financeira',
    problem: 'Fluxo de caixa desorganizado',
    result: '+35% margem de lucro',
    improvement: 'Corte de 25% em desperdícios',
    thumbnail: '/portfolio/consultoria-1.jpg',
    category: 'consultoria',
    demo: '#',
    description: 'Consultoria financeira completa com foco em otimização de processos e aumento de lucratividade.',
    tech: ['Excel', 'Power BI', 'Análise Financeira', 'Gestão'],
  },
]

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [showDemo, setShowDemo] = useState(false)

  // Limpar estado quando modal fecha
  useEffect(() => {
    if (!selectedProject) {
      setShowDemo(false)
      document.body.classList.remove('demo-mode-active')
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject])

  // Prevenir scroll quando modal está aberto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
      document.body.classList.remove('demo-mode-active')
    }
  }, [selectedProject])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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

  const moveCarousel = (direction: number) => {
    const maxIndex = Math.max(0, portfolioItems.length - 3)
    setCurrentIndex((prev) => {
      const newIndex = prev + direction
      if (newIndex < 0) return maxIndex
      if (newIndex > maxIndex) return 0
      return newIndex
    })
  }

  // Auto-scroll do carrossel
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      moveCarousel(1)
    }, 6000) // Muda a cada 6 segundos

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section
      id="portfolio"
      data-section="projects"
      ref={ref}
      className="section-padding bg-charcoal/30"
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12 md:mb-16 px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 font-extrabold mb-3 md:mb-4">
            Resultados que falam por si.
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-light-gray max-w-2xl mx-auto leading-relaxed">
            Projetos reais. Transformações reais. Empresas que saíram do caos para o crescimento.
          </p>
        </motion.div>

        {/* Carrossel Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-0 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 sm:gap-6 md:gap-8 transition-transform duration-600 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / 3)}% - ${currentIndex * 1.5}rem))`,
            }}
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="card-frost group cursor-pointer relative overflow-hidden flex-shrink-0"
                style={{
                  width: 'calc(33.333% - 1rem)',
                  minWidth: '350px',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.9, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(item)}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-electric/0 via-cyan-neon/0 to-blue-electric/0 group-hover:from-blue-electric/10 group-hover:via-cyan-neon/10 group-hover:to-blue-electric/10 transition-all duration-500" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 cyber-grid opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 digital-noise opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Thumbnail */}
              <div className="relative h-48 md:h-56 bg-gradient-primary rounded-card-sm mb-4 overflow-hidden group/thumb">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-electric/20 via-cyan-neon/15 to-blue-electric/20 flex items-center justify-center backdrop-blur-sm">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {item.category === 'sistema' && <IconPortfolioSystem />}
                    {item.category === 'automacao' && <IconPortfolioAuto />}
                    {item.category === 'marketing' && <IconPortfolioMarketing />}
                    {item.category === 'consultoria' && <IconPortfolioFinance />}
                  </motion.div>
                </div>
                <button
                  className="absolute inset-0 bg-black-deep/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm text-cyan-neon font-semibold neon-glow uppercase tracking-widest"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedProject(item)
                    if (item.demo && item.demo !== '#' && isValidUrl(item.demo)) {
                      setShowDemo(true)
                      document.body.classList.add('demo-mode-active')
                      document.body.style.overflow = 'hidden'
                    } else {
                      alert('Demo indisponível para este projeto.')
                    }
                  }}
                >
                  VER DEMO
                </button>
                <div className="absolute inset-0 border-2 border-cyan-neon/0 group-hover/thumb:border-cyan-neon/50 transition-all duration-300 rounded-card-sm" />
              </div>

              {/* Content */}
              <div className="relative z-10 px-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-h3 font-bold mb-3 md:mb-4 text-text-primary leading-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-light-gray mb-4 md:mb-5 leading-relaxed opacity-90">{item.problem}</p>
                
                <div className="flex items-center gap-2 mb-4 md:mb-5 pb-4 border-b border-white/5">
                  <div className="w-1 h-6 bg-gradient-primary rounded-full flex-shrink-0" />
                  <span className="text-success font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight">{item.result}</span>
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-cyan-neon mb-6 md:mb-8 leading-relaxed font-medium">{item.improvement}</p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedProject(item)
                  }}
                  className="text-cyan-neon text-xs md:text-sm font-semibold hover:text-cyan-neon/80 transition-all duration-300 flex items-center gap-2 group/btn uppercase tracking-wider"
                >
                  <span>Ver detalhes</span>
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </motion.div>
            ))}
          </div>

          {/* Botões de Navegação */}
          <button
            onClick={() => moveCarousel(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cyan-neon/10 border-2 border-cyan-neon text-cyan-neon flex items-center justify-center hover:bg-cyan-neon/20 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Projeto anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => moveCarousel(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cyan-neon/10 border-2 border-cyan-neon text-cyan-neon flex items-center justify-center hover:bg-cyan-neon/20 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Próximo projeto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Modal de Detalhes do Projeto */}
        <AnimatePresence>
          {selectedProject && (
            <div 
            className="fixed inset-0 z-[9999] bg-black-deep/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProject(null)
                setShowDemo(false)
                document.body.classList.remove('demo-mode-active')
                document.body.style.overflow = 'auto'
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 0.9, 0.3, 1] }}
              className={`bg-charcoal border-2 border-cyan-neon rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col ${showDemo ? '!max-w-full !w-full !h-full !max-h-full !rounded-none' : ''}`}
              style={{
                boxShadow: 'var(--glow-matrix)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {!showDemo ? (
                // Preview do Projeto
                <div className="p-6 md:p-8 overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-cyan-neon neon-glow">
                      {selectedProject.title}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedProject(null)
                        document.body.style.overflow = 'auto'
                      }}
                      className="text-cyan-neon hover:text-cyan-neon/80 text-2xl font-bold transition-all"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-light-gray text-base md:text-lg leading-relaxed mb-4">
                      {selectedProject.description || selectedProject.problem}
                    </p>
                    
                    {selectedProject.tech && selectedProject.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedProject.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-cyan-neon/10 border border-cyan-neon/30 rounded-lg text-cyan-neon text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-cyan-neon/5 border border-cyan-neon/20 rounded-lg">
                        <p className="text-sm text-light-gray mb-1">Problema</p>
                        <p className="text-cyan-neon font-semibold">{selectedProject.problem}</p>
                      </div>
                      <div className="p-4 bg-cyan-neon/5 border border-cyan-neon/20 rounded-lg">
                        <p className="text-sm text-light-gray mb-1">Resultado</p>
                        <p className="text-cyan-neon font-semibold">{selectedProject.result}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-cyan-neon/10 to-blue-electric/10 border border-cyan-neon/30 rounded-lg mb-6">
                      <p className="text-sm text-light-gray mb-1">Melhoria</p>
                      <p className="text-cyan-neon font-semibold text-lg">{selectedProject.improvement}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.demo && selectedProject.demo !== '#' && isValidUrl(selectedProject.demo) && (
                      <button
                        onClick={() => {
                          if (isValidUrl(selectedProject.demo || '')) {
                            setShowDemo(true)
                            document.body.classList.add('demo-mode-active')
                            document.body.style.overflow = 'hidden'
                          } else {
                            alert('URL do demo inválida ou não segura.')
                          }
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-neon text-black-deep font-semibold rounded-lg hover:bg-cyan-neon/80 transition-all duration-300 active:scale-95"
                        style={{
                          boxShadow: 'var(--glow-matrix)',
                        }}
                      >
                        <i className="fas fa-eye"></i>
                        Ver Demo
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProject(null)
                        document.body.style.overflow = 'auto'
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-cyan-neon text-cyan-neon font-semibold rounded-lg hover:bg-cyan-neon/10 transition-all duration-300 active:scale-95"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              ) : (
                // Vista de Demo (iframe)
                <div className="flex flex-col h-full">
                  <div 
                    className="flex items-center gap-4 p-4 border-b-2 border-cyan-neon"
                    style={{
                      background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowDemo(false)
                        document.body.classList.remove('demo-mode-active')
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-neon text-black-deep font-semibold rounded-lg hover:bg-cyan-neon/80 transition-all duration-300 active:scale-95"
                      style={{
                        boxShadow: 'var(--glow-matrix)',
                      }}
                    >
                      <i className="fas fa-arrow-left"></i>
                      Voltar
                    </button>
                    <h3 className="text-xl md:text-2xl font-bold text-cyan-neon neon-glow flex-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  {isValidUrl(selectedProject.demo || '') ? (
                    <iframe
                      src={selectedProject.demo}
                      className="w-full flex-1 border-none"
                      style={{
                        minHeight: 'calc(100vh - 80px)',
                        background: 'white',
                      }}
                      title={selectedProject.title}
                      sandbox={getSafeIframeSandbox()}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onError={() => {
                        alert('Erro ao carregar o demo. Verifique se a URL está acessível.')
                        setShowDemo(false)
                        document.body.classList.remove('demo-mode-active')
                      }}
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center bg-charcoal">
                      <div className="text-center p-8">
                        <i className="fas fa-exclamation-triangle text-cyan-neon text-4xl mb-4"></i>
                        <p className="text-light-gray">URL do demo inválida ou não segura.</p>
                        <button
                          onClick={() => {
                            setShowDemo(false)
                            document.body.classList.remove('demo-mode-active')
                          }}
                          className="mt-4 px-6 py-2 bg-cyan-neon text-black-deep font-semibold rounded-lg hover:bg-cyan-neon/80 transition-all"
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

