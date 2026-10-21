import { useEffect, useState } from 'react'
import { Button, Logo } from '@/shared/ui'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
]

export function Header({ onJoinWaitlist }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function handleJoin() {
    setMenuOpen(false)
    onJoinWaitlist()
  }

  return (
    <header className={styles.header}>
      <a href="#conteudo" className={styles.skip}>Pular para o conteúdo</a>

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

        <Button size="md" className={styles.cta} onClick={handleJoin}>
          Entrar na lista
        </Button>

        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="menu-mobile" className={styles.mobileMenu} aria-label="Menu">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <Button fullWidth onClick={handleJoin}>Entrar na lista</Button>
        </nav>
      )}
    </header>
  )
}
