'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const themeColors = [
  { color: '#00E5FF', name: 'Ciano', title: 'Ciano' },
  { color: '#0066FF', name: 'Azul', title: 'Azul Elétrico' },
  { color: '#b967ff', name: 'Roxo', title: 'Roxo' },
  { color: '#ff2a6d', name: 'Rosa', title: 'Rosa' },
  { color: '#ff6b35', name: 'Laranja', title: 'Laranja' },
  { color: '#ffd23f', name: 'Amarelo', title: 'Amarelo' },
  { color: '#06ffa5', name: 'Verde Água', title: 'Verde Água' },
  { color: '#ff006e', name: 'Rosa Vibrante', title: 'Rosa Vibrante' },
  { color: '#8338ec', name: 'Roxo Escuro', title: 'Roxo Escuro' },
  { color: '#3a86ff', name: 'Azul', title: 'Azul' },
  { color: '#fb5607', name: 'Laranja Escuro', title: 'Laranja Escuro' },
  { color: '#ffbe0b', name: 'Amarelo Dourado', title: 'Amarelo Dourado' },
]

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#00E5FF')
  const containerRef = useRef<HTMLDivElement>(null)

  const adjustBrightness = useCallback((color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16)
    const r = Math.max(0, Math.min(255, (num >> 16) + percent))
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent))
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + percent))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }, [])

  const applyThemeColor = useCallback((color: string) => {
    // Validate color format before applying
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      console.error('Invalid color format:', color)
      return
    }
    
    const root = document.documentElement
    const darkerColor = adjustBrightness(color, -30)

    // Aplicar apenas as variáveis CSS principais (igual ao original)
    root.style.setProperty('--matrix-green', color)
    root.style.setProperty('--cyan-neon', color)
    root.style.setProperty('--blue-electric', darkerColor)
    root.style.setProperty('--accent', color)
    root.style.setProperty('--primary', darkerColor)

    // Atualizar gradientes (igual ao original)
    root.style.setProperty(
      '--gradient-1',
      `linear-gradient(135deg, ${color}, ${darkerColor})`
    )
    root.style.setProperty(
      '--gradient-3',
      `linear-gradient(135deg, ${color}, var(--neon-cyan))`
    )
    root.style.setProperty(
      '--gradient-primary',
      `linear-gradient(90deg, ${darkerColor} 0%, ${color} 100%)`
    )
    root.style.setProperty(
      '--grad',
      `linear-gradient(90deg, ${darkerColor} 0%, ${color} 100%)`
    )

    // Atualizar glow (igual ao original)
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    root.style.setProperty('--glow-matrix', `0 0 15px rgba(${r}, ${g}, ${b}, 0.8)`)
    root.style.setProperty('--glow-primary', `0 8px 30px rgba(${r}, ${g}, ${b}, 0.18)`)
    root.style.setProperty('--glow-hover', `0 12px 40px rgba(${r}, ${g}, ${b}, 0.14)`)
    
    // Disparar evento para atualizar SVGs
    window.dispatchEvent(new CustomEvent('themechange'))
  }, [adjustBrightness])

  useEffect(() => {
    // Carregar cor salva ou aplicar cor padrão
    let savedColor: string | null = null
    try {
      savedColor = localStorage.getItem('themeColor')
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
    
    // Validate saved color format
    const defaultColor = '#00E5FF'
    const colorToApply = savedColor && /^#[0-9A-Fa-f]{6}$/.test(savedColor) ? savedColor : defaultColor
    
    applyThemeColor(colorToApply)
    setSelectedColor(colorToApply)
    
    // Marcar cor selecionada após um pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      const colorOptions = document.querySelectorAll('.theme-color-option')
      colorOptions.forEach((opt) => {
        const optColor = opt.getAttribute('data-color')
        if (optColor === colorToApply) {
          opt.classList.add('selected')
        } else {
          opt.classList.remove('selected')
        }
      })
    }, 100)

    // Fechar ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [applyThemeColor])

  const handleColorSelect = (color: string) => {
    // Validate color format (hex color)
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      console.error('Invalid color format:', color)
      return
    }
    
    setSelectedColor(color)
    applyThemeColor(color)
    
    try {
      localStorage.setItem('themeColor', color)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
    
    // Remover seleção de todas as opções
    const colorOptions = document.querySelectorAll('.theme-color-option')
    colorOptions.forEach((opt) => opt.classList.remove('selected'))
    
    // Marcar cor selecionada
    const selectedOption = document.querySelector(`[data-color="${color}"]`)
    if (selectedOption) {
      selectedOption.classList.add('selected')
    }
    
    setIsOpen(false)
  }

  const resetTheme = () => {
    const defaultColor = '#00E5FF' // Ciano padrão
    setSelectedColor(defaultColor)
    applyThemeColor(defaultColor)
    
    try {
      localStorage.setItem('themeColor', defaultColor)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
    
    // Remover seleção de todas as opções
    const colorOptions = document.querySelectorAll('.theme-color-option')
    colorOptions.forEach((opt) => opt.classList.remove('selected'))
    
    // Marcar ciano como selecionado
    const cyanOption = document.querySelector(`[data-color="${defaultColor}"]`)
    if (cyanOption) {
      cyanOption.classList.add('selected')
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm lg:text-base text-light-gray hover:text-cyan-neon transition-all duration-300 relative group font-medium flex items-center gap-2"
        style={{ color: selectedColor !== '#00E5FF' ? selectedColor : undefined }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        Quero escolher meu tom de sistema
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-charcoal border-2 border-cyan-neon rounded-lg p-4 z-50 min-w-[250px]"
            style={{
              background: 'rgba(28, 30, 38, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--glow-matrix)',
            }}
          >
            <label className="block text-white text-sm text-center mb-3">
              Escolha a cor do tema:
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {themeColors.map((theme) => (
                <button
                  key={theme.color}
                  data-color={theme.color}
                  className={`theme-color-option w-12 h-12 rounded-lg transition-all duration-300 border-2 ${
                    selectedColor === theme.color
                      ? 'border-cyan-neon scale-110 selected'
                      : 'border-transparent hover:border-cyan-neon/50'
                  }`}
                  onClick={() => handleColorSelect(theme.color)}
                  style={{
                    background: theme.color,
                    boxShadow:
                      selectedColor === theme.color
                        ? `0 0 15px ${theme.color}, 0 0 30px ${theme.color}`
                        : 'none',
                    borderColor: selectedColor === theme.color ? 'var(--matrix-green)' : 'transparent',
                  }}
                  title={theme.title}
                >
                  {selectedColor === theme.color && (
                    <span className="text-white text-lg font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={resetTheme}
              className="w-full bg-cyan-neon text-black-deep py-2 px-4 rounded-lg font-semibold hover:bg-cyan-neon/80 transition-all duration-300"
              style={{
                backgroundColor: 'var(--matrix-green)',
              }}
            >
              Resetar (Ciano)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

