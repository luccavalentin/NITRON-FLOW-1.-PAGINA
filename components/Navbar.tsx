'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeSelector from './ThemeSelector'
import Logo from './Logo'

// Componente de link do menu com efeitos especiais
function NavLink({ 
  href, 
  active, 
  onClick, 
  children 
}: { 
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const rippleRef = useRef<HTMLSpanElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick()
    
    // Criar efeito ripple
    if (rippleRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      rippleRef.current.style.left = `${x}px`
      rippleRef.current.style.top = `${y}px`
      rippleRef.current.style.animation = 'none'
      void rippleRef.current.offsetWidth
      rippleRef.current.style.animation = 'nav-ripple 0.6s ease-out'
    }
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`text-sm lg:text-base font-medium transition-all duration-300 relative overflow-hidden group ${
        active
          ? 'text-white px-4 py-2 rounded-lg border-2 border-cyan-neon bg-cyan-neon/10'
          : 'text-light-gray px-4 py-2 rounded-lg border-2 border-transparent'
      }`}
      style={
        active
          ? {
              boxShadow: 'var(--glow-matrix), 0 0 40px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.3)',
            }
          : {}
      }
      whileHover={
        !active
          ? {
              y: -3,
              scale: 1.05,
              borderColor: 'rgba(0, 229, 255, 0.5)',
              boxShadow: 'var(--glow-matrix), 0 0 30px rgba(0, 229, 255, 0.3)',
            }
          : {
              scale: 1.05,
              boxShadow: 'var(--glow-matrix), 0 0 50px rgba(0, 229, 255, 0.6), 0 0 80px rgba(0, 229, 255, 0.4)',
            }
      }
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      {/* Efeito shimmer no hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {/* Efeito ripple no clique */}
      <span
        ref={rippleRef}
        className="absolute w-4 h-4 rounded-full bg-cyan-neon/50 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />
    </motion.a>
  )
}

export default function Navbar() {
  const whatsappLink = 'https://wa.me/5519988300645?text=Ol%C3%A1%20NITRON%20FLOW!%20Quero%20falar%20sobre%20meu%20projeto.'
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          
          // Detectar seção ativa
          const sectionMap = {
            home: 'home',
            projects: 'portfolio',
            skills: 'ia-automacao',
            about: 'sobre',
          }
          const scrollPosition = window.scrollY + 100
          
          for (const [key, id] of Object.entries(sectionMap)) {
            const element = document.getElementById(id)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(key)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Verificar na inicialização
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-advanced shadow-soft py-4 backdrop-blur-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        <motion.a
          href="#home"
          className="relative"
          style={{ textDecoration: 'none', display: 'block' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Logo size="md" showText={true} />
        </motion.a>

        {/* Desktop Menu - Estrutura exata da imagem */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavLink
            href="#home"
            active={activeSection === 'home'}
            onClick={() => setActiveSection('home')}
          >
            Home
          </NavLink>
          <NavLink
            href="#portfolio"
            active={activeSection === 'projects'}
            onClick={() => setActiveSection('projects')}
          >
            Projetos
          </NavLink>
          <NavLink
            href="#ia-automacao"
            active={activeSection === 'skills'}
            onClick={() => setActiveSection('skills')}
          >
            Serviços
          </NavLink>
          <NavLink
            href="#sobre"
            active={activeSection === 'about'}
            onClick={() => setActiveSection('about')}
          >
            Sobre Nós
          </NavLink>
          <ThemeSelector />
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border-2 border-cyan-neon text-cyan-neon font-semibold text-sm lg:text-base hover:bg-cyan-neon/10 transition-all duration-300"
          >
            Contato
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-neon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black-deep/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden glass-advanced border-t border-white/20 fixed top-[73px] left-0 right-0 z-50 shadow-2xl"
            >
              <div className="section-container py-6 px-4 flex flex-col gap-4">
                <motion.a
                  href="#ia-automacao"
                  className="text-base font-medium text-light-gray hover:text-cyan-neon transition-all duration-300 py-3 px-4 rounded-lg hover:bg-cyan-neon/10 flex items-center gap-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-1 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Soluções
                </motion.a>
                <motion.a
                  href="#sobre"
                  className="text-base font-medium text-light-gray hover:text-cyan-neon transition-all duration-300 py-3 px-4 rounded-lg hover:bg-cyan-neon/10 flex items-center gap-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-1 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sobre
                </motion.a>
                <motion.a
                  href="#portfolio"
                  className="text-base font-medium text-light-gray hover:text-cyan-neon transition-all duration-300 py-3 px-4 rounded-lg hover:bg-cyan-neon/10 flex items-center gap-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-1 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Portfólio
                </motion.a>
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-light-gray hover:text-cyan-neon transition-all duration-300 py-3 px-4 rounded-lg hover:bg-cyan-neon/10 flex items-center gap-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-1 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contato (WhatsApp)
                </motion.a>
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mt-2 text-base py-4 font-bold text-center"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.97 }}
                >
                  Falar no WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

