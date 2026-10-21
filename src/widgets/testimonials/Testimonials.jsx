import { Section } from '@/shared/ui'
import styles from './Testimonials.module.css'

const STATS = [
  { value: '+250', label: 'famílias na lista de espera' },
  { value: '4,8 ★', label: 'avaliação média no beta' },
  { value: '30 s', label: 'entre uma atualização e outra' },
]

const TESTIMONIALS = [
  { name: 'Carla M.', role: 'Mãe de dois adolescentes', text: 'Eu vivia mandando “chegou?” no grupo. Agora abro o mapa, vejo que já chegaram e sigo o meu dia.' },
  { name: 'Rafael S.', role: 'Pai, trabalha em turnos', text: 'Minha esposa sabe quando estou saindo do trabalho sem eu precisar avisar. Cortou metade das nossas ligações.' },
  { name: 'Júlia P.', role: 'Universitária, 19 anos', text: 'Achei que ia me sentir vigiada, mas a família toda aparece no mapa, até meus pais. Ficou justo para todo mundo.' },
  { name: 'Dona Neide', role: 'Avó, 62 anos', text: 'Meu neto me ensinou a abrir, é só um mapa. Vi que ele já tinha chegado na escola e fiquei tranquila.' },
]

function initials(name) {
  return name.replace('Dona ', '').split(' ').map((part) => part[0]).slice(0, 2).join('')
}

export function Testimonials() {
  return (
    <Section
      id="depoimentos"
      tone="white"
      eyebrow="Quem usa"
      title="Famílias que pararam de perguntar"
      subtitle="Histórias de quem trocou a mensagem repetitiva por um olhar no mapa."
    >
      <dl className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.value}>{stat.value}</dt>
            <dd className={styles.label}>{stat.label}</dd>
          </div>
        ))}
      </dl>

      <ul className={styles.grid}>
        {TESTIMONIALS.map((item) => (
          <li key={item.name}>
            <figure className={styles.card}>
              <span className={styles.stars} role="img" aria-label="5 de 5 estrelas">★★★★★</span>
              <blockquote className={styles.quote}>{item.text}</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar}>{initials(item.name)}</span>
                <span>
                  <strong className={styles.name}>{item.name}</strong>
                  <span className={styles.role}>{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className={styles.disclaimer}>Depoimentos e números fictícios, criados para este protótipo acadêmico.</p>
    </Section>
  )
}
