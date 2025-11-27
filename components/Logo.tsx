'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeMap = {
    sm: { logo: 24, text: 'text-lg' },
    md: { logo: 32, text: 'text-xl sm:text-2xl' },
    lg: { logo: 48, text: 'text-2xl sm:text-3xl md:text-4xl' },
  }

  const { logo: logoSize, text: textSize } = sizeMap[size]

  return (
    <motion.div
      className={`flex items-center gap-2 sm:gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Logo - Raio/Energia */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width={logoSize}
          height={logoSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
        >
          {/* Raio principal */}
          <motion.path
            d="M50 10 L35 50 L50 50 L30 90 L65 50 L50 50 Z"
            fill="url(#lightning-gradient)"
            stroke="url(#lightning-stroke)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          
          {/* Partículas de energia */}
          <motion.circle
            cx="35"
            cy="30"
            r="3"
            fill="var(--cyan-neon)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          <motion.circle
            cx="65"
            cy="70"
            r="2.5"
            fill="var(--blue-electric)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
          />
          <motion.circle
            cx="25"
            cy="75"
            r="2"
            fill="var(--cyan-neon)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 1.5,
            }}
          />
          
          {/* Gradientes */}
          <defs>
            <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cyan-neon)" stopOpacity="1" />
              <stop offset="50%" stopColor="var(--blue-electric)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--cyan-neon)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="lightning-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cyan-neon)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--blue-electric)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Brilho ao redor do logo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md opacity-30"
          style={{
            background: 'radial-gradient(circle, var(--cyan-neon) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Texto do nome */}
      {showText && (
        <motion.div
          className={`font-bold ${textSize} relative`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="gradient-text neon-glow-text relative inline-block">
            <span className="text-white font-extrabold">Nitron</span>
            <span className="bg-gradient-to-r from-cyan-neon via-blue-electric to-cyan-neon bg-clip-text text-transparent font-extrabold ml-1">
              Flow
            </span>
          </span>
          
          {/* Efeito de brilho no texto */}
          <motion.span
            className="absolute inset-0 gradient-text opacity-30 blur-md pointer-events-none"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-white font-extrabold">Nitron</span>
            <span className="bg-gradient-to-r from-cyan-neon via-blue-electric to-cyan-neon bg-clip-text text-transparent font-extrabold ml-1">
              Flow
            </span>
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}

