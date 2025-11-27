'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ControllerRef } from './Controller'

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  controllerRef?: React.RefObject<ControllerRef>
}

export default function TypingEffect({ text, speed = 80, className = '', onComplete, controllerRef }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        
        // Pressionar botão do controle (exatamente como original)
        const buttonIndex = currentIndex % 4
        if (controllerRef?.current) {
          controllerRef.current.pressButton(buttonIndex)
        }
        
        // Disparar evento para empurrar o cubo
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('typing-character'))
        }
        
        currentIndex++
        
        // Velocidade balanceada - nem muito rápida nem muito lenta (exatamente como original)
        const delay = text.charAt(currentIndex - 1) === ' ' ? 50 : speed
        setTimeout(typeNextCharacter, delay)
      } else {
        setIsComplete(true)
        if (onComplete) {
          setTimeout(onComplete, 500)
        }
      }
    }

    // Delay inicial como no original
    const timer = setTimeout(typeNextCharacter, 500)
    
    return () => clearTimeout(timer)
  }, [text, speed, onComplete, controllerRef])

  // Separar Nitron e Flow para aplicar cores diferentes
  const parts = displayedText.split(' ')
  const nitronPart = parts[0] || ''
  const flowPart = parts[1] || ''
  const hasSpace = displayedText.includes(' ')

  return (
    <span className={className}>
      <span className="text-white font-extrabold">{nitronPart}</span>
      {hasSpace && ' '}
      {flowPart && (
        <span className="bg-gradient-to-r from-cyan-neon via-blue-electric to-cyan-neon bg-clip-text text-transparent font-extrabold neon-glow-text">
          {flowPart}
        </span>
      )}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 ml-1 typing-cursor"
          style={{
            background: 'var(--matrix-green)',
            verticalAlign: 'middle',
          }}
        />
      )}
    </span>
  )
}

