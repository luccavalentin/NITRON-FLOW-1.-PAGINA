import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'NITRON FLOW — Cresça. Automatize. Prospere.',
  description: 'Soluções de tecnologia, automação e estratégia para fazer sua empresa faturar mais, gastar menos e escalar com inteligência.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'NITRON FLOW — Cresça. Automatize. Prospere.',
    description: 'Soluções de tecnologia, automação e estratégia para fazer sua empresa faturar mais, gastar menos e escalar com inteligência.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['tecnologia', 'automação', 'marketing digital', 'sistemas', 'IA', 'NITRON FLOW'],
  authors: [{ name: 'NITRON FLOW' }],
  creator: 'NITRON FLOW',
  publisher: 'NITRON FLOW',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0A0A0D" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}

