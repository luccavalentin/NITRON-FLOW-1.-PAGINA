'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry, LogRocket)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // You can add error reporting here
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Only log in production
      try {
        // Example: Send to error tracking service
        // errorTrackingService.logError(error, errorInfo)
      } catch (e) {
        // Silently fail if error tracking fails
      }
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-black-deep p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-charcoal border-2 border-cyan-neon rounded-lg p-8 text-center"
            style={{
              boxShadow: 'var(--glow-matrix)',
            }}
          >
            <div className="mb-6">
              <i className="fas fa-exclamation-triangle text-cyan-neon text-5xl mb-4"></i>
              <h2 className="text-2xl font-bold text-cyan-neon mb-2">Ops! Algo deu errado</h2>
              <p className="text-light-gray">
                Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
              </p>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-cyan-neon cursor-pointer mb-2">Detalhes do erro (dev)</summary>
                <pre className="text-xs text-light-gray bg-black-deep p-4 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-cyan-neon text-black-deep font-semibold rounded-lg hover:bg-cyan-neon/80 transition-all duration-300 active:scale-95"
                style={{
                  boxShadow: 'var(--glow-matrix)',
                }}
              >
                Recarregar Página
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/'
                  }
                }}
                className="px-6 py-3 border-2 border-cyan-neon text-cyan-neon font-semibold rounded-lg hover:bg-cyan-neon/10 transition-all duration-300 active:scale-95"
              >
                Ir para Home
              </button>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

