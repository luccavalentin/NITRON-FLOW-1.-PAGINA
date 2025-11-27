'use client'

import { useEffect } from 'react'

export default function MobileOptimizations() {
  useEffect(() => {
    // Detectar mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768
    
    if (!isMobile) return

    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false })

    // Smooth scroll behavior
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth'
    }

    // Otimizar scroll performance
    let ticking = false
    const optimizeScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Scroll otimizado
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', optimizeScroll, { passive: true })

    // Prevenir pull-to-refresh em mobile
    let touchStartY = 0
    const preventPullToRefresh = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0].clientY > touchStartY) {
        e.preventDefault()
      }
    }
    document.addEventListener('touchstart', preventPullToRefresh, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchend', preventDoubleTapZoom)
      window.removeEventListener('scroll', optimizeScroll)
      document.removeEventListener('touchstart', preventPullToRefresh)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}

