'use client'

import { useEffect, useRef } from 'react'

// Helper para obter cor RGB de variável CSS
const getCSSColorRGB = (cssVar: string): { r: number; g: number; b: number } => {
  const root = document.documentElement
  const color = getComputedStyle(root).getPropertyValue(cssVar).trim()
  
  // Se for hex, converter para RGB
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return { r, g, b }
  }
  
  // Se for rgb/rgba, extrair valores
  const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    }
  }
  
  // Fallback para ciano
  return { r: 0, g: 229, b: 255 }
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
      if (!ctx) return
    } catch (error) {
      console.error('Error getting canvas context:', error)
      return
    }
    
    // Obter cores das variáveis CSS
    const matrixColor = getCSSColorRGB('--matrix-green')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Optimize for mobile and low-end devices
    const isMobile = window.innerWidth < 768
    const isLowEnd = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4
    const fontSize = isMobile ? 16 : 18
    // Reduzir colunas para melhor performance
    const columnMultiplier = isMobile ? 0.4 : (isLowEnd ? 0.6 : 0.8)
    const columns = Math.floor((canvas.width / fontSize) * columnMultiplier)
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100
    }

    const chars = '0123456789012345678901234567890123456789'
    const draw = () => {
      if (!ctx) return
      
      try {
        // Background fade effect
        ctx.fillStyle = 'rgba(10, 10, 13, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = `${fontSize}px monospace`
      } catch (error) {
        console.error('Error in MatrixRain draw:', error)
        return
      }

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        // Ajustar posição X baseado no multiplicador de colunas
        const x = (i * fontSize) / columnMultiplier
        const y = drops[i] * fontSize

        // Gradient effect - brighter at top, fading as it falls
        const progress = (y / canvas.height)
        const opacity = Math.max(0.1, (1 - progress) * 0.6 + 0.2)
        ctx.fillStyle = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, ${opacity})`
        
        // Add text shadow for glow
        ctx.shadowBlur = 3
        ctx.shadowColor = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, 0.5)`
        ctx.fillText(text, x, y)
        ctx.shadowBlur = 0

        // Add extra glow effect for some characters
        if (Math.random() > 0.85) {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, 0.9)`
          ctx.fillText(text, x, y)
          ctx.shadowBlur = 0
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    // Usar requestAnimationFrame para melhor performance
    let lastTime = 0
    const targetFPS = isMobile ? 20 : (isLowEnd ? 30 : 40)
    const frameInterval = 1000 / targetFPS
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        draw()
        lastTime = currentTime
      }
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    // Debounce resize
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        // Recalcular colunas após resize
        const newIsMobile = window.innerWidth < 768
        const newFontSize = newIsMobile ? 14 : 16
        const newColumnMultiplier = newIsMobile ? 0.6 : 1
        const newColumns = Math.floor((canvas.width / newFontSize) * newColumnMultiplier)
        // Ajustar drops array
        while (drops.length < newColumns) {
          drops.push(Math.random() * -100)
        }
        while (drops.length > newColumns) {
          drops.pop()
        }
      }, 150)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(resizeTimeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
    />
  )
}

