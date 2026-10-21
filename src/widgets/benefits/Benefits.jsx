import { Icon, Section } from '@/shared/ui'
import styles from './Benefits.module.css'

const BENEFITS = [
  { icon: 'clock', title: 'Tempo real de verdade', text: 'A localização é atualizada a cada 30 segundos. Menos de um minuto de atraso em condições normais de rede.' },
  { icon: 'phone', title: 'Funciona em segundo plano', text: 'Ninguém precisa abrir o app. Ele compartilha a posição sozinho, e quem consulta vê tudo no mapa.' },
  { icon: 'shield', title: 'Privacidade e LGPD', text: 'Localização é dado sensível. O app pede consentimento explícito e só mostra a posição para quem é da sua família.' },
  { icon: 'users', title: 'Um plano para a família toda', text: 'O preço é por família, não por pessoa. Pai, mãe e filhos entram juntos, sem conta extra.' },
  { icon: 'mail', title: 'Convite em um toque', text: 'O administrador convida cada familiar por e-mail. Quem recebe aceita pelo app e já aparece no mapa.' },
  { icon: 'heart', title: 'Feito para o Brasil', text: 'Interface em português, pensada para famílias brasileiras, sem a complexidade dos apps gringos.' },
]

const DIFFERENTIALS = ['Em português', 'Preço por família', 'Sem histórico guardado no plano gratuito']

export function Benefits() {
  return (
    <Section
      id="beneficios"
      tone="white"
      eyebrow="Benefícios"
      title="Tudo o que você precisa para parar de perguntar"
      subtitle="Simples para quem consulta, invisível para quem é consultado."
    >
      <ul className={styles.grid}>
        {BENEFITS.map((item) => (
          <li key={item.title} className={styles.card}>
            <span className={styles.icon}>
              <Icon name={item.icon} size={26} />
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>

      <div className={styles.differentials}>
        <span className={styles.label}>Por que o Horus é diferente</span>
        <ul className={styles.pills}>
          {DIFFERENTIALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
