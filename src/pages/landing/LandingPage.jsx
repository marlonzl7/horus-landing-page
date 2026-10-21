import { useState } from 'react'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Modal } from '@/shared/ui'

export function LandingPage() {
  const [isWaitlistOpen, setWaitlistOpen] = useState(false)
  const openWaitlist = () => setWaitlistOpen(true)

  return (
    <>
      <Header onJoinWaitlist={openWaitlist} />
      <main>
        <Hero onJoinWaitlist={openWaitlist} />
      </main>

      {/* Conteúdo temporário: o formulário real entra na Parte 5 (feature waitlist-form) */}
      <Modal isOpen={isWaitlistOpen} onClose={() => setWaitlistOpen(false)} title="Lista de espera">
        <p>O formulário será adicionado na Parte 5.</p>
      </Modal>
    </>
  )
}
