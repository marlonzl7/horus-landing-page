import { Button, Icon, Section } from '@/shared/ui'
import styles from './HowItWorks.module.css'

const STEPS = [
  { icon: 'userPlus', title: 'Crie sua família', text: 'Faça seu cadastro, dê um nome ao grupo e pronto: você vira o administrador.' },
  { icon: 'mail', title: 'Convide por e-mail', text: 'Cada familiar recebe um convite válido por 48 horas e entra com um toque no app.' },
  { icon: 'mapPin', title: 'Abra o mapa', text: 'Todos aparecem com nome e horário da última atualização. Sem perguntar, sem esperar resposta.' },
]

export function HowItWorks({ onJoinWaitlist }) {
  return (
    <Section
      id="como-funciona"
      tone="light"
      eyebrow="Como funciona"
      title="Três passos e a família está no mapa"
      subtitle="Configurar leva poucos minutos. Depois disso, o Horus trabalha em silêncio."
    >
      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number}>{index + 1}</span>
            <span className={styles.icon}>
              <Icon name={step.icon} size={28} />
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>

      <p className={styles.note}>
        <Icon name="battery" size={20} />
        Pensado para gastar pouca bateria: a localização em segundo plano usa o recurso nativo do celular.
      </p>

      <div className={styles.cta}>
        <Button size="lg" onClick={onJoinWaitlist}>
          Quero ser avisado no lançamento
        </Button>
      </div>
    </Section>
  )
}
