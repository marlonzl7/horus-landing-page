import { useState } from 'react'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Benefits } from '@/widgets/benefits'
import { HowItWorks } from '@/widgets/how-it-works'
import { Testimonials } from '@/widgets/testimonials'
import { Pricing } from '@/widgets/pricing'
import { Modal } from '@/shared/ui'

export function LandingPage() {
  const [isWaitlistOpen, setWaitlistOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Aceita o id do plano (cards de preço) ou nenhum argumento (demais CTAs)
  function openWaitlist(planId) {
    setSelectedPlan(typeof planId === 'string' ? planId : null)
    setWaitlistOpen(true)
  }

  return (
    <>
      <Header onJoinWaitlist={openWaitlist} />
      <main>
        <Hero onJoinWaitlist={openWaitlist} />
        <Benefits />
        <HowItWorks onJoinWaitlist={openWaitlist} />
        <Testimonials />
        <Pricing onSelectPlan={openWaitlist} />
      </main>

      {/* Conteúdo temporário: o formulário real entra na Parte 5 (feature waitlist-form) */}
      <Modal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} title="Lista de espera">
        <p>Plano escolhido: {selectedPlan ?? 'nenhum'}. O formulário será adicionado na Parte 5.</p>
      </Modal>
    </>
  )
}
