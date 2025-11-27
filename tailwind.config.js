/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-deep': '#0A0A0D',
        'charcoal': '#121217',
        'blue-electric': '#0066FF',
        'cyan-neon': '#00E5FF',
        'light-gray': '#BFC7D6',
        'silver': '#1C1E26',
        'text-primary': '#E6EEF8',
        'success': '#00D084',
        'warning': '#FFB020',
        'danger': '#FF4D4F',
        'green-neon': '#00FF88',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['44px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['30px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'small': ['14px', { lineHeight: '1.5' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
      },
      borderRadius: {
        'card': '12px',
        'card-sm': '8px',
        'button': '10px',
      },
      boxShadow: {
        'glow-primary': '0 8px 30px rgba(0,102,255,0.18)',
        'glow-hover': '0 12px 40px rgba(0,229,255,0.14)',
        'soft': '0 8px 30px rgba(0,102,255,0.12)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #0066FF 0%, #00E5FF 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

