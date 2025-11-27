'use client'

import { useEffect, useRef } from 'react'

// Hook para atualizar cores dos SVGs quando o tema muda
const useThemeColors = () => {
  useEffect(() => {
    const updateSVGColors = () => {
      const root = document.documentElement
      const matrixGreen = getComputedStyle(root).getPropertyValue('--matrix-green').trim() || '#00E5FF'
      const blueElectric = getComputedStyle(root).getPropertyValue('--blue-electric').trim() || '#0066FF'
      
      // Atualizar todos os gradientes SVG
      const gradients = document.querySelectorAll('linearGradient')
      gradients.forEach((gradient) => {
        const stops = gradient.querySelectorAll('stop')
        if (stops.length >= 2) {
          stops[0].setAttribute('stop-color', blueElectric)
          stops[1].setAttribute('stop-color', matrixGreen)
        }
      })
    }
    
    // Atualizar imediatamente
    updateSVGColors()
    
    // Atualizar quando o tema mudar (observar mudanças no :root)
    const observer = new MutationObserver(() => {
      updateSVGColors()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    // Também atualizar quando houver evento de mudança de tema
    const handleThemeChange = () => {
      setTimeout(updateSVGColors, 50) // Pequeno delay para garantir que as variáveis foram atualizadas
    }
    window.addEventListener('themechange', handleThemeChange)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('themechange', handleThemeChange)
    }
  }, [])
}

export const IconAI = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8L40 24H56L44 36L48 52L32 44L16 52L20 36L8 24H24L32 8Z" stroke="url(#aiGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="32" r="4" fill="url(#aiGradient)"/>
    <defs>
      <linearGradient id="aiGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconSystem = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="48" height="36" rx="2" stroke="url(#systemGradient)" strokeWidth="2" fill="none"/>
    <path d="M8 20H56" stroke="url(#systemGradient)" strokeWidth="2"/>
    <circle cx="16" cy="16" r="1.5" fill="url(#systemGradient)"/>
    <circle cx="20" cy="16" r="1.5" fill="url(#systemGradient)"/>
    <circle cx="24" cy="16" r="1.5" fill="url(#systemGradient)"/>
    <path d="M20 28L28 36L44 20" stroke="url(#systemGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="systemGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconMarketing = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 48L16 32L24 40L32 16L40 24L48 8L56 20" stroke="url(#marketingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="16" cy="32" r="3" fill="url(#marketingGradient)"/>
    <circle cx="24" cy="40" r="3" fill="url(#marketingGradient)"/>
    <circle cx="32" cy="16" r="3" fill="url(#marketingGradient)"/>
    <circle cx="40" cy="24" r="3" fill="url(#marketingGradient)"/>
    <circle cx="48" cy="8" r="3" fill="url(#marketingGradient)"/>
    <circle cx="56" cy="20" r="3" fill="url(#marketingGradient)"/>
    <defs>
      <linearGradient id="marketingGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconFinance = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="20" width="40" height="28" rx="2" stroke="url(#financeGradient)" strokeWidth="2" fill="none"/>
    <path d="M20 28H44M20 36H44M20 44H36" stroke="url(#financeGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 12V20M24 16L32 12L40 16" stroke="url(#financeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="32" r="2" fill="url(#financeGradient)"/>
    <circle cx="36" cy="32" r="2" fill="url(#financeGradient)"/>
    <defs>
      <linearGradient id="financeGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconPortfolioSystem = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="9" width="36" height="27" rx="1.5" stroke="url(#portfolioGradient1)" strokeWidth="1.5" fill="none"/>
    <path d="M6 15H42" stroke="url(#portfolioGradient1)" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1" fill="url(#portfolioGradient1)"/>
    <circle cx="15" cy="12" r="1" fill="url(#portfolioGradient1)"/>
    <path d="M15 24L21 30L33 18" stroke="url(#portfolioGradient1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="portfolioGradient1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconPortfolioAuto = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L30 18H42L33 24L36 39L24 33L12 39L15 24L6 18H18L24 6Z" stroke="url(#portfolioGradient2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="3" fill="url(#portfolioGradient2)"/>
    <defs>
      <linearGradient id="portfolioGradient2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconPortfolioMarketing = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 36L12 24L18 30L24 12L30 18L36 6L42 15" stroke="url(#portfolioGradient3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="24" r="2" fill="url(#portfolioGradient3)"/>
    <circle cx="18" cy="30" r="2" fill="url(#portfolioGradient3)"/>
    <circle cx="24" cy="12" r="2" fill="url(#portfolioGradient3)"/>
    <circle cx="30" cy="18" r="2" fill="url(#portfolioGradient3)"/>
    <circle cx="36" cy="6" r="2" fill="url(#portfolioGradient3)"/>
    <circle cx="42" cy="15" r="2" fill="url(#portfolioGradient3)"/>
    <defs>
      <linearGradient id="portfolioGradient3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

export const IconPortfolioFinance = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useThemeColors()
  
  return (
  <svg ref={svgRef} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="15" width="30" height="21" rx="1.5" stroke="url(#portfolioGradient4)" strokeWidth="1.5" fill="none"/>
    <path d="M15 21H33M15 27H33M15 33H27" stroke="url(#portfolioGradient4)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 9V15M18 12L24 9L30 12" stroke="url(#portfolioGradient4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="21" cy="24" r="1.5" fill="url(#portfolioGradient4)"/>
    <circle cx="27" cy="24" r="1.5" fill="url(#portfolioGradient4)"/>
    <defs>
      <linearGradient id="portfolioGradient4" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0066FF"/>
        <stop offset="100%" stopColor="#00E5FF"/>
      </linearGradient>
    </defs>
  </svg>
  )
}

