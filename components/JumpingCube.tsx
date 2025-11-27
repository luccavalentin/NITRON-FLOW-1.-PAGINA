'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface JumpingCubeProps {
  text: string
  className?: string
}

export default function JumpingCube({ text, className = '' }: JumpingCubeProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const [letterPositions, setLetterPositions] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [hasEntered, setHasEntered] = useState(false) // Controla se o cubo já entrou na tela
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 }) // Posição final do texto
  const [cubePosition, setCubePosition] = useState({ x: 0, y: 0 }) // Posição atual do cubo

  useEffect(() => {
    if (!containerRef.current) return

    const calculatePositions = () => {
      const textElement = containerRef.current
      if (!textElement) return

      const positions: number[] = []
      const textContent = text
      
      // Create a temporary span to measure letter positions accurately
      const tempSpan = document.createElement('span')
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.whiteSpace = 'nowrap'
      tempSpan.style.fontSize = window.getComputedStyle(textElement).fontSize
      tempSpan.style.fontWeight = window.getComputedStyle(textElement).fontWeight
      tempSpan.style.fontFamily = window.getComputedStyle(textElement).fontFamily
      tempSpan.style.letterSpacing = window.getComputedStyle(textElement).letterSpacing
      tempSpan.style.padding = '0'
      tempSpan.style.margin = '0'
      
      document.body.appendChild(tempSpan)

      // Calculate position for each character
      for (let i = 0; i < textContent.length; i++) {
        tempSpan.textContent = textContent.slice(0, i + 1)
        const width = tempSpan.offsetWidth
        
        // Get width of just this character
        if (i > 0) {
          tempSpan.textContent = textContent.slice(0, i)
          const prevWidth = tempSpan.offsetWidth
          const charWidth = width - prevWidth
          positions.push(prevWidth + charWidth / 2)
        } else {
          tempSpan.textContent = textContent[0]
          const charWidth = tempSpan.offsetWidth
          positions.push(charWidth / 2)
        }
      }

      document.body.removeChild(tempSpan)
      setLetterPositions(positions)
      
      // Calcular posição final do texto
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setTargetPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 80
        })
      }
      
      setIsReady(true)
    }

    // Wait for next frame to ensure text is rendered
    const timeout = setTimeout(calculatePositions, 100)
    
    // Recalculate on resize
    window.addEventListener('resize', calculatePositions)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', calculatePositions)
    }
  }, [text])

  const currentPosition = letterPositions[currentIndex] || 0

  // Atualizar posição do cubo quando currentIndex muda
  useEffect(() => {
    if (!hasEntered || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setCubePosition({
      x: rect.left + currentPosition,
      y: rect.top - 80
    })
  }, [hasEntered, currentIndex, currentPosition])

  useEffect(() => {
    if (!isReady || letterPositions.length === 0) return

    // Primeiro: animação de entrada do canto (seta)
    const enterTimeout = setTimeout(() => {
      setHasEntered(true)
      
      // Depois de entrar, começar a quicar sobre as letras
      // Começar da primeira letra (esquerda) e ir para a última (direita)
      setCurrentIndex(0)

      // Animate through letters - da esquerda para direita
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= letterPositions.length - 1) {
            return 0 // Reset to start (esquerda)
          }
          return prev + 1 // Incrementar (esquerda -> direita)
        })
      }, 600) // Velocidade mais lenta para quicar (ms por letra)

      return () => clearInterval(interval)
    }, 2000) // Delay para animação de entrada (mais tempo para ver a seta)

    return () => {
      clearTimeout(enterTimeout)
    }
  }, [isReady, letterPositions.length])
  const cubeSize = 80 // Tamanho do cubo (5x maior)

  // Separar "Valens" e "Tech" para aplicar estilos diferentes
  const isNitronFlow = text === 'NITRON FLOW'
  const nitronPart = isNitronFlow ? 'NITRON' : ''
  const flowPart = isNitronFlow ? ' FLOW' : text

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {isNitronFlow ? (
        <>
          <span className="text-white">{nitronPart}</span>
          <span className="bg-gradient-to-r from-cyan-neon via-blue-electric to-cyan-neon bg-clip-text text-transparent neon-glow-text">{flowPart}</span>
        </>
      ) : (
        text
      )}
      {isReady && letterPositions.length > 0 && (
        <motion.div
          ref={cubeRef}
          className="fixed"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            zIndex: 50,
          }}
          initial={!hasEntered ? {
            x: -150,
            y: typeof window !== 'undefined' ? window.innerHeight - 100 : 800,
            scale: 0.3,
            rotateY: 0,
          } : false}
          animate={
            hasEntered
              ? {
                  // Após entrar, quicar sobre as letras
                  x: cubePosition.x,
                  y: [cubePosition.y, cubePosition.y - 8, cubePosition.y], // Pulinhos pequenos (quicar)
                  rotateX: [0, 10, 0],
                  rotateY: [0, 360],
                  scale: [1, 1.05, 1], // Escala menor para quicar
                }
              : {
                  // Animação de entrada em forma de seta (movimento da esquerda para direita)
                  x: [
                    -150,
                    typeof window !== 'undefined' ? window.innerWidth * 0.2 : 400,
                    typeof window !== 'undefined' ? window.innerWidth * 0.4 : 800,
                    typeof window !== 'undefined' ? window.innerWidth * 0.6 : 1200,
                    typeof window !== 'undefined' ? window.innerWidth * 0.8 : 1600,
                    targetPosition.x || 0
                  ],
                  y: [
                    typeof window !== 'undefined' ? window.innerHeight - 100 : 800,
                    typeof window !== 'undefined' ? window.innerHeight * 0.7 : 560,
                    typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400,
                    typeof window !== 'undefined' ? window.innerHeight * 0.3 : 240,
                    typeof window !== 'undefined' ? window.innerHeight * 0.2 : 160,
                    targetPosition.y || 0
                  ],
                  rotateY: [0, 90, 180, 270, 360],
                  scale: [0.3, 0.5, 0.7, 0.85, 0.95, 1],
                }
          }
          transition={
            hasEntered
              ? {
                  x: {
                    duration: 0.6,
                    ease: 'easeInOut',
                  },
                  y: {
                    duration: 0.6, // Duração do quicar (mais lento)
                    ease: [0.34, 1.56, 0.64, 1],
                    repeat: Infinity,
                  },
                  rotateX: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                    repeat: Infinity,
                  },
                  rotateY: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                    repeat: Infinity,
                  },
                }
              : {
                  // Animação de entrada em seta (movimento da esquerda para direita)
                  duration: 4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }
          }
        >
          {/* 3D Cube Wireframe Style - Inspirado no portfólio */}
          <div 
            className="relative"
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transformStyle: 'preserve-3d',
              animation: 'cube-rotate 3s infinite linear',
            }}
          >
            {/* Front-Left Face - WhatsApp Business e Automações */}
            <div
              className="absolute flex flex-col items-start justify-start p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `translateZ(${cubeSize / 2}px)`,
                border: '2px solid #00E5FF',
                background: 'rgba(0, 229, 255, 0.1)',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.2)',
              }}
            >
              <div className="flex items-start justify-between w-full mb-1">
                <div className="flex flex-col">
                  <div className="text-[10px] text-cyan-neon mb-0.5">💬</div>
                  <div className="text-[7px] text-cyan-neon/90 font-bold">WhatsApp Business</div>
                  <div className="text-[6px] text-cyan-neon/70">Automação completa</div>
                </div>
                <div className="flex flex-col items-end" style={{ transform: 'scaleX(-1)' }}>
                  <div className="text-[10px] text-cyan-neon mb-0.5">🤖</div>
                  <div className="text-[7px] text-cyan-neon/90 font-bold">Automações</div>
                  <div className="text-[6px] text-cyan-neon/70">Processos inteligentes</div>
                </div>
              </div>
              <div className="text-[6px] text-cyan-neon/50 absolute top-1 right-1">1001</div>
            </div>
            {/* Back face - NITRON FLOW */}
            <div
              className="absolute flex flex-col items-center justify-center p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `translateZ(-${cubeSize / 2}px) rotateY(180deg)`,
                border: '2px solid #0066FF',
                background: 'rgba(0, 102, 255, 0.1)',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.8), inset 0 0 20px rgba(0, 102, 255, 0.2)',
              }}
            >
              <div className="text-[10px] text-blue-electric font-bold mb-1">NITRON FLOW</div>
              <div className="text-[7px] text-blue-electric/80">0011 0101</div>
            </div>
            {/* Front-Right Face - Sistemas SaaS e Sites Profissionais */}
            <div
              className="absolute flex flex-col items-start justify-start p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
                border: '2px solid #00E5FF',
                background: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
              }}
            >
              <div className="flex items-start justify-between w-full mb-1">
                <div className="flex flex-col items-end" style={{ transform: 'scaleX(-1)' }}>
                  <div className="text-[7px] text-cyan-neon/90 font-bold mb-0.5">Sites Profissionais</div>
                  <div className="text-[6px] text-cyan-neon/70">Websites modernos</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] text-cyan-neon mb-0.5">🌐📊</div>
                  <div className="text-[7px] text-cyan-neon/90 font-bold">Sistemas SaaS</div>
                  <div className="text-[6px] text-cyan-neon/70">Soluções personalizadas</div>
                </div>
              </div>
              <div className="text-[6px] text-cyan-neon/50 absolute top-1 left-1">0011</div>
            </div>
            {/* Left face - Com conteúdo original */}
            <div
              className="absolute flex flex-col items-start justify-start p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
                border: '2px solid #00E5FF',
                background: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
              }}
            >
              <div className="text-[10px] text-cyan-neon mb-1">👨‍💻</div>
              <div className="text-[8px] text-cyan-neon/80 mb-1">Desenvolvimento</div>
              <div className="text-[8px] text-cyan-neon font-bold">Tech</div>
            </div>
            {/* Top face - Com conteúdo original */}
            <div
              className="absolute flex items-center justify-center p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
                border: '2px solid #00E5FF',
                background: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
              }}
            >
              <div className="text-[9px] text-cyan-neon font-bold text-center">NITRON FLOW</div>
            </div>
            {/* Bottom face - Tráfego Pago */}
            <div
              className="absolute flex flex-col items-center justify-center p-2"
              style={{
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
                transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
                border: '2px solid #00E5FF',
                background: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
              }}
            >
              <div className="text-[10px] text-cyan-neon mb-1">⚡</div>
              <div className="text-[7px] text-cyan-neon font-bold" style={{ transform: 'scaleX(-1)' }}>
                Tráfego Pago
              </div>
              <div className="text-[6px] text-cyan-neon/50 absolute bottom-1 right-1">1010</div>
            </div>
          </div>
        </motion.div>
      )}
    </span>
  )
}

