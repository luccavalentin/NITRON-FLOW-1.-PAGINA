'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LoadingScreen from '@/components/LoadingScreen'
import MobileOptimizations from '@/components/MobileOptimizations'

// Lazy load componentes pesados
const HeroCTA = dynamic(() => import('@/components/HeroCTA'), { ssr: false })
const FeatureBlock = dynamic(() => import('@/components/FeatureBlock'), { ssr: false })
const Stats = dynamic(() => import('@/components/Stats'), { ssr: false })
const About = dynamic(() => import('@/components/About'), { ssr: false })
const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false })
const CTAFinal = dynamic(() => import('@/components/CTAFinal'), { ssr: false })
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false })
const Scanlines = dynamic(() => import('@/components/Scanlines'), { ssr: false })

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Detectar desktop apenas no cliente para evitar hydration error
    setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 768)
    
    // Aguardar o loading screen terminar + animação de slide rápida
    // 300ms inicial + 3 mensagens x 800ms + 500ms final + 500ms delay + 500ms slide = ~3900ms
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 3900)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ErrorBoundary>
      {!showContent && <LoadingScreen />}
      <main 
        className={`min-h-screen relative overflow-hidden ${!showContent ? 'hidden' : ''}`}
        style={{
          animation: showContent ? 'fade-in 0.3s ease-out' : 'none',
        }}
      >
      <MobileOptimizations />
      <Suspense fallback={null}>
        {isDesktop && (
          <>
            <MatrixRain />
            <Scanlines />
            <CustomCursor />
          </>
        )}
      </Suspense>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <HeroCTA />
      </Suspense>

      {/* Bloco 1 - IA / Automação */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <FeatureBlock
        id="ia-automacao"
        subtitle="IA / AUTOMAÇÃO"
        title="Funcionário 24/7"
        description={[
          'Você quer um profissional altamente qualificado, que trabalha 24/7, nunca fica doente, nunca atrasa — e custa 1/10 de um funcionário comum?',
          'Eu tenho a solução.',
          'Criamos Funcionários de Inteligência Artificial totalmente treinados, especializados no seu nicho, prontos para executar tarefas operacionais, atendimento, processos, vendas e suporte — sem erro, sem salário alto e sem dor de cabeça.',
        ]}
        buttonText="Quero meu funcionário de IA"
        reverse={false}
      />
      </Suspense>

      {/* Bloco 2 - Sistemas Personalizados */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <FeatureBlock
        id="sistemas"
        subtitle="SISTEMAS PERSONALIZADOS"
        title="Feito sob medida para você"
        description={[
          'Sistema lento, travando, cheio de gambiarra — ou ferramentas que não atendem 100% do seu negócio?',
          'Você perde tempo, dinheiro e produtividade com sistemas que não foram feitos para você.',
          'A NITRON FLOW desenvolve sistemas 100% personalizados, moldados exatamente para o que sua operação precisa:',
        ]}
        features={[
          'Rápido',
          'Limpo',
          'Seguro',
          'Feito sob medida',
          'Sem limitações, sem mensalidades absurdas',
        ]}
        buttonText="Quero meu sistema personalizado"
        reverse={true}
      />
      </Suspense>

      {/* Bloco 3 - Marketing Digital */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <FeatureBlock
        id="marketing"
        subtitle="MARKETING DIGITAL"
        title="Domine seu nicho"
        description={[
          'Se eu pesquisasse o nome da sua empresa no Google agora… QUAL é a relevância da sua marca no mundo digital?',
          'Se você não for referência no seu nicho, eu tenho a solução para você.',
          'Criamos estratégias de marketing digital agressivas, inteligentes e orientadas a resultado.',
          'Você passa a ser visto, lembrado e escolhido — por quem realmente importa.',
        ]}
        buttonText="Quero dominar meu nicho"
        reverse={false}
      />
      </Suspense>

      {/* Bloco 4 - Consultoria Financeira */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <FeatureBlock
        id="consultoria"
        subtitle="CONSULTORIA FINANCEIRA"
        title="Lucre muito mais"
        description={[
          'Seu dinheiro está indo pelo ralo?',
          'Custos operacionais altos, fluxo de caixa que nunca fecha, orçamento imprevisível, dinheiro entrando e saindo sem controle?',
          'Eu tenho a solução para escalar o seu negócio, aumentar seus lucros e te levar ao topo.',
          'A NITRON FLOW organiza sua estrutura financeira, corta desperdícios, otimiza processos e cria uma gestão profissional, moderna e lucrativa.',
        ]}
        buttonText="Quero lucrar muito mais"
        reverse={true}
      />
      </Suspense>

      <Suspense fallback={null}>
        <Stats />
        <About />
        <Portfolio />
        <Testimonials />
        <CTAFinal />
        <ContactSection />
        <Footer />
      </Suspense>
      </main>
    </ErrorBoundary>
  )
}

