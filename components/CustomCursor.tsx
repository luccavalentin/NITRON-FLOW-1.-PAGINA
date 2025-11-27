'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorFollowerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = cursorFollowerRef.current
    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
      
      startAnimation()
    }

    let animationFrame: number
    let isAnimating = false
    
    const animate = () => {
      const dx = mouseX - followerX
      const dy = mouseY - followerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Parar animação se estiver muito próximo (economiza recursos)
      if (distance < 0.5) {
        isAnimating = false
        return
      }
      
      followerX += dx * 0.1
      followerY += dy * 0.1

      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`

      if (isAnimating) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
      follower.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
      follower.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, var(--matrix-green) 0%, color-mix(in srgb, var(--blue-electric) 80%, transparent) 50%, transparent 100%)`,
          borderRadius: '50%',
          boxShadow: 'var(--glow-matrix), 0 0 40px color-mix(in srgb, var(--blue-electric) 60%, transparent)',
        }}
      />
      <div
        ref={cursorFollowerRef}
        className="fixed w-12 h-12 pointer-events-none z-[9998] transition-opacity duration-300 hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          border: '2px solid color-mix(in srgb, var(--matrix-green) 40%, transparent)',
          borderRadius: '50%',
          boxShadow: '0 0 30px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
        }}
      />
    </>
  )
}

