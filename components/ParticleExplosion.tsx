'use client'

import { useEffect, useRef } from 'react'

interface ParticleExplosionProps {
  x: number
  y: number
  color?: string
  onComplete?: () => void
}

export default function ParticleExplosion({ x, y, color, onComplete }: ParticleExplosionProps) {
  // Se não fornecer cor, usar variável CSS
  const defaultColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--matrix-green').trim() || '#00E5FF'
    : '#00E5FF'
  const particleColor = color || defaultColor
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
    }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        size: Math.random() * 3 + 1,
      })
    }

    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98
        particle.vy *= 0.98
        particle.life -= 0.02

        if (particle.life > 0) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `${color}${Math.floor(particle.life * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        } else {
          particles.splice(index, 1)
        }
      })

      if (particles.length > 0) {
        animationFrame = requestAnimationFrame(animate)
      } else if (onComplete) {
        onComplete()
      }
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [x, y, color, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  )
}

