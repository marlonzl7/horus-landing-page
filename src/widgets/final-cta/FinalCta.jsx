import { Button } from '@/shared/ui'
import styles from './FinalCta.module.css'

export function FinalCta({ onJoinWaitlist }) {
  return (
    <section id="lista-de-espera" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Sua família merece parar de perguntar</h2>
        <p className={styles.text}>
          Entre na lista de espera e garanta o plano Fundador por R$ 9,90/mês, para sempre.
        </p>
        <Button size="lg" onClick={() => onJoinWaitlist()}>
          Entrar na lista de espera
        </Button>
      </div>
    </section>
  )
}
