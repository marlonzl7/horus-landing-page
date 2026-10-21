import styles from './Logo.module.css'

export function Logo({ tone = 'light' }) {
  return (
    <span className={`${styles.logo} ${styles[tone]}`}>
      <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2C9.9 2 5 6.9 5 13c0 8 11 17 11 17s11-9 11-17C27 6.9 22.1 2 16 2z" fill="currentColor" />
        <circle cx="16" cy="13" r="5.5" fill="var(--logo-eye-bg)" />
        <circle cx="16" cy="13" r="2.6" fill="var(--color-accent)" />
      </svg>
      <span className={styles.text}>Horus Guardian</span>
    </span>
  )
}
