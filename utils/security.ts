/**
 * Security utilities for input validation and sanitization
 */

/**
 * Validates if a URL is safe to use in iframes
 */
export function isValidUrl(url: string): boolean {
  if (!url || url === '#' || url.trim() === '') {
    return false
  }

  if (typeof window === 'undefined') {
    return false
  }

  try {
    const urlObj = new URL(url, window.location.origin)
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }

    // Block javascript: and data: URLs
    if (urlObj.protocol === 'javascript:' || urlObj.protocol === 'data:') {
      return false
    }

    // Additional security: check for suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i,
      /<script/i,
    ]

    if (suspiciousPatterns.some(pattern => pattern.test(url))) {
      return false
    }

    return true
  } catch {
    return false
  }
}

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  // Remove potentially dangerous characters and patterns
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates phone number (Brazilian format)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '')
  
  // Brazilian phone: 10 or 11 digits (with or without area code)
  return digitsOnly.length >= 10 && digitsOnly.length <= 11
}

/**
 * Rate limiting helper (client-side)
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false
    }
    
    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

/**
 * Creates a safe iframe sandbox attribute
 */
export function getSafeIframeSandbox(): string {
  return 'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
}

