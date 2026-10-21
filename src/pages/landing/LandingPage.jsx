import { useState } from 'react'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Benefits } from '@/widgets/benefits'
import { HowItWorks } from '@/widgets/how-it-works'
import { Testimonials } from '@/widgets/testimonials'
import { Pricing } from '@/widgets/pricing'
import { Faq } from '@/widgets/faq'
import { FinalCta } from '@/widgets/final-cta'
import { Footer } from '@/widgets/footer'
import { WaitlistModal } from '@/features/waitlist-form'

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
      <main id="conteudo">
        <Hero onJoinWaitlist={openWaitlist} />
        <Benefits />
        <HowItWorks onJoinWaitlist={openWaitlist} />
        <Testimonials />
        <Pricing onSelectPlan={openWaitlist} />
        <Faq />
        <FinalCta onJoinWaitlist={openWaitlist} />
      </main>
      <Footer />

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} planId={selectedPlan} />
    </>
  )
}
