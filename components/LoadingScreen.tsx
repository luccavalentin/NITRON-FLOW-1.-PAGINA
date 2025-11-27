'use client'

import { useEffect, useState, useRef } from 'react'
import Logo from './Logo'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [fragments, setFragments] = useState<Array<{ id: number; x: number; y: number; rotation: number; delay: number; tx: number; ty: number; rot: number }>>([])
  const [currentMessage, setCurrentMessage] = useState(0)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [progress, setProgress] = useState(0)
  const [terminalText, setTerminalText] = useState('')
  const matrixRainRef = useRef<HTMLDivElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const loadingBarRef = useRef<HTMLDivElement>(null)
  const loadingTextRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadingMessages = [
    'Inicializando sistema...',
    'Carregando módulos...',
    'Executando ambiente...',
  ]

  const terminalCommands = [
    {
      prompt: '>',
      command: 'system.init --company=valens_tech',
            output: 'Sistema NITRON FLOW inicializado com sucesso.',
    },
    {
      prompt: '>',
      command: 'load services --type=tech_solutions',
      output: 'Sites, Automações, Sistemas SaaS, Marketing Digital...',
    },
    {
      prompt: '>',
      command: 'deploy --environment=portfolio',
            output: 'Portfólio NITRON FLOW carregado. Seção ativa.',
    },
  ]

  // Criar Matrix Rain exatamente como o original
  useEffect(() => {
    if (!matrixRainRef.current) return

    const chars = '0123456789012345678901234567890123456789'
    const columns = Math.floor(window.innerWidth / 25)

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div')
      column.style.position = 'absolute'
      column.style.left = `${i * 25}px`
      column.style.top = '-100px'
      column.style.fontFamily = 'Courier New, monospace'
      column.style.fontSize = '14px'
      column.style.color = 'color-mix(in srgb, var(--matrix-green) 40%, transparent)'
      column.style.textShadow = `0 0 2px color-mix(in srgb, var(--matrix-green) 40%, transparent)`
      column.style.animation = `matrix-fall ${Math.random() * 3 + 3}s linear infinite`
      column.style.animationDelay = `${Math.random() * 1}s`

      let content = ''
      const length = Math.floor(Math.random() * 15) + 8
      for (let j = 0; j < length; j++) {
        content += chars[Math.floor(Math.random() * chars.length)] + '<br>'
      }

      column.textContent = ''
      // Create text nodes for each character to avoid XSS
      const lines = content.split('<br>')
      lines.forEach((line, idx) => {
        if (idx > 0) {
          column.appendChild(document.createElement('br'))
        }
        column.appendChild(document.createTextNode(line))
      })
      matrixRainRef.current.appendChild(column)
    }

    // Adicionar keyframes CSS se não existir
    if (!document.getElementById('matrix-fall-keyframes')) {
      const style = document.createElement('style')
      style.id = 'matrix-fall-keyframes'
      style.textContent = `
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          5% {
            opacity: 0.6;
          }
          95% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes tablet-slide-out {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        @keyframes glass-fragment {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.8);
            opacity: 0.7;
            filter: brightness(0.8);
          }
          100% {
            transform: translate(calc(var(--tx) * 2), calc(var(--ty) * 2)) rotate(calc(var(--rot) * 2)) scale(0.3);
            opacity: 0;
            filter: brightness(0.3);
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])


  // Atualizar loading (exatamente como original)
  useEffect(() => {
    if (currentMessage >= loadingMessages.length) {
      // Loading completo
      setTimeout(() => {
        if (terminalBodyRef.current) {
          const statusLine = document.createElement('div')
          statusLine.className = 'terminal-line'
          statusLine.style.marginBottom = '5px'
          statusLine.style.opacity = '0'
          statusLine.style.animation = 'fadeIn 0.3s forwards'
          // Safe DOM manipulation instead of innerHTML
          const promptSpan1 = document.createElement('span')
          promptSpan1.style.color = 'var(--matrix-green)'
          promptSpan1.textContent = '> '
          
          const commandSpan1 = document.createElement('span')
          commandSpan1.style.color = 'var(--matrix-green)'
          commandSpan1.textContent = 'status --system'
          
          const br1 = document.createElement('br')
          
          const outputSpan1 = document.createElement('span')
          outputSpan1.style.color = 'color-mix(in srgb, var(--matrix-green) 80%, white)'
          outputSpan1.textContent = 'Sistema pronto!'
          
          statusLine.appendChild(promptSpan1)
          statusLine.appendChild(commandSpan1)
          statusLine.appendChild(br1)
          statusLine.appendChild(outputSpan1)
          terminalBodyRef.current.appendChild(statusLine)

          const cursorLine = document.createElement('div')
          cursorLine.className = 'terminal-line'
          cursorLine.style.marginBottom = '5px'
          cursorLine.style.opacity = '0'
          cursorLine.style.animation = 'fadeIn 0.3s forwards'
          const promptSpan2 = document.createElement('span')
          promptSpan2.style.color = 'var(--matrix-green)'
          promptSpan2.textContent = '> '
          
          const cursorSpan = document.createElement('span')
          cursorSpan.className = 'terminal-cursor'
          cursorSpan.style.display = 'inline-block'
          cursorSpan.style.width = '8px'
          cursorSpan.style.height = '16px'
          cursorSpan.style.background = 'var(--matrix-green)'
          cursorSpan.style.animation = 'blink 0.8s infinite'
          cursorSpan.style.verticalAlign = 'middle'
          
          cursorLine.appendChild(promptSpan2)
          cursorLine.appendChild(cursorSpan)
          terminalBodyRef.current.appendChild(cursorLine)
        }

        setTimeout(() => {
          // Criar fragmentos de vidro quebrado
          const newFragments: Array<{ id: number; x: number; y: number; rotation: number; delay: number; tx: number; ty: number; rot: number }> = []
          const fragmentCount = 30
          
          for (let i = 0; i < fragmentCount; i++) {
            const tx = (Math.random() - 0.5) * 200 // Movimento horizontal aleatório
            const ty = (Math.random() - 0.5) * 200 // Movimento vertical aleatório
            const rotation = Math.random() * 360 // Rotação inicial
            const rot = rotation + (Math.random() - 0.5) * 180 // Rotação adicional
            
            newFragments.push({
              id: i,
              x: Math.random() * 100, // Posição X em porcentagem
              y: Math.random() * 100, // Posição Y em porcentagem
              rotation,
              delay: Math.random() * 0.2, // Delay aleatório para efeito cascata
              tx,
              ty,
              rot,
            })
          }
          
          setFragments(newFragments)
          setFadeOut(true)
          setTimeout(() => {
            setLoading(false)
          }, 500) // Aguardar animação de slide terminar (0.5s)
        }, 500)
      }, 500)
      return
    }

    // Atualizar progresso e mensagem
    const progressValue = ((currentMessage + 1) / loadingMessages.length) * 100
    setProgress(progressValue)
    
    if (loadingBarRef.current) {
      loadingBarRef.current.style.width = `${progressValue}%`
    }
    
    if (loadingTextRef.current) {
      loadingTextRef.current.textContent = loadingMessages[currentMessage]
    }

    // Adicionar comando ao terminal (exatamente como original)
    if (currentCommand < terminalCommands.length && terminalBodyRef.current) {
      const cmd = terminalCommands[currentCommand]
      
      const typeTerminalLine = (prompt: string, command: string, output: string, delay = 20) => {
        return new Promise<void>((resolve) => {
          const line = document.createElement('div')
          line.className = 'terminal-line'
          line.style.marginBottom = '5px'
          line.style.opacity = '0'
          line.style.animation = 'fadeIn 0.3s forwards'
          terminalBodyRef.current!.appendChild(line)

          let currentIndex = 0
          let currentText = ''

          const typeNextChar = () => {
            if (currentIndex < command.length) {
              currentText += command.charAt(currentIndex)
              // Use textContent for safety, then add styling via DOM manipulation
              const promptSpan = document.createElement('span')
              promptSpan.style.color = 'var(--matrix-green)'
              promptSpan.textContent = `${prompt} `
              
              const commandSpan = document.createElement('span')
              commandSpan.style.color = 'var(--matrix-green)'
              commandSpan.textContent = currentText
              
              line.innerHTML = ''
              line.appendChild(promptSpan)
              line.appendChild(commandSpan)
              
              currentIndex++
              setTimeout(typeNextChar, delay)
            } else {
              setTimeout(() => {
                if (output) {
                  const br = document.createElement('br')
                  const outputSpan = document.createElement('span')
                  outputSpan.style.color = 'color-mix(in srgb, var(--matrix-green) 80%, white)'
                  outputSpan.textContent = output
                  line.appendChild(br)
                  line.appendChild(outputSpan)
                }
                if (terminalBodyRef.current) {
                  terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
                }
                resolve()
              }, 100)
            }
          }

          typeNextChar()
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
          }
        })
      }

      typeTerminalLine(cmd.prompt, cmd.command, cmd.output).then(() => {
        setCurrentCommand((prev) => prev + 1)
      })
    }

    // Próxima mensagem após 800ms (exatamente como original)
    const timer = setTimeout(() => {
      setCurrentMessage((prev) => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [currentMessage, currentCommand])

  // Iniciar loading após 300ms (exatamente como original)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentMessage(0)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-black-deep flex flex-col items-center justify-center overflow-hidden ${fadeOut ? 'opacity-0 pointer-events-none' : ''}`}
      style={{
        transition: fadeOut ? 'opacity 0.2s ease-out' : 'none',
        animation: fadeOut ? 'tablet-slide-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
        willChange: fadeOut ? 'transform, opacity' : 'auto',
      }}
    >
      {/* Fragmentos de vidro quebrado */}
      {fragments.map((fragment) => {
        // Gerar clipPath único para cada fragmento
        const p1 = Math.random() * 30
        const p2 = Math.random() * 30
        const p3 = 70 + Math.random() * 30
        const p4 = Math.random() * 30
        const p5 = 70 + Math.random() * 30
        const p6 = 70 + Math.random() * 30
        const p7 = Math.random() * 30
        const p8 = 70 + Math.random() * 30
        
        return (
          <div
            key={fragment.id}
            className="absolute pointer-events-none z-[10000]"
            style={{
              left: `${fragment.x}%`,
              top: `${fragment.y}%`,
              width: '40px',
              height: '40px',
              background: `linear-gradient(135deg, color-mix(in srgb, var(--matrix-green) 30%, transparent) 0%, color-mix(in srgb, var(--blue-electric) 20%, transparent) 50%, transparent 100%)`,
              border: `2px solid color-mix(in srgb, var(--matrix-green) 50%, transparent)`,
              clipPath: `polygon(${p1}% ${p2}%, ${p3}% ${p4}%, ${p5}% ${p6}%, ${p7}% ${p8}%)`,
              transformOrigin: 'center center',
              animation: fadeOut ? `glass-fragment 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${fragment.delay}s forwards` : 'none',
              '--tx': `${fragment.tx}px`,
              '--ty': `${fragment.ty}px`,
              '--rot': `${fragment.rot}deg`,
              boxShadow: `0 0 10px color-mix(in srgb, var(--matrix-green) 50%, transparent), inset 0 0 10px color-mix(in srgb, var(--matrix-green) 20%, transparent)`,
            } as React.CSSProperties & { '--tx': string; '--ty': string; '--rot': string }}
          />
        )
      })}

      {/* Matrix Rain Background */}
      <div
        ref={matrixRainRef}
        className="absolute inset-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Code Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, transparent 49%, color-mix(in srgb, var(--matrix-green) 2%, transparent) 50%, transparent 51%),
            linear-gradient(180deg, transparent 49%, color-mix(in srgb, var(--matrix-green) 2%, transparent) 50%, transparent 51%)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.25,
          zIndex: 1,
        }}
      />

      {/* Loading Content */}
      <div
        className="relative z-10 text-center flex flex-col items-center justify-center w-full"
        style={{
          background: 'rgba(2, 8, 2, 0.7)',
          padding: '2rem',
          borderRadius: '10px',
          border: '1px solid var(--matrix-green)',
          boxShadow: 'var(--glow-matrix)',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        {/* Title */}
        <div className="mb-8 flex flex-col items-center gap-4" style={{ marginBottom: '2rem' }}>
          <Logo size="lg" showText={true} />
        </div>

        {/* Loading Bar */}
        <div
          className="mb-8"
          style={{
            width: '500px',
            height: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid var(--matrix-green)',
            position: 'relative',
          }}
        >
          <div
            ref={loadingBarRef}
            className="h-full relative"
            style={{
              height: '100%',
              background: 'var(--gradient-1)',
              width: '0%',
              transition: 'width 0.2s ease',
              position: 'relative',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                animation: 'loading-shimmer 0.8s infinite',
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p
          ref={loadingTextRef}
          className="mb-6"
          style={{
            color: 'var(--matrix-green)',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            fontFamily: 'Courier New, monospace',
            textShadow: 'var(--glow-matrix)',
          }}
        >
          Inicializando sistema...
        </p>

        {/* Terminal Window */}
        <div
          className="w-full"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid var(--matrix-green)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            height: '250px',
            overflow: 'hidden',
            marginTop: '1rem',
            boxShadow: 'var(--glow-matrix)',
          }}
        >
          {/* Terminal Header */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
              padding: '8px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--matrix-green)',
            }}
          >
            <div
              style={{
                color: 'var(--matrix-green)',
                fontWeight: 'bold',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.9rem',
              }}
            >
              system_init.exe
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28ca42' }} />
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 overflow-y-auto"
            style={{
              padding: '15px',
              height: 'calc(100% - 40px)',
              overflowY: 'auto',
              fontFamily: 'Courier New, monospace',
              color: 'var(--matrix-green)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              background: 'rgba(0, 0, 0, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Adicionar keyframes CSS */}
      <style jsx>{`
        @keyframes loading-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
