import { Button, Logo } from '@/shared/ui'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
]

export function Header({ onJoinWaitlist }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#topo" aria-label="Horus Guardian, início">
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Seções da página">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <Button size="md" onClick={onJoinWaitlist}>
          Entrar na lista
        </Button>
      </div>
    </header>
  )
}
