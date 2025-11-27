/**
 * Additional validation utilities
 */

/**
 * Validates and sanitizes HTML content
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''
  
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .trim()
}

/**
 * Validates string length
 */
export function isValidLength(str: string, min: number, max: number): boolean {
  if (!str) return min === 0
  return str.length >= min && str.length <= max
}

/**
 * Validates if string contains only safe characters
 */
export function containsOnlySafeChars(str: string): boolean {
  // Allow letters, numbers, spaces, and common punctuation
  const safePattern = /^[a-zA-Z0-9\s.,!?@#$%&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  return safePattern.test(str)
}

/**
 * Validates URL format (strict)
 */
export function isValidUrlStrict(url: string): boolean {
  if (!url || url.trim() === '') return false
  
  try {
    const urlObj = new URL(url)
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // Block localhost and private IPs in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = urlObj.hostname.toLowerCase()
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')
      ) {
        return false
      }
    }
    
    return true
  } catch {
    return false
  }
}

