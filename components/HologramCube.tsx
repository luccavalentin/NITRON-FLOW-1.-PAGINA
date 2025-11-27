'use client'

import { useEffect, useState, useRef } from 'react'

export default function HologramCube() {
  const [cubeSize, setCubeSize] = useState(400)
  const [translateZ, setTranslateZ] = useState(200)
  const cubeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Adicionar keyframes CSS exatamente como no original
    if (!document.getElementById('hologram-cube-keyframes')) {
      const style = document.createElement('style')
      style.id = 'hologram-cube-keyframes'
      style.textContent = `
        @keyframes rotate {
          0% {
            transform: rotateY(0) rotateX(10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }
        @keyframes cube-bounce {
          0% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(8px);
          }
          30% {
            transform: translateX(-6px);
          }
          45% {
            transform: translateX(4px);
          }
          60% {
            transform: translateX(-3px);
          }
          75% {
            transform: translateX(2px);
          }
          90% {
            transform: translateX(-1px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `
      document.head.appendChild(style)
    }

    // Escutar eventos de digitação - efeito de quicar
    const handleTyping = () => {
      if (cubeContainerRef.current) {
        // Aplicar o quique no container, mantendo a rotação no cubo interno
        cubeContainerRef.current.style.animation = 'none'
        void cubeContainerRef.current.offsetWidth // Force reflow
        cubeContainerRef.current.style.animation = 'cube-bounce 0.6s ease-out'
        setTimeout(() => {
          if (cubeContainerRef.current) {
            cubeContainerRef.current.style.animation = 'none'
          }
        }, 600)
      }
    }

    window.addEventListener('typing-character', handleTyping)
    return () => window.removeEventListener('typing-character', handleTyping)
  }, [])

  // Responsividade otimizada
  const updateSize = () => {
    const width = window.innerWidth
    if (width <= 480) {
      setCubeSize(180)
      setTranslateZ(90)
    } else if (width <= 640) {
      setCubeSize(200)
      setTranslateZ(100)
    } else if (width <= 768) {
      setCubeSize(220)
      setTranslateZ(110)
    } else if (width <= 992) {
      setCubeSize(260)
      setTranslateZ(130)
    } else if (width <= 1200) {
      setCubeSize(320)
      setTranslateZ(160)
    } else {
      setCubeSize(370)
      setTranslateZ(185)
    }
  }

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div
      ref={cubeContainerRef}
      className="hologram-container"
      style={{
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        position: 'relative',
        perspective: '1000px',
      }}
    >
      <div
        className="hologram"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: 'rotate 15s infinite linear',
          willChange: 'transform',
        }}
      >
        {/* Face 1 - Front */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateY(0deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-globe" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              Sites Profissionais
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Websites modernos</p>
          </div>
        </div>

        {/* Face 2 - Right */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateY(90deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-robot" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              Automações
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Processos inteligentes</p>
          </div>
        </div>

        {/* Face 3 - Back */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateY(180deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-comments" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              WhatsApp Business
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Automação completa</p>
          </div>
        </div>

        {/* Face 4 - Left */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateY(270deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-layer-group" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              Sistemas SaaS
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Soluções personalizadas</p>
          </div>
        </div>

        {/* Face 5 - Top */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateX(90deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-instagram" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              Redes Sociais
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Repaginação completa</p>
          </div>
        </div>

        {/* Face 6 - Bottom */}
        <div
          className="hologram-face"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            border: '2px solid var(--matrix-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 50px color-mix(in srgb, var(--matrix-green) 20%, transparent), 0 0 50px color-mix(in srgb, var(--matrix-green) 30%, transparent)',
            transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
          }}
        >
          <div
            className="hologram-content"
            style={{
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            <i className="fas fa-chart-line" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--matrix-green)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--matrix-green)', fontWeight: 'bold' }}>
              Tráfego Pago
            </h3>
            <p style={{ color: 'var(--matrix-green)', opacity: 0.8 }}>Marketing digital</p>
          </div>
        </div>
      </div>
    </div>
  )
}
