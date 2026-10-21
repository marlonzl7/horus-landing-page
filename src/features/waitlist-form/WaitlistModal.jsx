import { useState } from 'react'
import { Button, Input, Modal } from '@/shared/ui'
import { PLANS } from '@/entities/plan'
import styles from './WaitlistModal.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate({ name, email }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Informe um e-mail válido.'
  return errors
}

function WaitlistForm({ planId, onClose }) {
  const [values, setValues] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success

  const plan = PLANS.find((item) => item.id === planId)

  function handleChange(field) {
    return (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Envio simulado: a aplicação é 100% client-side, nenhum dado é enviado ou salvo.
    setStatus('sending')
    setTimeout(() => setStatus('success'), 700)
  }

  if (status === 'success') {
    const firstName = values.name.trim().split(' ')[0]
    return (
      <div className={styles.success}>
        <span className={styles.check} aria-hidden="true">✓</span>
        <p className={styles.successTitle}>Pronto, {firstName}! Você está na lista.</p>
        <p className={styles.successText}>
          Quando o Horus Guardian for lançado, o aviso chega em {values.email.trim()}.
        </p>
        <Button fullWidth onClick={onClose}>Fechar</Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.intro}>
        {plan
          ? `Plano de interesse: ${plan.name} (${plan.price} ${plan.period}).`
          : 'Deixe seus dados e avisamos quando o app for lançado.'}
      </p>
      <Input label="Nome" value={values.name} onChange={handleChange('name')} error={errors.name} autoComplete="name" />
      <Input label="E-mail" type="email" value={values.email} onChange={handleChange('email')} error={errors.email} autoComplete="email" />
      <Button type="submit" fullWidth disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Entrar na lista de espera'}
      </Button>
    </form>
  )
}

export function WaitlistModal({ isOpen, onClose, planId }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lista de espera">
      <WaitlistForm planId={planId} onClose={onClose} />
    </Modal>
  )
}
