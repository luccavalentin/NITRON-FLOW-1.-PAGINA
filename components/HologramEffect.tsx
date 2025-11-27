'use client'

import { useEffect, useRef } from 'react'

// Helper para obter cor RGB de variável CSS
const getCSSColorRGB = (cssVar: string): { r: number; g: number; b: number } => {
  if (typeof window === 'undefined') return { r: 0, g: 229, b: 255 }
  
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
  
  // Fallback
  return { r: 0, g: 229, b: 255 }
}

export default function HologramEffect() {
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    
    // Debounce resize
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    window.addEventListener('resize', handleResize)

    // Adjust grid size for mobile
    const isMobile = window.innerWidth < 768
    const gridSize = isMobile ? 50 : 50 // Aumentar em mobile para melhor performance
    // Obter cor da variável CSS
    const matrixColor = getCSSColorRGB('--matrix-green')
    
    let time = 0
    let animationFrame: number
    let lastTime = 0
    const targetFPS = isMobile ? 20 : 30
    const frameInterval = 1000 / targetFPS

    const draw = () => {
      if (!ctx) return
      
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.01
      } catch (error) {
        console.error('Error in HologramEffect draw:', error)
        return
      }

      // Draw grid with holographic effect
      ctx.strokeStyle = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, ${0.1 + Math.sin(time) * 0.05})`
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw scanline effect - apenas em desktop para melhor performance
      if (!isMobile) {
        const scanlineY = (canvas.height / 2 + Math.sin(time * 2) * 100) % canvas.height
        const gradient = ctx.createLinearGradient(0, scanlineY - 50, 0, scanlineY + 50)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.5, `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, 0.2)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, scanlineY - 50, canvas.width, 100)
      }
    }

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        draw()
        lastTime = currentTime
      }
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  )
}

