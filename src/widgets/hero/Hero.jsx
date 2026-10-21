import { Button } from '@/shared/ui'
import { PhoneMockup } from './PhoneMockup'
import styles from './Hero.module.css'

const HIGHLIGHTS = ['Atualização a cada 30 segundos', 'Funciona com o app fechado', 'Privacidade e LGPD']

export function Hero({ onJoinWaitlist }) {
  return (
    <section id="topo" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.badge}>Localização familiar em tempo real</span>
          <h1 className={styles.title}>
            Chega de perguntar <span className={styles.accent}>“chegou?”</span>
          </h1>
          <p className={styles.subtitle}>
            O Horus Guardian mostra onde cada pessoa da família está, sem ligação e sem mensagem. Você abre o mapa e já sabe.
          </p>

          <div className={styles.actions}>
            <Button size="lg" onClick={onJoinWaitlist}>
              Entrar na lista de espera
            </Button>
            <Button size="lg" variant="outline" as="a" href="#como-funciona">
              Ver como funciona
            </Button>
          </div>

          <ul className={styles.highlights}>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <PhoneMockup />
      </div>
    </section>
  )
}
