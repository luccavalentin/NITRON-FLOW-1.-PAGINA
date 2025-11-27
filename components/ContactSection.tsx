'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleExplosion from './ParticleExplosion'
import { sanitizeInput, isValidEmail, isValidPhone, RateLimiter } from '@/utils/security'

const formRateLimiter = new RateLimiter(5, 60000) // 5 tentativas por minuto

export default function ContactSection() {
  const [explosion, setExplosion] = useState<{ x: number; y: number } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Nome muito longo (máximo 100 caracteres)'
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validate phone (optional but if provided, must be valid)
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (formato brasileiro)'
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Mensagem muito longa (máximo 2000 caracteres)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    // Rate limiting check
    const clientId = typeof window !== 'undefined' ? window.location.hostname : 'unknown'
    if (!formRateLimiter.isAllowed(clientId)) {
      setSubmitError('Muitas tentativas. Aguarde um minuto antes de tentar novamente.')
      return
    }

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        message: sanitizeInput(formData.message),
      }

      // Simulate API call (replace with your actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here you would send to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sanitizedData),
      // })
      // if (!response.ok) throw new Error('Erro ao enviar mensagem')

      console.log('Form submitted (sanitized):', sanitizedData)

      // Success
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setErrors({})

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('Erro ao enviar mensagem. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Clear success message on form change
  useEffect(() => {
    if (submitSuccess && (formData.name || formData.email || formData.phone || formData.message)) {
      setSubmitSuccess(false)
    }
  }, [formData, submitSuccess])

  return (
    <section
      id="contato"
      className="section-padding bg-gradient-to-br from-charcoal via-black-deep to-charcoal relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-electric rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-neon rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 digital-noise opacity-30" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-h2 font-extrabold mb-4 md:mb-6">
              <span className="block text-cyan-neon mb-2 text-sm md:text-base font-semibold tracking-wider uppercase binary-code">
                CONTATO
              </span>
              <span className="block gradient-text holographic-text">
                Vamos conversar sobre seu projeto?
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-light-gray mb-8 md:mb-10 leading-relaxed">
              Estamos prontos para transformar sua empresa. Entre em contato e descubra como podemos ajudar você a alcançar seus objetivos.
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Email</h3>
                  <a href="mailto:contato@nitronflow.com.br" className="text-cyan-neon hover:text-cyan-neon/80 transition-colors text-sm md:text-base">
                    contato@nitronflow.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">WhatsApp</h3>
                  <a
                    href="https://wa.me/5519988300645?text=Ol%C3%A1%20NITRON%20FLOW!%20Quero%20falar%20sobre%20meu%20projeto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-neon hover:text-cyan-neon/80 transition-colors text-sm md:text-base"
                  >
                    +55 (19) 98830-0645
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-black-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1 text-text-primary">Localização</h3>
                  <p className="text-light-gray text-sm md:text-base">São Paulo, Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="card-frost space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-gray mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg text-text-primary placeholder-light-gray/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-cyan-neon focus:ring-cyan-neon/20'
                  }`}
                  placeholder="Seu nome"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light-gray mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  autoComplete="email"
                  className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg text-text-primary placeholder-light-gray/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-cyan-neon focus:ring-cyan-neon/20'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-light-gray mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  autoComplete="tel"
                  className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg text-text-primary placeholder-light-gray/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-cyan-neon focus:ring-cyan-neon/20'
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-light-gray mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={2000}
                  className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg text-text-primary placeholder-light-gray/50 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-cyan-neon focus:ring-cyan-neon/20'
                  }`}
                  placeholder="Conte-nos sobre seu projeto..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-sm text-red-400">{errors.message}</p>
                  ) : (
                    <div />
                  )}
                  <p className="text-xs text-light-gray/60">
                    {formData.message.length}/2000
                  </p>
                </div>
              </div>

              {submitSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base md:text-lg px-8 py-4 font-bold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setExplosion({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
                  setTimeout(() => setExplosion(null), 1000)
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensagem'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon to-blue-electric opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Particle Explosion */}
      {explosion && (
        <ParticleExplosion
          x={explosion.x}
          y={explosion.y}
          onComplete={() => setExplosion(null)}
        />
      )}
    </section>
  )
}

