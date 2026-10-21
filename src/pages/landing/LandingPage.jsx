import { useState } from 'react'
import { Button, Input, Modal, Section } from '@/shared/ui'
import styles from './LandingPage.module.css'

// Placeholder da Parte 1: valida tokens e componentes base.
// Será substituído pela composição dos widgets nas próximas partes.
export function LandingPage() {
  const [open, setOpen] = useState(false)

  return (
    <main>
      <Section tone="dark" eyebrow="Horus Guardian" title="Sua família, sempre por perto" subtitle="Setup da Parte 1 concluído.">
        <div className={styles.row}>
          <Button size="lg" onClick={() => setOpen(true)}>Abrir modal</Button>
          <Button size="lg" variant="outline">Outline</Button>
        </div>
      </Section>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Teste do modal">
        <Input label="E-mail" type="email" placeholder="voce@email.com" />
      </Modal>
    </main>
  )
}
