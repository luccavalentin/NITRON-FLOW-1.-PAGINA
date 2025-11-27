'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

export interface ControllerRef {
  pressButton: (buttonIndex: number) => void
}

const Controller = forwardRef<ControllerRef>((props, ref) => {
  const buttonARef = useRef<HTMLDivElement>(null)
  const buttonBRef = useRef<HTMLDivElement>(null)
  const buttonXRef = useRef<HTMLDivElement>(null)
  const buttonYRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Adicionar keyframes CSS se não existir
    if (!document.getElementById('button-press-keyframes')) {
      const style = document.createElement('style')
      style.id = 'button-press-keyframes'
      style.textContent = `
        @keyframes button-press {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  const pressButton = (buttonIndex: number) => {
    const buttons = [buttonARef, buttonBRef, buttonXRef, buttonYRef]
    const button = buttons[buttonIndex]?.current
    
    if (button) {
      button.style.animation = 'none'
      void button.offsetWidth // Force reflow
      button.style.animation = 'button-press 0.2s ease-out'
    }
  }

  useImperativeHandle(ref, () => ({
    pressButton,
  }))

  return (
    <div
      className="controller-animation"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '20px',
        position: 'relative',
        top: '-5px',
      }}
    >
      <div
        className="controller"
        style={{
          width: '60px',
          height: '40px',
          position: 'relative',
        }}
      >
        <div
          className="controller-body"
          style={{
            width: '100%',
            height: '100%',
            background: 'color-mix(in srgb, var(--matrix-green) 10%, transparent)',
            borderRadius: '10px',
            border: '2px solid var(--matrix-green)',
            position: 'relative',
            boxShadow: 'var(--glow-matrix)',
          }}
        >
          <div
            ref={buttonARef}
            className="controller-button controller-a"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--matrix-green)',
              boxShadow: 'var(--glow-matrix)',
              opacity: 0,
              top: '8px',
              right: '8px',
            }}
          />
          <div
            ref={buttonBRef}
            className="controller-button controller-b"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--matrix-green)',
              boxShadow: 'var(--glow-matrix)',
              opacity: 0,
              top: '8px',
              right: '25px',
            }}
          />
          <div
            ref={buttonXRef}
            className="controller-button controller-x"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--matrix-green)',
              boxShadow: 'var(--glow-matrix)',
              opacity: 0,
              top: '22px',
              right: '8px',
            }}
          />
          <div
            ref={buttonYRef}
            className="controller-button controller-y"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--matrix-green)',
              boxShadow: 'var(--glow-matrix)',
              opacity: 0,
              top: '22px',
              right: '25px',
            }}
          />
        </div>
      </div>
    </div>
  )
})

Controller.displayName = 'Controller'

export default Controller
