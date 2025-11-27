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
  
  // Fallback
  return { r: 0, g: 229, b: 255 }
}

export default function Particles() {
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

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    
    // Debounce resize para melhor performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    window.addEventListener('resize', handleResize)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Reduce particles for better performance
    const isMobile = window.innerWidth < 768
    const isLowEnd = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4
    const particleCount = isMobile ? 15 : (isLowEnd ? 30 : 40)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    // Só adicionar mouse move em desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX = e.clientX
        mouseY = e.clientY
      }
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Obter cores das variáveis CSS
    const matrixColor = getCSSColorRGB('--matrix-green')
    const blueColor = getCSSColorRGB('--blue-electric')
    
    // Throttle para melhor performance
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS
    
    let animationFrame: number
    const animate = (currentTime: number) => {
      if (!ctx) return
      
      // Throttle FPS
      if (currentTime - lastTime < frameInterval) {
        animationFrame = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime
      
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.error('Error in Particles animate:', error)
        return
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Repel from mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.02
          particle.vy -= (dy / distance) * force * 0.02
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        )
        gradient.addColorStop(0, `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(${blueColor.r}, ${blueColor.g}, ${blueColor.b}, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, ${particle.opacity + 0.3})`
        ctx.fill()

        // Draw connections - reduzir para melhor performance
        if (!isMobile && !isLowEnd) {
          particles.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x
            const dy = particle.y - other.y
            const distanceSq = dx * dx + dy * dy // Usar distância ao quadrado para evitar sqrt

            if (distanceSq < 40000) { // 200^2 = 40000
              const distance = Math.sqrt(distanceSq)
              const opacity = 0.2 * (1 - distance / 200) // Reduzir opacidade
              ctx.strokeStyle = `rgba(${matrixColor.r}, ${matrixColor.g}, ${matrixColor.b}, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
            }
          })
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

