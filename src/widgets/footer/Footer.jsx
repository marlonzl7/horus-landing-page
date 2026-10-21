import { Logo } from '@/shared/ui'
import styles from './Footer.module.css'

const LINKS = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.tagline}>Sua família, sempre por perto.</p>
        </div>

        <nav aria-label="Links do rodapé" className={styles.links}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>

      <p className={styles.legal}>
        Projeto acadêmico desenvolvido por Marlon · SPTech, Técnicas de Programação WEB FrontEnd 2026/2.
        Depoimentos, números e valores são fictícios.
      </p>
    </footer>
  )
}
